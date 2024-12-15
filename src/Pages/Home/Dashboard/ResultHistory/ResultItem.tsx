import React, { useRef } from "react";
import ResultsTable from "./Resulttable";
import "./ResultItem.css";
import cal from "../../../../assets/cal.png";
import tim from "../../../../assets/time.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ResultItemProps {
  test_timestamp: string;
  subject: string;
  test_speed: string;
  test_score: number;
  stats: {
    avgTimePerQuestion: string;
    totalHourSpent: string;
  };
}

const ResultItem: React.FC<ResultItemProps> = ({
  test_timestamp,
  subject,
  test_speed,
  test_score,
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
  const dateTimeString = test_timestamp;

  // Convert the string to a Date object
  const dateObj = new Date(dateTimeString.replace(" ", "T")); // Replace space with 'T' for ISO compliance

  // Extract and format the date
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Extract and format the time
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  console.log("Date:", formattedDate); // Example: "December 15, 2024"
  console.log("Time:", formattedTime);
  return (
    <>
      <div className="result-item" ref={resultRef}>
        <div className="left-section">
          <div className="date-time-box">
            <div className="calen">
              <img src={cal} alt="calendar icon" /> {formattedDate}
            </div>
            <div className="calen">
              <img src={tim} alt="time icon" /> {formattedTime}
            </div>
          </div>
          <button className="download-btn" onClick={handleDownload}>
            Download
          </button>
        </div>

        <div className="middle-section">
          <ResultsTable
            subject={subject}
            totalTime={test_speed}
            totalScore={test_score}
          />
        </div>

        <div className="right-section">
          <div className="stats-box">
            <div>
              {/* <b>Average Time Per Question:</b> {stats.avgTimePerQuestion} */}
            </div>
            <div>
              <b>Total Time Spent:</b> {test_speed}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultItem;
