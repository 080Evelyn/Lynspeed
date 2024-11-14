import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../State/Store"; // Ensure the path is correct
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
import Footer from "../../../Components/ui/Footer/Footer";
import Navbar2 from "../../../Components/ui/Navbar/Navbar2";

const Dashboard = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[] | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Access user data from Redux
  const user = useSelector((state: RootState) => state.auth?.user ?? null); // Ensure 'auth' and 'user' exist in RootState
  const navigate = useNavigate();

  useEffect(() => {
    const subjects = localStorage.getItem("selectedSubjects");
    if (subjects) setSelectedSubjects(JSON.parse(subjects));
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleSettingsDropdown = () => setIsSettingsDropdownOpen((prev) => !prev);
  const toggleChangePasswordDropdown = () => setIsChangePasswordOpen((prev) => !prev);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Navbar2 />
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <h3>Dashboard</h3>
          <ul className="sidebar-menu">
            <li className="profile-item">
              <img src={pro} alt="Profile" />
              <div className="menu-item" onClick={toggleDropdown}>Profile</div>
              {isDropdownOpen && (
                <div className="profile-dropdown">
                  <p><strong>{user?.full_name || "User"}</strong></p>
                  <p>{user?.email || "user@example.com"}</p>
                  <Link to="/edit-profile">Edit Profile</Link>
                  <Link to="#" onClick={handleSignOut}>Log out</Link>
                  <Link to="/pricing">Subscription</Link>
                </div>
              )}
            </li>
            <li>
              <img src={sub} alt="Subjects" />
              <Link className="menu-item" to="/subjectselection">
                {selectedSubjects && selectedSubjects.length > 0 ? "View Selected Subjects" : "Select Subjects"}
              </Link>
            </li>
            <li><img src={res} alt="Results" /><Link className="menu-item" to="/resulthistory">Result History</Link></li>
            <li><img src={anal} style={{maxWidth:"25px", maxHeight:"25px"}} alt="Analysis" className="icon-small" /><Link className="menu-item" to="/performance">Performance Analysis</Link></li>
            <li><img src={achieve} alt="Achievement" /><Link className="menu-item" to="/achievement">Achievement</Link></li>
            <li><img src={notify} alt="Notification" /><Link className="menu-item" to="/notification">Notification</Link></li>
            <li className="profile-item">
              <img src={set} alt="Setting" />
              <div className="menu-item" onClick={toggleSettingsDropdown}>Settings</div>
              {isSettingsDropdownOpen && (
                <div className="settings-dropdown">
                  <div className="dropdown-item" onClick={toggleChangePasswordDropdown}>Change Password</div>
                  <div className="dropdown-item">
                    Notification <input type="checkbox" className="notification-toggle" />
                  </div>
                  {isChangePasswordOpen && (
                    <div className="change-password-form">
                      <label htmlFor="old-password">Old Password</label>
                      <input type="password" id="old-password" placeholder="Old Password" />
                      <label htmlFor="new-password">New Password</label>
                      <input type="password" id="new-password" placeholder="New Password" />
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <input type="password" id="confirm-password" placeholder="Confirm Password" />
                      <button className="submit-btn">Submit</button>
                    </div>
                  )}
                </div>
              )}
            </li>
          </ul>
          <div className="img2">
            <img src={dash2} alt="Dashpic2" />
          </div>
        </aside>
        <main className="right">
          <section className="welcome-section">
            <div className="welcome-banner">
              <img src={dash1} alt="Banner" />
              <h1 className="welcome-text">WELCOME {user?.full_name?.toUpperCase() || "USER"}! 👋</h1>
            </div>
          </section>
          <section className="right-pics">
            <img src={r1} alt="Right pic 1" />
            <img src={r2} alt="Right pic 2" />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
