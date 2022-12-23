import { Await, LoaderFunction, defer, useLoaderData } from 'react-router-dom';
import { Questions } from '../component/Questions';
import { getExternalFulfillPromise } from '../util';
import {
  QuestionWithUniqueOption,
  makeQuestionUnique,
  optionableQuestion,
} from '../database/data';
import { Dispatch, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from '../store/questions';

type PrevActionObject = ReturnType<typeof questionActions.goToPrev>;
type NextActionObject = ReturnType<typeof questionActions.goToNext>;
type QuestionActionObject = PrevActionObject | NextActionObject;

const Quiz = () => {
  const deferLoader = useLoaderData() as {
    questions: Promise<Array<QuestionWithUniqueOption>>;
  };

  return (
    <Suspense fallback={<h3 className="text-light">Loading...</h3>}>
      <Await
        resolve={deferLoader.questions}
        errorElement={<h3>Something went wrong</h3>}
      >
        {(questions) => (
          <div>
            <Questions questions={questions} />
            <QuestionControl />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

const QuestionControl = () => {
  const dispatch = useDispatch<Dispatch<QuestionActionObject>>();

  const { allowNext, allowPrev } = useSelector((state: GlobalStoreState) => ({
    allowPrev: state.questions.trace !== 0,
    allowNext: state.questions.trace + 1 < state.questions.questionQueue.length,
  }));

  const onRequestPreviousQuiz = () => {
    dispatch(questionActions.goToPrev());
  };
  const onRequestNextQuiz = () => {
    dispatch(questionActions.goToNext());
  };

  return (
    <div className="grid">
      {allowPrev ? (
        <button
          type="button"
          onClick={onRequestPreviousQuiz}
          className="btn prev"
        >
          Prev
        </button>
      ) : (
        <div></div>
      )}
      {allowNext ? (
        <button type="button" onClick={onRequestNextQuiz} className="btn next">
          Next
        </button>
      ) : (
        <div></div>
      )}
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
