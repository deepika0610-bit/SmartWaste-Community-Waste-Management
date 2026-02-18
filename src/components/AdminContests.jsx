import React, { useState } from "react";
import "./AdminContests.css";

function AdminContests() {
  const [submissions, setSubmissions] = useState([
    { id: 1, user: "Deepika", idea: "Ban single-use plastics in cafeterias.", contest: "Plastic-Free Week" },
    { id: 2, user: "Raj", idea: "Smart bins that auto-segregate waste.", contest: "Smart Recycling" }
  ]);

  const selectWinner = (id) => {
    const winner = submissions.find((s) => s.id === id);
    alert(`🏆 Winner Selected: ${winner.user}\nIdea: ${winner.idea}`);
    // 🔥 Later update in Firebase: mark as winner, give points
  };

  return (
    <div className="admin-container">
      <h2>👩‍💼 Admin - Contest Submissions</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id} className="submission-card">
            <p><strong>User:</strong> {s.user}</p>
            <p><strong>Contest:</strong> {s.contest}</p>
            <p><strong>Idea:</strong> {s.idea}</p>
            <button onClick={() => selectWinner(s.id)}>Select as Winner</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminContests;
