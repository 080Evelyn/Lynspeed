import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/LynspeedName.jpg";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <img
        src={logo}
        alt="Lynspeed logo"
        loading="lazy"
        className="navbar-logo"
      />
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen ? "true" : "false"}
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>
      <div
        className={`nav-menu-container ${isMenuOpen ? "active" : ""}`}
        role="menu"
      >
        <ul className="nav-menu">
          <li>
            <Link to="/" aria-current="page">
              Home
            </Link>
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
        <div className="nav-login">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
