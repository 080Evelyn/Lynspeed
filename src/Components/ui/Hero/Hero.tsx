import Bubbles from "../Bubbles/Bubbles";
import "./Hero.css";
import mage from "../../../assets/homeImage.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="mx-auto container px-4 mt-32 md:mt-0">
      <Bubbles />
      <div className="hero">
        <div className="left">
          <div className="write-up">
            <p className="write1 animate-text">
              <b>JAMB</b> made <br></br>
              <span>easy </span>for <b>you</b>
            </p>
            <p className="write2 animate-subtext max-w-md">
              Ace your JAMB with Lynspeed! Simulate exams, get instant feedback,
              and track progress.
            </p>
          </div>
          <div className="reg animate-button">
            <Link to="/register">Register</Link>
          </div>
        </div>
        <div className="pic animate-image hidden md:block">
          <img src={mage} alt="homepic" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
