import React, { useRef } from "react";
import ResultsTable from "./Resulttable";
import "./ResultItem.css";
import cal from "../../../../assets/cal.png";
import tim from "../../../../assets/time.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ResultItemProps {
  timestamp: string;
  results: any[];
  test_speed: string;
  test_score: number;
  stats: {
    avgTimePerQuestion: string;
    totalHourSpent: string;
  };
}

const ResultItem: React.FC<ResultItemProps> = ({ timestamp, results }) => {
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Calculate the total test_score
  const totalTestScore = results.reduce(
    (sum, item) => sum + item.test_score,
    0
  );

  // Helper function to add two "mm:ss" formatted times
  const addSpeeds = (speeds: string[]): string => {
    let totalMinutes = 0;
    let totalSeconds = 0;

    speeds.forEach((speed) => {
      const [minutes, seconds] = speed
        .split("m")
        .map((part) => parseFloat(part.replace("s", "").trim()));
      totalMinutes += minutes;
      totalSeconds += seconds;
    });

    // Add extra minutes from total seconds exceeding 60
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;

    return `${totalMinutes}m ${totalSeconds.toFixed(2)}s`;
  };

  // Extract test_speed values and calculate total
  const totalTestSpeed = addSpeeds(results.map((item) => item.test_speed));
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
  const dateTimeString = timestamp;

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

  // console.log("Date:", formattedDate); // Example: "December 15, 2024"
  // console.log("Time:", formattedTime);
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
            results={results}
            totalTime={totalTestSpeed}
            totalScore={totalTestScore}
          />
        </div>

        <div className="right-section">
          <div className="stats-box">
            <div>{/* <b>Average Time Per Question:</b> {} */}</div>
            <div>
              <b>Total Time Spent:</b> {totalTestSpeed}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultItem;
