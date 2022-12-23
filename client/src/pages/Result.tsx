import { Link } from 'react-router-dom';
import '../styles/Result.css';

const Result = () => {
  const onClick = () => {
    console.log('on restart');
  };
  return (
    <div>
      <div className="result flex-content">
        <div className="flex">
          <span>Username</span>
          <span className="bold">Daily Tuition</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points : </span>
          <span className="bold">50</span>
        </div>
        <div className="flex">
          <span>Total Question : </span>
          <span className="bold">05</span>
        </div>
        <div className="flex">
          <span>Total Attempt : </span>
          <span className="bold">03</span>
        </div>
        <div className="flex">
          <span>Total Earn Point : </span>
          <span className="bold">30</span>
        </div>

        <div className="flex">
          <span>Quiz Result</span>
          <span className="bold">Passed</span>
        </div>
      </div>
      <div className="start">
        <Link className="btn" to="/" onClick={onClick}>
          Restart
        </Link>
      </div>
    </div>
  );
};

export { Result };
