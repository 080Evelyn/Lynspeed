import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Ensure correct import from react-redux
import axios from 'axios'; // Ensure axios is imported
import Navbar from "../../Components/ui/Navbar/Navbar";
import note1 from '../../assets/image 17.png';
import note2 from '../../assets/image 18.png';
import './Register.css';
import Footer from "../../Components/ui/Footer/Footer";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../../State/Auth/ActionType';

const Register = () => {
  const navigate = useNavigate(); // To navigate after successful registration
  const dispatch = useDispatch(); // Redux dispatch hook

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password validation
  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle registration submission
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    // Password validation logic
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter and a number.');
      return;
    }

    try {
      // Dispatch REGISTER_REQUEST action
      dispatch({ type: REGISTER_REQUEST });

      // Make the POST request with axios
      const response = await axios.post('https://lynspeed.pythonanywhere.com/register/', {
        full_name: fullName,
        email: email,
        password: password,
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
        setError(response.data.message || 'Registration failed. Please try again.');
        dispatch({ type: REGISTER_FAILURE, payload: response.data.message });
      }
    } catch (err) {
      // Catch and handle any other errors
      setError('An error occurred. Please try again.');
      dispatch({ type: REGISTER_FAILURE, payload: error });
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
