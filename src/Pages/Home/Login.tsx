import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; // Import axios
import Navbar from "../../Components/ui/Navbar/Navbar";
import note3 from '../../assets/image 16.png';
import './Login.css';
import Bubbles from "../../Components/ui/Bubbles/Bubbles";
import Footer from "../../Components/ui/Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear any previous error
    setError('');
    setLoading(true); // Start loading

    try {
      // Send the login request to the Django backend using Axios
      const response = await axios.post('https://lynspeed.pythonanywhere.com/api/login/', {
        email: email,
        password: password,
      });

      // If login is successful, navigate to the dashboard
      console.log('Login successful', response.data);

      // Assuming the token is returned, save it in localStorage or sessionStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to dashboard page
      navigate('/dashboard');
    } catch (error: any) {
      // If login fails, display an error message
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Invalid email or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // End loading
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="down1">
              <div className="log">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
