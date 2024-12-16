import React from "react";
import "./Resulttable.css";

interface ResultsTableProps {
  subject: string;
  totalTime: string;
  totalScore: number;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  subject,
  totalTime,
  totalScore,
}) => {
  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Subjects</th>
          <th>Duration</th>
          <th>Scores</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{subject}</td>
          {/* <td>{subject.}</td>
            <td>{subject.score}</td> */}
        </tr>

        <tr>
          <td>
            <b>Total</b>
          </td>
          <td>{totalTime}</td>
          <td>{totalScore}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ResultsTable;
