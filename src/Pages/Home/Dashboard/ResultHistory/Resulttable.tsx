import React from "react";
import "./Resulttable.css";

interface ResultsTableProps {
  results: any[];
  totalTime: string;
  totalScore: number;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
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
        {results.map((subject, i) => {
          return (
            <tr key={i}>
              <td>{subject.subject}</td>
              <td>{subject.test_speed}</td>
              <td>{subject.test_score}</td>
            </tr>
          );
        })}

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
