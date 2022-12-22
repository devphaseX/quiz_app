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
  },
});

export { reducer as questionReducer, actions as questionActions };
