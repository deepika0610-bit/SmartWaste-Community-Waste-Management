import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ReportIssue.css";

export default function ReportIssue() {
  const [currentUser, setCurrentUser] = useState(null);
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return toast.error("User not logged in yet.");

    if (!issue.trim()) return toast.error("Please describe the issue.");

    setLoading(true);
    try {
      await addDoc(collection(db, "reports"), {
        userId: currentUser.uid,
        issue: issue.trim(),
        createdAt: serverTimestamp(),
        status: "Pending" // default status
      });
      toast.success("Report submitted successfully!");
      setIssue("");
    } catch (error) {
      toast.error("Failed to submit report: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-issue-container">
      <button
        className="back-to-dashboard-btn"
        onClick={() => navigate("/user-dashboard")}
      >
        Back to Dashboard
      </button>

      <h2>Report Waste Issue</h2>

      <form className="report-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe the issue..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      {/* Track My Reports button */}
      <button
        className="track-reports-btn"
        onClick={() => navigate("/my-reports")}
      >
        📋 Track My Reports
      </button>
    </div>
  );
}

