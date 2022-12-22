import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Quiz, quizLoader } from './pages/Quiz';
import { Result } from './pages/Result';
import { Main, startQuizAction } from './pages/Main';
import './styles/App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    action: startQuizAction,
  },
  { path: '/quiz', element: <Quiz />, loader: quizLoader },
  { path: '/result', element: <Result /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
