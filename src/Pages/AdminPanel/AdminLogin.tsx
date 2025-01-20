import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css"

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // If the admin token exists in session storage, redirect to the admin panel
    const adminToken = sessionStorage.getItem("adminToken");
    if (adminToken) {
      navigate("/adminPanel");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://lynspeed.pythonanywhere.com/api/v1/Adminlogin/",
        { username, password }
      );

      const { token } = response.data; // Assuming response contains a token
      sessionStorage.setItem("adminToken", token); // Store token in session storage
      navigate("/adminPanel"); // Redirect to the admin panel
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Invalid login credentials. Please try again.";
      setError(errorMessage); // Display error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
