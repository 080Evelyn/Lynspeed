import React, { useState } from "react";
import "./CorrectioPage.css";

interface Question {
  question: string;
  options: string[];
  correct: number;
  selected: number;
}

const CorrectionPage: React.FC = () => {
  const [showRecommendations, setShowRecommendations] = useState(false);

  const questions: Question[] = [
    {
      question: "What is the synonym of 'happy'?",
      options: ["Sad", "Joyful", "Angry", "Upset"],
      correct: 1,
      selected: 3,
    },
    {
      question: "Which is the capital of Nigeria?",
      options: ["Lagos", "Abuja", "Port Harcourt", "Kano"],
      correct: 1,
      selected: 0,
    },
  ];

  const recommendations = [
    "Read more on synonyms and antonyms.",
    "Study maps and capitals for geography.",
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
          onClick={() => setShowRecommendations(false)}
        >
          Back to Corrections
        </button>
      </div>
    );
  }

  return (
    <div className="correction-page">
      <h2>Corrections</h2>
      {questions.map((q, index) => (
        <div key={index} className="question-card">
          <p className="question-text">
            {index + 1}. {q.question}
          </p>
          <ul className="options-list">
            {q.options.map((option, i) => (
              <li
                key={i}
                className={`option-item ${
                  i === q.correct ? "correct" : i === q.selected ? "wrong" : ""
                }`}
              >
                {option}
                {i === q.correct && <span className="icon correct-icon">✅</span>}
                {i === q.selected && i !== q.correct && (
                  <span className="icon wrong-icon">❌</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        className="view-recommendation-button"
        onClick={() => setShowRecommendations(true)}
      >
        View Recommendations
      </button>
    </div>
  );
};

export default CorrectionPage;
