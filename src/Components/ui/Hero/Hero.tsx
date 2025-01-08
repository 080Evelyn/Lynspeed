import React from 'react';
import { Link } from 'react-router-dom';
import Bubbles from '../Bubbles/Bubbles';
import Footer from '../Footer/Footer';
import mage from '../../../assets/homeImage.png';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <>
      <Bubbles />
      <div className="hero">
        <div className="left">
          <div className="write-up">
            <p className="write1 animate-text">
              <b>JAMB</b> made <br />
              <span>easy </span>for <b>you</b>
            </p>
            <p className="write2 animate-subtext">
              Ace your JAMB with Lynspeed! Simulate exams, get instant feedback, and track progress.
            </p>
          </div>
          <div className="reg animate-button">
            <Link to="/register" aria-label="Register for Lynspeed">Register</Link>
          </div>
        </div>
        <div className="pic animate-image" role="img" aria-label="Student taking exam" tabIndex={0}>
          <img src={mage} alt="homepic" />
        </div>
      </div>
      <div className="foot">
        <Footer />
      </div>
    </>
  );
};

export default Hero;
