import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { quizLoader } from './pages/Quiz';
import { Result, answersLoader } from './pages/Result';
import { Main, startQuizAction } from './pages/Main';
import './styles/App.css';
import Layouts from './component/Layout';
import { AuthRoute } from './component/AuthRoute';
import { Quiz } from './pages/Quiz';

const router = createBrowserRouter([
  {
    element: <Layouts />,
    children: [
      {
        path: '/',
        element: <Main />,
        action: startQuizAction,
      },
      {
        path: '/quiz',
        element: (
          <AuthRoute option={{ to: '/', replace: true }}>
            <Quiz />
          </AuthRoute>
        ),
        loader: quizLoader,
      },
      {
        path: '/result',
        element: (
          <AuthRoute option={{ to: '/', replace: true }}>
            <Result />
          </AuthRoute>
        ),
        loader: answersLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
