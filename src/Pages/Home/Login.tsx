import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Navbar from "../../Components/ui/Navbar/Navbar";
import note3 from "../../assets/image 16.png";
import "./Login.css";
import Bubbles from "../../Components/ui/Bubbles/Bubbles";
import Footer from "../../Components/ui/Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear any previous error
    setError("");

    try {
      // Send the login request to the Django backend
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, navigate to the dashboard
        console.log("Login successful", data);

        // Assuming the token is returned, save it in localStorage or sessionStorage
        localStorage.setItem("token", data.token);

        // Redirect to dashboard page
        navigate("/dashboard");
      } else {
        // If login fails, display an error message
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <Bubbles />
      <div className="flex container mx-auto px-5 py-10 items-center gap-10 justify-between flex-col md:flex-row">
        <div className="">
          <img src={note3} alt="signup" width={200} className="mx-auto" />
        </div>
        <div>
          <h3>Login</h3>
          <form onSubmit={handleLogin} className="fillup">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="down1">
              <div className="log">
                <a href="#">Forget password?</a>
              </div>
            </div>

            <button type="submit" className="signup-button">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
