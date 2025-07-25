/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "./Test.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../State/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { fetchTestQuestions } from "../../../../State/TestQuestionSlice";
import FloatingCalculator from "../../../../Components/FloatingCalculator";

const Test: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Getting questions and subjects from Redux store
  const questionsArray = useSelector(
    (state: RootState) => state.testQuestions.data
  );
  const loading = useSelector(
    (state: RootState) => state.testQuestions.loading
  );
  const error = useSelector((state: RootState) => state.testQuestions.error);
  const questions = questionsArray?.subjects;

  const testSectionId = questionsArray?.test_session_id;

  const savedSubjects = useSelector(
    (state: RootState) => state.savedSubjectList.data
  );

  const subjects = savedSubjects.map((sub: any) => sub.name);
  const [currentSubject, setCurrentSubject] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [subjectIndex: number]: { [questionIndex: number]: string };
  }>({});
  const [response, setResponse] = useState<Response[]>([]);
  //response to be sent to the backend
  const [submitting, setSubmitting] = useState<boolean>(false);
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
  useEffect(() => {
    dispatch(fetchTestQuestions());
  }, [dispatch]);
  const handleSubjectChange = (index: number) => {
    setCurrentSubject(index);
    setCurrentQuestion(0);
  };
  const token = localStorage.getItem("authToken");
  const handleSubmit = async () => {
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (!isConfirmed) return;
    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/test-session/submit/`,
        {
          test_session_id: testSectionId,
          responses: response,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      setSubmitting(false);
      navigate("/testresult");
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error(
        "Something went wrong, check internet connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };
  const handleNext = () => {
    if (
      questions[currentSubject]?.worksheets[0]?.questions.length >
      currentQuestion + 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionSelect = (selected_option: string, question_id: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentSubject]: {
        ...(prev[currentSubject] || {}),
        [currentQuestion]: selected_option,
      },
    }));
    //handle response to be sent to the backend

    setResponse((prevAnswers: any) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer: any) => answer.question_id === question_id
      );

      if (existingAnswerIndex !== -1) {
        // Update the existing answer for this question
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { question_id, selected_option };
        return updatedAnswers;
      }

      // Add a new answer if no existing answer is found
      return [...prevAnswers, { question_id, selected_option }];
    });
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
    (questions &&
      questions[currentSubject]?.worksheets[0]?.questions
        ?.slice()
        ?.sort((a: any, b: any) => a.number - b.number) // Sort questions by 'number'
        ?.map((question: any, index: number) => ({
          ...question,
          displayNumber: index + 1, // Assign sequential display numbers
        }))) ||
    [];

  const currentOptions = currentQuestions[currentQuestion];

  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  const toggleCalculator = () => {
    setShowCalculator((prev) => !prev);
  };

  useEffect(() => {
    // Push a dummy state to the history stack
    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      // Redirect to a specific page
      navigate("/dashboard", { replace: true });
    };

    const onPopState = (_event: PopStateEvent) => {
      // Intercept the back button behavior
      handleBackButton();
    };

    // Add event listener for popstate
    window.addEventListener("popstate", onPopState);

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("popstate", onPopState);
    };
  }, [navigate]);

  return (
    <div className="test-container">
      {loading ? (
        <h2 style={{ textAlign: "center", paddingTop: "5px" }}>Loading...</h2>
      ) : !loading &&
        error &&
        error === "Request failed with status code 403" ? (
        <div className="sub-opt">
          <h2>You have exhausted your trials. Please subscribe to continue.</h2>
          <button>
            <Link to="/subscription" style={{ color: "white" }}>
              Subscription
            </Link>
          </button>
        </div>
      ) : !loading &&
        error &&
        error !== "Request failed with status code 403" ? (
        <h2>Something went wrong, check internet connection</h2>
      ) : (
        <>
          <div className="subject-tabs">
            {subjects.map((subject: string, index: number) => (
              <button
                key={subject}
                className={currentSubject === index ? "active" : ""}
                onClick={() => handleSubjectChange(index)}>
                {subject.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="timer">{formatTime(timeRemaining)}</div>

          {currentQuestions.length > 0 ? (
            <div className="question-section">
              <div className="question-counter">
                Question {currentQuestions[currentQuestion]?.displayNumber} /{" "}
                {currentQuestions.length}
              </div>
              <div className="question-text">{currentOptions?.text}</div>
              {currentOptions?.image && (
                <img
                  src={`https://lynspeed.pythonanywhere.com${currentOptions?.image}`}
                  alt="test_image"
                />
              )}

              <div className="options">
                {["option_a", "option_b", "option_c", "option_d"].map((key) => (
                  <label key={key}>
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      checked={
                        selectedAnswers[currentSubject]?.[currentQuestion] ===
                        `${key.split("_")[1].toUpperCase()}`
                      }
                      onChange={() =>
                        handleOptionSelect(
                          `${key.split("_")[1].toUpperCase()}`,
                          currentOptions.id
                        )
                      }
                    />
                    {`${key.split("_")[1].toUpperCase()}. ${
                      currentOptions?.[key]
                    }`}
                  </label>
                ))}
              </div>

              <div className="navigation-buttons">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}>
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestion >= currentQuestions.length - 1}>
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
                className={`${currentQuestion === index ? "active" : ""} ${
                  selectedAnswers[currentSubject]?.[index] ? "answered" : ""
                }`}
                onClick={() => setCurrentQuestion(index)}>
                {question.displayNumber}
              </button>
            ))}
          </div>
          <div>
            <div>
              <button onClick={toggleCalculator} className="calculator-toggle">
                {showCalculator ? "Hide Calculator" : "Show Calculator"}
              </button>

              {showCalculator && <FloatingCalculator />}
            </div>
          </div>
          <div className="submit-section">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="submit-button">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Test;
