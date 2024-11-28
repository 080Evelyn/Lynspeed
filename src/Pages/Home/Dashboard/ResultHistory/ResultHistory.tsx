import React from "react";

import ResultItem from "./ResultItem";
import "./ResultHistory.css"; // General app styles
// import Navbar2 from "../../../../Components/ui/Navbar/Navbar2";

const ResultHistory: React.FC = () => {
  const resultsData = [
    {
      date: "03 - 10 - 2024",
      time: "05:00 pm",
      subjects: [
        { name: "English Language", duration: "00:40:00", score: 45 },
        { name: "Mathematics", duration: "00:45:00", score: 50 },
        { name: "Physics", duration: "00:40:00", score: 55 },
        { name: "Chemistry", duration: "00:50:30", score: 60 },
      ],
      totalTime: "01:35:30",
      totalScore: 210,
      stats: {
        avgTimePerQuestion: "0:30",
        totalHourSpent: "01:35:30 Hrs",
      },
    },
    // Add more result entries as needed
  ];

  return (
    <>
      {/* <Navbar2 /> */}
      <div className="app">
        <main className="result-history">
          {resultsData.map((result, index) => (
            <ResultItem key={index} {...result} />
          ))}
        </main>
        <main className="result-history">
          {resultsData.map((result, index) => (
            <ResultItem key={index} {...result} />
          ))}
        </main>
        <main className="result-history">
          {resultsData.map((result, index) => (
            <ResultItem key={index} {...result} />
          ))}
        </main>
        <main className="result-history">
          {resultsData.map((result, index) => (
            <ResultItem key={index} {...result} />
          ))}
        </main>
        <main className="result-history">
          {resultsData.map((result, index) => (
            <ResultItem key={index} {...result} />
          ))}
        </main>
        <main className="result-history">
          {resultsData.map((result, index) => (
            <ResultItem key={index} {...result} />
          ))}
        </main>
        <main className="result-history">
          {resultsData.map((result, index) => (
            <ResultItem key={index} {...result} />
          ))}
        </main>
      </div>
    </>
  );
};

export default ResultHistory;
