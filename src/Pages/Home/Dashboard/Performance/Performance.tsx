import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import "./Performance.css";
// import Navbar2 from "../../../../Components/ui/Navbar/Navbar2";

// Register chart components for Bar and Line charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Define the data structure for both Bar and Line charts
const timeData = {
  labels: [
    "Jan Test 1",
    "Jan Test 2",
    "Feb Test 1",
    "Feb Test 2",
    "Mar Test 1",
    "Mar Test 2",
    "Apr Test 1",
    "Apr Test 2",
    "May Test 1",
    "May Test 2",
    "Jun Test 1",
    "Jun Test 2",
    "Jul Test 1",
    "Jul Test 2",
    "Aug Test 1",
    "Aug Test 2",
    "Sep Test 1",
    "Sep Test 2",
    "Oct Test 1",
    "Oct Test 2",
    "Nov Test 1",
    "Nov Test 2",
    "Dec Test 1",
    "Dec Test 2",
  ],
  datasets: [
    {
      label: "Use of English",
      data: [
        65, 70, 75, 80, 70, 85, 75, 90, 85, 88, 90, 93, 85, 92, 88, 94, 90, 95,
        93, 96, 95, 97, 94, 98,
      ],
      backgroundColor: "rgba(6, 89, 166, 0.8)",
      borderColor: "rgba(6, 89, 166, 1)",
      borderWidth: 2,
    },
    {
      label: "Mathematics",
      data: [
        60, 70, 68, 75, 70, 85, 75, 90, 80, 88, 85, 91, 90, 92, 88, 94, 90, 95,
        92, 97, 93, 98, 95, 99,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.8)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    },
    {
      label: "Physics",
      data: [
        55, 60, 62, 68, 65, 78, 68, 80, 72, 83, 75, 85, 80, 85, 85, 89, 87, 90,
        88, 91, 89, 92, 91, 94,
      ],
      backgroundColor: "rgba(54, 162, 235, 0.8)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
    },
    {
      label: "Chemistry",
      data: [
        58, 62, 65, 70, 68, 75, 70, 80, 72, 83, 75, 85, 80, 85, 82, 87, 85, 88,
        87, 90, 89, 92, 90, 93,
      ],
      backgroundColor: "rgba(255, 205, 86, 0.8)",
      borderColor: "rgba(255, 205, 86, 1)",
      borderWidth: 2,
    },
  ],
};

// Component for rendering the performance bar and line charts
const Performance: React.FC = () => {
  return (
    <>
      {/* <Navbar2 /> */}
      <div className="performance-analysis">
        <h2>Performance Analysis</h2>

        {/* Bar Chart for Performance Over Time */}
        <div className="chart-container">
          <h3>Performance Over Time (Bar Chart)</h3>
          <Bar
            data={timeData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Months and Test Instances",
                    color: "#0659a6",
                    font: {
                      weight: "bold",
                      size: 18,
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Score",
                    color: "#0659a6",
                    font: {
                      weight: "bold",
                      size: 18,
                    },
                  },
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 20,
                  },
                },
              },
            }}
          />
        </div>

        {/* Line Chart for Performance Over Time */}
        <div className="chart-container">
          <h3>Performance Over Time (Line Chart)</h3>
          <Line
            data={timeData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Months and Test Instances",
                    color: "#0659a6",
                    font: {
                      weight: "bold",
                      size: 18,
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Score",
                    color: "#0659a6",
                    font: {
                      weight: "bold",
                      size: 18,
                    },
                  },
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 20,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Performance;
