import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/selffront5.png";
import { useState } from "react";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <>
      <div className="navbar">
        <Link to="/home">
          <img src={logo} alt="Logo" style={{ width: "85px" }} />
        </Link>
        <ul className="nav-menu hidden md:flex">
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
        <div className="flex items-center gap-x-6">
          <div className="nav-login">
            <Link to="/login">Login</Link>
          </div>
          <button onClick={() => setIsMobile(!isMobile)} className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      {isMobile && (
        <div className="fixed grid place-content-center z-50 top-0 h-full w-full bg-black/90">
          <div className="relative">
            <button className="text-white absolute -top-72 -right-36">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-col gap-y-8 text-white text-center flex">
            <Link to="/home">Home</Link>

            <Link to="/about">About</Link>

            <Link to="/pricing">Pricing</Link>

            <Link to="/contact">Contact</Link>

            <Link to="/blog">Blog</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
