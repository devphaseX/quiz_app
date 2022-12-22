import { createSlice } from '@reduxjs/toolkit';
import { QuestionWithUniqueOption } from '../database/data';

const { reducer, actions } = createSlice({
  name: 'questions',
  initialState: {
    questionQueue: <Array<QuestionWithUniqueOption>>[],
    trace: 0,
    currentAttendingQuestion: <null | QuestionWithUniqueOption>null,
  },
  reducers: {
    startQuiz: (state, action) => {
      return {
        ...state,
        questionQueue: action.payload,
        currentAttendingQuestion: action.payload[0],
        trace: 0,
      };
    },

    goToPrev: (state) => {
      return {
        ...state,
        trace: Math.max(state.trace - 1, 0),
      };
    },

    goToNext: (state) => {
      return {
        ...state,
        trace: Math.min(state.trace + 1, state.questionQueue.length - 1),
      };
    },
  },
});

export { reducer as questionReducer, actions as questionActions };
