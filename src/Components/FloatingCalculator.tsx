import React, { useState } from "react";
import Draggable from "react-draggable";
import "./FloatingCalculator.css"; // Ensure this CSS file exists

const FloatingCalculator: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [isVisible] = useState<boolean>(true);

    const handleButtonClick = (value: string) => {
        if (value === "=") {
            try {
                setResult(eval(input).toString()); // Use with caution
            } catch {
                setResult("Error");
            }
        } else if (value === "C") {
            setInput("");
            setResult("");
        } else {
            setInput((prev) => prev + value);
        }
    };

    return (
        <>
            {/* <button className="toggle-btn" onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Hide Calculator" : "Show Calculator"}
            </button> */}
            {isVisible && (
                <Draggable handle=".calculator-header" enableUserSelectHack={false}>
                    <div className="calculator">
                        <div className="calculator-header">Calculator</div>
                        <input type="text" value={input} className="calculator-screen" readOnly />
                        <div className="calculator-buttons">
                            {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "C", "0", "=", "+"].map(
                                (char) => (
                                    <button key={char} className="calc-btn" onClick={() => handleButtonClick(char)}>
                                        {char}
                                    </button>
                                )
                            )}
                        </div>
                        {result && <div className="calculator-result">{result}</div>}
                    </div>
                </Draggable>
            )}
        </>
    );
};

export default FloatingCalculator;
