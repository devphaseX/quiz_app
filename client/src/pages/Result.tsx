import { Await, Link, defer, redirect, useLoaderData } from 'react-router-dom';
import '../styles/Result.css';
import { ResultTable } from '../component/ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { resultActions } from '../store/result';
import { store } from '../store';

import { Suspense, useEffect } from 'react';
import { calculatePoint, delayResolve, getFlagStatus } from '../util';
import { useQuestionResult } from '../hooks/useQuestionResult';
import { getQuizAnswer, storeUserResult } from '../data';
import { AnsweredQuiz } from '../data/type';

const Result = () => {
  const deferData = useLoaderData() as AnswerDeferredObject;
  return (
    <div>
      <Suspense fallback={<h3 className="text-light">Processing result...</h3>}>
        <Await resolve={deferData.answeredQuiz}>
          {(result: AnsweredQuiz) => <DisplayResult quiz={result} />}
        </Await>
      </Suspense>
    </div>
  );
};

const DisplayResult = ({ quiz: answeredQuiz }: { quiz: AnsweredQuiz }) => {
  const dispatch = useDispatch();
  const {
    intrepreted,
    __raw,
    userInfo: { username },
  } = useQuestionResult();
  const { point, quizId } = useSelector((state: GlobalStoreState) => ({
    point: state.result.point,
    quizId: state.questions.quizId,
  }));

  const totalQuestionNo = __raw.questions.length;
  const totalPoint = totalQuestionNo * point;
  const attemptedFrequency = intrepreted.attempted;

  const earnedPoint = calculatePoint(point, {
    attemptedQuestion: intrepreted.anweredQuestions,
    quizAnswer: answeredQuiz.answers,
  });

  const status = getFlagStatus(earnedPoint, totalPoint);

  const restartQuizHandler = () => {
    dispatch(resultActions.resetResult());
  };

  useEffect(() => {
    const results = {
      username,
      attempts: attemptedFrequency,
      point: earnedPoint,
      archieved: status,
      result: { quizId, answerIds: answeredQuiz.answers },
    };
    (async () => {
      await storeUserResult(results);
      console.log('result sync with server');
    })();
  }, []);

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
            {totalQuestionNo.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="flex">
          <span>Total Attempt : </span>
          <span className="bold">
            {attemptedFrequency.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="flex">
          <span>Total Earn Point : </span>
          <span className="bold">{earnedPoint}</span>
        </div>

        <div className="flex">
          <span>Quiz Result</span>
          <span
            style={{ color: status === 'passed' ? 'green' : 'red' }}
            className="bold"
          >
            {status}
          </span>
        </div>
      </div>
      <div className="start">
        <Link className="btn" to="/" onClick={restartQuizHandler}>
          Restart
        </Link>
      </div>

      <ResultTable
        result={[username!, attemptedFrequency, earnedPoint, status]}
      />
    </>
  );
};

type AnswerDeferredObject = {
  answeredQuiz: Promise<AnsweredQuiz | null> | AnsweredQuiz | null;
};

function answersLoader() {
  const {
    questions,
    result: { submitted },
  } = store.getState();

  if (!submitted) return redirect('/');

  const deferedData: AnswerDeferredObject = {
    answeredQuiz: delayResolve(1500, () => getQuizAnswer(questions.quizId!)),
  };
  return defer(deferedData);
}

export { Result, answersLoader };
