import { ActionFunction, Form, redirect } from 'react-router-dom';
import '../styles/Main.css';
import { store } from '../store';
import { getExternalFulfillPromise } from '../util';
import { resultActions } from '../store/result';

const INPUT_FORM_NAME = 'username';

const Main = () => {
  return (
    <div>
      <ol>
        <li>You will be asked 10 questions one after another</li>
        <li>10 points is awarded for the correct answer</li>
        <li>
          Each question has three options. You can choose only one options.
        </li>
        <li>You can review and chnage answers before the quiz finish</li>
        <li>The result will be declared at the end of the quiz</li>
      </ol>
      <Form method="post" action="/" id="form">
        <input
          type="text"
          className="userid"
          placeholder="Username*"
          name={INPUT_FORM_NAME}
        />
        <div className="start">
          <button type="submit" className="btn">
            Start game
          </button>
        </div>
      </Form>
    </div>
  );
};

const startQuizAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get(INPUT_FORM_NAME) as string;

  const { promise, resolve } = getExternalFulfillPromise<void>();

  const unsubscribe = store.subscribe(() => {
    if (store.getState().result.userId !== username) return;
    resolve();
  });
  store.dispatch(resultActions.setUserId({ userId: username }));

  await promise.then(() => unsubscribe());
  return redirect('/quiz');
};

export { Main, startQuizAction };
