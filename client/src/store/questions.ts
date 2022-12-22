import { createSlice } from '@reduxjs/toolkit';
import { QuestionWithUniqueOption } from '../database/data';

const { reducer, actions } = createSlice({
  name: 'questions',
  initialState: {
    questionQueue: <Array<QuestionWithUniqueOption>>[],
    trace: -1,
    currentAttendingQuestion: <null | QuestionWithUniqueOption>null,
  },
  reducers: {
    startQuiz: (state, action) => {
      return {
        ...state,
        questionQueue: action.payload,
      };
    },
  },
});

export { reducer as questionReducer, actions as questionActions };
