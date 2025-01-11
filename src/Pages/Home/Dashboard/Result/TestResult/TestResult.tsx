import "./TestResult.css"; // Import CSS for styles
import profilePic from "../../../../../assets/profile.svg"; // Example profile /
import studentPic from "../../../../../assets/studentImage.png"; // Example student pic
// import Navbar2 from "../../../../../Components/ui/Navbar/Navbar2";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../State/Store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { fetchTestResults } from "../../../../../State/TestResultSlice";
// import Footer from "../../../../../Components/ui/Footer/Footer";

const TestResult = () => {
  const dispatch = useDispatch<AppDispatch>();
  //Access user from local storage
  const storedUser = localStorage.getItem("user");
  const user: any = storedUser !== null ? JSON.parse(storedUser) : null;

  // Getting the testID and questionsArray from Redux store
  const questionsArray = useSelector(
    (state: RootState) => state.testQuestions.data
  );
  const testSectionId = questionsArray?.test_session_id;

  //getting the testresults data from redux store
  const testResult = useSelector((state: RootState) => state.testResult.data);
  const loading = useSelector((state: RootState) => state.testResult.loading);
  const error = useSelector((state: RootState) => state.testResult.error);

  //start time
  const startTime = testResult?.start_time;
  //end time
  const endTime = testResult?.end_time;
  //subjects from test result
  const subjects = testResult?.subjects;

  const testScores = testResult?.scores_by_subject;

  //function to get totalScore
  const getTotalScore = () => {
    const score1: any = testScores && testScores[subjects[0]].score;
    const score2 = testScores && testScores[subjects[1]].score;
    const score3 = testScores && testScores[subjects[2]].score;
    const score4 = testScores && testScores[subjects[3]].score;
    return score1 + score2 + score3 + score4;
  };
  const totalScore = getTotalScore();
  // Utility function to calculate and format the duration
  const calculateDuration = (startTime: string, endTime: string) => {
    // Parse the ISO timestamps into Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Calculate the difference in milliseconds
    const durationMs = end.getTime() - start.getTime();

    if (durationMs < 0) {
      return "Invalid time range";
    }

    // Convert the duration to hours, minutes, and seconds
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // // Calculate the duration
  const duration = calculateDuration(startTime, endTime);


  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { hour12: false }); // 24-hour format
  };

  const time = formatTime(startTime);
  const navigate = useNavigate();
  useEffect(() => {
    // Push a dummy state to the history stack
    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      // Redirect to a specific page
      navigate("/dashboard", { replace: true });
    };

    const onPopState = (_event: PopStateEvent) => {
      // Intercept the back button behavior
      handleBackButton();
    };

    // Add event listener for popstate
    window.addEventListener("popstate", onPopState);

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("popstate", onPopState);
    };
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchTestResults(testSectionId));
  }, []);
  return (
    <div className="result-page">
      <div className="back-arrow" onClick={() => navigate("/dashboard")}>
        <FaArrowLeft className="arrow-icon" />
        <span>Back to Dashboard</span>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : !loading && error ? (
        <h2>Something went wrong, check internet connection.</h2>
      ) : (
        <>
          <div className="content">
            <div className="left-section">
              <img src={studentPic} alt="Student" className="student-pic" />
            </div>

            <div className="right-section">
              <div className="resultflow">
                <div className="result-card">
                  <h2>TEST RESULT</h2>
                  <div className="user-info">
                    <div className="info-text">
                      <p>
                        <b>Name:</b> {user.full_name}
                      </p>
                      <p>{/* <b>Date:</b> {date} */}</p>
                      <p>
                        <b>Time:</b> {time}
                      </p>
                    </div>
                    <div className="profile-pic">
                      <img src={profilePic} alt="Profile" />
                    </div>
                  </div>

                  <table className="result-table">
                    <thead>
                      <tr>
                        <th>Subjects</th>
                        <th>Duration</th>
                        <th>Scores</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="upperCase">
                          {subjects ? subjects[0] : null}
                        </td>
                        <td></td>
                        {testScores &&
                          Math.ceil(testScores[subjects[0]].score * 100) / 100}
                      </tr>
                      <tr></tr>

                      <tr>
                        <td className="upperCase">
                          {subjects ? subjects[1] : null}
                        </td>

                        <td></td>
                        {testScores &&
                          Math.ceil(testScores[subjects[1]].score * 100) / 100}
                      </tr>
                      <tr>
                        <td className="upperCase">
                          {subjects ? subjects[2] : null}
                        </td>

                        <td></td>
                        {testScores &&
                          Math.ceil(testScores[subjects[2]].score * 100) / 100}
                      </tr>
                      <tr>
                        <td className="upperCase">
                          {subjects ? subjects[3] : null}
                        </td>

                        <td></td>
                        <td>
                          {testScores &&
                            Math.ceil(testScores[subjects[3]].score * 100) /
                              100}
                        </td>
                      </tr>
                      <tr className="total-score">
                        <td>Total</td>
                        <td>{duration}</td>
                        <td>{Math.ceil(totalScore * 100) / 100}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="botf">
                  <Link to="/CorrectionPage">Corrections</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <Footer></Footer> */}
    </div>
  );
};

export default TestResult;
