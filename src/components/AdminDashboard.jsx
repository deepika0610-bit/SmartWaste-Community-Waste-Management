// import React, { useEffect, useState } from "react";
// import { db, auth } from "../firebase/firebase";
// import { collection, getDocs, query, orderBy, doc, getDoc, updateDoc, increment } from "firebase/firestore";
// import "./AdminDashboard.css";
// import { toast } from "react-toastify";

// export default function AdminDashboard() {
//   const [reports, setReports] = useState([]);
//   const [contestResponses, setContestResponses] = useState([]);
//   const [showReports, setShowReports] = useState(false);
//   const [showContests, setShowContests] = useState(false);
//   const [pointsInput, setPointsInput] = useState({}); // store points input for each response

//   // Fetch reports
//   useEffect(() => {
//     if (showReports) {
//       const fetchReports = async () => {
//         try {
//           const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
//           const snapshot = await getDocs(q);

//           const reportsWithUserData = await Promise.all(
//             snapshot.docs.map(async (docSnap) => {
//               const data = docSnap.data();
//               let userInfo = { firstName: "Unknown", lastName: "", location: "", address: "", contact: "" };

//               if (data.userId) {
//                 const userDoc = await getDoc(doc(db, "users", data.userId));
//                 if (userDoc.exists()) {
//                   userInfo = userDoc.data();
//                 }
//               }

//               return { id: docSnap.id, ...data, userInfo };
//             })
//           );

//           setReports(reportsWithUserData);
//         } catch (error) {
//           console.error("Error fetching reports:", error);
//         }
//       };
//       fetchReports();
//     }
//   }, [showReports]);

//   // Fetch contest responses
//   useEffect(() => {
//     if (showContests) {
//       const fetchResponses = async () => {
//         try {
//           const q = query(collection(db, "contestResponses"), orderBy("timestamp", "desc"));
//           const snapshot = await getDocs(q);
//           const responses = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//           setContestResponses(responses);
//         } catch (error) {
//           console.error("Error fetching contest responses:", error);
//         }
//       };
//       fetchResponses();
//     }
//   }, [showContests]);

//   // Function to award points to a user
//   const awardPoints = async (responseId, userUid) => {
//     const points = Number(pointsInput[responseId]);
//     if (!points || points <= 0) return toast.success("Enter valid points");

//     try {
//       // Update awardedPoints in contest response
//       await updateDoc(doc(db, "contestResponses", responseId), { awardedPoints: points });

//       // Increment user points in users collection
//       await updateDoc(doc(db, "users", userUid), { points: increment(points) });

//       toast.success(`✅ ${points} points awarded!`);

//       // Clear input field
//       setPointsInput((prev) => ({ ...prev, [responseId]: "" }));
//     } catch (error) {
//       console.error("Error awarding points:", error);
//       toast.warning("❌ Failed to award points.");
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

//       {!showReports && !showContests ? (
//         <div className="admin-cards">
//           {/* Reports card */}
//           <div className="admin-card" onClick={() => setShowReports(true)}>
//             <h2>View Reports</h2>
//             <p>See all user-submitted reports with details.</p>
//           </div>

