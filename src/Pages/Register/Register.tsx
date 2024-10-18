import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/ui/Navbar/Navbar";
import note1 from "../../assets/image 17.png";
import note2 from "../../assets/image 18.png";
import "./Register.css";
import Footer from "../../Components/ui/Footer/Footer";

const Register = () => {
  // State to capture form input values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Password validation function
  const isValidPassword = (password: string) => {
    // Regular expression: at least 8 characters, one uppercase letter and a number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset previous error
    setError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if password meets criteria
    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter and a number"
      );
      return;
    }

    try {
      // Send registration data to the backend
      const response = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful", data);
        // Redirect or handle successful registration (e.g., redirect to login)
      } else {
        // Handle errors returned by the backend
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="gather gap-10 container mx-auto justify-center flex-col-reverse md:gap-[250px] md:flex-row">
        <div className="left">
          <img src={note1} alt="signup" />
          <img src={note2} alt="signup" />
        </div>
        <div className="right">
          <h3>Sign Up</h3>
          <form onSubmit={handleRegister} className="fillup">
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
              placeholder="Create Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="down">
            <p>Already have an account?</p>
            <div className="log">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
