import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What if I don’t know what my strengths are? ",
    answer:
      "That’s exactly what the career quiz is designed for, to help you discover your strengths and where you naturally shine.",
  },
  {
    question: "What if the career suggested to me is not interesting to me? ",
    answer:
      "That could mean your quiz answers weren’t fully accurate. Try retaking the quiz and answer as sincerely as possible for better results.",
    // (
    //   <>
    //     We cover a wide range of subjects, including:
    //     <ul className="list-none mt-2 space-y-1">
    //       <li>📘 Mathematics</li>
    //       <li>📖 English Language</li>
    //       <li>🧬 Science</li>
    //       <li>🌍 Social Studies</li>
    //       <li>💻 Computer Science</li>
    //       <li>… and many more!</li>
    //     </ul>
    //   </>
    // ),
  },
  {
    question:
      "What are the benefits of having a career mentor or how do I choose the right mentor?",
    answer:
      "A mentor makes your journey easier by sharing real experiences and guidance. Choose someone whose path aligns with your goals and who inspires you.",
  },
  {
    question: "Can I change my mentor if I don’t like him/her? ",
    answer:
      "Yes, you can Just reach out to our support team with a valid reason, and we’ll help you make the switch.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(1); // open 2nd question by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-white !py-6 md:!py-16 ">
      <div className="w-[90%] !mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-6">
            Find answers to your queries on how to make the most out of
            Lynspeed’s features for a personalized learning experience.
          </p>
          <Link
            to="/faq"
            className="text-blue-600 font-medium underline hover:text-blue-800">
            See more FAQs
          </Link>
        </div>

        {/* Right Accordion */}
        <div className="!space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-gray-200 ">
              <button
                onClick={() => toggle(i)}
                className={`w-full text-left !px-6 !py-4 flex items-center justify-between hover:!text-white ${
                  openIndex === i ? "bg-blue-50" : "bg-gray-50"
                }`}>
                <span className="font-medium text-gray-400 hover:!text-white">
                  {faq.question}
                </span>
                {openIndex === i ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              {openIndex === i && faq.answer && (
                <div className="!px-6 !py-4 bg-blue-50 text-gray-700 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Optional illustration */}
      {/* <div className="mt-10 md:mt-16 flex justify-center">
        <img
          src="/faq-illustration.png" 
          alt="FAQ Illustration"
          className="max-h-72 object-contain"
        />
      </div> */}
    </section>
  );
};

export default FaqSection;
