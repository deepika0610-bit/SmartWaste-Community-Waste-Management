// import React, { useEffect, useState } from "react";
// import { db, auth } from "../firebase/firebase";
// import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "./MyReports.css";

// export default function MyReports() {
//   const [reports, setReports] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const reportsCollection = collection(db, "reports");
//         const q = query(
//           reportsCollection,
//           where("userId", "==", user.uid), // fetch only this user's reports
//           orderBy("createdAt", "desc")
//         );
//         const snapshot = await getDocs(q);
//         setReports(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="my-reports-container">
//       <button className="back-btn" onClick={() => navigate("/report-issue")}>
//         ⬅ Back
//       </button>
//       <h2>📋 My Reports</h2>

//       {reports.length === 0 ? (
//         <p>No reports submitted yet.</p>
//       ) : (
//         <ul className="my-reports-list">
//           {reports.map((report) => (
//             <li key={report.id} className="my-report-item">
//               <p><strong>Issue:</strong> {report.issue}</p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 <span
//                   className={
//                     report.status === "Accepted"
//                       ? "status-accepted"
//                       : report.status === "Rejected"
//                       ? "status-rejected"
//                       : "status-pending"
//                   }
//                 >
//                   {report.status}
//                 </span>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./MyReports.css";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const reportsCollection = collection(db, "reports");

          // Create query - orderBy only if field exists, otherwise fallback
          const q = query(
            reportsCollection,
            where("userId", "==", user.uid)
            // orderBy("createdAt", "desc") // ensure createdAt exists in your docs
          );

          const snapshot = await getDocs(q);
          const fetchedReports = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              issue: data.issue || "No issue provided",
              status: data.status || "Pending",
              createdAt: data.createdAt ? data.createdAt.toDate() : null,
            };
          });

          // Sort manually in case some docs don't have createdAt
          fetchedReports.sort((a, b) => {
            if (!a.createdAt) return 1;
            if (!b.createdAt) return -1;
            return b.createdAt - a.createdAt;
          });

          console.log("Fetched Reports:", fetchedReports); // Debug
          setReports(fetchedReports);
        } catch (error) {
          console.error("Error fetching reports:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setReports([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="my-reports-container">
      <button className="back-btn" onClick={() => navigate("/report-issue")}>
        ⬅ Back
      </button>
      <h2>📋 My Reports</h2>

      {loading ? (
        <p>Loading your reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports submitted yet.</p>
      ) : (
        <ul className="my-reports-list">
          {reports.map((report) => (
            <li key={report.id} className="my-report-item">
              <p>
                <strong>Issue:</strong> {report.issue}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    report.status === "Accepted"
                      ? "status-accepted"
                      : report.status === "Rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }
                >
                  {report.status}
                </span>
              </p>
              {report.createdAt && (
                <p>
                  <small>
                    Submitted on: {report.createdAt.toLocaleString()}
                  </small>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
