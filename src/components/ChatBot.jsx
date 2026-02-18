import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { auth } from "../firebase/firebase";
import chatbotIcon from "../assets/chatbot-icon.png";
import "./ChatBot.css";

function ChatBot() {
  const [model, setModel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("Guest");

  // Get logged-in user's display name
  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName || "Guest");
    }
  }, []);

  // Load MobileNet and greet user
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();

    setMessages([
      {
        sender: "bot",
        text: `Hi ${username}! Upload a waste image and I will tell you if it's biodegradable ♻️ or non-biodegradable 🚫.`
      }
    ]);
  }, [username]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageSrc = reader.result;
      setImage(imageSrc);

      setMessages(prev => [
        ...prev,
        { sender: "user", text: "Uploaded a waste image 📸" },
        { sender: "bot", typing: true }
      ]);

      setTimeout(() => classifyImage(imageSrc), 1500);
    };
    reader.readAsDataURL(file);
  };

  // Smart classification using prediction probabilities
  const classifyImage = async (imgSrc) => {
    if (!model || !imgSrc) return;

    const imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imgElement.crossOrigin = "anonymous";
    imgElement.width = 224;
    imgElement.height = 224;

    imgElement.onload = async () => {
      const predictions = await model.classify(imgElement);

      // Map predictions to biodegradability
      // Common categories that are usually biodegradable
      const biodegradableLabels = [
        "banana", "apple", "onion", "leaf", "vegetable", "fruit", "paper",
        "food", "bread", "rice", "wood", "tea", "coffee"
      ];

      // Assume non-biodegradable for electronics, plastics, metal, glass
      const nonBiodegradableLabels = [
        "plastic", "metal", "glass", "can", "bottle", "styrofoam",
        "electronics", "phone", "battery", "cable", "wire", "device"
      ];

      let biodegScore = 0;
      let nonBiodegScore = 0;

      predictions.forEach(pred => {
        const label = pred.className.toLowerCase();
        const prob = pred.probability;

        biodegradableLabels.forEach(b => {
          if (label.includes(b)) biodegScore += prob;
        });
        nonBiodegradableLabels.forEach(nb => {
          if (label.includes(nb)) nonBiodegScore += prob;
        });
      });

      // If both scores are 0 (unknown), pick highest probability as fallback
      if (biodegScore === 0 && nonBiodegScore === 0 && predictions.length > 0) {
        const topPred = predictions[0].className.toLowerCase();
        const topProb = predictions[0].probability;

        if (topPred.includes("plastic") || topPred.includes("metal") || topPred.includes("glass") || topPred.includes("electronics") || topPred.includes("device")) {
          nonBiodegScore = topProb;
        } else {
          biodegScore = topProb;
        }
      }

      const classification = biodegScore >= nonBiodegScore ? "Biodegradable ♻️" : "Non-Biodegradable 🚫";

      // Remove typing animation and show result
      setMessages(prev => [
        ...prev.filter(msg => !msg.typing),
        { sender: "bot", text: `This waste is: ${classification}` }
      ]);
    };
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.sender === "bot" && <img src={chatbotIcon} alt="Bot" className="bot-icon" />}
            {msg.typing ? (
              <div className="typing">
                <span></span><span></span><span></span>
              </div>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}

        {image && (
          <div className="image-preview">
            <img id="uploaded-image" src={image} alt="Uploaded Waste" />
          </div>
        )}
      </div>

      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
    </div>
  );
}

export default ChatBot;

