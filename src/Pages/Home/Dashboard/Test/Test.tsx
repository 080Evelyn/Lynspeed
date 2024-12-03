import React, { useState, useEffect } from "react";
import "./Test.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../State/Store";

const Test: React.FC = () => {
  // Getting questions and subjects from Redux store
  const questions = useSelector((state: RootState) => state.testQuestions.data);
  const savedSubjects = useSelector(
    (state: RootState) => state.savedSubjectList.data
  );

  const subjects = savedSubjects.map((sub: any) => sub.name);
  const [currentSubject, setCurrentSubject] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [subjectIndex: number]: { [questionIndex: number]: string };
  }>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(120 * 60); // 2 hours

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubjectChange = (index: number) => {
    setCurrentSubject(index);
    setCurrentQuestion(0);
  };

  const handleNext = () => {
    if (
      questions[currentSubject]?.worksheets[0]?.questions.length > currentQuestion + 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentSubject]: {
        ...(prev[currentSubject] || {}),
        [currentQuestion]: option,
      },
    }));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const currentQuestions = 
  questions[currentSubject]?.worksheets[0]?.questions
    ?.slice()
    ?.sort((a: any, b: any) => a.number - b.number) // Sort questions by 'number'
    ?.map((question: any, index: number) => ({
      ...question,
      displayNumber: index + 1, // Assign sequential display numbers
    })) || [];

const currentOptions = currentQuestions[currentQuestion];

return (
  <div className="test-container">
    <div className="subject-tabs">
      {subjects.map((subject, index) => (
        <button
          key={subject}
          className={currentSubject === index ? "active" : ""}
          onClick={() => handleSubjectChange(index)}
        >
          {subject.toUpperCase()}
        </button>
      ))}
    </div>

    <div className="timer">{formatTime(timeRemaining)}</div>

    {currentQuestions.length > 0 ? (
      <div className="question-section">
        <div className="question-counter">
          Question {currentQuestions[currentQuestion]?.displayNumber} / {currentQuestions.length}
        </div>
        <div className="question-text">{currentOptions?.text}</div>

        <div className="options">
          {["option_a", "option_b", "option_c", "option_d"].map((key) => (
            <label key={key}>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={
                  selectedAnswers[currentSubject]?.[currentQuestion] ===
                  currentOptions?.[key]
                }
                onChange={() => handleOptionSelect(currentOptions?.[key])}
              />
              {`${key.split("_")[1].toUpperCase()}. ${
                currentOptions?.[key]
              }`}
            </label>
          ))}
        </div>

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestion >= currentQuestions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    ) : (
      <p>No questions available for the selected subject.</p>
    )}

    <div className="question-grid">
      {currentQuestions.map((question: any, index: number) => (
        <button
          key={index}
          className={`${
            currentQuestion === index ? "active" : ""
          } ${selectedAnswers[currentSubject]?.[index] ? "answered" : ""}`}
          onClick={() => setCurrentQuestion(index)}
        >
          {question.displayNumber}
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
