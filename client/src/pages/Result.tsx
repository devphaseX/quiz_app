import { Await, Link, defer, redirect, useLoaderData } from 'react-router-dom';
import '../styles/Result.css';
import { ResultTable } from '../component/ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { resultActions } from '../store/result';
import { store } from '../store';
import {
  Question,
  QuestionWithChoosenAnswer,
  getAnswersId,
  getQuestions,
} from '../database/data';
import { Suspense } from 'react';
import { calculatePoint, delayResolve, getFlagStatus } from '../util';
import { useQuestionResult } from '../hooks/useQuestionResult';

const Result = () => {
  const serverResult = useLoaderData() as AnswerDeferredObject;
  return (
    <div>
      <Suspense fallback={<h3 className="text-light">Processing result...</h3>}>
        <Await resolve={serverResult.answeredQuestion}>
          {(result) => <DisplayResult sortQuestionObject={result} />}
        </Await>
      </Suspense>
    </div>
  );
};

const DisplayResult = ({
  sortQuestionObject: serverProvidedQuestionsWithAnswer,
}: {
  sortQuestionObject: QuestionWithAnswerSort;
}) => {
  if (serverProvidedQuestionsWithAnswer.invalid.length !== 0) {
    throw serverProvidedQuestionsWithAnswer.invalid;
  }
  const dispatch = useDispatch();
  const {
    intrepreted,
    __raw,
    userInfo: { username },
  } = useQuestionResult();
  const point = useSelector((state: GlobalStoreState) => state.result.point);

  const totalQuestionNo = __raw.questions.length;
  const totalPoint = totalQuestionNo * point;
  const attemptedFrequency = intrepreted.attempted;
  const earnedPoint = calculatePoint(
    intrepreted.anweredQuestions,
    serverProvidedQuestionsWithAnswer.valid,
    point
  );
  const status = getFlagStatus(earnedPoint, totalPoint);

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
  answeredQuestion:
    | Promise<QuestionWithAnswerSort>
    | Array<QuestionWithAnswerSort>;
};

function answersLoader() {
  const {
    questions,
    result: { submitted },
  } = store.getState();
  if (!submitted) {
    return redirect('/');
  }

  const _b: AnswerDeferredObject = {
    answeredQuestion: getAnswersToQuestion(questions.questionQueue),
  };
  return defer(_b);
}

export interface QuestionWithAnswerSort {
  valid: Array<QuestionWithChoosenAnswer>;
  invalid: Array<Question>;
}

function getAnswersToQuestion(questions: Array<Question>) {
  const questionsId = new Set<string>();
  questions.forEach(({ id }) => questionsId.add(id.toString()));

  return delayResolve(2000, () => {
    const answeredId = getAnswersId();
    const sort: QuestionWithAnswerSort = { valid: [], invalid: [] };

    getQuestions().forEach((question) => {
      let answer = question.options.find(({ id }) => answeredId.includes(id));
      if (questionsId.has(question.id.toString())) {
        return sort.valid.push({ ...question, answer: answer! });
      }

      sort.invalid.push(question);
    });

    return sort;
  });
}

export { Result, answersLoader };
