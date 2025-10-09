import React, { useEffect } from "react";
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
import { AppDispatch, RootState } from "../../../../State/Store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAnalysis } from "../../../../State/AnalysisSlice";
import { fetchResultHstory } from "../../../../State/ResultHistorySlice";
import Sidebar from "../../../../Components/Sidebar";
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

// Component for rendering the performance bar and line charts
const Performance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const analysis = useSelector(
    (state: RootState) => state.analysis?.data?.subjects
  );
  const resultsHistory = useSelector(
    (state: RootState) => state.resultHistory?.data?.test_sessions
  );
  const subject1Score =
    analysis &&
    analysis[0]?.results.map((result: any) => {
      return result.test_score;
    });
  const subject2Score =
    analysis &&
    analysis[1]?.results.map((result: any) => {
      return result.test_score;
    });
  const subject3Score =
    analysis &&
    analysis[2]?.results.map((result: any) => {
      return result.test_score;
    });
  const subject4Score =
    analysis &&
    analysis[3]?.results.map((result: any) => {
      return result.test_score;
    });
  // console.log(analysis);

  const date = resultsHistory?.map((item: any) => {
    // Convert the string to a Date object
    const dateObj = new Date(item.timestamp.replace(" ", "T")); // Replace space with 'T' for ISO compliance
    // Extract and format the date
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  });

  const loading = useSelector(
    (state: RootState) => state.resultHistory.loading
  );
  const error = useSelector((state: RootState) => state.resultHistory.error);
  const analysisLoading = useSelector(
    (state: RootState) => state.analysis.loading
  );
  const analysisError = useSelector((state: RootState) => state.analysis.error);
  useEffect(() => {
    dispatch(fetchAnalysis());
    dispatch(fetchResultHstory());
  }, []);
  // Define the data structure for both Bar and Line charts
  const timeData = {
    labels: date,

    datasets: [
      {
        label: analysis && analysis[0]?.subject,
        data: subject1Score,
        backgroundColor: "rgba(6, 89, 166, 0.8)",
        borderColor: "rgba(6, 89, 166, 1)",
        borderWidth: 2,
      },
      {
        label: analysis && analysis[1]?.subject,
        data: subject2Score,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
      {
        label: analysis && analysis[2]?.subject,
        data: subject3Score,
        backgroundColor: "rgba(77, 250, 43, 0.8)",
        borderColor: "rgb(59, 155, 30)",
        borderWidth: 2,
      },
      {
        label: analysis && analysis[3]?.subject,
        data: subject4Score,
        backgroundColor: "rgba(255, 205, 86, 0.8)",
        borderColor: "rgba(255, 205, 86, 1)",
        borderWidth: 2,
      },
    ],
  };

  if (analysis?.length === 0 && resultsHistory?.length === 0) {
    return (
      <div className="performance-">
        <h2>No analysis for you yet, try taking a test session</h2>
      </div>
    );
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="performance-analysis w-full max-h-screen overflow-y-scroll">
        {loading && analysisLoading ? (
          <h2>Loading...</h2>
        ) : !loading && !analysisLoading && error && analysisError ? (
          <h2>Something went wrong, check internet connection</h2>
        ) : (
          <>
            <div className="perform">
              <span
                className="back-arrow"
                onClick={() => window.history.back()}>
                ←
              </span>
              <h2>Performance Analysis</h2>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Performance;
