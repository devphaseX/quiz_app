import { QuestionWithAnswerSort } from './../pages/Result';
import { useSelector } from 'react-redux';
import { type QuestionWithChoosenAnswer } from '../database/data';

const useQuestionResult = () => {
  return useSelector(
    ({
      questions: { questionQueue },
      result: { result, userId },
    }: GlobalStoreState) => {
      const anweredQuestions: Array<QuestionWithChoosenAnswer> = [];
      const leftoutQuestions: typeof questionQueue = [];

      questionQueue.forEach((question) => {
        const answer = result[question.id];
        if (answer) {
          anweredQuestions.push({ ...question, answer });
        } else {
          leftoutQuestions.push(question);
        }
      });

      const attempted = anweredQuestions.length;

      return {
        userInfo: { id: userId, username: userId },
        __raw: {
          questions: questionQueue,
          result,
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
