import { useMemo } from 'react';
import { makeQuestionUnique, optionableQuestion } from '../database/data';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';

const questionsWithUniqueOptions = makeQuestionUnique(optionableQuestion);

const Questions = () => {
  const currentAttendingQuestion = useMemo(
    () => questionsWithUniqueOptions[0],
    []
  );

  const _question = useSelector<GlobalStoreState>(
    (state) => state.questions.currentAttendingQuestion
  );

  if (!_question) {
    return null;
  }

  const {
    id: questionId,
    question,
    options: questionOption,
  } = currentAttendingQuestion;

  const onSelectOption = (answerId: string) => () => {
    console.log(
      `For the question: ${question}. I selected the option ${
        questionOption.find((p) => p.id === answerId)?.value
      }`
    );
  };

  return (
    <div className="container">
      <h1>{question}</h1>
      <ul id={questionId.toString()}>
        {questionOption.map((option, index) => (
          <li key={option.id}>
            <input
              type="radio"
              name="options"
              id={`q${index}-option`}
              onChange={onSelectOption(option.id)}
            />
            <label className="text-primary" htmlFor={`q${index}-option`}>
              {option.value}
            </label>
            <div className="check"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Questions };
