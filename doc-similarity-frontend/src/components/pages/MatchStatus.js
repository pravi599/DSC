// File: components/MatchStatus.js
import React from 'react';
import { consultantProfiles } from '../data';
import '../styles/MatchStatus.css';

function MatchStatus() {
  return (
    <div className="match-status">
      <h3>Top Consultant Matches</h3>
      {consultantProfiles.slice(0, 3).map((profile) => (
        <div key={profile.id} className="profile-card">
          <div className="profile-info">
            <strong>{profile.name}</strong>
            <span className="score">Score: {profile.similarityScore}</span>
          </div>
          <div className="skills">
            Skills: {profile.skills.join(', ')}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchStatus;
