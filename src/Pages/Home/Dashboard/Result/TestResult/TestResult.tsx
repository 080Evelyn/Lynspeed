import "./TestResult.css"; // Import CSS for styles
import profilePic from "../../../../../assets/profile.svg"; // Example profile /
import studentPic from "../../../../../assets/studentImage.png"; // Example student pic
// import Navbar2 from "../../../../../Components/ui/Navbar/Navbar2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../State/Store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTestResults } from "../../../../../State/TestResultSlice";
// import Footer from "../../../../../Components/ui/Footer/Footer";

const TestResult = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector(
    (state: RootState) => state.auth.token.user.full_name
  );

  // Getting the testID and questionsArray from Redux store
  const questionsArray = useSelector(
    (state: RootState) => state.testQuestions.data
  );
  const testSectionId = questionsArray?.test_session_id;
  const questions = questionsArray?.subjects;
  //total questions
  const totalTestQuestions = questions.map((sub: any) => {
    return [sub?.worksheets[0]?.questions.length];
  });

  //getting the names of each subject from questions array
  const name = questions.map((sub: any) => {
    return sub?.name;
  });

  //getting the testresults data from redux store
  const testResult = useSelector((state: RootState) => state.testResult.data);
  const loading = useSelector((state: RootState) => state.testResult.loading);
  const error = useSelector((state: RootState) => state.testResult.error);

  //result object
  const resultObj = testResult?.failed_questions_by_subject;

  //start time
  const startTime = testResult?.start_time;
  //end time
  const endTime = testResult?.end_time;
  //subjects from test result
  const subjects = testResult?.subjects;

  //function to get each subject score
  const getScore = (keyToCheck: any, resultObj: any, totalQuestions: any) => {
    if (!testResult) {
      return;
    }
    const value = resultObj[keyToCheck];

    return totalQuestions - value.length;
  };
  //function to get totalScore
  const getTotalScore = () => {
    const score1: any = getScore(name[0], resultObj, totalTestQuestions[0]);
    const score2 = getScore(name[1], resultObj, totalTestQuestions[1]);
    const score3 = getScore(name[2], resultObj, totalTestQuestions[2]);
    const score4 = getScore(name[3], resultObj, totalTestQuestions[3]);
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

  // const formatDate = (isoString: string): string => {
  //   const date = new Date(isoString);
  //   return new Intl.DateTimeFormat("en-CA", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   }).format(date);
  // };
  // const date = formatDate(startTime);

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { hour12: false }); // 24-hour format
  };

  const time = formatTime(startTime);

  //dispatching fetch result onmount
  useEffect(() => {
    dispatch(fetchTestResults(testSectionId));
  }, []);
  return (
    <div className="result-page">
      {/* <Navbar2 /> */}
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
                        <b>Name:</b> {userName}
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
                        <td>{subjects ? subjects[0] : null}</td>
                        <td></td>
                        <td>
                          {getScore(name[0], resultObj, totalTestQuestions[0])}
                        </td>
                      </tr>
                      <tr></tr>

                      <tr>
                        <td>{subjects ? subjects[1] : null}</td>

                        <td></td>
                        <td>
                          {getScore(name[1], resultObj, totalTestQuestions[1])}
                        </td>
                      </tr>
                      <tr>
                        <td>{subjects ? subjects[2] : null}</td>

                        <td></td>
                        <td>
                          {getScore(name[2], resultObj, totalTestQuestions[2])}
                        </td>
                      </tr>
                      <tr>
                        <td>{subjects ? subjects[3] : null}</td>

                        <td></td>
                        <td>
                          {getScore(name[3], resultObj, totalTestQuestions[3])}
                        </td>
                      </tr>
                      <tr className="total-score">
                        <td>Total</td>
                        <td>{duration}</td>
                        <td>{totalScore}</td>
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
