import { Questions } from '../component/Questions';

const Quiz = () => {
  const onRequestPreviousQuiz = () => {};
  const onRequestNextQuiz = () => {};

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <Questions />
      <div className="grid">
        <button
          type="button"
          onClick={onRequestPreviousQuiz}
          className="btn prev"
        >
          Prev
        </button>
        <button type="button" onClick={onRequestNextQuiz} className="btn next">
          Prev
        </button>
      </div>
    </div>
  );
};

export { Quiz };
