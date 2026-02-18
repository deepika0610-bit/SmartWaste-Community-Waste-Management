// import React, { useState, useEffect } from "react";
// import "./RewardsContests.css";
// import { db, auth } from "../firebase/firebase";
// import { collection, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
// import { toast } from "react-toastify";

// function RewardsContests() {
//   const [points, setPoints] = useState(0);
//   const [response, setResponse] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [topPerformers, setTopPerformers] = useState([]);
//   const [showTop, setShowTop] = useState(false);

//   // Fetch user points
//   useEffect(() => {
//     const fetchUserPoints = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const userDoc = await getDocs(collection(db, "users"));
//         const docRef = userDoc.docs.find(d => d.id === user.uid);
//         if (docRef) setPoints(docRef.data().points || 0);
//       }
//     };
//     fetchUserPoints();
//   }, []);

//   const submitResponse = async () => {
//     if (response.trim() === "") {
//       toast.warning("⚠️ Please enter your idea before submitting.");
//       return;
//     }

//     try {
//       const user = auth.currentUser;
//       await getDocs(collection(db, "contestResponses")); // optional, if needed
//       await collection(db, "contestResponses");
//       await db.collection("contestResponses").add({
//         uid: user ? user.uid : "anonymous",
//         idea: response,
//         timestamp: serverTimestamp(),
//         email: user ? user.email : "guest",
//         awardedPoints: 0
//       });

//       setSubmitted(true);
//       toast.success("✅ Your idea has been submitted!");
//       setResponse("");
//       setTimeout(() => setSubmitted(false), 5000);
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Something went wrong!");
//     }
//   };

//   // Fetch top performers
//   const fetchTopPerformers = async () => {
//     try {
//       const q = query(collection(db, "contestResponses"), orderBy("awardedPoints", "desc"));
//       const snapshot = await getDocs(q);
//       const users = snapshot.docs.map(doc => doc.data());
//       setTopPerformers(users);
//       setShowTop(true);
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Could not fetch top performers");
//     }
//   };

//   return (
//     <div className="rewards-wrapper">
//       <div className="rewards-container">
//         <h2>🎁 Rewards & Contests</h2>

//         {/* Top Performers Button */}
//         <button onClick={fetchTopPerformers} style={{ marginBottom: "1rem" }}>
//           🏆 Top Performers
//         </button>

//         <div className="points-box">
//           <h3>Your Points: <span>{points}</span></h3>
//         </div>

//         {showTop ? (
//           <div className="top-performers">
//             <h3>🏆 Top Performers</h3>
//             {topPerformers.length === 0 ? (
//               <p>No submissions yet.</p>
//             ) : (
//               topPerformers.map((user, index) => (
//                 <div key={index} className="contest-card">
//                   <p><strong>User:</strong> {user.email || "Anonymous"}</p>
//                   <p><strong>Idea:</strong> {user.idea}</p>
//                   <p><strong>Points Awarded:</strong> {user.awardedPoints || 0}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         ) : (
//           <>
//             {/* Contests Section */}
//             <div className="contests-section">
//               <div className="contest-card">
//                 <h4>Plastic-Free Week</h4>
//                 <p>Share your best idea to reduce plastic use.</p>
//                 <p>🏆 Reward: Eco Badge</p>
//               </div>
//               <div className="contest-card">
//                 <h4>Smart Recycling</h4>
//                 <p>Submit an innovative recycling solution.</p>
//                 <p>🏆 Reward: Gift Voucher</p>
//               </div>
//             </div>

//             {/* Response Section */}
//             <div className="response-section">
//               <h3>Submit Your Response</h3>
//               <textarea
//                 value={response}
//                 onChange={(e) => setResponse(e.target.value)}
//                 placeholder="Write your idea here..."
//               />
//               <button onClick={submitResponse} disabled={submitted}>
//                 {submitted ? "Submitted ✅" : "Submit Idea"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RewardsContests;

