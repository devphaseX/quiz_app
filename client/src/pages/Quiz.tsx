import {
  Await,
  LoaderFunction,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { Questions } from '../component/Questions';
import { QuizData } from '../database/data';
import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from '../store/questions';
import { resultActions } from '../store/result';
import { getAvailableQuiz } from '../database';

const Quiz = () => {
  const deferLoader = useLoaderData() as {
    questions: Promise<QuizData>;
  };
  return (
    <Suspense fallback={<h3 className="text-light">Loading...</h3>}>
      <Await
        resolve={deferLoader.questions}
        errorElement={<h3>Something went wrong</h3>}
      >
        {(quiz: QuizData) => (
          <div>
            <Questions quiz={quiz} />
            <QuestionControl />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

const QuestionControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allowNext, allowPrev } = useSelector((state: GlobalStoreState) => ({
    allowPrev: state.questions.trace !== 0,
    allowNext: state.questions.trace + 1 < state.questions.questionQueue.length,
  }));

  const onRequestPreviousQuiz = () => {
    dispatch(questionActions.goToPrev());
  };
  const onRequestNextQuiz = () => {
    if (allowNext) {
      dispatch(questionActions.goToNext());
    } else {
      dispatch(resultActions.placeQuestionForSubmission());
      navigate('/result');
    }
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
      <button type="button" onClick={onRequestNextQuiz} className="btn next">
        {!allowNext ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

const quizLoader: LoaderFunction = () => {
  return defer({
    questions: getAvailableQuiz().then((quizList) => quizList[0]),
  });
};

export { quizLoader, Quiz };
