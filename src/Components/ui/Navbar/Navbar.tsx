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
      <Link to={"/"}>
        <img
          src={logo}
          alt="Lynspeed logo"
          loading="lazy"
          className="navbar-logo"
        />
      </Link>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen ? "true" : "false"}>
        {isMenuOpen ? "✖" : "☰"}
      </button>
      <div
        className={`nav-menu-container ${isMenuOpen ? "active" : ""}`}
        role="menu">
        <ul className="nav-menu">
          <li>
            <Link to="/" aria-current="page">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li className="relative group ">
            <span className="cursor-pointer inline-flex items-center gap-1 hover:text-blue-600">
              <p className="!text-[18px] ">Core Features</p>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
            <ul className="absolute hidden group-hover:block bg-white border rounded shadow-md mt-2 !py-2 !ml-[-50%] !w-[300px]  z-50">
              <li>
                <a
                  href="#jamb-simulation"
                  className="block px-4 py-2 hover:bg-gray-100">
                  JAMB Simulation
                </a>
              </li>

              <li>
                <a
                  href="#career-guidance"
                  className="block px-4 py-2 hover:bg-gray-100">
                  Career Guidance and Counseling
                </a>
              </li>
              <li>
                <a
                  href="#skill-discovery"
                  className="block px-4 py-2 hover:bg-gray-100">
                  Skill Discovery
                </a>
              </li>
            </ul>
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
