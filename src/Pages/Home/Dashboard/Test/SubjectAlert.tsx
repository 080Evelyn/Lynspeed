import React, { ReactNode } from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
  children?: ReactNode; // Allow custom buttons or elements
}

const SubjectAlert: React.FC<AlertProps> = ({ message, onClose, children }) => {
  return (
    <div style={overlayStyle}>
      <div style={alertBoxStyle}>
        <p>{message}</p>
        {children}
        {!children && (
          <button style={closeButtonStyle} onClick={onClose}>
            OK
          </button>
        )}
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const alertBoxStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const closeButtonStyle: React.CSSProperties = {
  marginTop: "10px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default SubjectAlert;
