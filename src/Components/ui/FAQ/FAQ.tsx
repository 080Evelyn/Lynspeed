import React, { useState } from 'react';
import "./FAQ.css"
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// FAQ Data Interface
interface FAQItem {
  question: string;
  answer: string;
}

// FAQ Component
const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I register for the JAMB simulation?',
      answer: 'You can register by signing up on our platform using your email and personal details. Once registered, you can log in to access the simulation tests.',
    },
    {
      question: 'Is it important to study past questions?',
      answer: 'Yes, studying past questions helps you understand the question patterns and prepares you effectively for the real JAMB exam.',
    },
    {
      question: 'How can I manage my time during the simulation?',
      answer: 'The simulation includes a timer for each test. Practice completing each section within the allocated time to improve your time management skills.',
    },
    {
      question: 'Can I view my performance history?',
      answer: 'Yes, you can access your performance history on the dashboard under the "Result History" section.',
    },
    {
      question: 'How much does the JAMB simulation cost?',
      answer: 'The cost depends on the package you choose. Check our pricing page for details about available plans.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <><Navbar /><div className="faq-container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
              {faqs.map((faq, index) => (
                  <div
                      key={index}
                      className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                  >
                      <div
                          className="faq-question"
                          onClick={() => toggleFAQ(index)}
                      >
                          {faq.question}
                          <span className="faq-toggle">
                              {activeIndex === index ? '-' : '+'}
                          </span>
                      </div>
                      {activeIndex === index && (
                          <div className="faq-answer">
                              {faq.answer}
                          </div>
                      )}
                  </div>
              ))}
          </div>
      </div>
      <Footer/>
      </>
  );
};

export default FAQ;
