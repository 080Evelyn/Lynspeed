// Footer Component
import "./Footer.css";
import logo from "../../../assets/plainLogobrand.png";
import tiktok from "../../../assets/tiktok.png";
import insta from "../../../assets/Instagram.jpg";
import facebook from "../../../assets/facebook.png";
import twiter from "../../../assets/twitter.jpeg";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";

const whatsappGroupLink = "https://chat.whatsapp.com/KYaD5WJWx6b1jyYgHAiwXt";
const telegramGroupLink = "https://t.me/+ECkwP9Us1CE5Yjhk";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Website Logo" />
          <p>
            Lynspeed helps you pass JAMB, choose a career, learn skills, and
            grow with like-minded people. We combine exam prep, career guidance,
            and skill discovery — all in one place. Your growth starts here.
          </p>
        </div>

        <div className="footer-links">
          <p>
            <strong>Product</strong>
          </p>
          <ul>
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
          <p>
            <strong>Useful Links</strong>
          </p>
          <ul>
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
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer">
              Join Our WhatsApp Group
            </a>
          </div>

          <div className="footer-social">
            <a
              href="https://www.tiktok.com/@lynspeed.com.ng"
              target="_blank"
              rel="noopener noreferrer">
              <img src={tiktok} alt="TikTok" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61571319971338"
              target="_blank"
              rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/lynspeed.com.ng/"
              target="_blank"
              rel="noopener noreferrer">
              <img src={insta} alt="Instagram" />
            </a>
            <a
              href="https://x.com/lynspeedtech"
              target="_blank"
              rel="noopener noreferrer">
              <img src={twiter} alt="X" />
            </a>
            <a
              href={telegramGroupLink}
              target="_blank"
              rel="noopener noreferrer">
              <FaTelegram size={30} />
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
