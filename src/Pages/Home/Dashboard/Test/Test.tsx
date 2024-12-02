import React, { useState, useEffect } from "react";
import "./Test.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../State/Store";

// Define the structure of each question
// interface Question {
//   id: number;
//   question: string;
//   options: string[];
// }

// Define the structure for questionsPerSubject
// interface QuestionsPerSubject {
//   [key: string]: Question[];
// }

const Test: React.FC = () => {
  // const subjects = ["Use of English", "Mathematics", "Physics", "Chemistry"];

  // const questionsPerSubject: QuestionsPerSubject = {
  //   "Use of English": [
  //     {
  //       id: 1,
  //       question:
  //         "English Lorem ipsum dolor sit amet consectetur. Use of English question 1.",
  //       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  //     },
  //     {
  //       id: 2,
  //       question:
  //         "English Lorem ipsum dolor sit amet consectetur. Use of English question 1.",
  //       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  //     },
  //     // Add more questions
  //   ],
  //   Mathematics: [
  //     {
  //       id: 1,
  //       question:
  //         "Maths Lorem ipsum dolor sit amet consectetur. Mathematics question 1.",
  //       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  //     },
  //     // Add more questions
  //   ],
  //   Physics: [
  //     {
  //       id: 1,
  //       question:
  //         "Physics Lorem ipsum dolor sit amet consectetur. Physics question 1.",
  //       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  //     },
  //     {
  //       id: 2,
  //       question:
  //         "Physics Lorem ipsum dolor sit amet consectetur. Physics question 1.",
  //       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  //     },
  //     // Add more questions
  //   ],
  //   Chemistry: [
  //     {
  //       id: 1,
  //       question:
  //         "Chemistry Lorem ipsum dolor sit amet consectetur. Chemistry question 1.",
  //       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  //     },
  //     {
  //       id: 2,
  //       question:
  //         "Chemistry Lorem ipsum dolor sit amet consectetur. Chemistry question 1.",
  //       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  //     },
  //     // Add more questions
  //   ],
  // };

  //getting the questions from redux store
  const question = useSelector((state: RootState) => state.testQuestions.data);
  // getting the subjectList states from redux store
  const savedSubjects = useSelector(
    (state: RootState) => state.savedSubjectList.data
  );
  const subjects = savedSubjects.map((sub: any) => {
    return sub.name;
  });

  const [currentSubject, setCurrentSubject] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [
    selectedAnswers,
    // setSelectedAnswers
  ] = useState<{
    [key: string]: { [key: number]: number };
  }>({});
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

  const handleSubjectChange = (i: any) => {
    setCurrentSubject(i);
    setCurrentQuestion(0);
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleNext = () => {
    // if (currentQuestion < questionsPerSubject[currentSubject].length - 1) {
    //   setCurrentQuestion(currentQuestion + 1);
    // }
    if (
      currentQuestion <
      question[currentSubject]?.worksheets[0].questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // const handleOptionSelect = (optionIndex: number) => {
  //   setSelectedAnswers({
  //     ...selectedAnswers,
  //     [currentSubject]: {
  //       ...(selectedAnswers[currentSubject] || {}),
  //       [currentQuestion]: optionIndex,
  //     },
  //   });
  // };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="test-container">
      <div className="subject-tabs">
        {subjects.map((subjects: any, i: any) => (
          <button
            key={subjects}
            className={currentSubject === i ? "active" : ""}
            onClick={() => handleSubjectChange(i)}>
            {subjects}
          </button>
        ))}
      </div>

      <div className="timer">{formatTime(timeRemaining)}</div>

      <div className="question-section">
        <div className="question-counter">
          {/* {currentQuestion + 1} / {questionsPerSubject[currentSubject].length} */}
        </div>
        <div className="question-text">
          {/* {questionsPerSubject[currentSubject][currentQuestion].question} */}
          {
            question[currentSubject]?.worksheets[0]?.questions[currentQuestion]
              .text
          }
        </div>

        {/* <div className="options">
          {question[currentSubject].worksheets[0]?.questions[
            currentQuestion
          ].map((option: any, idx: any) => (
            <label key={idx}>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={
                  selectedAnswers[currentSubject]?.[currentQuestion] === idx
                }
                onChange={() => handleOptionSelect(idx)}
              />
              {String.fromCharCode(65 + idx)}. {option}
            </label>
          ))}
        </div> */}
        <div className="options">
          {question[currentSubject].worksheets[0]?.questions[
            currentQuestion
          ] && (
            <>
              <label>
                <input
                  type="radio"
                  name={`question-${question[currentSubject].worksheets[0]?.questions[currentQuestion].option_a}`}
                  // checked={
                  //   selectedAnswers[currentSubject]?.[currentQuestion] === idx
                  // }
                  checked={false}
                  // onChange={() => handleOptionSelect(idx)}
                />
                {/* {String.fromCharCode(65 + idx)}. */}
                {
                  question[currentSubject].worksheets[0]?.questions[
                    currentQuestion
                  ].option_a
                }
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${question[currentSubject].worksheets[0]?.questions[currentQuestion].option_b}`}
                  // checked={
                  //   selectedAnswers[currentSubject]?.[currentQuestion] === idx
                  // }
                  checked={false}
                  // onChange={() => handleOptionSelect(idx)}
                />
                {/* {String.fromCharCode(65 + idx)}. */}
                {
                  question[currentSubject].worksheets[0]?.questions[
                    currentQuestion
                  ].option_b
                }
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${question[currentSubject].worksheets[0]?.questions[currentQuestion].option_c}`}
                  // checked={
                  //   selectedAnswers[currentSubject]?.[currentQuestion] === idx
                  // }
                  checked={false}
                  // onChange={() => handleOptionSelect(idx)}
                />
                {/* {String.fromCharCode(65 + idx)}. */}
                {
                  question[currentSubject].worksheets[0]?.questions[
                    currentQuestion
                  ].option_c
                }
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${question[currentSubject].worksheets[0]?.questions[currentQuestion].option_d}`}
                  // checked={
                  //   selectedAnswers[currentSubject]?.[currentQuestion] === idx
                  // }
                  checked={false}
                  // onChange={() => handleOptionSelect(idx)}
                />
                {/* {String.fromCharCode(65 + idx)}. */}
                {
                  question[currentSubject].worksheets[0]?.questions[
                    currentQuestion
                  ].option_d
                }
              </label>
            </>
          )}
        </div>

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            // disabled={currentQuestion === question[currentSubject].length - 1}
            disabled={
              currentQuestion ===
              question[currentSubject].worksheets[currentQuestion]?.questions
                .length -
                1
            }>
            Next
          </button>
        </div>
      </div>

      <div className="question-grid">
        {question[currentSubject].worksheets[0]?.questions.map(
          (_: any, i: any) => (
            <button
              key={i}
              className={`${currentQuestion === i ? "active" : ""} ${
                selectedAnswers[currentSubject]?.[i] !== undefined
                  ? "answered"
                  : ""
              }`}
              onClick={() => handleQuestionChange(i)}>
              {i + 1}
            </button>
          )
        )}
      </div>

      <div className="submit-section">
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default Test;
