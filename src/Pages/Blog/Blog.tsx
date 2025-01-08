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
      {/* Add SEO meta tags */}
      <head>
        <title>LYNSPEED Blog | JAMB Success Tips & Guides</title>
        <meta
          name="description"
          content="Explore tips, guides, and strategies for JAMB success. Learn how to pass with flying colors, study past questions, avoid common mistakes, and manage time effectively."
        />
        <meta
          name="keywords"
          content="JAMB simulation, JAMB success tips, passing JAMB, JAMB time management, JAMB mistakes, JAMB past questions"
        />
        <meta name="author" content="LYNOG TECH NIG" />
      </head>

      <div className="blog-content">
        <div className="header">
          <h2> Blog</h2>
         
        </div>

        {/* Blog sections */}
        <div className="section">
          <img
            src={blogpic1}
            alt="Guide on how to pass JAMB with flying colors"
          />
          <div className="top">
            <h2>How to Pass JAMB with Flying Colours</h2>
            <p>
              Passing JAMB in flying colours requires planning and consistent
              execution. This includes understanding the JAMB syllabus,
              scheduling study time, familiarizing yourself with JAMB past
              questions, and ensuring all topics are covered while focusing on
              weak subjects. Time management is key, and practicing with JAMB
              simulations like Lynspeed can improve speed, accuracy, and
              confidence while identifying areas of weakness. Stay calm, rest,
              and pray for a smooth exam day.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="top">
            <h2>Is it Important to Study JAMB Past Questions?</h2>
            <p>
              Absolutely! Studying past questions is crucial for exam success
              as it highlights frequently asked topics, familiarizes you with
              the exam format, and provides insights into how questions are
              structured.
            </p>
          </div>
          <img
            src={blogpic2}
            alt="Importance of studying JAMB past questions"
          />
        </div>

        <div className="section">
          <img
            src={blogpic3}
            alt="Common mistakes students make during JAMB exams"
          />
          <div className="top">
            <h2>Common Mistakes Students Make in JAMB</h2>
            <p>
              Some common mistakes include failing to read instructions
              carefully, starting with difficult questions, poor time
              management, lack of sufficient practice with JAMB simulations or
              past questions, and succumbing to fear or anxiety.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="top">
            <h2>How to Manage Time During JAMB Exams</h2>
            <p>
              Time management is crucial. Start with the easiest questions,
              leaving the harder ones for later. Allocate time to each section
              based on the number of questions, and monitor the timer closely.
              Avoid spending too much time on a single question to maximize
              efficiency.
            </p>
          </div>
          <img
            src={blogpic4}
            alt="Tips for effective time management during exams"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
