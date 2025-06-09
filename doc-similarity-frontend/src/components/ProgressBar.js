// src/components/ProgressBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function ProgressBar() {
    return (
      <div style={{ display: 'flex', gap: '10px', margin: '20px', justifyContent: 'center' }}>
        <Link to="/jd-compared" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#4caf50', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>JD Compared</div>
        </Link>
        <Link to="/profiles-ranked" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#4caf50', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>Profiles Ranked</div>
        </Link>
        <Link to="/email-pending" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#ff9800', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>Email Pending</div>
        </Link>
      </div>
    );
  }
  
  export default ProgressBar;