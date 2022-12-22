import { useDispatch, useSelector } from 'react-redux';
import { QuestionWithUniqueOption } from '../database/data';
import { Dispatch, useEffect } from 'react';
import { questionActions } from '../store/questions';

interface QuestionListProps {
  questions: Array<QuestionWithUniqueOption>;
}

const Questions = ({ questions }: QuestionListProps) => {
  const dispatch =
    useDispatch<Dispatch<ReturnType<typeof questionActions.startQuiz>>>();

  useEffect(() => {
    dispatch(questionActions.startQuiz(questions));
  }, []);

  const { currentAttendingQuestion, trace } = useSelector(
    (state) => (state as GlobalStoreState).questions
  );

  const questionObject = currentAttendingQuestion || questions[trace];
  const { id: questionId, question, options: questionOption } = questionObject;

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
