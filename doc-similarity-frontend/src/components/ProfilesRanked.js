import React, { useState } from 'react';
import Layout from './Layout';

function ProfilesRanked() {
  const [selectedJD, setSelectedJD] = useState('React Developer');

  const rankedProfiles = {
    'React Developer': [
      { id: 1, name: 'Alice', score: 95 },
      { id: 2, name: 'Bob', score: 92 },
      { id: 3, name: 'Cara', score: 88 },
    ],
    'Java Developer': [
      { id: 4, name: 'Dan', score: 94 },
      { id: 5, name: 'Eve', score: 90 },
      { id: 6, name: 'Frank', score: 87 },
    ],
    'Python Engineer': [
      { id: 7, name: 'Grace', score: 96 },
      { id: 8, name: 'Heidi', score: 93 },
      { id: 9, name: 'Ivan', score: 89 },
    ],
  };

  return (
    <div className="layout">
      <Layout active="profiles-ranked" />
      <div className="content">
        <h2>Profiles Ranked</h2>

        <select value={selectedJD} onChange={(e) => setSelectedJD(e.target.value)} className="dropdown">
          {Object.keys(rankedProfiles).map(jd => (
            <option key={jd} value={jd}>{jd}</option>
          ))}
        </select>

        <div className="profiles">
          {rankedProfiles[selectedJD].map(profile => (
            <div key={profile.id} className="profile-card">
              <strong>{profile.name}</strong>
              <p>Matching Score: {profile.score}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
          background: #f4f6f8;
        }
        .content {
          flex: 1;
          padding: 30px;
        }
        h2 {
          margin-bottom: 20px;
          margin-top:50px;
          color: #2c3e50;
        }
        .dropdown {
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 6px;
          font-size: 16px;
        }
        .profiles {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .profile-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
}

export default ProfilesRanked;