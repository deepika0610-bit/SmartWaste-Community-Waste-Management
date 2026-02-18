// import React from "react";
// import "./PersonalInfo.css";
// import { AiOutlineEdit } from "react-icons/ai";

// export default function PersonalInfo({ userData }) {
//   if (!userData) {
//     return <p>Loading user info...</p>;
//   }

//   return (
//     <div className="personal-info-container">
//       <h2>
//         Personal Information <AiOutlineEdit className="edit-icon" title="Edit info (coming soon)" />
//       </h2>
//       <div className="info-row">
//         <label>First Name:</label>
//         <span>{userData.firstName}</span>
//       </div>
//       <div className="info-row">
//         <label>Last Name:</label>
//         <span>{userData.lastName}</span>
//       </div>
//       <div className="info-row">
//         <label>Email:</label>
//         <span>{userData.email}</span>
//       </div>
//       <div className="info-row">
//         <label>Contact Number:</label>
//         <span>{userData.contact}</span>
//       </div>
//       <div className="info-row">
//         <label>Address:</label>
//         <span>{userData.address}</span>
//       </div>
//       <div className="info-row">
//         <label>City:</label>
//         <span>{userData.city}</span>
//       </div>
//       <div className="info-row">
//         <label>State:</label>
//         <span>{userData.state}</span>
//       </div>
//     </div>
//   );
// }
// import React from "react";
// import "./PersonalInfo.css";
// import { AiOutlineEdit } from "react-icons/ai";

// export default function PersonalInfo({ userData, onBack }) {
//   if (!userData) {
//     return <p>Loading user info...</p>;
//   }

//   return (
//     <div className="personal-info-container">
//       <h2>
//         Personal Information{" "}
//         <AiOutlineEdit className="edit-icon" title="Edit info (coming soon)" />
//       </h2>

//       <button className="back-btn" onClick={onBack}>
//         ← Back to Dashboard
//       </button>

//       <div className="info-row">
//         <label>First Name:</label>
//         <span>{userData.firstName}</span>
//       </div>
//       <div className="info-row">
//         <label>Last Name:</label>
//         <span>{userData.lastName}</span>
//       </div>
//       <div className="info-row">
//         <label>Email:</label>
//         <span>{userData.email}</span>
//       </div>
//       <div className="info-row">
//         <label>Contact Number:</label>
//         <span>{userData.contact}</span>
//       </div>
//       <div className="info-row">
//         <label>Address:</label>
//         <span>{userData.address}</span>
//       </div>
//       <div className="info-row">
//         <label>City:</label>
//         <span>{userData.city}</span>
//       </div>
//       <div className="info-row">
//         <label>State:</label>
//         <span>{userData.state}</span>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./PersonalInfo.css";
// import { AiOutlineEdit } from "react-icons/ai";

// export default function PersonalInfo({ userData, onBack }) {
//   if (!userData) {
//     return <p>Loading user info...</p>;
//   }

//   return (
//     <div className="personal-info-container">
//       <button className="back-to-dashboard-btn" onClick={onBack}>
//         &larr; Back to Dashboard
//       </button>
//       <h2>
//         Personal Information{" "}
//         <AiOutlineEdit className="edit-icon" title="Edit info (coming soon)" />
//       </h2>
//       <div className="info-row">
//         <label>First Name:</label>
//         <span>{userData.firstName}</span>
//       </div>
//       <div className="info-row">
//         <label>Last Name:</label>
//         <span>{userData.lastName}</span>
//       </div>
//       <div className="info-row">
//         <label>Email:</label>
//         <span>{userData.email}</span>
//       </div>
//       <div className="info-row">
//         <label>Contact Number:</label>
//         <span>{userData.contact}</span>
//       </div>
//       <div className="info-row">
//         <label>Address:</label>
//         <span>{userData.address}</span>
//       </div>
//       <div className="info-row">
//         <label>City:</label>
//         <span>{userData.city}</span>
//       </div>
//       <div className="info-row">
//         <label>State:</label>
//         <span>{userData.state}</span>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "./PersonalInfo.css";
import { AiOutlineEdit } from "react-icons/ai";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { toast } from "react-toastify";

export default function PersonalInfo({ userData, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, formData);
      toast.success("Information updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  if (!userData) return <p>Loading user info...</p>;

  return (
    <div className="personal-info-container">
      <button className="back-to-dashboard-btn" onClick={onBack}>
        &larr; Back to Dashboard
      </button>

      <h2>
        Personal Information{" "}
        <AiOutlineEdit
          className="edit-icon"
          title="Edit info"
          onClick={() => setIsEditing(true)}
        />
      </h2>

      {[
        { label: "First Name", name: "firstName" },
        { label: "Last Name", name: "lastName" },
        { label: "Email", name: "email" },
        { label: "Contact Number", name: "contact" },
        { label: "Address", name: "address" },
        { label: "City", name: "city" },
        { label: "State", name: "state" },
      ].map(({ label, name }) => (
        <div className="info-row" key={name}>
          <label>{label}:</label>
          {isEditing ? (
            <input
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="info-input"
            />
          ) : (
            <span>{userData[name]}</span>
          )}
        </div>
      ))}

      {isEditing && (
        <div className="edit-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

