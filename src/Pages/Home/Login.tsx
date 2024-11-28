import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../../Components/ui/Navbar/Navbar";
import note3 from "../../assets/image 16.png";
import "./Login.css";
import Bubbles from "../../Components/ui/Bubbles/Bubbles";
// import Footer from "../../Components/ui/Footer/Footer";
import { loginSuccess } from "../../State/Auth/Action"; // Import the loginSuccess action
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { loginSuccessful } from "../../Components/authSlice";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
}
// Base API URL
const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // Handle form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://lynspeed.pythonanywhere.com/api/v1/login/",
        {
          email,
          password,
        }
      );

      const { access: token } = response.data;
      const profileResponse = await axios.get(`${baseUrl}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user: UserProfile = profileResponse.data;

      // Save token and user data to local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch loginSuccess action to save user data in Redux
      dispatch(loginSuccessful({ jwt: token, user }));

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Invalid email or password");
      } else {
        setError("An error occurred. Please try again.");
      }
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
              autoComplete="email" // Added autoComplete attribute
              required
            />
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" // Added autoComplete attribute
                required
              />
              {showPassword ? (
                <BsEye onClick={handleShowPassword} className="eye" />
              ) : (
                <BsEyeSlash onClick={handleShowPassword} className="eye" />
              )}
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="down1">
              <div className="log">
                <Link to="/forgotPassword">Forgot password?</Link>
              </div>
            </div>
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="down">
              <p>Yet to sign up?</p>
              <div className="log">
                <Link to="/register">Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
