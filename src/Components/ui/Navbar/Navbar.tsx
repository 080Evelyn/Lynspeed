import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/LynspeedName.jpg";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    navigate("/");
  };

  const handleDropdown = () => {
    setClicked(!clicked);
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
            <span
              onClick={handleDropdown}
              className="cursor-pointer inline-flex items-center gap-1 hover:text-blue-600">
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
            <ul
              className={`absolute  ${
                clicked ? "block" : "hidden"
              } group-hover:block bg-[#0659a6] !px-2 border rounded shadow-md mt-2 !py-2 !ml-[-50%] !w-[200px] md:!w-[250px]  z-50`}>
              <li>
                <a
                  onClick={toggleMenu}
                  href="#career-guidance"
                  className="block !px-4 !py-2 !text-white hover:!text-black hover:bg-gray-100">
                  Career Guidance and Counseling
                </a>
              </li>
              <li>
                <a
                  onClick={toggleMenu}
                  href="#jamb-simulation"
                  className="block !px-4 !py-2 !text-white hover:!text-black hover:bg-gray-100 ">
                  JAMB Simulation
                </a>
              </li>

              <li>
                <a
                  onClick={toggleMenu}
                  href="#skill-discovery"
                  className="block !px-4 !py-2 !text-white hover:!text-black hover:bg-gray-100">
                  Skill Discovery
                </a>
              </li>
              <li>
                <a
                  onClick={toggleMenu}
                  href="#our-tribe"
                  className="block !px-4 !py-2 !text-white hover:!text-black hover:bg-gray-100">
                  Our Tribe
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
