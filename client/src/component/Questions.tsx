import { useDispatch, useSelector } from 'react-redux';
import { QuestionWithUniqueOption } from '../database/data';
import { Dispatch, useEffect } from 'react';
import { questionActions } from '../store/questions';
import { ChoosenAnswerAction, resultActions } from '../store/result';

interface QuestionListProps {
  questions: Array<QuestionWithUniqueOption>;
}

type StartQuizAction = ReturnType<typeof questionActions.startQuiz>;
type SetQuestionAnswer = ReturnType<typeof resultActions.setQuestionAnswer>;
type DispatchActionType = StartQuizAction | SetQuestionAnswer;

const Questions = ({ questions }: QuestionListProps) => {
  const dispatch = useDispatch<Dispatch<DispatchActionType>>();

  useEffect(() => {
    dispatch(questionActions.startQuiz(questions));
  }, []);

  const { currentAttendingQuestion, trace } = useSelector(
    (state) => (state as GlobalStoreState).questions
  );

  const questionObject = currentAttendingQuestion || questions[trace];
  const { id: questionId, question, options: questionOption } = questionObject;

  const questionAnswer = useSelector(
    (state: GlobalStoreState) => state.result.result[questionId]
  );
  function onSelectOption({
    questionId,
    answerId,
    position,
    value,
  }: ChoosenAnswerAction['payload']) {
    return () => {
      const action = resultActions.setQuestionAnswer({
        questionId: `${questionId}`,
        answerId: answerId,
        position,
        value,
      });

      dispatch(action);
    };
  }

  return (
    <div className="container">
      <h1>{question}</h1>
      <ul id={questionId.toString()}>
        {questionOption.map((option, index) => (
          <li
            key={option.id}
            onClick={onSelectOption({
              questionId: questionId.toString(),
              answerId: option.id,
              position: index,
              value: option.value,
            })}
          >
            <input
              type="radio"
              name="options"
              id={`q${index}-option`}
              checked={questionAnswer?.id === option.id}
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
