
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import "./SignOut.css"

const SignOut = () => {
  const navigate = useNavigate(); // For redirecting the user

  const handleSignOut = () => {
    // Perform any necessary sign-out actions, like clearing tokens or local storage
    localStorage.removeItem('authToken'); // Clear authentication token (if stored in localStorage)

    // You can also clear other stored data like user information
    // localStorage.removeItem('userInfo');

    // Redirect the user to the login page
    navigate('/login'); // Assuming the login page is at '/login'
  };

  return (
    <button onClick={handleSignOut} className="sign-out-btn">
      Sign Out
    </button> 
  );
};

export default SignOut;
