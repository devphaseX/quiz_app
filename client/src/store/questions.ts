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
      const trace = Math.max(state.trace - 1, 0);
      return {
        ...state,
        trace,
        currentAttendingQuestion: state.questionQueue[trace],
      };
    },

    goToNext: (state) => {
      const trace = Math.min(state.trace + 1, state.questionQueue.length - 1);

      return {
        ...state,
        trace,
        currentAttendingQuestion: state.questionQueue[trace],
      };
    },
  },
});

export { reducer as questionReducer, actions as questionActions };
