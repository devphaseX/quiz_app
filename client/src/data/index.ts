import { AnsweredQuiz, QuizData } from './type';

function cleanPath(path: string) {
  return path.replace(/(?<!http[s]?:)\B[/]{2,}/, '/');
}

function getAvailableQuiz() {
  return fetch('http://localhost:5050/api/questions')
    .then((res) => res.json())
    .then<Array<QuizData>>((data) => {
      if (data.status === 'sucess') return data.data;
      throw data.error;
    });
}

function getQuizAnswer(quizId: string) {
  return fetch(`http://localhost:5050/api/questions/answer/${quizId}`)
    .then((res) => res.json())
    .then<AnsweredQuiz | null>((data) => {
      console.log({ result: data.data });
      if (data.status === 'success') return data.data;
      throw data.error;
    });
}

function storeUserResult(quizResult: any) {
  return fetch(`http://localhost:5050/api/results`, {
    method: 'POST',
    body: JSON.stringify(quizResult),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { getAvailableQuiz, getQuizAnswer, storeUserResult };
