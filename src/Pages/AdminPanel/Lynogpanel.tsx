import axios from "axios";
import "./Lynogpanel.css";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
}

interface PaymentProfile {
  id: number;
  amount: string;
  transaction_id: number;
  payment_date: string;
  user_email: string;
}

const Lynogpanel = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [payments, setPayments] = useState<PaymentProfile[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch users from API using Axios
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://lynspeed.pythonanywhere.com/api/v1/users/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `https://lynspeed.pythonanywhere.com/api/v1/users/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        alert("User deleted successfully!");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        alert("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  useEffect(() => {
    // Fetch payment data from the API
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "https://lynspeed.pythonanywhere.com/api/v1/payments/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPayments(response.data); // Assuming the API returns an array of payments
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();

    // Fetch payments for a specific user
  }, [token]);

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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                    {/* <th>Track User Activity</th> */}
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        {/* <td>{user.is_active ? "Active" : "Inactive"}</td> */}
                        <td>{new Date(user.created_at).toLocaleString()}</td>
                        <td>
                          <button
                            className="action-btn"
                            onClick={() => handleDelete(user.id)} // Pass user.id dynamically
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>No users found.</td>
                    </tr>
                  )}
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
              <p>{users.length}</p>{" "}
              {/* Dynamically displaying total number of users */}
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
              <p>
                Monitor exam completion rates and performance over time. This
                could be displayed as a line graph or bar chart (use a chart
                library like Chart.js).
              </p>
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
                    <th>ID</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Transaction ID</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.user_email}</td>
                        <td>
                          <i>&#8358;</i> {payment.amount}
                        </td>
                        <td>{payment.transaction_id}</td>
                        <td>
                          {new Date(payment.payment_date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No payment records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        );

      case "notifications":
        return (
          <section className="notifications-section">
            <h2>User Notifications</h2>
            <p>Send announcements, updates, or reminders to users.</p>
            <p>
              Customize email or SMS notifications for specific events (e.g.,
              payment confirmation, new features).
            </p>

            <h2>Admin Notifications</h2>
            <p>
              Receive alerts for critical system events (e.g., failed backups,
              unusual activity).
            </p>
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
              onClick={() => handleMenuClick("dashboard")}>
              Admin Dashboard
            </li>
            <li
              className={selectedMenu === "users" ? "active" : ""}
              onClick={() => handleMenuClick("users")}>
              Users
            </li>
            <li
              className={selectedMenu === "question" ? "active" : ""}
              onClick={() => handleMenuClick("question")}>
              Upload Files
            </li>
            <li
              className={selectedMenu === "reports" ? "active" : ""}
              onClick={() => handleMenuClick("reports")}>
              Reports
            </li>
            <li
              className={selectedMenu === "payments" ? "active" : ""}
              onClick={() => handleMenuClick("payments")}>
              Payments
            </li>
            <li
              className={selectedMenu === "notifications" ? "active" : ""}
              onClick={() => handleMenuClick("notifications")}>
              Notifications
            </li>
            {/* <li>System Configuration</li> */}
            {/* <li>Logs and Audit</li> */}
          </ul>
        </nav>
        <button className="text-justify" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Lynogpanel;
