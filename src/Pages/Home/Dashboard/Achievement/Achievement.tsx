import "./Achievement.css";
import pic1 from "../../../../assets/ach1.png";
import pic2 from "../../../../assets/ach2.png";
// import Navbar2 from "../../../../Components/ui/Navbar/Navbar2";
// import Footer from "../../../../Components/ui/Footer/Footer";

interface AchievementItem {
  title: string;
  scoreRange: string;
  icon: string;
  highlight: boolean;
}

const Achievement = () => {
  const achievements: AchievementItem[] = [
    {
      title: "DIAMOND",
      scoreRange: "Score: 360 - 400",
      icon: "🏆",
      highlight: false,
    },
    {
      title: "GOLD",
      scoreRange: "Score: 240 - 359",
      icon: "🎖️",
      highlight: false,
    },
    {
      title: "SILVER",
      scoreRange: "Score: 180 - 239",
      icon: "🥇",
      highlight: true,
    },
    {
      title: "MEDIOCRE",
      scoreRange: "Score: 0 - 179",
      icon: "🔵",
      highlight: false,
    },
  ];

  return (
    <>
      {/* <Navbar2/> */}
      <div className="leaderboard-page">
        <div className="leaderboard-header">
        <span className="back-arrow" onClick={() => window.history.back()}>
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
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default Achievement;
