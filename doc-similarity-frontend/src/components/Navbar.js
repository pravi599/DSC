// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Document Similarity Comparison and Ranking</div>
      <div className="nav-links">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/recruiter">Recruiter</Link>
      </div>
    </nav>
  );
}

export default Navbar;
