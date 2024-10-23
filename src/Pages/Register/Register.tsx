import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from "../../Components/ui/Navbar/Navbar";
import note1 from '../../assets/image 17.png';
import note2 from '../../assets/image 18.png';
import './Register.css';
import Footer from "../../Components/ui/Footer/Footer";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../../State/Auth/ActionType';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Password validation
  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password.trim());
  };

  // Handle registration submission
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    // Password validation logic
    const trimmedPassword = password.trim();
    if (trimmedPassword !== confirmPassword.trim()) {
      setError('Passwords do not match.');
      return;
    }

    if (!isValidPassword(trimmedPassword)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter and a number.');
      return;
    }

    try {
      // Dispatch REGISTER_REQUEST action
      dispatch({ type: REGISTER_REQUEST });

      // Make the POST request with axios
      const response = await axios.post('https://lynspeed.pythonanywhere.com/api/v1/register/', {
        full_name: fullName,
        email: email,
        password: trimmedPassword,
      });

      // Handle successful response
      if (response.status === 201) {
        setSuccessMessage('Registration successful! Please check your email to confirm your account.');
        
        // Dispatch REGISTER_SUCCESS action with JWT or user data from the backend
        dispatch({ type: REGISTER_SUCCESS, payload: response.data.jwt });

        // Clear the form fields
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Navigate to login page after successful email confirmation
        navigate('/login');
      } else {
        // Handle backend errors
        const errorMessage = response.data.message || 'Registration failed. Please try again.';
        setError(errorMessage);
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
      }
    } catch (err: any) {
      // Catch and handle any other errors
      const errorMessage = axios.isAxiosError(err) && err.response 
        ? err.response.data.message || 'An error occurred. Please try again.'
        : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    }
  };

  return (
    <>
      <Navbar />
      <div className="gather">
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <button type="submit" className="signup-button">Sign Up</button>
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
