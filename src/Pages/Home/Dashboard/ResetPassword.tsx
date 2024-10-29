
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar2 from '../../../Components/ui/Navbar/Navbar2';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Retrieve the token from the URL
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://lynspeed.pythonanywhere.com/api/v1/password-reset-confirm/', {
        token,
        password: newPassword,
      });

      if (response.status === 200) {
        setMessage('Password successfully reset. You can now log in.');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
      } else {
        setMessage('Error: Unable to reset password.');
      }
    } catch (error) {
      setMessage('Error: Could not reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar2 />
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "100px auto",
          padding: "20px",
          maxWidth: "500px",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <label style={{ width: "100%", fontSize: "16px", fontWeight: "500" }}>
          <p>Enter your new password:</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label style={{ width: "100%", fontSize: "16px", fontWeight: "500" }}>
          <p>Confirm your new password:</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "4px",
            color: "white",
            fontSize: "15px",
            backgroundColor: loading ? "#808080" : "#004085",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && <p style={{ textAlign: "center", fontSize: "14px", color: "#006400" }}>{message}</p>}
      </form>
    </>
  );
};

export default ResetPassword;