//           {/* Contests card */}
//           <div className="admin-card" onClick={() => setShowContests(true)}>
//             <h2>View Contests</h2>
//             <p>See all contest ideas submitted by users and award points.</p>
//           </div>
//         </div>
//       ) : showReports ? (
//         <div className="reports-list">
//           <button className="back-btn" onClick={() => setShowReports(false)}>← Back to Dashboard</button>
//           {reports.length === 0 ? (
//             <p>No reports yet.</p>
//           ) : (
//             reports.map((report) => (
//               <div key={report.id} className="report-card">
//                 <p><strong>User:</strong> {report.userInfo?.firstName} {report.userInfo?.lastName}</p>
//                 <p><strong>Address:</strong> {report.userInfo?.address}</p>
//                 <p><strong>Contact:</strong> {report.userInfo?.contact}</p>
//                 <p><strong>Issue:</strong> {report.issue}</p>
//                 <p>
//                   <small>
//                     {report.createdAt?.toDate
//                       ? report.createdAt.toDate().toLocaleString()
//                       : "No date"}
//                   </small>
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       ) : (
//         <div className="contests-list">
//           <button className="back-btn" onClick={() => setShowContests(false)}>← Back to Dashboard</button>
//           {contestResponses.length === 0 ? (
//             <p>No contest ideas submitted yet.</p>
//           ) : (
//             contestResponses.map((resp) => (
//               <div key={resp.id} className="contest-card">
//                 <p><strong>User:</strong> {resp.email || "Anonymous"}</p>
//                 <p><strong>Idea:</strong> {resp.idea}</p>
//                 <p><strong>Awarded Points:</strong> {resp.awardedPoints || 0}</p>
//                 <input
//                   type="number"
//                   placeholder="Points"
//                   value={pointsInput[resp.id] || ""}
//                   onChange={(e) => setPointsInput({...pointsInput, [resp.id]: e.target.value})}
//                 />
//                 <button onClick={() => awardPoints(resp.id, resp.uid)}>Give Points</button>
//                 <p>
//                   <small>
//                     {resp.timestamp?.toDate
//                       ? resp.timestamp.toDate().toLocaleString()
//                       : "No date"}
//                   </small>
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import "./AdminDashboard.css";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [contestResponses, setContestResponses] = useState([]);
  const [showReports, setShowReports] = useState(false);
  const [showContests, setShowContests] = useState(false);
  const [pointsInput, setPointsInput] = useState({});

  // Fetch reports
  useEffect(() => {
    if (showReports) {
      const fetchReports = async () => {
        try {
          const q = query(
            collection(db, "reports"),
            orderBy("createdAt", "desc")
          );
          const snapshot = await getDocs(q);

          const reportsWithUserData = await Promise.all(
            snapshot.docs.map(async (docSnap) => {
              const data = docSnap.data();
              let userInfo = {
                firstName: "Unknown",
                lastName: "",
                location: "",
                address: "",
                contact: "",
              };

              if (data.userId) {
                const userDoc = await getDoc(doc(db, "users", data.userId));
                if (userDoc.exists()) {
                  userInfo = userDoc.data();
                }
              }

              return { id: docSnap.id, ...data, userInfo };
            })
          );

          setReports(reportsWithUserData);
        } catch (error) {
          console.error("Error fetching reports:", error);
        }
      };
      fetchReports();
    }
  }, [showReports]);

  // Fetch contest responses
  useEffect(() => {
    if (showContests) {
      const fetchResponses = async () => {
        try {
          const q = query(
            collection(db, "contestResponses"),
            orderBy("timestamp", "desc")
          );
          const snapshot = await getDocs(q);
          const responses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContestResponses(responses);
        } catch (error) {
          console.error("Error fetching contest responses:", error);
        }
      };
      fetchResponses();
    }
  }, [showContests]);

  // Accept / Reject report
  const handleReportStatus = async (reportId, status) => {
    try {
      await updateDoc(doc(db, "reports", reportId), { status });
      toast.success(`Report ${status}!`);
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status } : r))
      );
    } catch (error) {
      console.error("Error updating report:", error);
      toast.error("Failed to update report.");
    }
  };

  // Award points for contests
  const awardPoints = async (responseId, userUid) => {
    const points = Number(pointsInput[responseId]);
    if (!points || points <= 0) return toast.error("Enter valid points");

    try {
      await updateDoc(doc(db, "contestResponses", responseId), {
        awardedPoints: points,
      });
      await updateDoc(doc(db, "users", userUid), {
        points: increment(points),
      });

      toast.success(`✅ ${points} points awarded!`);
      setPointsInput((prev) => ({ ...prev, [responseId]: "" }));
    } catch (error) {
      console.error("Error awarding points:", error);
      toast.error("❌ Failed to award points.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {!showReports && !showContests ? (
        <div className="admin-cards">
          <div className="admin-card" onClick={() => setShowReports(true)}>
            <h2>View Reports</h2>
            <p>See all user-submitted reports with details.</p>
          </div>

          <div className="admin-card" onClick={() => setShowContests(true)}>
            <h2>View Contests</h2>
            <p>See all contest ideas submitted by users and award points.</p>
          </div>
        </div>
      ) : showReports ? (
        <div className="reports-list">
          <button className="back-btn" onClick={() => setShowReports(false)}>
            ← Back to Dashboard
          </button>
          {reports.length === 0 ? (
            <p>No reports yet.</p>
          ) : (
            reports.map((report) => (
              <div key={report.id} className="report-card">
                <p>
                  <strong>User:</strong> {report.userInfo?.firstName}{" "}
                  {report.userInfo?.lastName}
                </p>
                <p>
                  <strong>Address:</strong> {report.userInfo?.address}
                </p>
                <p>
                  <strong>Contact:</strong> {report.userInfo?.contact}
                </p>
                <p>
                  <strong>Issue:</strong> {report.issue}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`status ${report.status?.toLowerCase() || "pending"}`}
                  >
                    {report.status || "Pending"}
                  </span>
                </p>
                <p>
                  <small>
                    {report.createdAt?.toDate
                      ? report.createdAt.toDate().toLocaleString()
                      : "No date"}
                  </small>
                </p>

                {/* Accept / Reject Buttons */}
                <div className="report-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleReportStatus(report.id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReportStatus(report.id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="contests-list">
          <button className="back-btn" onClick={() => setShowContests(false)}>
            ← Back to Dashboard
          </button>
          {contestResponses.length === 0 ? (
            <p>No contest ideas submitted yet.</p>
          ) : (
            contestResponses.map((resp) => (
              <div key={resp.id} className="contest-card">
                <p>
                  <strong>User:</strong> {resp.email || "Anonymous"}
                </p>
                <p>
                  <strong>Idea:</strong> {resp.idea}
                </p>
                <p>
                  <strong>Awarded Points:</strong> {resp.awardedPoints || 0}
                </p>
                <input
                  type="number"
                  placeholder="Points"
                  value={pointsInput[resp.id] || ""}
                  onChange={(e) =>
                    setPointsInput({
                      ...pointsInput,
                      [resp.id]: e.target.value,
                    })
                  }
                />
                <button onClick={() => awardPoints(resp.id, resp.uid)}>
                  Give Points
                </button>
                <p>
                  <small>
                    {resp.timestamp?.toDate
                      ? resp.timestamp.toDate().toLocaleString()
                      : "No date"}
                  </small>
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}