// import React, { useState, useEffect } from "react";
// import "./RewardsContests.css";
// import { db, auth } from "../firebase/firebase";
// import { collection, getDocs, query, orderBy, serverTimestamp, addDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// function RewardsContests() {
//   const [points, setPoints] = useState(0);
//   const [response, setResponse] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [topPerformers, setTopPerformers] = useState([]);
//   const [showTop, setShowTop] = useState(false);

//   // Fetch user points
//   useEffect(() => {
//     const fetchUserPoints = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const userDoc = await getDocs(collection(db, "users"));
//         const docRef = userDoc.docs.find(d => d.id === user.uid);
//         if (docRef) setPoints(docRef.data().points || 0);
//       }
//     };
//     fetchUserPoints();
//   }, []);

//   // Submit user response
//   const submitResponse = async () => {
//     if (response.trim() === "") {
//       toast.warning("⚠️ Please enter your idea before submitting.");
//       return;
//     }

//     try {
//       const user = auth.currentUser;
//       await addDoc(collection(db, "contestResponses"), {
//         uid: user ? user.uid : "anonymous",
//         idea: response,
//         timestamp: serverTimestamp(),
//         email: user ? user.email : "guest",
//         awardedPoints: 0
//       });

//       setSubmitted(true);
//       toast.success("✅ Your idea has been submitted!");
//       setResponse("");
//       setTimeout(() => setSubmitted(false), 5000);
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Something went wrong!");
//     }
//   };

//   // Fetch top performers
//   const fetchTopPerformers = async () => {
//     try {
//       const q = query(collection(db, "contestResponses"), orderBy("awardedPoints", "desc"));
//       const snapshot = await getDocs(q);
//       const users = snapshot.docs.map(doc => doc.data());
//       setTopPerformers(users);
//       setShowTop(true);
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Could not fetch top performers");
//     }
//   };

//   return (
//     <div className="rewards-wrapper">
//       <div className="rewards-container">
//         <h2>🎁 Rewards & Contests</h2>

//         {/* Top Performers Button */}
//         {!showTop && (
//           <button
//             onClick={fetchTopPerformers}
//             style={{
//               marginBottom: "1rem",
//               background: "#00ff66",
//               color: "#000",
//               padding: "0.5rem 1rem",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontWeight: "bold"
//             }}
//           >
//             🏆 Top Performers
//           </button>
//         )}

//         <div className="points-box">
//           <h3>Your Points: <span>{points}</span></h3>
//         </div>

//         {showTop ? (
//           <div className="top-performers">
//             <h3>🏆 Top Performers</h3>

//             {/* Back Button */}
//             <button
//               onClick={() => setShowTop(false)}
//               style={{
//                 marginBottom: "1rem",
//                 background: "#00ff66",
//                 color: "#000",
//                 padding: "0.5rem 1rem",
//                 border: "none",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 fontWeight: "bold"
//               }}
//             >
//               🔙 Back
//             </button>

//             {topPerformers.length === 0 ? (
//               <p>No submissions yet.</p>
//             ) : (
//               topPerformers.map((user, index) => (
//                 <div key={index} className="contest-card">
//                   <p><strong>User:</strong> {user.email || "Anonymous"}</p>
//                   <p><strong>Idea:</strong> {user.idea}</p>
//                   <p><strong>Points Awarded:</strong> {user.awardedPoints || 0}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         ) : (
//           <>
//             {/* Contests Section */}
//             <div className="contests-section">
//               <div className="contest-card">
//                 <h4>Plastic-Free Week</h4>
//                 <p>Share your best idea to reduce plastic use.</p>
//                 <p>🏆 Reward: Eco Badge</p>
//               </div>
//               <div className="contest-card">
//                 <h4>Smart Recycling</h4>
//                 <p>Submit an innovative recycling solution.</p>
//                 <p>🏆 Reward: Gift Voucher</p>
//               </div>
//             </div>

