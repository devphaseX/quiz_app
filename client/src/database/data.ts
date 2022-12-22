import { read } from 'fs';

interface Question {
  id: string | number;
  question: string;
}

interface QuestionWithOption extends Question {
  options: Array<string>;
}

interface UniqueAnswer {
  id: string;
  value: string;
}

interface QuestionWithUniqueOption extends Question {
  options: Array<UniqueAnswer>;
  readonly _unique: true;
}

function makeQuestionUnique(
  questions: Array<QuestionWithOption>
): Array<QuestionWithUniqueOption> {
  function createUnqiqueQuestion(
    question: QuestionWithOption
  ): QuestionWithUniqueOption {
    const uniqueOption = new Set(
      question.options.map((op) => op.toLowerCase())
    );

    return {
      ...question,
      options: [...uniqueOption].map((option) => ({
        id: Math.random().toString(32).slice(2),
        value: option,
      })),
      _unique: true,
    };
  }

  return questions.map((question) =>
    (question as any).__unique === true
      ? (question as unknown as QuestionWithUniqueOption)
      : createUnqiqueQuestion(question)
  );
}

const optionableQuestion: Array<QuestionWithOption> = [
  {
    id: 1,
    question: 'Javascript is an _______ language',
    options: ['Object-Oriented', 'Object-Based', 'Procedural'],
  },
  {
    id: 2,
    question:
      'Following methods can be used to display data in some form using Javascript',
    options: ['document.write()', 'console.log()', 'window.alert()'],
  },
  {
    id: 3,
    question:
      'When an operator value is NULL, the typeof returned by the unary operator is:',
    options: ['Boolean', 'Undefined', 'Object'],
  },
  {
    id: 4,
    question: 'What does the toString() method return?',
    options: ['Return Object', 'Return String', 'Return Integer'],
  },
  {
    id: 5,
    question:
      'Which function is used to serialize an object into a JSON string?',
    options: ['stringify()', 'parse()', 'convert()'],
  },
];

export { optionableQuestion, makeQuestionUnique };
export type {
  Question,
  QuestionWithOption,
  QuestionWithUniqueOption,
  UniqueAnswer,
};
