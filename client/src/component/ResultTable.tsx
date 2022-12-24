type ResultRow = [
  username: string,
  attemptedNo: number,
  earnedPoint: number,
  status: 'passed' | 'failed'
];

const ResultTable = ({
  result: [username, attemptedNo, earnedPoint, status],
}: {
  result: ResultRow;
}) => (
  <div className="container">
    <table>
      <thead className="table-header">
        <tr className="table-row">
          <td>Name</td>
          <td>Attempts</td>
          <td>Earn Points</td>
          <td>Result</td>
        </tr>
      </thead>
      <tbody>
        <tr className="table-body">
          <td>{username}</td>
          <td>{attemptedNo}</td>
          <td>{earnedPoint}</td>
          <td>{status}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export type { ResultRow };

export { ResultTable };
