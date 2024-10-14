import React from 'react';
import './Resulttable.css'; 

interface ResultsTableProps {
  subjects: { name: string; duration: string; score: number }[];
  totalTime: string;
  totalScore: number;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ subjects, totalTime, totalScore }) => {
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
        {subjects.map((subject, index) => (
          <tr key={index}>
            <td>{subject.name}</td>
            <td>{subject.duration}</td>
            <td>{subject.score}</td>
          </tr>
        ))}
        <tr>
          <td><b>Total</b></td>
          <td>{totalTime}</td>
          <td>{totalScore}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ResultsTable;
