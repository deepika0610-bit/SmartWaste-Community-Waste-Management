// import React, { useState, useEffect } from "react";
// import "./EcoTipsDaily.css";

// const tips = [
//   "Turn off lights when not in use 💡",
//   "Carry a reusable water bottle 🌊",
//   "Use public transport or carpool 🚍",
//   "Avoid plastic bags, carry a cloth bag 🛍️",
//   "Plant a tree 🌳",
//   "Unplug chargers when not in use 🔌",
//   "Save water while brushing your teeth 🚰",
//   "Recycle paper, glass, and plastics ♻️"
// ];

// function EcoTipsDaily() {
//   const [todayTip, setTodayTip] = useState("");

//   useEffect(() => {
//     const today = new Date();
//     const index = today.getDate() % tips.length;
//     setTodayTip(tips[index]);
//   }, []);

//   return (
//     <div className="eco-tips-container">
//       <div className="eco-tips-card">
//         <h2>Eco Tip of the Day 🌱</h2>
//         <p>{todayTip}</p>
//       </div>
//     </div>
//   );
// }

// export default EcoTipsDaily;

import React, { useState, useEffect } from "react";
import "./EcoTipsDaily.css";

const tips = [
  "Turn off lights when not in use 💡",
  "Carry a reusable water bottle 🌊",
  "Use public transport or carpool 🚍",
  "Avoid plastic bags, carry a cloth bag 🛍️",
  "Plant a tree 🌳",
  "Unplug chargers when not in use 🔌",
  "Save water while brushing your teeth 🚰",
  "Recycle paper, glass, and plastics ♻️"
];

function EcoTipsDaily() {
  const [todayTip, setTodayTip] = useState("");

  useEffect(() => {
    let index = new Date().getDate() % tips.length;
    setTodayTip(tips[index]);

    // Rotate tip every 5 seconds
    const interval = setInterval(() => {
      index = (index + 1) % tips.length;
      setTodayTip(tips[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="eco-tips-container">
      <div className="floating-icons">🌱💧💡♻️🌳</div>
      <div className="eco-tips-card">
        <h2>Eco Tip of the Day 🌱</h2>
        <p>{todayTip}</p>
      </div>
      <div className="ground"></div>
    </div>
  );
}

export default EcoTipsDaily;
