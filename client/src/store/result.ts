import { Action, createSlice } from '@reduxjs/toolkit';
import { UniqueAnswer } from '../data/type';

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

interface QuestionResult {
  userId: null | string;
  readonly point: number;
  submitted: boolean;
}

const getDefaultResultState = (): QuestionResult => ({
  userId: null,
  point: 10,
  submitted: false,
});

const { actions, reducer } = createSlice({
  name: 'result',
  initialState: getDefaultResultState(),
  reducers: {
    setUserId: (state, action: UserIdAction) => {
      state.userId = action.payload.userId;
    },
    resetResult: getDefaultResultState,
    placeQuestionForSubmission: (state) => {
      return { ...state, submitted: true };
    },
  },
});

export type { AnswerObject, ChoosenAnswerAction, QuestionResult };
export { actions as resultActions, reducer as resultReducer };
