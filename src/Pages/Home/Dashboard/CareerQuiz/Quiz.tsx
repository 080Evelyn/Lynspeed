import { Link } from "react-router-dom";
import { questionsQuiz } from "../../../../utils/questions";
import { useEffect, useState } from "react";
import Sidebar from "../../../../Components/Sidebar";

const Quiz = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [showLinks, setShowLinks] = useState<Boolean>(false);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<string[]>([]); // Keeps a stack of visited questions
  const [no, setNo] = useState<Boolean>(false);
  const [yes, setYes] = useState<Boolean>(false);
  const current = questionsQuiz[currentQuestionId];

  const handleSelect = (optionId: string, nextId: string) => {
    // Store the selected answer
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));

    // Push current question to history
    setHistory((prev) => [...prev, currentQuestionId]);

    // Move to next question
    setCurrentQuestionId(nextId);
  };
  // Store final answers in localStorage when the quiz ends
  useEffect(() => {
    const entries = Object.entries(answers);
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      const [_, lastValue] = lastEntry;
      if (currentQuestionId === "") {
        localStorage.setItem("selectedCareer", lastValue);
      }
    } else {
      console.log("No answers yet.");
    }
  }, [currentQuestionId, answers]);
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
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center items-center h-screen  md:min-h-screen w-full bg-gray-100 p-4">
        {currentQuestionId && (
          <div className=" max-w-4xl bg-white max-h-[600px] !mt-22 md:!mt-0 rounded-xl !p-6  w-[90%] m-auto md:w-[60%] shadow-2xl ">
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
              {!yes && !no && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800">
                    ARE YOU SURE OF YOUR ANSWERS?
                  </h2>

                  <div className="flex justify-between !mt-3">
                    <button
                      onClick={() => {
                        setNo(!no);
                        setYes(false);
                      }}
                      disabled={history.length === 0}
                      className="!px-4 !py-2 border hover:!bg-gray-100  rounded disabled:opacity-50">
                      No
                    </button>
                    <button
                      onClick={() => {
                        setYes(!yes);
                        setNo(false);
                      }}
                      className="!px-4 !py-2 border hover:!bg-gray-100  rounded disabled:opacity-50">
                      Yes
                    </button>
                  </div>
                </>
              )}
              {no && (
                <div className="flex justify-between gap-3 !mt-3">
                  <button
                    onClick={() => {
                      setCurrentQuestionId("q1"), setNo(false);
                    }}
                    className="!px-4 !py-2 border hover:!bg-gray-100  rounded disabled:opacity-50">
                    Retake The Quiz
                  </button>
                  <Link to="/mentorship">
                    <button className="!px-4 !py-2 border hover:!bg-gray-100  rounded disabled:opacity-50">
                      Consult a Career Councelor
                    </button>
                  </Link>
                </div>
              )}
              {yes && (
                <div className="flex flex-col gap-4 !mt-3">
                  {/* Retrieve the saved career */}
                  <p className="text-lg font-semibold text-gray-700">
                    🎉 Congratulations! You have successfully completed the
                    quiz.
                  </p>
                  <p className="text-md text-gray-600">
                    Based on your answers, your suggested career path is:
                    <span className="text-blue-600 font-bold ml-1">
                      {localStorage.getItem("selectedCareer") || "Not Found"}
                    </span>
                  </p>

                  {/* Show Next button to proceed */}
                  {!showLinks && (
                    <button
                      onClick={() => setShowLinks(true)}
                      className="!px-4 !py-2 bg-[#0659a6] text-white rounded hover:bg-blue-700">
                      Next
                    </button>
                  )}

                  {/* Show the links after clicking Next */}
                  {showLinks && (
                    <div className="flex flex-col gap-3">
                      <Link to="/inappskill">
                        <button className="!px-4 !py-2 border hover:!bg-gray-100 rounded disabled:opacity-50">
                          🎓 Enroll in a course tailored to your chosen path
                        </button>
                      </Link>
                      <Link to="/mentorship">
                        <button className="!px-4 !py-2 border hover:!bg-gray-100 rounded disabled:opacity-50">
                          👨‍🏫 Consult a Career Counselor
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
