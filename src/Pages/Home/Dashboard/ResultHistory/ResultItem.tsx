import React, { useRef } from "react";
import ResultsTable from "./Resulttable";
import "./ResultItem.css";
import cal from "../../../../assets/cal.png";
import tim from "../../../../assets/time.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ResultItemProps {
  date: string;
  time: string;
  subjects: { name: string; duration: string; score: number }[];
  totalTime: string;
  totalScore: number;
  stats: {
    avgTimePerQuestion: string;
    totalHourSpent: string;
  };
}

const ResultItem: React.FC<ResultItemProps> = ({
  date,
  time,
  subjects,
  totalTime,
  totalScore,
  stats,
}) => {
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    const input = resultRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

       
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });

        
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        
        pdf.save("result.pdf");
      });
    }
  }; 

  return (
    <>
      <div className="result-item" ref={resultRef}>
        <div className="left-section">
          <div className="date-time-box">
            <div className="calen">
              <img src={cal} alt="calendar icon" /> {date}
            </div>
            <div className="calen">
              <img src={tim} alt="time icon" /> {time}
            </div>
          </div>
          <button className="download-btn" onClick={handleDownload}>
            Download
          </button>
        </div>

        <div className="middle-section">
          <ResultsTable
            subjects={subjects}
            totalTime={totalTime}
            totalScore={totalScore}
          />
        </div>

        <div className="right-section">
          <div className="stats-box">
            <div>
              <b>Average Time Per Question:</b> {stats.avgTimePerQuestion}
            </div>
            <div>
              <b>Total Time Spent:</b> {stats.totalHourSpent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultItem;
