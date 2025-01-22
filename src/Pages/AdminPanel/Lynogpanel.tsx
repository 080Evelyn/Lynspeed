import "./Lynogpanel.css";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

const Lynogpanel = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleMenuClick = (menu: SetStateAction<string>) => {
    setSelectedMenu(menu);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleFileSubmit = () => {
    if (subject && file) {
      console.log("Subject:", subject);
      console.log("File:", file.name);
      // Implement file upload logic (e.g., sending it to the backend)
      setSubject("");
      setFile(null);
    } else {
      alert("Please select a subject and a file to upload.");
    }
  };

  const handleLogout = () => {
    // Clear session or authentication tokens
    localStorage.clear();
    alert("You have been logged out.");
    navigate("/home"); // Redirect to the login page
  };

  const users = [
    { name: "John Doe", email: "johndoe@example.com" },
    { name: "Jane Smith", email: "janesmith@example.com" },
    { name: "Alice Johnson", email: "alicej@example.com" },
    { name: "Bob Brown", email: "bobbrown@example.com" },
    { name: "Charlie Lee", email: "charlielee@example.com" },
    { name: "Dana White", email: "danawhite@example.com" },
    { name: "Emma Clark", email: "emmaclark@example.com" },
    { name: "Fred Green", email: "fredgreen@example.com" },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "users":
        return (
          <section>
            <h2>Registered Users</h2>
            <div className="user-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                    <th>Track User Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="action-btn">Edit</button>
                        <button className="action-btn">Deactivate</button>
                        <button className="action-btn">Delete</button>
                      </td>
                      <td>
                        <p>Last Login: 2025-01-10</p>
                        <p>Exams Taken: 5</p>
                        <p>Average Score: 85%</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      case "question":
        return (
          <section>
            <h2>Upload File for Subject</h2>
            <div className="file-upload-form">
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={handleSubjectChange}
                placeholder="Enter subject"
              />

              <label>Upload File</label>
              <input type="file" onChange={handleFileChange} />

              <button className="action-btn" onClick={handleFileSubmit}>
                Submit File
              </button>
            </div>
          </section>
        );
      case "dashboard":
        return (
          <section className="dashboard-cards">
            <div className="card">
              <h3>Total Users</h3>
              <p>1,234</p>
            </div>
            <div className="card">
              <h3>Exams Taken</h3>
              <p>567</p>
            </div>
            <div className="card">
              <h3>Average Scores</h3>
              <p>76%</p>
            </div>
            <div className="card">
              <h3>Payments Received</h3>
              <p>$12,345</p>
            </div>
          </section>
        );
        case "reports":
          return (
            <section className="reports-section">
              <h2>User Performance Reports</h2>
              <div className="performance-report">
                <h3>Average Scores by Subject</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Average Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mathematics</td>
                      <td>85%</td>
                    </tr>
                    <tr>
                      <td>Physics</td>
                      <td>78%</td>
                    </tr>
                    <tr>
                      <td>Chemistry</td>
                      <td>80%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <div className="exam-trends">
                <h3>Exam Trends</h3>
                <p>Monitor exam completion rates and performance over time. This could be displayed as a line graph or bar chart (use a chart library like Chart.js).</p>
              </div>
  
              <div className="export-data">
                <h3>Export Data</h3>
                <button className="action-btn">Export to CSV</button>
                <button className="action-btn">Export to Excel</button>
                <button className="action-btn">Export to PDF</button>
              </div>
            </section>
          );
      
          case "payments":
            return (
              <section className="payments-section">
                <h2>Payments Management</h2>
                <div className="payment-history">
                  <h3>Payment History</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe</td>
                        <td>$30</td>
                        <td>Completed</td>
                        <td>2025-01-10</td>
                      </tr>
                      <tr>
                        <td>Jane Smith</td>
                        <td>$45</td>
                        <td>Pending</td>
                        <td>2025-01-11</td>
                      </tr>
                      <tr>
                        <td>Alice Johnson</td>
                        <td>$60</td>
                        <td>Failed</td>
                        <td>2025-01-12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
    
                <div className="discounts-section">
                  <h3>Discounts/Promo Codes</h3>
                  <button className="action-btn">Create Promo Code</button>
                  <button className="action-btn">Manage Promo Codes</button>
                </div>
              </section>
            );
        
            case "notifications":
            return (
              <section className="notifications-section">
                <h2>User Notifications</h2>
                <p>Send announcements, updates, or reminders to users.</p>
                <p>Customize email or SMS notifications for specific events (e.g., payment confirmation, new features).</p>
                
                <h2>Admin Notifications</h2>
                <p>Receive alerts for critical system events (e.g., failed backups, unusual activity).</p>
              </section>
            );
      default:
        return <p>Welcome to the Admin Panel</p>;
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">LYNSPEED</div>
        <nav className="menu">
          <ul>
            <li
              className={selectedMenu === "dashboard" ? "active" : ""}
              onClick={() => handleMenuClick("dashboard")}
            >
              Admin Dashboard
            </li>
            <li
              className={selectedMenu === "users" ? "active" : ""}
              onClick={() => handleMenuClick("users")}
            >
              Users
            </li>
            <li
              className={selectedMenu === "question" ? "active" : ""}
              onClick={() => handleMenuClick("question")}
            >
              Upload Files
            </li>
            <li
              className={selectedMenu === "reports" ? "active" : ""}
              onClick={() => handleMenuClick("reports")}
            >
              Reports
            </li>
            <li
              className={selectedMenu === "payments" ? "active" : ""}
              onClick={() => handleMenuClick("payments")}
            >
              Payments
            </li>
            <li
              className={selectedMenu === "notifications" ? "active" : ""}
              onClick={() => handleMenuClick("notifications")}
            >
              Notifications
            </li>
            {/* <li>System Configuration</li> */}
            {/* <li>Logs and Audit</li> */}
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Lynogpanel;
