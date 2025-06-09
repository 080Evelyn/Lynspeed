import { useEffect, useState } from "react";
import "./SubjectSelection.css";
import { Link, useNavigate } from "react-router-dom";
import SubjectAlert from "./SubjectAlert";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchSavedSubjectList } from "../../../../State/SavedSubjectListSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTestQuestions } from "../../../../State/TestQuestionSlice";

const MAX_EXTRA_SUBJECTS = 3;
const REQUIRED_TOTAL_SUBJECTS = 4;

interface Subs {
  id: number;
  name: string;
}

const SubjectSelection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "ENGLISH",
  ]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // Confirmation dialog state
  const [subjectSaved, setSubjectSaved] = useState<boolean>(false);

  const subjectList = useSelector((state: RootState) => state.subjectList.data);
  const savedSubjectList = useSelector(
    (state: RootState) => state.savedSubjectList.data
  );
  const loading = useSelector(
    (state: RootState) => state.savedSubjectList.loading
  );
  const error = useSelector((state: RootState) => state.savedSubjectList.error);

  const userSubject = error === "Request failed with status code 404";

  const handleSubjectChange = (subject: string) => {
    const extraSelectedSubjects = selectedSubjects.filter(
      (s) => s !== "ENGLISH"
    );
    const isSubjectSelected = selectedSubjects.includes(subject);

    if (subject === "ENGLISH") return;

    if (isSubjectSelected) {
      setSelectedSubjects((prev) => prev.filter((s) => s !== subject));
    } else if (extraSelectedSubjects.length < MAX_EXTRA_SUBJECTS) {
      setSelectedSubjects((prev) => [...prev, subject]);

      if (selectedSubjects.length === REQUIRED_TOTAL_SUBJECTS - 1) {
        setShowConfirmation(true); // Show confirmation when 4 subjects are selected
      } else {
        setSubjectSaved(false);
      }
    } else {
      setShowAlert(true);
    }
  };

  const handleConfirmSelection = () => {
    setSubjectSaved(true);
    setShowConfirmation(false);
  };

  const handleCancelSelection = () => {
    setSelectedSubjects((prev) => prev.slice(0, -1));
    setShowConfirmation(false);
  };

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const handleUserSubject = async () => {
      if (subjectSaved) {
        try {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}user/subjects/`,
            { subjects: selectedSubjects },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          dispatch(fetchSavedSubjectList());
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 2000);
        } catch (error) {
          console.error("Error subscribing:", error);
          toast.error("Something went wrong, check internet connection.");
        }
      }
    };
    handleUserSubject();
  }, [subjectSaved]);

  const handleStartTest = async (_e: React.MouseEvent) => {
    if (userSubject) {
      alert("Select subjects before proceeding.");
      return;
    }
    dispatch(fetchTestQuestions());
    navigate("/test");
  };

  useEffect(() => {
    dispatch(fetchSavedSubjectList());
  }, []);

  return (
    <>
      <div>
        <div className="spa">
          <span
            className="back-arrow"
            onClick={() => window.history.back()}
            style={{ color: "white", margin: "20px" }}>
            ←
          </span>
        </div>
        {loading ? (
          <h2 className="loading">Loading....</h2>
        ) : !loading &&
          error &&
          error !== "Request failed with status code 404" ? (
          <h2 className="loading">
            Something went wrong, check internet connection.
          </h2>
        ) : (
          <>
            {userSubject && (
              <>
                <div className="sel upper-case">
                  {subjectList?.map(({ id, name }: Subs) => (
                    <label key={id} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        value={name}
                        onChange={() => handleSubjectChange(name)}
                        checked={selectedSubjects.includes(name)}
                      />
                      {name}
                    </label>
                  ))}
                </div>
                <div className="talk">
                  <div className="head">
                    <div className="inst"></div>
                    <h3>Instructions</h3>
                    <div className="inst"></div>
                  </div>
                  <div className="ma">
                    <p>
                      Above are the 4 selected subjects that align with your
                      desired course of study. Click "Start Test" to begin. The
                      test session has a specific time limit of two hours, which
                      will be displayed on the right side of your screen. To
                      maximize your performance:
                    </p>
                    <ul>
                      <li>
                        Begin with questions you are most confident about.
                      </li>
                      <li>
                        Allocate time wisely for each question and avoid
                        spending too much time on a single item.
                      </li>
                      <li>
                        Once you finish answering, take a moment to review your
                        responses for any mistakes or omissions.
                      </li>
                    </ul>
                    <p>
                      <i>
                        Before submitting, double-check all answers to ensure
                        accuracy.
                      </i>
                      <br /> <strong> Good luck!</strong>
                    </p>
                  </div>
                </div>
              </>
            )}

            {!userSubject && (
              <>
                <div className="sel upper-case">
                  {savedSubjectList?.map(({ id, name }: Subs) => (
                    <label key={id} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        value={name}
                        onChange={() => handleSubjectChange(name)}
                        checked={true}
                      />
                      {name}
                    </label>
                  ))}
                </div>
                <div className="talk">
                  <div className="head">
                    <div className="inst"></div>
                    <h3>Instructions</h3>
                    <div className="inst"></div>
                  </div>
                  <div className="ma">
                    <p>
                      Above are the 4 selected subjects that align with your
                      desired course of study. Click "Start Test" to begin. The
                      test session has a specific time limit of two hours, which
                      will be displayed on the right side of your screen. To
                      maximize your performance:
                    </p>
                    <ul>
                      <li>
                        Begin with questions you are most confident about.
                      </li>
                      <li>
                        Allocate time wisely for each question and avoid
                        spending too much time on a single item.
                      </li>
                      <li>
                        Once you finish answering, take a moment to review your
                        responses for any mistakes or omissions.
                      </li>
                    </ul>
                    <p>
                      <i>
                        Before submitting, double-check all answers to ensure
                        accuracy.
                      </i>
                      <br /> <strong> Good luck!</strong>
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="but">
              <div className="bot">
                <Link to="/dashboard">Go Back</Link>
              </div>
              <div className="bot">
                <Link to={userSubject ? "" : "/test"} onClick={handleStartTest}>
                  Start Test
                </Link>
              </div>
            </div>

            {showAlert && (
              <SubjectAlert
                message={`You can only select ${MAX_EXTRA_SUBJECTS} extra subjects.`}
                onClose={() => setShowAlert(false)}
              />
            )}
            {showConfirmation && (
              <SubjectAlert
                message={`You have selected ${REQUIRED_TOTAL_SUBJECTS} subjects. Do you want to save these subjects or go back to change your selection?`}
                onClose={() => setShowConfirmation(false)}>
                <button
                  style={{
                    padding: "5px",
                    marginRight: "5px",
                    backgroundColor: "#0659a6",
                    border: "none",
                    borderRadius: "5px",
                    color: "white",
                  }}
                  onClick={handleConfirmSelection}>
                  Yes, Save
                </button>
                <button
                  style={{
                    padding: "5px",
                    backgroundColor: "#0659a6",
                    border: "none",
                    borderRadius: "5px",
                    color: "white",
                  }}
                  onClick={handleCancelSelection}>
                  No, Change
                </button>
              </SubjectAlert>
            )}
            {showSuccessMessage && (
              <SubjectAlert
                message={`Subjects saved successfully!`}
                onClose={() => {
                  setShowSuccessMessage(false);
                }}
              />
            )}
          </>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default SubjectSelection;
