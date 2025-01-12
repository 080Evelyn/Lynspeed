import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../../Components/ui/Navbar/Navbar";
import note1 from "../../assets/image 17.png";
import note2 from "../../assets/image 18.png";
import "./Register.css";
import Footer from "../../Components/ui/Footer/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../../State/Auth/ActionType";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface RegisterResponse {
  message: string;
  jwt: string;
  confirmed: boolean;
}

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [full_name, setFull_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirm_password] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formVisible, setFormVisible] = useState<boolean>(true); // New state for form visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password.trim());
  };

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (password.trim() !== confirm_password.trim()) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!isValidPassword(password.trim())) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter and a number."
      );
      setLoading(false);
      return;
    }

    try {
      dispatch({ type: REGISTER_REQUEST });

      const response = await axios.post<RegisterResponse>(
        "https://lynspeed.pythonanywhere.com/api/v1/register/",
        {
          full_name,
          email,
          password: password.trim(),
          confirm_password: confirm_password.trim(),
        }
      );
      if (response.status === 200) {
        if (response.data.confirmed) {
          setSuccessMessage(
            "Registration successful! Your account is confirmed. Please log in."
          );
        } else {
          setSuccessMessage(
            "Registration successful! Please check your email to confirm your account."
          );
        }
        dispatch({ type: REGISTER_SUCCESS, payload: response.data.jwt });

        setFormVisible(false); // Hide the form on success

        // Clear input fields
        setFull_name("");
        setEmail("");
        setPassword("");
        setConfirm_password("");
      } else {
        const errorMessage =
          response.data.message || "Registration failed. Please try again.";
        setError(errorMessage);
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
      }
    } catch (err: any) {
      const error = err.response.data;
      if (error.code === "VALIDATION_ERROR") {
        const errorMsg = error.details.password[0];
        setError(errorMsg);
        return;
      }
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (axios.isAxiosError(err) && err.response?.data) {
        const errorData = err.response.data;
        console.log(errorData.details.password[0]);

        if (errorData.details) {
          if (errorData.details.email) {
            errorMessage = "This email is already registered.";
          } else if (errorData.details.full_name) {
            errorMessage = "Full name is required.";
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      }

      setError(errorMessage);
      dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="gathereg">
        <div className="left">
          <img src={note1} alt="signup" />
          <img src={note2} alt="signup" />
        </div>
        <div className="right">
          <h3>Create an account</h3>

          {loading ? (
            <div className="loader-container">
              <ClipLoader color="#36D7B7" loading={loading} size={100} />
            </div>
          ) : formVisible ? (
            <form onSubmit={handleRegister} className="fillup">
              <input
                type="text"
                placeholder="Full Name"
                name="full_name"
                value={full_name}
                onChange={(e) => setFull_name(e.target.value)}
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
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <BsEye onClick={handleShowPassword} className="eye" />
                ) : (
                  <BsEyeSlash onClick={handleShowPassword} className="eye" />
                )}
              </div>
              <div className="password">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={(e) => setConfirm_password(e.target.value)}
                  required
                />
                {showPasswordConfirm ? (
                  <BsEye onClick={handleShowPasswordConfirm} className="eye" />
                ) : (
                  <BsEyeSlash
                    onClick={handleShowPasswordConfirm}
                    className="eye"
                  />
                )}
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="submit"
                className="signup-button"
                disabled={loading}>
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <p style={{ color: "green" }}>{successMessage}</p>
            </div>
          )}
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
