import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/selffront5.png";

const Navbar2 = () => {
  const navigate = useNavigate(); // Used for programmatic navigation

  const handleSignOut = () => {
    // Perform any necessary sign-out actions
    localStorage.removeItem('authToken'); // Example of clearing auth token
    // Any other local storage or session storage cleanup can be done here

    // Redirect to login page after sign-out
    navigate('/login');
  };

  return (
    <div className="navbar">
      <img src={logo} alt="Logo" style={{ width: "85px" }} />
      <ul className="nav-menu">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
      <div className="nav-signout">
        <button onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar2;
