import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./ViewContests.css";

function ViewContests() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const q = query(collection(db, "contestResponses"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResponses(data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    fetchResponses();
  }, []);

  return (
    <div className="view-contests-wrapper">
      <div className="view-contests-container">
        <h2>📋 Submitted Contest Ideas</h2>
        {responses.length === 0 ? (
          <p>No contest ideas submitted yet.</p>
        ) : (
          <ul>
            {responses.map((resp) => (
              <li key={resp.id}>
                <p><strong>{resp.email}</strong> said:</p>
                <p>{resp.idea}</p>
                <small>{resp.timestamp?.toDate().toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ViewContests;
