import React, { useState, useEffect } from 'react';
import "./Test.css";

// Define the structure of each question
interface Question {
  id: number;
  question: string;
  options: string[];
}

// Define the structure for questionsPerSubject
interface QuestionsPerSubject {
  [key: string]: Question[];
}

const Test: React.FC = () => {
  const subjects = ["Use of English", "Mathematics", "Physics", "Chemistry"];

  const questionsPerSubject: QuestionsPerSubject = {
    "Use of English": [
      {
        id: 1,
        question: "English Lorem ipsum dolor sit amet consectetur. Use of English question 1.",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      },
      {
        id: 2,
        question: "English Lorem ipsum dolor sit amet consectetur. Use of English question 1.",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      },
      // Add more questions
    ],
    "Mathematics": [
      {
        id: 1,
        question: "Maths Lorem ipsum dolor sit amet consectetur. Mathematics question 1.",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      },
      // Add more questions
    ],
    "Physics": [
      {
        id: 1,
        question: "Physics Lorem ipsum dolor sit amet consectetur. Physics question 1.",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      },
      {
        id: 2,
        question: "Physics Lorem ipsum dolor sit amet consectetur. Physics question 1.",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      },
      // Add more questions
    ],
    "Chemistry": [
      {
        id: 1,
        question: "Chemistry Lorem ipsum dolor sit amet consectetur. Chemistry question 1.",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      },
      {
        id: 2,
        question: "Chemistry Lorem ipsum dolor sit amet consectetur. Chemistry question 1.",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      },
      // Add more questions
    ],
  };

  const [currentSubject, setCurrentSubject] = useState<string>("Use of English");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: { [key: number]: number } }>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(120 * 60); // 180 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubjectChange = (subject: string) => {
    setCurrentSubject(subject);
    setCurrentQuestion(0);
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleNext = () => {
    if (currentQuestion < questionsPerSubject[currentSubject].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentSubject]: {
        ...(selectedAnswers[currentSubject] || {}),
        [currentQuestion]: optionIndex,
      },
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="test-container">
      <div className="subject-tabs">
        {subjects.map((subject) => (
          <button
            key={subject}
            className={currentSubject === subject ? "active" : ""}
            onClick={() => handleSubjectChange(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="timer">{formatTime(timeRemaining)}</div>

      <div className="question-section">
        <div className="question-counter">
          {currentQuestion + 1} / {questionsPerSubject[currentSubject].length}
        </div>
        <div className="question-text">
          {questionsPerSubject[currentSubject][currentQuestion].question}
        </div>

        <div className="options">
          {questionsPerSubject[currentSubject][currentQuestion].options.map((option, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={selectedAnswers[currentSubject]?.[currentQuestion] === idx}
                onChange={() => handleOptionSelect(idx)}
              />
              {String.fromCharCode(65 + idx)}. {option}
            </label>
          ))}
        </div>

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestion === questionsPerSubject[currentSubject].length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <div className="question-grid">
        {questionsPerSubject[currentSubject].map((_, i) => (
          <button
            key={i}
            className={`${currentQuestion === i ? "active" : ""} ${
              selectedAnswers[currentSubject]?.[i] !== undefined ? "answered" : ""
            }`}
            onClick={() => handleQuestionChange(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="submit-section">
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default Test;
