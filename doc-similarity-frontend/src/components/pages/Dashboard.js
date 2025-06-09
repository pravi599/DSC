import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchStatus from './MatchStatus';
import ProgressBar from '../ProgressBar';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h2>Agentic Ranking Dashboard</h2>
        {/* <ProgressBar steps={['JD Compared', 'Profiles Ranked', 'Email Sent to AR Requestor']} currentStep={2} /> */}

        <div className="status-section">
          <div className="status-card">
            <h4>JD Comparison Status</h4>
            <p className="status completed">✔ Completed</p>
            <button onClick={() => navigate('/jd-compared')}>View Comparison</button>
          </div>

          <div className="status-card">
            <h4>Email Notification</h4>
            <p className="status pending">⏳ 2 Pending</p>
            <button onClick={() => navigate('/email-pending')}>View Email Status</button>
          </div>
        </div>

        <MatchStatus />

        <div className="dashboard-buttons">
          <button onClick={() => navigate('/profiles-ranked')}>View Profile Ranking</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
