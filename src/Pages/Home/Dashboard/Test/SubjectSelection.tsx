import { useEffect, useState } from "react";
import "./SubjectSelection.css";
// import Footer from "../../../../Components/ui/Footer/Footer";
import { Link } from "react-router-dom";
import SubjectAlert from "./SubjectAlert";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchSavedSubjectList } from "../../../../State/SavedSubjectListSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { fetchTestQuestions } from "../../../../State/TestQuestionSlice";
// import Navbar2 from "../../../../Components/ui/Navbar/Navbar2";

const MAX_EXTRA_SUBJECTS = 3; // Since Use of English is already selected
const REQUIRED_TOTAL_SUBJECTS = 4; // Total subjects required
interface Subs {
  id: number;
  name: string;
}

const SubjectSelection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "English",
  ]); // Default selected
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSelectionAlert, setShowSelectionAlert] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false); // Success message state
  const [savedSubjects, setSavedSubjects] = useState<boolean>(false);

  // Handle subject change
  const handleSubjectChange = (subject: string) => {
    const extraSelectedSubjects = selectedSubjects.filter(
      (s) => s !== "English"
    );
    const isSubjectSelected = selectedSubjects.includes(subject);

    if (subject === "English") return;

    if (isSubjectSelected) {
      setSelectedSubjects((prev) => prev.filter((s) => s !== subject));
    } else if (extraSelectedSubjects.length < MAX_EXTRA_SUBJECTS) {
      setSelectedSubjects((prev) => [...prev, subject]);

      if (selectedSubjects.length === REQUIRED_TOTAL_SUBJECTS - 1) {
        setSavedSubjects(true);
        // Automatically save subjects and remove success message after 5 seconds
      } else {
        setSavedSubjects(false);
      }
    } else {
      setShowAlert(true);
      // Show alert if user tries to select more than 3 extra subjects
    }
  };
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const handleUserSubject = async () => {
      if (savedSubjects)
        try {
          await axios.post(
            "https://lynspeed.pythonanywhere.com/api/v1/user/subjects/",
            {
              subjects: selectedSubjects,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add token to Authorization header
              },
            }
          );

          //getting the selected subjects from the backend
          dispatch(fetchSavedSubjectList());
          setShowSuccessMessage(true); // Show success message when four subjects are selected
          setTimeout(() => {
            // Simulate saving subjects (replace with actual save logic if needed)
            setShowSuccessMessage(false); // Hide success message after 5 seconds
          }, 2090); // Set timeout for 5 seconds
        } catch (error) {
          console.error("Error subscribing:", error);
          toast.error("Something went wrong, check internet connection.");
        }
    };
    handleUserSubject();
  }, [savedSubjects]);

  const handleStartTest = async (_e: React.MouseEvent) => {
    if (savedSubjectList.length === 0) {
      toast("You have not selected your subjects yet");
      return;
    }

    dispatch(fetchTestQuestions());
  };

  // getting the subjectList states from redux store
  const subjectList = useSelector((state: RootState) => state.subjectList.data);

  // getting the SavedsubjectList states from redux store
  const savedSubjectList = useSelector(
    (state: RootState) => state.savedSubjectList.data
  );
  const loading = useSelector(
    (state: RootState) => state.savedSubjectList.loading
  );
  const error = useSelector((state: RootState) => state.savedSubjectList.error);

  useEffect(() => {
    //calling the saved  subject list endpoint onMount for users that might log out after picking subjects
    dispatch(fetchSavedSubjectList());
  }, []);
  return (
    <>
      {/* <Navbar2 /> */}
      <div>
        <div className="spa"></div>
        {loading ? (
          <h2 className="loading">Loading....</h2>
        ) : !loading && error ? (
          <h2 className="loading">
            Something went wrong, check internet connection.
          </h2>
        ) : (
          <>
            {savedSubjectList.length === 0 && (
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
                      Please select a combination of 4 subjects that align with
                      your desired course of study by checking the boxes above.
                      One of the subjects, <em>Use of English</em>, is already
                      selected for you. After selecting your subjects, click
                      "Start Test" to begin. The test session has a specific
                      time limit of two hours, which will be displayed on the
                      right side of your screen. To maximize your performance:
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

                  <div className="but">
                    <div className="bot">
                      <Link to="/dashboard">Go Back</Link>
                    </div>
                    <div className="bot">
                      <Link to="/test" onClick={handleStartTest}>
                        Start Test
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {savedSubjectList.length > 0 && (
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

                  <div className="but">
                    <div className="bot">
                      <Link to="/dashboard">Go Back</Link>
                    </div>
                    <div className="bot">
                      <Link to="/test" onClick={handleStartTest}>
                        Start Test
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {showAlert && (
              <SubjectAlert
                message={`You can only select ${MAX_EXTRA_SUBJECTS} extra subjects.`}
                onClose={() => setShowAlert(false)}
              />
            )}
            {showSelectionAlert && (
              <SubjectAlert
                message={`Please select ${REQUIRED_TOTAL_SUBJECTS} subjects to continue.`}
                onClose={() => setShowSelectionAlert(false)}
              />
            )}
            {showSuccessMessage && (
              <SubjectAlert
                message={`Please select ${REQUIRED_TOTAL_SUBJECTS} subjects to continue.`}
                onClose={() => setShowSelectionAlert(false)}
              />
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
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default SubjectSelection;
