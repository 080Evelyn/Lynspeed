import "./Blog.css";
import Footer from "../../Components/ui/Footer/Footer";
import Navbar from "../../Components/ui/Navbar/Navbar";
import blogpic1 from "../../assets/blogpic1.png";
import blogpic2 from "../../assets/logpic2.png";
import blogpic3 from "../../assets/blogpic3.png";
import blogpic4 from "../../assets/logpic4.png";

const Blog = () => {
  return (
    <>
      <Navbar />   
      <div className="blog-content">
        <div className="header">
          <h2>Blog</h2>
        </div>
        <div className="section">
          <img src={blogpic1} alt="passing JAMB" />
          <div className="top">
            <h2>How to pass JAMB with flying colours</h2>
            <p>
              Passing JAMB in flying colours requires planning and consistent
              execution. These entails understanding the JAMB syllabus,
              scheduling study time, familiarizing oneself with JAMB past
              questions, ensuring all topics are covered and focusing more on
              weak subjects. As time management is also the key to success in
              this exam, regular practice with JAMB simulations like Lynspeed
              would help improve speed and accuracy, boost confidence, and
              identify areas of weakness. Also, ensure to rest, stay calm during
              the exam and pray.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="top">
            <h2>Is it important to study Jamb past questions</h2>
            <p>
              Yes. The importance of studying past questions can not be
              overemphasized for exam success as it sheds light on frequently
              asked topics, exam format, and how questions are structured.
            </p>
          </div>
          <img src={blogpic2} alt="importance of past question" />
        </div>
        <div className="section">
          <img src={blogpic3} alt="common mistakes in JAMB" />
          <div className="top">
            <h2>Common mistakes students make in JAMB</h2>
            <p>
              The common mistake students make is failing to read instructions
              carefully, starting with difficult questions, time mismanagement,
              failing to sufficiently practice with JAMB simulation or past
              questions, allowing fear to creep in.
            </p>
          </div>
        </div>
        <div className="section">
          <div className="top">
            <h2>How to manage time during exam</h2>
            <p>
              Time management is crucial during the JAMB exam. Start by
              answering the questions you find easiest, leaving the difficult
              ones for later. Allocate a specific amount of time to each section
              based on its number of questions, and keep an eye on the timer.
              Avoid spending too much time on any single question.
            </p>
          </div>
          <img src={blogpic4} alt="time management" />
        </div>
  
      </div>
      <Footer />
    </>
  );
};

export default Blog;
