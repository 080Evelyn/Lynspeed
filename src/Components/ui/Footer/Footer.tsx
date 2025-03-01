// Footer Component
import "./Footer.css";
import logo from "../../../assets/plainLogobrand.png";
import tiktok from "../../../assets/tiktok.png";
import insta from "../../../assets/Instagram.jpg";
import facebook from "../../../assets/facebook.png";
import twiter from "../../../assets/twitter.jpeg"
import { Link } from "react-router-dom";


const whatsappGroupLink = "https://chat.whatsapp.com/KYaD5WJWx6b1jyYgHAiwXt";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Website Logo" />
          <p>
            Lynspeed aims to provide a robust and effective solution for
            students preparing for the JAMB exam, equipping them with the tools
            and insights necessary to achieve high grades and succeed in their
            academics.
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
              <strong>Useful Links</strong>
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
            <p>Email: support@lynspeed.com.ng</p>
            <a href="https://wa.me/2349065366858"><p style={{ color: "#0659a6", fontSize: "16px", fontWeight: "600" }}>Chat with us</p></a>
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#25D366",
                color: "white",
                padding: "10px",
                maxWidth: "250px",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "400",
                display: "inline-block",
              }}
            >
              Join Our WhatsApp Group
            </a>
          </div>

          <div className="footer-social">
            <a
              href="https://www.tiktok.com/@lynspeed.com.ng"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tiktok} alt="TikTok" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61571319971338"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/lynspeed.com.ng/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={insta} alt="Instagram" />
            </a>
            <a
              href="https://x.com/lynspeedtech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twiter} alt="X" />
            </a>

          </div>


        </div>
      </div>

      <div className="footer-copyright">
        <div className="space"></div>
        <p>&copy; 2025 Lynspeed. All Rights Reserved.</p>
        <p>
          Powered by <strong>LYNOG TECH NIG</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
