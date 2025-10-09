import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, persistor } from "../../../State/Store";
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
import { fetchNotification } from "../../../State/NotificationSlice";
import { PiCertificateThin, PiStudent } from "react-icons/pi";
import { GiSkills } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";
import { SiCodementor } from "react-icons/si";
import sub from "../../../assets/subselect.svg";
import res from "../../../assets/history.svg";
import notify from "../../../assets/notify.svg";
import achieve from "../../../assets/cup.png";
import set from "../../../assets/setting.svg";
import dash1 from "../../../assets/dashpic1.png";
import r1 from "../../../assets/Analpic.png";
import r2 from "../../../assets/Analpic3.png";
import anal from "../../../assets/perform.svg";
import pro from "../../../assets/profile.svg";

import "./Dashboard.css";
import { resetSkill } from "../../../State/SkillsSlice";
import { BookOpenCheck, FileCheck, Link2, Rss } from "lucide-react";
import { resetStudents } from "../../../State/StudentSlice";
import { resetValidate } from "../../../State/PaymentValidationSlice";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSubjects, setSelectedSubjects] = useState<string[] | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [careerDropdown, setCareerDropdown] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [subjectSelectionMessage, setSubjectSelectionMessage] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const careerPath = localStorage.getItem("selectedCareer");

  const storedUser = localStorage.getItem("user");
  const user: UserProfile = storedUser !== null ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();

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
        setSelectedSubjects([]);
      }
    } catch (error) {
      console.error("Error parsing selectedSubjects from localStorage:", error);
      setSelectedSubjects([]);
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleCareerDropdown = () => setCareerDropdown((prev) => !prev);
  const toggleSettingsDropdown = () =>
    setIsSettingsDropdownOpen((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev); // Toggle function

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    dispatch(resetAuth());
    dispatch(resetResultHistory());
    dispatch(resetSavedSubject());
    dispatch(resetSubjectList());
    dispatch(resetTestQuestions());
    dispatch(resetTestResult());
    dispatch(resetAnalysis());
    dispatch(resetSkill());
    dispatch(resetStudents());
    dispatch(resetValidate());
    persistor.purge();
    navigate("/login");
  };

  const notifications = useSelector(
    (state: RootState) => state.notification.data
  );
  const loading = useSelector((state: RootState) => state.notification.loading);

  useEffect(() => {
    dispatch(fetchNotification());
    dispatch(fetchSubjectList());
  }, []);

  const unreadNotification =
    !notifications.message &&
    notifications?.filter((notice: any) => !notice.is_read);
  const notificationCount = unreadNotification.length;

  return (
    <>
      <div className="dashboard-container">
        {/* Sidebar Toggle Button for Smaller Screens */}
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <h3>Dashboard</h3>
          <ul className="sidebar-menu">
            {user.role === "enterprise_admin" ? (
              <>
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
                      {careerPath && <p>Career: {careerPath}</p>}
                      <Link to="/enterprice-subscription">Subscription</Link>
                      <Link to="/login" onClick={handleSignOut}>
                        Log out
                      </Link>
                    </div>
                  )}
                </li>
                <li>
                  <PiStudent size={25} className="text-white font-bold" />
                  <Link className="menu-item" to="/registered-students">
                    Registered Students
                  </Link>
                </li>
                <li>
                  <FileCheck size={24} className="text-white font-bold" />
                  <Link className="menu-item" to="/register-students">
                    Student Registration
                  </Link>
                </li>
                <li>
                  <Link2 size={24} className="text-white font-bold" />
                  <Link className="menu-item" to="/link-existing-student">
                    Link Existing Student
                  </Link>
                </li>
                <li>
                  <Rss size={24} className="text-white font-bold" />
                  <Link className="menu-item" to="/subs">
                    Subscriptions
                  </Link>
                </li>
                <li>
                  <BookOpenCheck size={24} className="text-white font-bold" />
                  <Link className="menu-item" to="/students-result">
                    Student Results
                  </Link>
                </li>
              </>
            ) : (
              <>
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
                      {careerPath && <p>Career: {careerPath}</p>}
                      <Link to="/subscription">Subscription</Link>
                      <Link to="/login" onClick={handleSignOut}>
                        Log out
                      </Link>
                    </div>
                  )}
                </li>
                <li>
                  <img src={sub} alt="Subjects" />
                  <Link className="menu-item" to="/subjectselection">
                    {selectedSubjects && selectedSubjects.length > 0
                      ? "View Selected Subjects"
                      : "Select Subjects"}
                  </Link>
                </li>
                <li className="">
                  <PiCertificateThin
                    size={24}
                    className="text-white font-bold"
                  />
                  <div
                    onClick={toggleCareerDropdown}
                    className="menu-item font-normal !text-[14px] !text-white !px-4 cursor-pointer">
                    Career
                  </div>
                </li>
                {careerDropdown && (
                  <div className=" !text-white flex flex-col text-[14px] !pl-[px] ">
                    <Link
                      className="hover:bg-[#FFFFFF1A] gap-1.5 flex !p-2"
                      to="/quiz">
                      <MdQuiz size={24} className="text-white" /> Career quiz
                    </Link>
                    <Link
                      className="hover:bg-[#FFFFFF1A] flex gap-1.5 !p-2"
                      to="/mentorship">
                      <SiCodementor size={24} className="text-white" />
                      Career Guidance and Counselor
                    </Link>
                  </div>
                )}
                <li className="">
                  <GiSkills size={24} className="text-white" />
                  <Link to={"/inappskill"} className="">
                    Skill
                  </Link>
                </li>
                <li>
                  <img loading="lazy" src={res} alt="Results" />
                  <Link className="menu-item" to="/resulthistory">
                    Result History
                  </Link>
                </li>
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
                <li>
                  <img src={achieve} alt="Achievement" />
                  <Link className="menu-item" to="/achievement">
                    Achievement
                  </Link>
                </li>
                <li>
                  <img src={notify} alt="Notification" />
                  {notifications.message && null}
                  {loading
                    ? null
                    : notifications.message
                    ? null
                    : notificationCount > 0 && (
                        <span className="notify">
                          <p className="count">{notificationCount}</p>
                        </span>
                      )}
                  <Link className="menu-item" to="/notification">
                    Notification
                  </Link>
                </li>
              </>
            )}
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
                    <p>Change password</p>
                  </Link>
                  {/* <div className="dropdown-item">
              Notification
              <input type="checkbox" className="notification-toggle" />
            </div> */}
                </div>
              )}
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="right1 ">
          <section className="welcome-section">
            <div className="welcome-first">
              <h4>Welcome </h4>
            </div>
            <div className="welcome-banner">
              <img src={dash1} alt="Banner" />
              <h1 className="welcome-text">
                Hi {user?.full_name?.toUpperCase() || "USER"}! 👋
              </h1>
              {subjectSelectionMessage && (
                <p className="subject-selection-message">
                  {subjectSelectionMessage}
                </p>
              )}
            </div>
            <section className="right-pics">
              <img src={r1} alt="Right pic 1" />
              <img src={r2} alt="Right pic 2" />
            </section>
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
