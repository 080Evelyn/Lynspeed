import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { questionsQuiz } from "../../../../utils/questions";
import { useState } from "react";

const Quiz = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<string[]>([]); // Keeps a stack of visited questions

  const current = questionsQuiz[currentQuestionId];

  const handleSelect = (optionId: string, nextId: string) => {
    // Store the selected answer
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));

    // Push current question to history
    setHistory((prev) => [...prev, currentQuestionId]);

    // Move to next question
    setCurrentQuestionId(nextId);
  };

  const handlePrevious = () => {
    // Avoid going back if history is empty
    if (history.length === 0) return;

    // Clone the history stack
    const newHistory = [...history];
    const prevQuestionId = newHistory.pop();

    // Update state safely
    if (prevQuestionId) {
      setHistory(newHistory);
      setCurrentQuestionId(prevQuestionId);
    }
  };

  const handleNext = () => {
    const selectedOptionId = answers[current.id];
    const selectedOption = current.options.find(
      (opt) => opt.id === selectedOptionId
    );
    const nextId = selectedOption?.next;

    if (nextId) {
      setHistory((prev) => [...prev, currentQuestionId]);
      setCurrentQuestionId(nextId);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen  md:min-h-screen w-full bg-gray-100 p-4">
      <Link
        className="absolute top-[50px] flex items-center md:left-[100px]"
        to={"/dashboard"}>
        <IoArrowBack />
        Back to homepage
      </Link>
      {currentQuestionId && (
        <div className=" max-w-4xl bg-white !mt-22 md:!mt-0 rounded-xl !p-6 md:!p-20 w-[90%] m-auto md:w-[60%] shadow-2xl ">
          <p className="text-sm text-gray-500">{current?.step}</p>
          <h2 className="text-md text-[#0659a6] font-semibold mb-2">
            {current?.title}
          </h2>
          <h1 className=" text-xl font-bold mb-6">{current?.subtitle}</h1>
          <div className=" grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {/* NEVER mutate questions or options array */}
            {current?.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id, opt.next)}
                className={`border text-[13px] md:text-lg !p-2 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  answers[current.id] === opt.id
                    ? "bg-blue-100 border-blue-500 hover:!text-white"
                    : "hover:!bg-blue-50"
                }`}>
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between !mt-3">
            <button
              onClick={handlePrevious}
              disabled={history.length === 0}
              className="!px-4 !py-2 border hover:!bg-gray-100  rounded disabled:opacity-50">
              Previous Step
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[current?.id]}
              className="!px-4 !py-2 bg-[#0659a6] text-white rounded disabled:opacity-50">
              Next Step
            </button>
          </div>
        </div>
      )}

      {currentQuestionId === "" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-sm !p-6 text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              You’ve reached the end… for now.
            </h2>
            <p className="text-gray-600 !py-3">
              More exciting questions are coming soon to enhance your
              experience. Keep an eye out — we’ll let you know when it’s ready!
            </p>

            <div className="flex justify-between !mt-3">
              <button
                onClick={handlePrevious}
                disabled={history.length === 0}
                className="!px-4 !py-2 border hover:!bg-gray-100  rounded disabled:opacity-50">
                Previous Step
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
