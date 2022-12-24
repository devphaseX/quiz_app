import { createSlice } from '@reduxjs/toolkit';
import { QuestionWithChoosenAnswer } from '../database/data';

type AttemptableQuestion = QuestionWithChoosenAnswer & {
  answer?: QuestionWithChoosenAnswer['answer'];
};

const { reducer, actions } = createSlice({
  name: 'questions',
  initialState: {
    quizId: null as null | string,
    questionQueue: <Array<AttemptableQuestion>>[],
    trace: 0,
    currentAttendingQuestion: <null | AttemptableQuestion>null,
  },
  reducers: {
    startQuiz: (state, action) => {
      return {
        ...state,
        quizId: action.payload._id,
        questionQueue: action.payload.questions,
        currentAttendingQuestion: action.payload.questions[0],
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

    setAnswer(state, action) {
      if (!state.currentAttendingQuestion) {
        throw '';
      }

      const userAnswer = state.currentAttendingQuestion.options.find(
        ({ id }) => id === action.payload
      );

      if (!userAnswer) {
        throw new TypeError();
      }

      const updateCurrentQuestion = {
        ...state.currentAttendingQuestion,
        answer: { ...userAnswer },
      };

      state.questionQueue = state.questionQueue.map((question) =>
        question.id === updateCurrentQuestion.id
          ? updateCurrentQuestion
          : question
      );

      state.currentAttendingQuestion = updateCurrentQuestion;
    },
  },
});

export { reducer as questionReducer, actions as questionActions };
