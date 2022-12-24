import { Action, createSlice } from '@reduxjs/toolkit';
import { UniqueAnswer } from '../database/data';

interface UserIdAction extends Action {
  payload: { userId: string };
}

interface ChoosenAnswerAction extends Action {
  payload: {
    questionId: QuestionID;
    answerId: string | number;
    value: string;
    position: number;
  };
}

type QuestionID = string;
type AnswerObject = UniqueAnswer & { position: number };

type QuizAnswers = { [id in QuestionID]?: AnswerObject };

interface QuestionResult {
  userId: null | string;
  result: QuizAnswers;
  submitted: boolean;
}

const getDefaultResultState = (): QuestionResult => ({
  userId: null,
  result: {},
  submitted: false,
});

const { actions, reducer } = createSlice({
  name: 'result',
  initialState: getDefaultResultState(),
  reducers: {
    setUserId: (state, action: UserIdAction) => {
      state.userId = action.payload.userId;
    },

    setQuestionAnswer: (state, action: ChoosenAnswerAction) => {
      const { questionId: _, answerId: id, ...answerSpecific } = action.payload;
      state.result[action.payload.questionId] = {
        id: id.toString(),
        ...answerSpecific,
      };
    },

    resetResult: getDefaultResultState,
    placeQuestionForSubmission: (state) => {
      return { ...state, submitted: true };
    },
  },
});

export type { AnswerObject, ChoosenAnswerAction, QuizAnswers, QuestionResult };
export { actions as resultActions, reducer as resultReducer };
