import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { Main } from './pages/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  { path: '/quiz', element: <Quiz /> },
  { path: '/result', element: <Result /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
