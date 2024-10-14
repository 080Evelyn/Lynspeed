import React from 'react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const SubjectAlert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div style={overlayStyle}>
      <div style={alertBoxStyle}>
        <p>{message}</p>
        <button style={closeButtonStyle} onClick={onClose}>OK</button>
      </div>
    </div>
  );
};


const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const alertBoxStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  width: '300px',
  textAlign: 'center',
};

const closeButtonStyle: React.CSSProperties = {
  marginTop: '10px',
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default SubjectAlert;