//             {/* Response Section */}
//             <div className="response-section">
//               <h3>Submit Your Response</h3>
//               <textarea
//                 value={response}
//                 onChange={(e) => setResponse(e.target.value)}
//                 placeholder="Write your idea here..."
//               />
//               <button onClick={submitResponse} disabled={submitted}>
//                 {submitted ? "Submitted ✅" : "Submit Idea"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RewardsContests;

// import React, { useState, useEffect } from "react";
// import "./RewardsContests.css";
// import { db, auth } from "../firebase/firebase";
// import { collection, getDocs, query, orderBy, serverTimestamp, addDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// function RewardsContests() {
//   const [points, setPoints] = useState(0);
//   const [response, setResponse] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [topPerformers, setTopPerformers] = useState([]);
//   const [showTop, setShowTop] = useState(false);

//   // Fetch user points
//   useEffect(() => {
//     const fetchUserPoints = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const userDoc = await getDocs(collection(db, "users"));
//         const docRef = userDoc.docs.find(d => d.id === user.uid);
//         if (docRef) setPoints(docRef.data().points || 0);
//       }
//     };
//     fetchUserPoints();
//   }, []);

//   // Submit user response
//   const submitResponse = async () => {
//     if (response.trim() === "") {
//       toast.warning("⚠️ Please enter your idea before submitting.");
//       return;
//     }

//     try {
//       const user = auth.currentUser;
//       await addDoc(collection(db, "contestResponses"), {
//         uid: user ? user.uid : "anonymous",
//         idea: response,
//         timestamp: serverTimestamp(),
//         email: user ? user.email : "guest",
//         awardedPoints: 0
//       });

//       setSubmitted(true);
//       toast.success("✅ Your idea has been submitted!");
//       setResponse("");
//       setTimeout(() => setSubmitted(false), 5000);
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Something went wrong!");
//     }
//   };

//   // Fetch top performers
//   const fetchTopPerformers = async () => {
//     try {
//       const q = query(collection(db, "contestResponses"), orderBy("awardedPoints", "desc"));
//       const snapshot = await getDocs(q);
//       const users = snapshot.docs.map(doc => doc.data());
//       setTopPerformers(users);
//       setShowTop(true);
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Could not fetch top performers");
//     }
//   };

//   return (
//     <div className="rewards-wrapper">
//       <div className="rewards-container">
//         <h2>🎁 Rewards & Contests</h2>

//         {/* Top Performers Button */}
//         {!showTop && (
//           <button className="top-btn" onClick={fetchTopPerformers}>
//             🏆 Top Performers
//           </button>
//         )}

//         <div className="points-box">
//           <h3>Your Points: <span>{points}</span></h3>
//         </div>

//         {showTop ? (
//         //   <div className="top-performers">
//         //     {/* Header with Back button and title */}
//         //     <div className="top-header">
//         //       <button className="back-button" onClick={() => setShowTop(false)}>
//         //         🔙 Back
//         //       </button>
//         //       <h3>🏆 Top Performers</h3>
//         //     </div>
//         <div className="top-performers">
//   {/* Header with Back button and centered title */}
//   <div className="top-header">
//     <button className="back-button" onClick={() => setShowTop(false)}>
//       🔙 Back
//     </button>
//     <h3 className="center-title">🏆 Top Performers</h3>
//   </div>

//             {topPerformers.length === 0 ? (
//               <p>No submissions yet.</p>
//             ) : (
//               topPerformers.map((user, index) => (
//                 <div key={index} className="contest-card">
//                   <p><strong>User:</strong> {user.email || "Anonymous"}</p>
//                   <p><strong>Idea:</strong> {user.idea}</p>
//                   <p><strong>Points Awarded:</strong> {user.awardedPoints || 0}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         ) : (
//           <>
//             {/* Contests Section */}
//             <div className="contests-section">
//               <div className="contest-card">
//                 <h4>Plastic-Free Week</h4>
//                 <p>Share your best idea to reduce plastic use.</p>
//                 <p>🏆 Reward: Eco Badge</p>
//               </div>
//               <div className="contest-card">
//                 <h4>Smart Recycling</h4>
//                 <p>Submit an innovative recycling solution.</p>
//                 <p>🏆 Reward: Gift Voucher</p>
//               </div>
//             </div>

