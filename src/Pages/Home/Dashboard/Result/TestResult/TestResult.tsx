import "./TestResult.css"; // Import CSS for styles
import profilePic from "../../../../../assets/profile.svg"; // Example profile /
import studentPic from "../../../../../assets/studentImage.png"; // Example student pic
// import Navbar2 from "../../../../../Components/ui/Navbar/Navbar2";
import { Link } from "react-router-dom";
// import Footer from "../../../../../Components/ui/Footer/Footer";

const TestResult = () => {
  return (
    <div className="result-page">
      {/* <Navbar2 /> */}

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
                    <b>Name:</b> Ahube Rawlins
                  </p>
                  <p>
                    <b>Date:</b> 03 / 06 / 2024
                  </p>
                  <p>
                    <b>Time:</b> 04:45 pm
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
                    <td>English Language</td>
                    <td>01:45:00</td>
                    <td>45</td>
                  </tr>
                  <tr>
                    <td>Mathematics</td>
                    <td>01:45:00</td>
                    <td>40</td>
                  </tr>
                  <tr>
                    <td>Physics</td>
                    <td>00:55:00</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Chemistry</td>
                    <td>00:55:00</td>
                    <td>40</td>
                  </tr>
                  <tr className="total-score">
                    <td>Total</td>
                    <td>01:50:20</td>
                    <td>175</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="botf">
              <Link to="/Correction">Recommendation</Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default TestResult;
