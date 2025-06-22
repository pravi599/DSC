// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in (example: based on a localStorage item)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {

    localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('token');

    // Navigate to login page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">Document Similarity Comparison and Ranking</div>
      <div className="nav-links">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/" className="login-button">Login</Link>
        )}
        {/* <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/recruiter">Recruiter</Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
