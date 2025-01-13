import React, { useState } from "react";
import "./CorrectioPage.css";
import { RootState } from "../../../../State/Store";
import { useSelector } from "react-redux";

interface Question {
  user_response: any;
  option: string;
  question: any;
  options: string[];
  correct_option: string;
  selected: string;
}

const CorrectionPage: React.FC = () => {
  //getting the testresults data from redux store
  const testResult = useSelector((state: RootState) => state.testResult.data);

  const subjects = testResult.subjects;

  const question1: Question[] =
    testResult.failed_questions_by_subject[subjects[0]];

  const question2: Question[] =
    testResult.failed_questions_by_subject[subjects[1]];

  const question3: Question[] =
    testResult.failed_questions_by_subject[subjects[2]];

  const question4: Question[] =
    testResult.failed_questions_by_subject[subjects[3]];
  const [showRecommendations, setShowRecommendations] = useState(false);

  const recommendations = [
    // "Read more on synonyms and antonyms.",
    // "Study maps and capitals for geography.",
    "COMING SOON!"
  ];

  if (showRecommendations) {
    return (
      <div className="recommendation-page">
        <h2>Recommendations</h2>
        <ul className="recommendation-list">
          {recommendations.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
        <button
          className="back-button"
          onClick={() => setShowRecommendations(false)}>
          Back to Corrections
        </button>
      </div>
    );
  }

  return (
    <div className="correction-page">
      
      <div className="cat">
              <span
                className="back-arrow"
                onClick={() => window.history.back()}>
                ←
              </span>
              <h2>Corrections</h2>
            </div>

      {/* first subject */}
      <h3>{subjects[0]}</h3>
      {question1?.map((q, index) => (
        <div key={index} className="question-card">
          <p className="question-text">
            {index + 1}. {q.question.text}
          </p>
          {q.question.image && (
            <img
              src={`https://lynspeed.pythonanywhere.com${q.question?.image}`}
              alt="test_image"
            />
          )}
          <ul className="options-list">
            {["option_a", "option_b", "option_c", "option_d"].map(
              (option: any) => (
                <li
                  key={option}
                  className={`option-item ${
                    option.split("_")[1].toUpperCase() === q.correct_option
                      ? "correct"
                      : option.split("_")[1].toUpperCase() ===
                        q.user_response?.selected_option
                      ? "wrong"
                      : ""
                  }`}>
                  {`${option.split("_")[1].toUpperCase()}. ${
                    q.question[option]
                  }`}
                  {option === q.correct_option && (
                    <span className="icon correct-icon">✅</span>
                  )}
                  {option === q.selected && option !== q.correct_option && (
                    <span className="icon wrong-icon">❌</span>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      ))}

      {/* second subject */}
      <h3>{subjects[1]}</h3>
      {question2?.map((q, index) => (
        <div key={index} className="question-card">
          <p className="question-text">
            {index + 1}. {q.question.text}
          </p>
          {q.question.image && (
            <img
              src={`https://lynspeed.pythonanywhere.com${q.question?.image}`}
              alt="test_image"
            />
          )}
          <ul className="options-list">
            {["option_a", "option_b", "option_c", "option_d"].map(
              (option: any) => (
                <li
                  key={option}
                  className={`option-item ${
                    option.split("_")[1].toUpperCase() === q.correct_option
                      ? "correct"
                      : option.split("_")[1].toUpperCase() ===
                        q.user_response?.selected_option
                      ? "wrong"
                      : ""
                  }`}>
                  {`${option.split("_")[1].toUpperCase()}. ${
                    q.question[option]
                  }`}
                  {option === q.correct_option && (
                    <span className="icon correct-icon">✅</span>
                  )}
                  {option === q.selected && option !== q.correct_option && (
                    <span className="icon wrong-icon">❌</span>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      ))}

      {/* third subject */}
      <h3>{subjects[2]}</h3>
      {question3?.map((q, index) => (
        <div key={index} className="question-card">
          <p className="question-text">
            {index + 1}. {q.question.text}
          </p>
          {q.question.image && (
            <img
              src={`https://lynspeed.pythonanywhere.com${q.question?.image}`}
              alt="test_image"
            />
          )}
          <ul className="options-list">
            {["option_a", "option_b", "option_c", "option_d"].map(
              (option: any) => (
                <li
                  key={option}
                  className={`option-item ${
                    option.split("_")[1].toUpperCase() === q.correct_option
                      ? "correct"
                      : option.split("_")[1].toUpperCase() ===
                        q.user_response?.selected_option
                      ? "wrong"
                      : ""
                  }`}>
                  {`${option.split("_")[1].toUpperCase()}. ${
                    q.question[option]
                  }`}
                  {option === q.correct_option && (
                    <span className="icon correct-icon">✅</span>
                  )}
                  {option === q.selected && option !== q.correct_option && (
                    <span className="icon wrong-icon">❌</span>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      ))}

      {/* fourth subject */}
      {/* third subject */}
      <h3>{subjects[3]}</h3>
      {question4?.map((q, index) => (
        <div key={index} className="question-card">
          <p className="question-text">
            {index + 1}. {q.question.text}
          </p>
          {q.question.image && (
            <img
              src={`https://lynspeed.pythonanywhere.com${q.question?.image}`}
              alt="test_image"
            />
          )}
          <ul className="options-list">
            {["option_a", "option_b", "option_c", "option_d"].map(
              (option: any) => (
                <li
                  key={option}
                  className={`option-item ${
                    option.split("_")[1].toUpperCase() === q.correct_option
                      ? "correct"
                      : option.split("_")[1].toUpperCase() ===
                        q.user_response?.selected_option
                      ? "wrong"
                      : ""
                  }`}>
                  {`${option.split("_")[1].toUpperCase()}. ${
                    q.question[option]
                  }`}
                  {option === q.correct_option && (
                    <span className="icon correct-icon">✅</span>
                  )}
                  {option === q.selected && option !== q.correct_option && (
                    <span className="icon wrong-icon">❌</span>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      ))}
      <button
        className="view-recommendation-button"
        onClick={() => setShowRecommendations(true)}>
        View Recommendations
      </button>
    </div>
  );
};

export default CorrectionPage;
