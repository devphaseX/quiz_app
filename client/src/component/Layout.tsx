import { Outlet } from 'react-router-dom';

const Layouts = () => (
  <div className="container">
    <h1 className="title text-light">Quiz Application</h1>
    <Outlet></Outlet>
  </div>
);

export default Layouts;
