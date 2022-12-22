import { Action, createSlice } from '@reduxjs/toolkit';

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
type AnswerObject = { id: string; value: string; position: number };

type QuizAnswers = { [id in QuestionID]?: AnswerObject };

const { actions, reducer } = createSlice({
  name: 'result',
  initialState: {
    userId: null as null | string,
    result: {} as QuizAnswers,
  },
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
  },
});

export type { AnswerObject, ChoosenAnswerAction };
export { actions as resultActions, reducer as resultReducer };
