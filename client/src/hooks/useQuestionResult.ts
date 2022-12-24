import { useSelector } from 'react-redux';
import { sortQuestion } from '../util';

const useQuestionResult = () => {
  return useSelector(
    ({ questions: { questionQueue }, result: { userId } }: GlobalStoreState) =>
      sortQuestion(questionQueue, { userId: userId! })
  );
};

export { useQuestionResult };
