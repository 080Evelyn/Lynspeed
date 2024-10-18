import "./Footer.css";
import logo from "../../../assets/logosalone.png";
import insta from "../../../assets/IG.png";
import twit from "../../../assets/twitter.jpeg";
import face from "../../../assets/Facebok.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container flex-col md:flex-row">
        <div className="footer-logo">
          <img src={logo} alt="Website Logo" />
          <p>
            Lynspeed aims to provide a robust and effective solution for
            students preparing for the JAMB exam, equipping them with the tools
            and insights necessary to achieve high grades and succeed in their
            academic
          </p>
        </div>

        <div className="footer-links">
          <ul>
            <p>
              <strong>Product</strong>
            </p>
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
        </div>

        <div className="usefullink">
          <ul>
            <p>
              <strong>Useful Link</strong>
            </p>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div className="connect">
          <div className="footer-contact">
            <p>Email: support@lynspeed.com.ng</p> <br></br>
            <p>Whatsapp chat only: 08012345678</p>
          </div>

          <div className="footer-social">
            <a
              href="https://www.facebook.com/lynspeed"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={face} alt="Facebook" />
            </a>
            <a
              href="https://www.twitter.com/lynspeed"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twit} alt="Twitter" />
            </a>
            <a
              href="https://www.instagram.com/lynspeed"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={insta} alt="Instagram" style={{ width: "95%" }} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>&copy; 2024 Lynspeed. All Rights Reserved.</p>
        <p>
          Designed by{" "}
          <a
            href="https://www.lynogtech.com.ng"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>LYNOG TECH NIG</strong>
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
