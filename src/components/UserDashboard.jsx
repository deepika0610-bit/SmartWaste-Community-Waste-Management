// import React, { useState, useEffect } from "react";
// import { signOut } from "firebase/auth";
// import { auth, db } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import {
//   AiOutlineMenu,
//   AiOutlineUser,
//   AiOutlineLogout,
//   AiOutlineInfoCircle,
//   AiOutlineRobot,
//   AiOutlineEnvironment,
//   AiOutlineWifi,
//   AiOutlineTrophy,
//   AiOutlineBulb,
//   AiOutlineFlag,
// } from "react-icons/ai";
// import PersonalInfo from "./PersonalInfo";
// import { useNavigate } from "react-router-dom";
// import "./UserDashboard.css";

// export default function UserDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showPersonalInfo, setShowPersonalInfo] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   // Listen for Firebase auth
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       if (user) fetchUserData(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const fetchUserData = async (user) => {
//     try {
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setUserData(docSnap.data());
//       } else {
//         toast.error("User data not found!");
//       }
//     } catch (error) {
//       toast.error("Failed to fetch user data: " + error.message);
//     }
//   };

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);
//   const closeSidebar = () => setSidebarOpen(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       toast.success("Logged out successfully!");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Logout failed: " + error.message);
//     }
//   };

//   const handleBackToDashboard = () => setShowPersonalInfo(false);

//   return (
//     <div className="dashboard-wrapper">
//       <header className="dashboard-header">
//         <button className="hamburger-btn" onClick={toggleSidebar}>
//           <AiOutlineMenu size={28} color="#00ff66" />
//         </button>
//         <h1>SmartWaste</h1>
//       </header>

//       {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

//       <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-user">
//           <AiOutlineUser size={48} color="#00ff66" />
//           <span className="username">
//             {userData ? `${userData.firstName} ${userData.lastName}` : "User"}
//           </span>
//         </div>

//         <nav className="sidebar-nav">
//           <button
//             className={`sidebar-btn ${showPersonalInfo ? "active" : ""}`}
//             onClick={() => {
//               setShowPersonalInfo(true);
//               closeSidebar();
//             }}
//           >
//             <AiOutlineInfoCircle size={20} />
//             <span>Personal Info</span>
//           </button>

//           <button className="sidebar-btn" onClick={handleLogout}>
//             <AiOutlineLogout size={20} />
//             <span>Logout</span>
//           </button>
//         </nav>
//       </aside>

//       <main className="dashboard-main">
//         {showPersonalInfo ? (
//           <PersonalInfo userData={userData} onBack={handleBackToDashboard} />
//         ) : (
//           <>
//             <h2 className="welcome-heading">
//               Welcome, {userData ? userData.firstName : "User"}!
//             </h2>
//             <div className="facilities-grid">
//               {/* AI Waste Classifier */}
//               <div className="facility-card"  onClick={() => setShowChatBot(true)}
//                style={{ cursor: "pointer" }}>
//                 <AiOutlineRobot size={50} />
//                 AI Waste Classifier
//               </div>

//               {/* Report Waste Issues */}
//               <div
//                 className="facility-card"
//                 onClick={() => navigate("/report-issue")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <AiOutlineEnvironment size={50} />
//                 Report Waste Issues
//               </div>

//               {/* Smart Bin Tracker */}
//               <div className="facility-card">
//                 <AiOutlineWifi size={50} />
//                 Smart Bin Tracker
//               </div>

//               {/* Rewards & Contests */}
//               <div
//                 className="facility-card"
//                 onClick={() => navigate("/rewards")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <AiOutlineTrophy size={50} />
//                 Rewards & Contests
//               </div>

//               {/* Eco Tips Daily */}
//               <div className="facility-card" onClick={()=>navigate("/eco-tips")}>
//                 <AiOutlineBulb size={50} />
//                 Eco Tips Daily
//               </div>

//               {/* Eco Challenges */}
//               <div className="facility-card" onClick={()=>navigate("/eco-challenges")}>
//                 <AiOutlineFlag size={50} />
//                 Eco Challenges
//               </div>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { signOut } from "firebase/auth";
// import { auth, db } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import {
//   AiOutlineMenu,
//   AiOutlineUser,
//   AiOutlineLogout,
//   AiOutlineInfoCircle,
//   AiOutlineRobot,
//   AiOutlineEnvironment,
//   AiOutlineWifi,
//   AiOutlineTrophy,
//   AiOutlineBulb,
//   AiOutlineFlag,
// } from "react-icons/ai";
// import PersonalInfo from "./PersonalInfo";
// import ChatBot from "./ChatBot"; // ✅ import ChatBot
// import { useNavigate } from "react-router-dom";
// import "./UserDashboard.css";

// export default function UserDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showPersonalInfo, setShowPersonalInfo] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [showChatBot, setShowChatBot] = useState(false); // ✅ state for ChatBot
//   const navigate = useNavigate();

//   // Listen for Firebase auth
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       if (user) fetchUserData(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const fetchUserData = async (user) => {
//     try {
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setUserData(docSnap.data());
//       } else {
//         toast.error("User data not found!");
//       }
//     } catch (error) {
//       toast.error("Failed to fetch user data: " + error.message);
//     }
//   };

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);
//   const closeSidebar = () => setSidebarOpen(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       toast.success("Logged out successfully!");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Logout failed: " + error.message);
//     }
//   };

//   const handleBackToDashboard = () => setShowPersonalInfo(false);

//   return (
//     <div className="dashboard-wrapper">
//       <header className="dashboard-header">
//         <button className="hamburger-btn" onClick={toggleSidebar}>
//           <AiOutlineMenu size={28} color="#00ff66" />
//         </button>
//         <h1>SmartWaste</h1>
//       </header>

//       {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

//       <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-user">
//           <AiOutlineUser size={48} color="#00ff66" />
//           <span className="username">
//             {userData ? `${userData.firstName} ${userData.lastName}` : "User"}
//           </span>
//         </div>

//         <nav className="sidebar-nav">
//           <button
//             className={`sidebar-btn ${showPersonalInfo ? "active" : ""}`}
//             onClick={() => {
//               setShowPersonalInfo(true);
//               closeSidebar();
//             }}
//           >
//             <AiOutlineInfoCircle size={20} />
//             <span>Personal Info</span>
//           </button>

//           <button className="sidebar-btn" onClick={handleLogout}>
//             <AiOutlineLogout size={20} />
//             <span>Logout</span>
//           </button>
//         </nav>
//       </aside>

//       <main className="dashboard-main">
//         {showPersonalInfo ? (
//           <PersonalInfo userData={userData} onBack={handleBackToDashboard} />
//         ) : (
//           <>
//             <h2 className="welcome-heading">
//               Welcome, {userData ? userData.firstName : "User"}!
//             </h2>

//             <div className="facilities-grid">
//               {/* AI Waste Classifier */}
//               <div
//                 className="facility-card"
//                 onClick={() => setShowChatBot(true)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <AiOutlineRobot size={50} />
//                 AI Waste Classifier
//               </div>

//               {/* Report Waste Issues */}
//               <div
//                 className="facility-card"
//                 onClick={() => navigate("/report-issue")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <AiOutlineEnvironment size={50} />
//                 Report Waste Issues
//               </div>

//               {/* Smart Bin Tracker */}
//               <div className="facility-card">
//                 <AiOutlineWifi size={50} />
//                 Smart Bin Tracker
//               </div>

//               {/* Rewards & Contests */}
//               <div
//                 className="facility-card"
//                 onClick={() => navigate("/rewards")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <AiOutlineTrophy size={50} />
//                 Rewards & Contests
//               </div>

//               {/* Eco Tips Daily */}
//               <div
//                 className="facility-card"
//                 onClick={() => navigate("/eco-tips")}
//               >
//                 <AiOutlineBulb size={50} />
//                 Eco Tips Daily
//               </div>

//               {/* Eco Challenges */}
//               <div
//                 className="facility-card"
//                 onClick={() => navigate("/eco-challenges")}
//               >
//                 <AiOutlineFlag size={50} />
//                 Eco Challenges
//               </div>
//             </div>

//             {/* Render ChatBot if clicked */}
//             {showChatBot && <ChatBot username={userData ? userData.firstName : "User"} />}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineInfoCircle,
  AiOutlineRobot,
  AiOutlineEnvironment,
  AiOutlineWifi,
  AiOutlineTrophy,
  AiOutlineBulb,
  AiOutlineFlag,
} from "react-icons/ai";
import PersonalInfo from "./PersonalInfo";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) fetchUserData(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (user) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        toast.error("User data not found!");
      }
    } catch (error) {
      toast.error("Failed to fetch user data: " + error.message);
    }
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  const handleBackToDashboard = () => setShowPersonalInfo(false);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <AiOutlineMenu size={28} color="#00ff66" />
        </button>
        <h1>SmartWaste</h1>
      </header>

      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-user">
          <AiOutlineUser size={48} color="#00ff66" />
          <span className="username">
            {userData ? `${userData.firstName} ${userData.lastName}` : "User"}
          </span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-btn ${showPersonalInfo ? "active" : ""}`}
            onClick={() => {
              setShowPersonalInfo(true);
              closeSidebar();
            }}
          >
            <AiOutlineInfoCircle size={20} />
            <span>Personal Info</span>
          </button>

          <button className="sidebar-btn" onClick={handleLogout}>
            <AiOutlineLogout size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        {showPersonalInfo ? (
          <PersonalInfo userData={userData} onBack={handleBackToDashboard} />
        ) : (
          <>
            <h2 className="welcome-heading">
              Welcome, {userData ? userData.firstName : "User"}!
            </h2>

            <div className="facilities-grid">
              {/* AI Waste Classifier */}
              <div
                className="facility-card"
                onClick={() => navigate("/chatbot")}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineRobot size={50} />
                AI Waste Classifier
              </div>

              {/* Report Waste Issues */}
              <div
                className="facility-card"
                onClick={() => navigate("/report-issue")}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineEnvironment size={50} />
                Report Waste Issues
              </div>

              {/* Smart Bin Tracker */}
              {/* <div className="facility-card">
                <AiOutlineWifi size={50} />
                Smart Bin Tracker
              </div> */}

              {/* Rewards & Contests */}
              <div
                className="facility-card"
                onClick={() => navigate("/rewards")}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineTrophy size={50} />
                Rewards & Contests
              </div>

              {/* Eco Tips Daily */}
              <div
                className="facility-card"
                onClick={() => navigate("/eco-tips")}
              >
                <AiOutlineBulb size={50} />
                Eco Tips Daily
              </div>

              {/* Eco Challenges */}
              <div
                className="facility-card"
                onClick={() => navigate("/eco-challenges")}
              >
                <AiOutlineFlag size={50} />
                Eco Challenges
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

