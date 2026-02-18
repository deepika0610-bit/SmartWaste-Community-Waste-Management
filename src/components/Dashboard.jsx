import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import {
  FaRobot,
  FaMapMarkerAlt,
  FaGift,
  FaLeaf,
  FaTasks,
  FaExclamationTriangle
} from 'react-icons/fa';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">SmartWaste</div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to SmartWaste</h1>
        <p>Empowering communities with AI-driven waste management solutions.</p>
        <button className="btn-primary" onClick={() => navigate('/register')}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Facilities</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaRobot className="feature-icon" />
            <h3>AI Waste Classifier</h3>
            <p>Identify and sort waste with our AI-powered system.</p>
          </div>
          <div className="feature-card">
            <FaExclamationTriangle className="feature-icon" />
            <h3>Report Waste Issues</h3>
            <p>Quickly report garbage issues in your area.</p>
          </div>
          
          <div className="feature-card">
            <FaGift className="feature-icon" />
            <h3>Rewards & Contests</h3>
            <p>Earn rewards for your green contributions.</p>
          </div>
          <div className="feature-card">
            <FaLeaf className="feature-icon" />
            <h3>Eco Tips Daily</h3>
            <p>Get daily sustainability tips and practices.</p>
          </div>
          <div className="feature-card">
            <FaTasks className="feature-icon" />
            <h3>Eco Challenges</h3>
            <p>Participate in fun eco-friendly challenges.</p>
          </div>
          
         

        </div>
      </section>
    </div>
  );
}

export default Dashboard;

