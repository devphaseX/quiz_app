const nanoid = () => Math.random().toString(32).slice(2);

interface Quiz {
  _id: string;
  questions: Array<QuestionWithUniqueOption>;
}

interface Question {
  id: string | number;
  question: string;
}

interface QuestionWithChoosenAnswer extends QuestionWithUniqueOption {
  answer: UniqueAnswer;
}

type QuestionWithoutChoosenAnswer = QuestionWithUniqueOption;
interface UniqueAnswer {
  id: string;
  value: string;
}

interface QuestionWithUniqueOption extends Question {
  options: Array<UniqueAnswer>;
}

const answerIdCache = new Map<string, string>();
const disableCache = false;

function getQuestionCacheOptions(
  question: Question,
  options: QuestionWithUniqueOption['options']
) {
  const _cacheOptionsString = answerIdCache.get(question.id.toString());
  const _options = _cacheOptionsString
    ? (JSON.parse(_cacheOptionsString) as typeof options)
    : options;

  if (!_cacheOptionsString && !disableCache) {
    answerIdCache.set(question.id.toString(), JSON.stringify(_options));
  }

  return { ...question, options: _options };
}

const getQuestions = (): Array<QuestionWithUniqueOption> => [
  getQuestionCacheOptions(
    {
      id: 1,
      question: 'Javascript is an _______ language',
    },
    [
      { id: nanoid(), value: 'Object-Oriented' },
      { id: nanoid(), value: 'Object-Based' },
      { id: nanoid(), value: 'Procedural' },
    ]
  ),
  getQuestionCacheOptions(
    {
      id: 2,
      question:
        'Following methods can be used to display data in some form using Javascript',
    },
    [
      { id: nanoid(), value: 'document.write()' },
      { id: nanoid(), value: 'console.log()' },
      { id: nanoid(), value: 'window.alert()' },
    ]
  ),
  getQuestionCacheOptions(
    {
      id: 3,
      question:
        'When an operator value is NULL, the typeof returned by the unary operator is:',
    },
    [
      { id: nanoid(), value: 'Boolean' },
      { id: nanoid(), value: 'Undefined' },
      { id: nanoid(), value: 'Object' },
    ]
  ),
  getQuestionCacheOptions(
    {
      id: 4,
      question: 'What does the toString() method return?',
    },
    [
      { id: nanoid(), value: 'Return Object' },
      { id: nanoid(), value: 'Return String' },
      { id: nanoid(), value: 'Return Integer' },
    ]
  ),
  getQuestionCacheOptions(
    {
      id: 5,
      question:
        'Which function is used to serialize an object into a JSON string?',
    },
    [
      { id: nanoid(), value: 'stringify()' },
      { id: nanoid(), value: 'parse()' },
      { id: nanoid(), value: 'convert()' },
    ]
  ),
];
const getAnswersId = () => {
  const answerQuestionsToAnswerId = { '1': 1, '2': 2, '3': 3, '4': 2, '5': 1 };
  const questionAnswerMap = {} as Record<string, string>;

  getQuestions().forEach((question) => {
    const answerPosition = answerQuestionsToAnswerId[
      question.id as keyof typeof answerQuestionsToAnswerId
    ] as number | undefined;

    if (!answerPosition) return '[%empty%]';

    questionAnswerMap[question.id] = question.options[answerPosition - 1]!.id;
  });

  return questionAnswerMap;
};

export { getQuestions, getAnswersId };
export type {
  Question,
  QuestionWithUniqueOption,
  UniqueAnswer,
  QuestionWithChoosenAnswer,
  QuestionWithoutChoosenAnswer,
  Quiz,
};
