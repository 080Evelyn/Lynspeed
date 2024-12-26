import "./Achievement.css";
import pic1 from "../../../../assets/ach1.png";
import pic2 from "../../../../assets/ach2.png";
import { AppDispatch, RootState } from "../../../../State/Store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAnalysis } from "../../../../State/AnalysisSlice";
// import Navbar2 from "../../../../Components/ui/Navbar/Navbar2";
// import Footer from "../../../../Components/ui/Footer/Footer";

interface AchievementItem {
  title: string;
  scoreRange: string;
  icon: string;
  highlight: boolean;
}

const Achievement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const analysis = useSelector(
    (state: RootState) => state.analysis?.data?.subjects
  );

  const analysisLoading = useSelector(
    (state: RootState) => state.analysis.loading
  );
  const analysisError = useSelector((state: RootState) => state.analysis.error);
  const totalTestSessions = analysis && analysis[0].results.length;

  const subject1Score =
    analysis &&
    analysis[0]?.results.reduce(
      (sum: any, item: { test_score: any }) => sum + item.test_score,
      0
    );
  const subject2Score =
    analysis &&
    analysis[1]?.results.reduce(
      (sum: any, item: { test_score: any }) => sum + item.test_score,
      0
    );
  const subject3Score =
    analysis &&
    analysis[2]?.results.reduce(
      (sum: any, item: { test_score: any }) => sum + item.test_score,
      0
    );
  const subject4Score =
    analysis &&
    analysis[3]?.results.reduce(
      (sum: any, item: { test_score: any }) => sum + item.test_score,
      0
    );
  const averageScore =
    (subject1Score + subject2Score + subject3Score + subject4Score) /
    totalTestSessions;

  useEffect(() => {
    dispatch(fetchAnalysis());
  }, []);
  const achievements: AchievementItem[] = [
    {
      title: "DIAMOND",
      scoreRange: "Score: 360 - 400",
      icon: "🏆",
      highlight: averageScore >= 360 && averageScore <= 400 ? true : false,
    },
    {
      title: "GOLD",
      scoreRange: "Score: 240 - 359",
      icon: "🎖️",
      highlight: averageScore >= 240 && averageScore <= 359 ? true : false,
    },
    {
      title: "SILVER",
      scoreRange: "Score: 180 - 239",
      icon: "🥇",
      highlight: averageScore >= 180 && averageScore <= 239 ? true : false,
    },
    {
      title: "MEDIOCRE",
      scoreRange: "Score: 0 - 179",
      icon: "🔵",
      highlight: averageScore <= 179 ? true : false,
    },
  ];

  return (
    <>
      {/* <Navbar2/> */}
      <div className="leaderboard-page">
        {analysisLoading ? (
          <h2>Loading...</h2>
        ) : !analysisLoading && analysisError ? (
          <h2>Something went wrong, check intenet connection</h2>
        ) : (
          <>
            <div className="leaderboard-header">
              <span
                className="back-arrow"
                onClick={() => window.history.back()}>
                ←
              </span>
              <h2>Leaderboard</h2>
            </div>
            <div className="ach-grp">
              <img src={pic1} alt="" />
              <div className="leaderboard-container">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`achievement-card ${
                      achievement.highlight ? "highlight" : ""
                    }`}>
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h3>{achievement.title}</h3>
                      <p>{achievement.scoreRange}</p>
                    </div>
                    {achievement.highlight && (
                      <div className="current-user-badge">
                        <span>👤 User</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <img src={pic2} alt="" />
            </div>
          </>
        )}
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default Achievement;
