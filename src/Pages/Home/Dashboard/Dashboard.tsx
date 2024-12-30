import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../State/Store";
import sub from "../../../assets/subselect.svg";
import res from "../../../assets/history.svg";
import notify from "../../../assets/notify.svg";
import achieve from "../../../assets/cup.png";
import set from "../../../assets/setting.svg";
import dash2 from "../../../assets/dashpic2.png";
import dash1 from "../../../assets/dashpic1.png";
import r1 from "../../../assets/Analpic.png";
import r2 from "../../../assets/Analpic3.png";
import anal from "../../../assets/perform.svg";
import pro from "../../../assets/profile.svg";
import "./Dashboard.css";
import { persistor, RootState } from "../../../State/Store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../State/Store";
import { resetAuth } from "../../../Components/authSlice";
import { resetResultHistory } from "../../../State/ResultHistorySlice";
import { resetSavedSubject } from "../../../State/SavedSubjectListSlice";
import {
  fetchSubjectList,
  resetSubjectList,
} from "../../../State/SubjectListSlice";
import { resetTestQuestions } from "../../../State/TestQuestionSlice";
import { resetTestResult } from "../../../State/TestResultSlice";
import { resetAnalysis } from "../../../State/AnalysisSlice";
import {
  fetchNotification,
  markAsRead,
} from "../../../State/NotificationSlice";
import axios from "axios";
// import { expiredLogout } from "../../../Components/authSlice";
// import { fetchSubjectList } from "../../../State/SubjectListSlice";
// import Navbar2 from "../../../Components/ui/Navbar/Navbar2";
// import Footer from "../../../Components/ui/Footer/Footer";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
}
const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSubjects, setSelectedSubjects] = useState<string[] | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  // const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [subjectSelectionMessage, setSubjectSelectionMessage] = useState(""); // For subject selection confirmation

  //Access user from local storage
  const storedUser = localStorage.getItem("user");
  const user: UserProfile = storedUser !== null ? JSON.parse(storedUser) : null;

  const navigate = useNavigate();

  // Load selected subjects from local storage with error handling
  useEffect(() => {
    const subjects = localStorage.getItem("selectedSubjects");
    try {
      if (subjects) {
        const parsedSubjects = JSON.parse(subjects);
        setSelectedSubjects(parsedSubjects);
        if (parsedSubjects.length === 4) {
          setSubjectSelectionMessage("Subjects saved successfully!");
        }
      } else {
        setSelectedSubjects([]); // Default value if no subjects are stored
      }
    } catch (error) {
      console.error("Error parsing selectedSubjects from localStorage:", error);
      setSelectedSubjects([]); // Handle parsing error gracefully
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleSettingsDropdown = () =>
    setIsSettingsDropdownOpen((prev) => !prev);
  // const toggleChangePasswordDropdown = () =>
  //   setIsChangePasswordOpen((prev) => !prev);

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(resetAuth());
    dispatch(resetResultHistory());
    dispatch(resetSavedSubject());
    dispatch(resetSubjectList());
    dispatch(resetTestQuestions());
    dispatch(resetTestResult());
    dispatch(resetAnalysis());
    persistor.purge(); //clears all persisted data from local storage
    navigate("/login");
  };
  const notifications = useSelector(
    (state: RootState) => state.notification.data
  );
  const loading = useSelector((state: RootState) => state.notification.loading);
  useEffect(() => {
    // Fetch notifications from API when the component mounts
    dispatch(fetchNotification());

    //fetching the subject list
    dispatch(fetchSubjectList());
  }, []);

  const token = localStorage.getItem("authToken");
  const markNotificationAsRead = async (notificationId: string) => {
    // Call your PATCH endpoint to mark the notification as read
    if (!notificationId) {
      return;
    }
    try {
      await axios.patch(
        `https://lynspeed.pythonanywhere.com/api/v1/notifications/${notificationId}/`,
        {
          body: JSON.stringify({ is_read: true }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header,
          },
        }
      );

      // Dispatch Redux action to update local state
      dispatch(markAsRead(notificationId));
    } catch (err) {
      console.log(err);
    }
  };
  let latestNotification = notifications[notifications.length - 1];
  const notificationId = latestNotification?.id;
  const isReadd = latestNotification?.is_read;

  const handleNotificationClick = () => {
    markNotificationAsRead(notificationId); // Mark as read when the notification is clicked
  };
  return (
    <>
      {/* <Navbar2 /> */}
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <h3>Dashboard</h3>
          <ul className="sidebar-menu">
            {/* Profile Section */}
            <li className="profile-item">
              <img src={pro} alt="Profile" />
              <div className="menu-item" onClick={toggleDropdown}>
                Profile
              </div>
              {isDropdownOpen && (
                <div className="profile-dropdown">
                  <p>
                    <strong>{user?.full_name || "User"}</strong>
                  </p>
                  <p>{user?.email || "user@example.com"}</p>

                  <Link to="/subscription">Subscription</Link>
                  <Link to="/login" onClick={handleSignOut}>
                    Log out
                  </Link>
                </div>
              )}
            </li>

            {/* Subjects */}
            <li>
              <img src={sub} alt="Subjects" />
              <Link className="menu-item" to="/subjectselection">
                {selectedSubjects && selectedSubjects.length > 0
                  ? "View Selected Subjects"
                  : "Select Subjects"}
              </Link>
            </li>

            {/* Result History */}
            <li>
              <img loading="lazy" src={res} alt="Results" />
              <Link className="menu-item" to="/resulthistory">
                Result History
              </Link>
            </li>

            {/* Performance Analysis */}
            <li>
              <img
                src={anal}
                style={{ maxWidth: "25px", maxHeight: "25px" }}
                alt="Analysis"
                className="icon-small"
              />
              <Link className="menu-item" to="/performance">
                Performance Analysis
              </Link>
            </li>

            {/* Achievement */}
            <li>
              <img src={achieve} alt="Achievement" />
              <Link className="menu-item" to="/achievement">
                Achievement
              </Link>
            </li>

            {/* Notification */}
            <li onClick={handleNotificationClick}>
              <img src={notify} alt="Notification" />
              {notifications.message && null}
              {loading
                ? null
                : notifications.message
                ? null
                : !isReadd && <span className="notify"></span>}
              <Link className="menu-item" to="/notification">
                Notification
              </Link>
            </li>

            {/* Settings */}
            <li className="profile-item">
              <img src={set} alt="Setting" />
              <div className="menu-item" onClick={toggleSettingsDropdown}>
                Settings
              </div>
              {isSettingsDropdownOpen && (
                <div className="settings-dropdown">
                  <Link
                    className="dropdown-item"
                    // onClick={toggleChangePasswordDropdown}
                    to="/resetpassword">
                    <p>Change Password</p>
                  </Link>
                  <div className="dropdown-item">
                    Notification
                    <input type="checkbox" className="notification-toggle" />
                  </div>
                </div>
              )}
            </li>
          </ul>
          <div className="img2">
            <img src={dash2} alt="Dashpic2" />
          </div>
        </aside>

        {/* Right Section */}
        <main className="right">
          <section className="welcome-section">
            <div className="welcome-banner">
              <img loading="lazy" src={dash1} alt="Banner" />
              <h1 className="welcome-text">
                WELCOME {user?.full_name?.toUpperCase() || "USER"}! 👋
              </h1>
              {subjectSelectionMessage && (
                <p className="subject-selection-message">
                  {subjectSelectionMessage}
                </p>
              )}
            </div>
          </section>
          <section className="right-pics">
            <img loading="lazy" src={r1} alt="Right pic 1" />
            <img loading="lazy" src={r2} alt="Right pic 2" />
          </section>
        </main>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Dashboard;
