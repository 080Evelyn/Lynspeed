// ForgotPassword.tsx
import React, { useState } from "react";
import axios from "axios";
// import Navbar2 from '../../../Components/ui/Navbar/Navbar2';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}password-reset/`,
        { email }
      );
      if (response.status === 200) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setMessage("Error: Unable to send reset email.");
      }
    } catch (error) {
      setMessage("Error: Could not send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar2 /> */}
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "100px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "16px",
            fontWeight: "400",
          }}>
          <p>Enter your email to reset password:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            borderRadius: "4px",
            color: "white",
            fontSize: "15px",
            backgroundColor: loading ? "#808080" : "#004085",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default ForgotPassword;