//             {/* Response Section */}
//             <div className="response-section">
//               <h3>Submit Your Response</h3>
//               <textarea
//                 value={response}
//                 onChange={(e) => setResponse(e.target.value)}
//                 placeholder="Write your idea here..."
//               />
//               <button onClick={submitResponse} disabled={submitted}>
//                 {submitted ? "Submitted ✅" : "Submit Idea"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RewardsContests;


import React, { useState, useEffect } from "react";
import "./RewardsContests.css";
import { db, auth } from "../firebase/firebase";
import { collection, getDocs, query, orderBy, serverTimestamp, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function RewardsContests() {
  const [points, setPoints] = useState(0);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [topPerformers, setTopPerformers] = useState([]);
  const [showTop, setShowTop] = useState(false);

  // Fetch user points
  useEffect(() => {
    const fetchUserPoints = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDocs(collection(db, "users"));
        const docRef = userDoc.docs.find(d => d.id === user.uid);
        if (docRef) setPoints(docRef.data().points || 0);
      }
    };
    fetchUserPoints();
  }, []);

  // Submit user response
  const submitResponse = async () => {
    if (response.trim() === "") {
      toast.warning("⚠️ Please enter your idea before submitting.");
      return;
    }

    try {
      const user = auth.currentUser;
      await addDoc(collection(db, "contestResponses"), {
        uid: user ? user.uid : "anonymous",
        idea: response,
        timestamp: serverTimestamp(),
        email: user ? user.email : "guest",
        awardedPoints: 0
      });

      setSubmitted(true);
      toast.success("✅ Your idea has been submitted!");
      setResponse("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong!");
    }
  };

  // Fetch top performers
  const fetchTopPerformers = async () => {
    try {
      const q = query(collection(db, "contestResponses"), orderBy("awardedPoints", "desc"));
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map(doc => doc.data());
      setTopPerformers(users);
      setShowTop(true);
    } catch (error) {
      console.error(error);
      toast.error("❌ Could not fetch top performers");
    }
  };

  return (
    <div className="rewards-wrapper">
      <div className="rewards-container">
        <h2>🎁 Rewards & Contests</h2>

        {!showTop && (
          <button className="top-btn" onClick={fetchTopPerformers}>
            🏆 Top Performers
          </button>
        )}

        <div className="points-box">
          <h3>Your Points: <span>{points}</span></h3>
        </div>

        {showTop ? (
          <div className="top-performers">
            {/* Header with Back button and centered title */}
            <div className="top-header">
              <button className="back-button" onClick={() => setShowTop(false)}>
                🔙 Back
              </button>
              <h3 className="center-title">🏆 Top Performers</h3>
            </div>

            {topPerformers.length === 0 ? (
              <p>No submissions yet.</p>
            ) : (
              topPerformers.map((user, index) => (
                <div key={index} className="contest-card">
                  <p><strong>User:</strong> {user.email || "Anonymous"}</p>
                  <p><strong>Idea:</strong> {user.idea}</p>
                  <p><strong>Points Awarded:</strong> {user.awardedPoints || 0}</p>
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            {/* Contests Section */}
            <div className="contests-section">
              <div className="contest-card">
                <h4>Plastic-Free Week</h4>
                <p>Share your best idea to reduce plastic use.</p>
                <p>🏆 Reward: Eco Badge</p>
              </div>
              <div className="contest-card">
                <h4>Smart Recycling</h4>
                <p>Submit an innovative recycling solution.</p>
                <p>🏆 Reward: Gift Voucher</p>
              </div>
            </div>

            {/* Response Section */}
            <div className="response-section">
              <h3>Submit Your Response</h3>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Write your idea here..."
              />
              <button onClick={submitResponse} disabled={submitted}>
                {submitted ? "Submitted ✅" : "Submit Idea"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RewardsContests;


