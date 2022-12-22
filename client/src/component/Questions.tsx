import { useDispatch, useSelector } from 'react-redux';
import { QuestionWithUniqueOption } from '../database/data';
import { Dispatch, useEffect } from 'react';
import { questionActions } from '../store/questions';
import { resultActions } from '../store/result';

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
          <li
            key={option.id}
            onClick={() => {
              dispatch(
                resultActions.setQuestionAnswer({
                  questionId: questionId.toString(),
                  answerId: option.id,
                  position: index,
                  value: option.value,
                })
              );
            }}
          >
            <input
              type="radio"
              name="options"
              id={`q${index}-option`}
              onChange={onSelectOption(option.id)}
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
