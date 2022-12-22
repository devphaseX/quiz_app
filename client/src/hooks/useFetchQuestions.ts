import { Action, Dispatch } from '@reduxjs/toolkit';
import { useReducer, useCallback, useEffect } from 'react';
import { Question } from '../database/data';
import { questionActions } from '../store/questions';
import { useDispatch } from 'react-redux';

interface FetchQuestionsState<QuestionData extends Question = Question> {
  isFetching: boolean;
  apiData: Array<QuestionData>;
  serverError: unknown;
}

interface StartFetchingAction extends Action {
  type: 'startFetching';
}

interface StopFetchingAction extends Action {
  type: 'stopFetching';
}

interface SetFetchDataAction<QuestionData extends Question = Question>
  extends Action {
  type: 'setQuestion';
  payload: Array<QuestionData>;
}

interface SetServerError extends Action {
  type: 'setServerError';
  payload: unknown;
}

type QuestionFetchActions =
  | StartFetchingAction
  | StopFetchingAction
  | SetFetchDataAction
  | SetServerError;

interface ErrorWithCause extends Error {
  cause: unknown;
}
interface EmptyQuestionError extends ErrorWithCause {
  cause: 'empty_question';
}

const useFetchQuestions = <QuestionData extends Question>(
  dataFetcher: (
    action: typeof serverErrorAction
  ) => Promise<Array<QuestionData>> | Array<QuestionData>
) => {
  function serverErrorAction(error: unknown) {
    _internalDispatch({ type: 'setServerError', payload: error });
  }
  const reducer = useCallback(
    (state: FetchQuestionsState, action: QuestionFetchActions) => {
      switch (action.type) {
        case 'startFetching':
          return { ...state, isFetching: true };

        case 'stopFetching':
          return { ...state, isFetching: false };

        case 'setQuestion':
          return { ...state, apiData: action.payload };

        case 'setServerError':
          return {
            ...state,
            serverError: action.payload,
          };

        default: {
          throw new TypeError(
            `Unreachable code part found using an unknown action type: ${
              (action as any).type
            } `
          );
        }
      }
    },
    []
  );

  const [state, _internalDispatch] = useReducer(reducer, {
    isFetching: false,
    apiData: [] as any[],
    serverError: null,
  });

  const globalDispatch =
    useDispatch<Dispatch<ReturnType<typeof questionActions.startQuiz>>>();

  useEffect(() => {
    _internalDispatch({ type: 'startFetching' });

    (async () => {
      try {
        const data = await dataFetcher(serverErrorAction);
        if (data.length > 0) {
          _internalDispatch({ type: 'setQuestion', payload: data });
          globalDispatch(questionActions.startQuiz(data));
        } else {
          const error = new Error(
            'Got an empty questions from the server'
          ) as EmptyQuestionError;
          error.cause = 'empty_question';
          throw error;
        }
      } catch (e) {
        serverErrorAction(e);
      } finally {
        _internalDispatch({ type: 'stopFetching' });
      }
    })();
  }, []);

  return [state, _internalDispatch] as const;
};

export { useFetchQuestions };
