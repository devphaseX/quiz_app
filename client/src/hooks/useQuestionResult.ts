import { useSelector } from 'react-redux';
import {
  QuestionWithoutChoosenAnswer,
  type QuestionWithChoosenAnswer,
} from '../data/type';

const useQuestionResult = () => {
  return useSelector(
    ({
      questions: { questionQueue },
      result: { userId },
    }: GlobalStoreState) => {
      const anweredQuestions: Array<QuestionWithChoosenAnswer> = [];
      const leftoutQuestions: Array<QuestionWithoutChoosenAnswer> = [];

      questionQueue.forEach((question) => {
        if (question.answer) {
          anweredQuestions.push({ ...question });
        } else {
          leftoutQuestions.push(question);
        }
      });

      const attempted = anweredQuestions.length;

      return {
        userInfo: { id: userId, username: userId },
        __raw: {
          questions: questionQueue,
        },
        intrepreted: {
          anweredQuestions,
          attempted,
          leftoutQuestions,
        },
      };
    }
  );
};

export { useQuestionResult };
