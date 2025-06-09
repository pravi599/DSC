// File: components/Filters.js
import React from 'react';
import '../styles/Filters.css';

function Filters() {
  return (
    <div className="filters">
      <input type="text" placeholder="Search JD or skill..." />
      <select>
        <option value="">All Experience</option>
        <option value="0-2">0-2 yrs</option>
        <option value="3-5">3-5 yrs</option>
        <option value="6+">6+ yrs</option>
      </select>
      <select>
        <option value="">All Status</option>
        <option value="Available">Available</option>
        <option value="Busy">Busy</option>
      </select>
    </div>
  );
}

export default Filters;