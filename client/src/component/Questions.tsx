import { useDispatch, useSelector } from 'react-redux';
import { QuestionWithUniqueOption } from '../database/data';
import { useEffect } from 'react';
import { questionActions } from '../store/questions';

interface QuestionListProps {
  questions: Array<QuestionWithUniqueOption>;
}

const Questions = ({ questions }: QuestionListProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(questionActions.startQuiz(questions));
  }, []);

  const { currentAttendingQuestion, trace } = useSelector(
    (state) => (state as GlobalStoreState).questions
  );

  const questionObject = currentAttendingQuestion || questions[trace];
  const { id: questionId, question, options: questionOption } = questionObject;

  return (
    <div>
      <h1>{question}</h1>
      <ul id={questionId.toString()}>
        {questionOption.map((option, index) => (
          <li key={option.id}>
            <input
              type="radio"
              name="options"
              id={`q${index}-option`}
              onChange={() => dispatch(questionActions.setAnswer(option.id))}
              checked={currentAttendingQuestion?.answer?.id === option.id}
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
