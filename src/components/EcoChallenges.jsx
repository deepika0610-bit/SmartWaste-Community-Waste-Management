import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import "./EcoChallenges.css";
import { toast } from "react-toastify";

function EcoChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [completed, setCompleted] = useState([]);

  // Default challenges (will be added if Firestore has none)
  const defaultChallenges = [
    {
      title: "Carry a Reusable Bottle",
      description: "Say goodbye to plastic bottles. Use a steel/reusable one today! 🌊",
      points: 10,
    },
    {
      title: "Turn Off Lights",
      description: "Switch off lights & fans when leaving a room 💡",
      points: 15,
    },
    {
      title: "Plant a Tree",
      description: "Plant a sapling in your garden or community park 🌳",
      points: 30,
    },
    {
      title: "Use Cloth Bag",
      description: "Avoid plastic bags and switch to cloth bags 🛍️",
      points: 20,
    },
    {
      title: "Carpool Today",
      description: "Share your ride with friends or colleagues 🚗",
      points: 25,
    },
    {
      title: "Walk or Cycle",
      description: "Instead of driving, walk or bike to nearby places 🚴‍♂️",
      points: 25,
    },
    {
      title: "Go Paperless",
      description: "Opt for digital bills and notes instead of printing 📝",
      points: 15,
    },
  ];

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesRef = collection(db, "ecoChallenges");
        const snapshot = await getDocs(challengesRef);

        // If no challenges exist in Firestore → add defaults
        if (snapshot.empty) {
          for (const challenge of defaultChallenges) {
            await addDoc(challengesRef, challenge);
          }
          const newSnapshot = await getDocs(challengesRef);
          setChallenges(
            newSnapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            }))
          );
        } else {
          setChallenges(
            snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    const fetchCompleted = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userCompletedRef = collection(
          db,
          "users",
          user.uid,
          "completedChallenges"
        );
        const snapshot = await getDocs(userCompletedRef);
        setCompleted(snapshot.docs.map((docSnap) => docSnap.id));
      } catch (error) {
        console.error("Error fetching completed challenges:", error);
      }
    };

    fetchChallenges();
    fetchCompleted();
  }, []);

  const handleComplete = async (challenge) => {
    const user = auth.currentUser;
    if (!user) return toast.warning("⚠️ You must be logged in!");

    try {
      // Mark challenge as completed
      const challengeRef = doc(
        db,
        "users",
        user.uid,
        "completedChallenges",
        challenge.id
      );
      await setDoc(challengeRef, {
        status: "completed",
        pointsEarned: challenge.points,
        timestamp: new Date(),
      });

      // Update user points
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const currentPoints = userSnap.data().points || 0;
        await updateDoc(userRef, {
          points: currentPoints + challenge.points,
        });
      } else {
        await setDoc(userRef, { points: challenge.points });
      }

      setCompleted((prev) => [...prev, challenge.id]);
      toast.success(`✅ Challenge Completed! You earned ${challenge.points} points`);
    } catch (error) {
      console.error("Error completing challenge:", error);
    }
  };

  return (
    <div className="eco-challenges-container">
      <h2>Eco Challenges 🌍</h2>
      <div className="challenges-list">
        {challenges.length === 0 ? (
          <p className="no-data">⚠️ No challenges available yet.</p>
        ) : (
          challenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card">
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <p className="points">Points: {challenge.points}</p>

              {completed.includes(challenge.id) ? (
                <button className="completed-btn" disabled>
                  Completed ✅
                </button>
              ) : (
                <button
                  className="done-btn"
                  onClick={() => handleComplete(challenge)}
                >
                  Mark as Done
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EcoChallenges;
