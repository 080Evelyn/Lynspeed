import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../../Components/ui/Navbar/Navbar";
import note3 from "../../assets/image 16.png";
import "./Login.css";
import Bubbles from "../../Components/ui/Bubbles/Bubbles";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { loginSuccessful, setToken } from "../../Components/authSlice";
import { AppDispatch } from "../../State/Store";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  is_admin: boolean;
}

// Base API URL
const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}login/`, {
        email,
        password,
      });

      console.log(response);
      if (response.statusText === "OK") {
        const { access: token, refresh } = response.data;

        // Fetch user profile
        const profileResponse = await axios.get(`${baseUrl}profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user: UserProfile = profileResponse.data;

        // Save tokens and user info locally
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("user", JSON.stringify(user));

        // Update Redux state
        dispatch(loginSuccessful());
        dispatch(setToken(token));

        const admin = response.data.is_admin;
        // Redirect based on user role
        if (admin) {
          navigate("/adminPanel");
        } else {
          navigate("/dashboard");
          
        }
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Bubbles />
      <div className="gather">
        <div className="left">
          <img src={note3} alt="login" />
        </div>
        <div className="rightsign">
          <h3>Login</h3>
          <form onSubmit={handleLogin} className="fillup">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <span className="eye" onClick={handleShowPassword}>
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </span>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="down1">
              <div className="log">
                <Link to="/forgotPassword">Forgot password?</Link>
              </div>
            </div>
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="down1">
              <p>Yet to sign up?</p>
              <div className="log">
                <Link to="/register">Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
