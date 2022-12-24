import { Await, Link, defer, redirect, useLoaderData } from 'react-router-dom';
import '../styles/Result.css';
import { ResultTable } from '../component/ResultTable';
import { useDispatch } from 'react-redux';
import { resultActions } from '../store/result';
import { store } from '../store';
import {
  Question,
  QuestionWithChoosenAnswer,
  getAnswersId,
  getQuestions,
} from '../database/data';
import { Suspense } from 'react';
import { delayResolve } from '../util';
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
  sortQuestionObject,
}: {
  sortQuestionObject: QuestionWithAnswerSort;
}) => {
  if (sortQuestionObject.invalid.length !== 0) {
    throw sortQuestionObject.invalid;
  }
  const dispatch = useDispatch();
  const { intrepreted, __raw } = useQuestionResult();
  const { valid: validQuestions } = sortQuestionObject;
  // const totalPoint = validQuestions.reduce((score, question) => {
  //   if(intrepreted.anweredQuestions.find((id) => {

  //   }) )
  // },0)

  const restartQuizHandler = () => {
    dispatch(resultActions.resetResult());
  };

  return (
    <>
      <div className="result flex-center">
        <div className="flex">
          <span>Username</span>
          <span className="bold">Daily Tuition</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points : </span>
          <span className="bold">50</span>
        </div>
        <div className="flex">
          <span>Total Question : </span>
          <span className="bold">05</span>
        </div>
        <div className="flex">
          <span>Total Attempt : </span>
          <span className="bold">03</span>
        </div>
        <div className="flex">
          <span>Total Earn Point : </span>
          <span className="bold">30</span>
        </div>

        <div className="flex">
          <span>Quiz Result</span>
          <span className="bold">Passed</span>
        </div>
      </div>
      <div className="start">
        <Link className="btn" to="/" onClick={restartQuizHandler}>
          Restart
        </Link>
      </div>

      <ResultTable />
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
      // if (questionsId.has(question.id.toString())) {
      //   return sort.valid.push({ ...question, answer: answer! });
      // }

      sort.invalid.push(question);
    });

    return sort;
  });
}

export { Result, answersLoader };
