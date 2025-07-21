import React from "react";
import { Link } from "react-router-dom";
import Bubbles from "../Bubbles/Bubbles";
import Footer from "../Footer/Footer";
import mage from "../../../assets/homeImage.png";
// import heroVideo from "../../../assets/siteTour.mp4";
import "./Hero.css";
import image1 from "../../../assets/Img3.png";
import image2 from "../../../assets/Img2.png";
import image3 from "../../../assets/Img1.png";
import image4 from "../../../assets/Frame3.png";
import SkillsCarousel from "../SkillsCarousel";
import CareerPath from "../CareerPath";
import MasterJamb from "../MasterJamb";
import StudentCommunity from "../StudentCommunity";
import FaqSection from "../FaqSection";

const Hero: React.FC = () => {
  return (
    <>
      <Bubbles />
      <section className="hero">
        <div className="left">
          <div className="max-w-[800px] !mt-[50px] b md:!mt-[-100px] !px-5">
            <h1 className="write1 text-[#0659a6] text-6xl  animate-text">
              From <span className="text-amber-700">Books</span>
              <br className="md:hidden" /> to
              <span className="!pl-3">Big</span> Moves
            </h1>
            <p className="write2 animate-subtext !mt-5">
              Grow With Purpose: Nigeria's Top Platform for JAMB Preparation,
              Skills & Career Growth.
            </p>
          </div>
          <div className="flex w-[300px] md:gap-2.5 !ml-[5%] justify-between ">
            {/* <Link to="/login" aria-label="Register for Lynspeed">
              <button className="border-[#0659a6] border text-[#0659a6] md:w-[200px] hover:!text-white animate-button cursor-pointer rounded-3xl !px-4 !py-2">
                Start Free Trial
              </button>
            </Link> */}
            <Link to="/register" aria-label="Register for Lynspeed">
              <button className="bg-[#0659a6]   text-[#fff] w-[150px] md:w-[200px]  animate-button cursor-pointer rounded-3xl !px-4 !py-2">
                Get Started
              </button>
            </Link>
          </div>

          {/* Video Section */}
          {/* <div className="video-container">
            <video className="hero-video" controls>
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="video-description">
              How to register, log in, and take a test on Lynspeed.
            </p>
          </div> */}
        </div>
        <div
          className="animate-image relative md:left-[5%] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full"
          role="img"
          aria-label="Student taking exam"
          tabIndex={0}
          style={{
            background:
              "radial-gradient(circle, #fffacd 0%, #ffe066 35%, #ffcc00 65%, transparent 100%)",
          }}>
          <img
            className="md:relative h-[300px] md:!h-[700px] md:!bottom-[50px] md:!left-[50px]"
            src={mage}
            alt="homepic"
          />
        </div>
      </section>
      {/* career path section */}
      <section id="career-guidance">
        <CareerPath img={image4} />
      </section>
      {/* master jamb section */}
      <section id="jamb-simulation">
        <MasterJamb img1={image1} img2={image2} img3={image3} />
      </section>
      {/* skills section */}
      <section id="skill-discovery">
        <SkillsCarousel />
      </section>
      {/* student community section */}
      <section id="our-tribe">
        <StudentCommunity />
      </section>
      {/* faq section */}

      <FaqSection />
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Hero;
