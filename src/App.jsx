// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import RegisterForm from "./components/RegisterForm";
// import LoginForm from "./components/LoginForm";
// import UserDashboard from "./components/UserDashboard";
// import AdminDashboard from "./components/AdminDashboard";
// import ErrorBoundary from "./components/ErrorBoundary";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ReportIssue from "./components/ReportIssue";
// import RewardsContests from "./components/RewardsContests";
// import AdminContests from "./components/AdminContests";
// import EcoTipsDaily from "./components/EcoTipsDaily";
// import EcoChallenges from "./components/EcoChallenges";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/report-issue" element={<ReportIssue />} />
//         <Route path="/rewards" element={<RewardsContests />} />
//         <Route path="/admin/contests" element={<AdminContests />} />
//         <Route path="/eco-tips" element={<EcoTipsDaily />} />
//         <Route path="/eco-challenges" element={<EcoChallenges />} />

//         <Route
//           path="/user-dashboard"
//           element={
//             <ErrorBoundary>
//               <UserDashboard />
//             </ErrorBoundary>
//           }
//         />

//         <Route
//           path="/admin-dashboard"
//           element={
//             <ErrorBoundary>
//               <AdminDashboard />
//             </ErrorBoundary>
//           }
//         />
//       </Routes>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import RegisterForm from "./components/RegisterForm";
// import LoginForm from "./components/LoginForm";
// import UserDashboard from "./components/UserDashboard";
// import AdminDashboard from "./components/AdminDashboard";
// import ErrorBoundary from "./components/ErrorBoundary";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ReportIssue from "./components/ReportIssue";
// import RewardsContests from "./components/RewardsContests";
// import AdminContests from "./components/AdminContests";
// import EcoTipsDaily from "./components/EcoTipsDaily";
// import EcoChallenges from "./components/EcoChallenges";
// import ChatBot from "./components/ChatBot"; // import ChatBot
// import { auth } from "./firebase/firebase"; // import Firebase auth

// function App() {
//   const [username, setUsername] = useState("Guest");

//   // Get the logged-in user's display name
//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user) {
//       setUsername(user.displayName || "Guest");
//     }
//   }, []);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/report-issue" element={<ReportIssue />} />
//         <Route path="/rewards" element={<RewardsContests />} />
//         <Route path="/admin/contests" element={<AdminContests />} />
//         <Route path="/eco-tips" element={<EcoTipsDaily />} />
//         <Route path="/eco-challenges" element={<EcoChallenges />} />

//         {/* ChatBot route */}
//         <Route path="/chatbot" element={<ChatBot username={username} />} />

//         <Route
//           path="/user-dashboard"
//           element={
//             <ErrorBoundary>
//               <UserDashboard />
//             </ErrorBoundary>
//           }
//         />

//         <Route
//           path="/admin-dashboard"
//           element={
//             <ErrorBoundary>
//               <AdminDashboard />
//             </ErrorBoundary>
//           }
//         />
//       </Routes>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportIssue from "./components/ReportIssue";
import RewardsContests from "./components/RewardsContests";
import AdminContests from "./components/AdminContests";
import EcoTipsDaily from "./components/EcoTipsDaily";
import EcoChallenges from "./components/EcoChallenges";
import ChatBot from "./components/ChatBot"; // ✅ ChatBot page
import { auth } from "./firebase/firebase"; // ✅ Firebase auth
import MyReports from "./components/MyReports";


function App() {
  const [username, setUsername] = useState("Guest");

  // Get the logged-in user's name (for greeting in ChatBot)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || "Guest");
      } else {
        setUsername("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/my-reports" element={<MyReports />} /> 
        <Route path="/rewards" element={<RewardsContests />} />
        <Route path="/admin/contests" element={<AdminContests />} />
        <Route path="/eco-tips" element={<EcoTipsDaily />} />
        <Route path="/eco-challenges" element={<EcoChallenges />} />

        {/* ChatBot page */}
        <Route path="/chatbot" element={<ChatBot username={username} />} />
        

        <Route
          path="/user-dashboard"
          element={
            <ErrorBoundary>
              <UserDashboard />
            </ErrorBoundary>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ErrorBoundary>
              <AdminDashboard />
            </ErrorBoundary>
          }
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
