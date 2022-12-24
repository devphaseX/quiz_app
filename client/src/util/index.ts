import {
  AnsweredQuiz,
  QuestionWithChoosenAnswer,
  QuestionWithoutChoosenAnswer,
} from '../data/type';
import { AttemptableQuestion } from '../store/questions';

interface ExternalFulfilPromise<R> {
  resolve: (result: R) => void;
  reject: (reason: unknown) => void;
  promise: Promise<R>;
}

function getExternalFulfillPromise<R = unknown>(): ExternalFulfilPromise<R> {
  let res!: (result: R) => void;
  let rej!: (reason: unknown) => void;
  const promise = new Promise<R>((_res, _rej) => {
    res = _res;
    rej = _rej;
  });

  return { resolve: res, reject: rej, promise };
}

const delayResolve = <T>(ms: number, value: T | (() => Promise<T>)) => {
  const { promise, resolve, reject } = getExternalFulfillPromise<T>();
  setTimeout(() => {
    try {
      let result = typeof value === 'function' ? (value as Function)() : value;
      resolve(result);
    } catch (e) {
      reject(e);
    }
  }, ms);
  return promise;
};

const nanoid = () => Math.random().toString(32).slice(2);

const calculatePoint = (
  point: number,
  option: {
    attemptedQuestion: Array<QuestionWithChoosenAnswer>;
    quizAnswer: AnsweredQuiz['answers'];
  }
) => {
  const { attemptedQuestion, quizAnswer } = option;

  return attemptedQuestion.reduce(
    (score, question) =>
      quizAnswer[question.id] === question.answer.id ? score + point : score,
    0
  );
};

const getFlagStatus = (earnedPoint: number, totalPoints: number) => {
  return earnedPoint < (totalPoints * 50) / 100 ? 'failed' : 'passed';
};

function sortQuestion(
  questions: AttemptableQuestion[],
  option: { userId: string }
) {
  const anweredQuestions: Array<QuestionWithChoosenAnswer> = [];
  const leftoutQuestions: Array<QuestionWithoutChoosenAnswer> = [];

  questions.forEach((question) => {
    if (question.answer) {
      anweredQuestions.push({ ...question });
    } else {
      leftoutQuestions.push(question);
    }
  });

  const attempted = anweredQuestions.length;

  return {
    userInfo: { id: option.userId, username: option.userId },
    __raw: {
      questions,
    },
    intrepreted: {
      anweredQuestions,
      attempted,
      leftoutQuestions,
    },
  };
}

export type { ExternalFulfilPromise };
export {
  getExternalFulfillPromise,
  delayResolve,
  nanoid,
  calculatePoint,
  getFlagStatus,
  sortQuestion,
};
