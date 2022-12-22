const Quiz = () => {
  const onRequestPreviousQuiz = () => {};
  const onRequestNextQuiz = () => {};

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <div className="grid">
        <button type="button" onClick={onRequestPreviousQuiz}>
          Prev
        </button>
        <button type="button" onClick={onRequestNextQuiz}>
          Prev
        </button>
      </div>
    </div>
  );
};

export { Quiz };
