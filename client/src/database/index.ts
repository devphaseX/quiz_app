import { AnsweredQuiz, QuizData } from './data';

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

export { getAvailableQuiz, getQuizAnswer };
