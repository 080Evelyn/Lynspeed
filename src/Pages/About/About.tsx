import Navbar from "../../Components/ui/Navbar/Navbar";
import "./About.css";
import pic1 from "../../assets/aboutImage1.png";
import choose from "../../assets/Whychoose.png";
import Footer from "../../Components/ui/Footer/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-us-container">
        <h3>About Us</h3>
        <div className="fir">
          <p>
            <span className="highlighted-text">Lynspeed</span> is a
            comprehensive platform designed to help students excel in the Joint
            Admissions and Matriculation Board (JAMB) examinations through a
            variety of innovative features.
          </p>
          <img src={pic1} alt="About image" />
        </div>

        <section className="features-section">
          <h3>Our key features</h3>
          <div className="features-grid">
            <div className="feature-block">
              <h3>Extensive Question Bank</h3>
              <p>
                Collection of questions for use in examination, and it is
                classified depending on the subjects. Question banks are boon
                for students who want to focus on practicing previous exam
                questions. It also helps them score excellently in examinations
                with thorough practice of probable questions.
              </p>
            </div>

            <div className="feature-block">
              <h3>Subject Selection</h3>
              <p>
                This is designed for students to choose the right subject for
                the right course of study, varieties of subjects are displayed
                for students to pick 4 core subjects in respect to what they
                want to study in an institution.
              </p>
            </div>

            <div className="feature-block">
              <h3>Simulated Questions</h3>
              <p>
                The platform simulates the actual JAMB exam environment by
                offering a fixed number of questions (180) to be completed
                within a set time (120 minutes)
              </p>
            </div>

            <div className="feature-block">
              <h3>Realistic Practice</h3>
              <p>
                This setup helps students get accustomed to the time pressure
                and question variety they will encounter during the actual exam.
              </p>
            </div>

            <div className="feature-block">
              <h3>Results</h3>
              <p>
                Scores are provided for each subject, allowing students to see
                which areas they excel in and which need improvement.
              </p>
            </div>

            <div className="feature-block">
              <h3>Correction and Recommendation</h3>
              <p>
                Incorrect answers are displayed with corrections and
                recommendations. The platform suggests specific topics for
                further focused study to address areas of weakness and aid in
                learning from mistakes.
              </p>
            </div>

            <div className="feature-block">
              <h3>Achievement Milestone</h3>
              <p>
                The platform sets achievement milestones, which act as
                motivational tools to encourage continuous practice and
                improvement.
              </p>
            </div>

            <div className="feature-block">
              <h3>Visual Progressive Tracking</h3>
              <p>
                It provides charts and graphs to visualize performance over
                time, making it easier to track improvement and understand
                trends.
              </p>
            </div>
          </div>
        </section>

        <section className="why-choose-us">
          <h3>Why choose us</h3>
          <div className="chose">
            <ul className="why-list">
              <li>
                <strong>Exam Familiarity</strong>: By simulating the actual JAMB
                exam, it helps students become familiar with the format,
                reducing exam anxiety.
              </li>
              <li>
                <strong>Focused Study</strong>: The detailed feedback and
                personalized recommendations ensure that students spend their
                study time efficiently, focusing on areas that need improvement.
              </li>
              <li>
                <strong>Motivation</strong>: Achievement milestones and visual
                progress tracking keep students motivated and engaged in their
                preparation.
              </li>

              <li>
                <strong>Continuous Improvement </strong>: Regular practice with
                instant feedback leads to continuous improvement, helping
                students to steadily increase their scores over time.
              </li>
            </ul>

            <div className="image-section">
              <img
                src={choose}
                alt="why choose us"
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
