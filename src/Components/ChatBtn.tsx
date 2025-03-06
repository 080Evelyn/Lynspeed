import React from "react";
import chatIcon from "../assets/chaticon.jpg"; // Replace with your image path
import "./ChatBtn.css"

const ChatButton: React.FC = () => {
    return (
        <div className="chat-button">
            <a href="https://wa.me/2349065366858" target="_blank" rel="noopener noreferrer" className="chat-button">
                <img src={chatIcon} alt="Chat with Us" />
            </a>
        </div>
    );
};

export default ChatButton;
