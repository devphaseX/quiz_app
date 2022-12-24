interface QuizData {
  _id: string;
  questions: Array<QuestionWithUniqueOption>;
}

type AnswerStoreObject = { [questionId in string]?: string };
interface AnsweredQuiz extends QuizData {
  answers: AnswerStoreObject;
}

interface Question {
  id: string | number;
  question: string;
}

type QuestionWithUniqueOption = Question & {
  options: Array<UniqueAnswer>;
};

type QuestionWithChoosenAnswer = QuestionWithUniqueOption & {
  answer: UniqueAnswer;
};

type QuestionWithoutChoosenAnswer = QuestionWithUniqueOption;
interface UniqueAnswer {
  id: string;
  value: string;
}

export type {
  Question,
  QuestionWithUniqueOption,
  UniqueAnswer,
  QuestionWithChoosenAnswer,
  QuestionWithoutChoosenAnswer,
  QuizData,
  AnsweredQuiz,
  AnswerStoreObject,
};
