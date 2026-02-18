import React, { useState } from "react";
import "./LoginForm.css";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminData, setAdminData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  // Handle User login
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      toast.success("Login successful!");
      navigate("/user-dashboard");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!loginData.email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, loginData.email);
      toast.success("Reset link sent to your email.");
    } catch (error) {
      toast.error("Failed to send reset email: " + error.message);
    }
  };

  // Open Admin Modal (RESET admin data to empty every time)
  const openAdminModal = () => {
    setAdminData({ email: "", password: "" }); // clears previous values
    setShowAdminModal(true);
  };

  // Admin Login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      adminData.email === "deepikamaharaja2020@gmail.com" &&
      adminData.password === "12345678"
    ) {
      toast.success("Admin login successful!");
      setShowAdminModal(false);
      navigate("/admin-dashboard");
    } else {
      toast.error("Invalid Admin Credentials!");
    }
  };

  return (
    <div className="form-container">
      <div className="overlay"></div>

      {/* Login Form */}
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        {/* Admin Icon */}
        <div className="admin-icon" onClick={openAdminModal}>
          <FaUserShield size={24} />
          <span>Admin</span>
        </div>

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          autoComplete="off"   // 🚀 stops browser autofill
          required
        />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            autoComplete="new-password"   // 🚀 stops saved password autofill
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
        </button>

        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
      </form>

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin} autoComplete="off">
              <input
                type="email"
                placeholder="Admin Email"
                value={adminData.email}
                onChange={(e) =>
                  setAdminData({ ...adminData, email: e.target.value })
                }
                autoComplete="off"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={adminData.password}
                onChange={(e) =>
                  setAdminData({ ...adminData, password: e.target.value })
                }
                autoComplete="new-password"
                required
              />
              <button type="submit">Login as Admin</button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowAdminModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
