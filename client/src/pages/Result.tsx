import { Await, Link, defer, redirect, useLoaderData } from 'react-router-dom';
import '../styles/Result.css';
import { ResultTable } from '../component/ResultTable';
import { useDispatch } from 'react-redux';
import { resultActions } from '../store/result';
import { store } from '../store';

import { Suspense } from 'react';
import {
  calculatePoint,
  delayResolve,
  getFlagStatus,
  sortQuestion,
} from '../util';
import { getQuizAnswer, storeUserResult } from '../data';

const Result = () => {
  const deferData = useLoaderData() as AnswerDeferredObject;
  return (
    <div>
      <Suspense fallback={<h3 className="text-light">Processing result...</h3>}>
        <Await resolve={deferData.answeredQuiz}>
          {(result: QuizResultDisplay) => <DisplayResult quiz={result} />}
        </Await>
      </Suspense>
    </div>
  );
};

const DisplayResult = ({
  quiz: { point, archieved, attempts, totalPoint, username, questionSize },
}: {
  quiz: QuizResultDisplay;
}) => {
  const dispatch = useDispatch();

  const restartQuizHandler = () => {
    dispatch(resultActions.resetResult());
  };

  return (
    <>
      <div className="result flex-center">
        <div className="flex">
          <span>Username</span>
          <span className="bold">{username}</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points : </span>
          <span className="bold">{totalPoint}</span>
        </div>
        <div className="flex">
          <span>Total Question : </span>
          <span className="bold">
            {questionSize.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="flex">
          <span>Total Attempt : </span>
          <span className="bold">{attempts.toString().padStart(2, '0')}</span>
        </div>
        <div className="flex">
          <span>Total Earn Point : </span>
          <span className="bold">{point}</span>
        </div>

        <div className="flex">
          <span>Quiz Result</span>
          <span
            style={{ color: archieved === 'passed' ? 'green' : 'red' }}
            className="bold"
          >
            {archieved}
          </span>
        </div>
      </div>
      <div className="start">
        <Link className="btn" to="/" onClick={restartQuizHandler}>
          Restart
        </Link>
      </div>

      <ResultTable result={[username!, attempts, point, archieved]} />
    </>
  );
};

type AnswerDeferredObject = {
  answeredQuiz: Promise<QuizResultDisplay | null> | QuizResultDisplay | null;
};

function answersLoader() {
  const {
    questions: { quizId, questionQueue },
    result: { submitted, point, userId },
  } = store.getState();

  if (!submitted) return redirect('/');

  const deferedData: AnswerDeferredObject = {
    answeredQuiz: delayResolve(1500, () => getQuizAnswer(quizId!)).then(
      (result) => {
        if (!result) return result;
        const { intrepreted, __raw } = sortQuestion(questionQueue, {
          userId: userId!,
        });

        const totalQuestionNo = __raw.questions.length;
        const totalPoint = totalQuestionNo * point;
        const attemptedFrequency = intrepreted.attempted;

        const earnedPoint = calculatePoint(point, {
          attemptedQuestion: intrepreted.anweredQuestions,
          quizAnswer: result.answers,
        });
        const rewardStatus = getFlagStatus(earnedPoint, totalPoint);

        const results = {
          username: userId,
          attempts: attemptedFrequency,
          point: earnedPoint,
          archieved: rewardStatus,
          result: { quizId, answerIds: result.answers },
        };

        return storeUserResult(results).then<QuizResultDisplay>(() => {
          return {
            username: userId!,
            attempts: attemptedFrequency,
            point: earnedPoint,
            archieved: rewardStatus,
            totalPoint,
            questionSize: __raw.questions.length,
          };
        });
      }
    ),
  };

  return defer(deferedData);
}

interface QuizResultDisplay {
  username: string;
  attempts: number;
  point: number;
  archieved: 'failed' | 'passed';
  totalPoint: number;
  questionSize: number;
}

export { Result, answersLoader };
