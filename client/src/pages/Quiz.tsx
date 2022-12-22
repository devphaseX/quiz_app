import { Await, LoaderFunction, defer, useLoaderData } from 'react-router-dom';
import { Questions } from '../component/Questions';
import { getExternalFulfillPromise } from '../util';
import {
  QuestionWithUniqueOption,
  makeQuestionUnique,
  optionableQuestion,
} from '../database/data';
import { Suspense } from 'react';

const Quiz = () => {
  const deferLoader = useLoaderData() as {
    questions: Promise<Array<QuestionWithUniqueOption>>;
  };

  const onRequestPreviousQuiz = () => {};
  const onRequestNextQuiz = () => {};
  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <Suspense fallback={<h3 className="text-light">Loading...</h3>}>
        <Await
          resolve={deferLoader.questions}
          errorElement={<h3>Something went wrong</h3>}
        >
          {(questions) => {
            return <Questions questions={questions} />;
          }}
        </Await>
      </Suspense>
      <div className="grid">
        <button
          type="button"
          onClick={onRequestPreviousQuiz}
          className="btn prev"
        >
          Prev
        </button>
        <button type="button" onClick={onRequestNextQuiz} className="btn next">
          Prev
        </button>
      </div>
    </div>
  );
};

function dummyFetch() {
  const { promise, resolve } =
    getExternalFulfillPromise<Array<QuestionWithUniqueOption>>();
  setTimeout(() => {
    resolve(makeQuestionUnique(optionableQuestion));
  }, 1000);
  return promise;
}
const quizLoader: LoaderFunction = () => {
  return defer({ questions: dummyFetch() });
};

export { Quiz, quizLoader };
