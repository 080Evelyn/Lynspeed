import "./Bubbles.css";

const Bubbles = () => {
  const bubblesArray = Array.from({ length: 20 });

  return (
    <div className="bubbles-container">
      {bubblesArray.map((_, index) => (
        <div className="bubble" key={index}></div>
      ))}
    </div>
  );
};

export default Bubbles;
