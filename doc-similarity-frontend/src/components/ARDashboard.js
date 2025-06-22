// ARDashboard.js
import React, { useState } from 'react';
import Layout from './Layout';
import './ARDashboard.css';

const jdMockData = [
  {
    id: 'JD101',
    title: 'Frontend Developer - React',
    fileType: 'pdf',
    fileUrl: 'https://example.com/frontend.pdf',
    comparisonStatus: 'Completed',
    topMatches: ['Alice', 'Bob', 'Clara'],
    emailStatus: 'Sent',
  },
  {
    id: 'JD102',
    title: 'Backend Developer - Node.js',
    fileType: 'word',
    fileUrl: 'https://example.com/backend.docx',
    comparisonStatus: 'Completed',
    topMatches: ['Dan', 'Eva', 'Frank'],
    emailStatus: 'Sent',
  },
  {
    id: 'JD103',
    title: 'Data Analyst',
    fileType: 'excel',
    fileUrl: 'https://example.com/data.xlsx',
    comparisonStatus: 'In Progress',
    topMatches: [],
    emailStatus: 'Pending',
  },
];

function getFileIcon(type) {
  if (type === 'pdf') return '📑';
  if (type === 'word') return '📝';
  if (type === 'excel') return '📊';
  return '📄';
}

function getStepClass(status, step) {
  if (step === 'profiles') return status.length ? 'done' : 'notfound';
  if (status === 'Completed' || status === 'Sent') return 'done';
  if (status === 'In Progress' || status === 'Pending') return 'pending';
  return 'notstarted';
}

function getStepIcon(step, status) {
  if (step === 'comparisonStatus') return status === 'Completed' ? '✔️' : '⏳';
  if (step === 'topMatches') return status.length ? '🏆' : '❌';
  if (step === 'emailStatus') return status === 'Sent' ? '📤' : '⏳';
  return '⏳';
}

function calculateOverallStatus(jd) {
  const isComparisonDone = jd.comparisonStatus === 'Completed';
  const isTopMatchesDone = jd.topMatches && jd.topMatches.length > 0;
  const isEmailSent = jd.emailStatus === 'Sent';

  if (isComparisonDone && isTopMatchesDone && isEmailSent) return 'Completed';
  if (isComparisonDone || isTopMatchesDone || isEmailSent) return 'In Progress';
  return 'Pending';
}

function ARDashboard() {
  const [selectedJD, setSelectedJD] = useState(null);

  return (
    <div className="dashboard-wrapper">
      <Layout active="dashboard" />
      <div className="ar-dashboard">
        <h2 className="dashboard-title">AR Requestor Dashboard</h2>

        {!selectedJD ? (
          <div className="jd-list-grid">
            {jdMockData.map((jd) => (
              <div className="jd-card" key={jd.id}>
                <div className="jd-file-row">
                  <div className="jd-file-info">
                    <span className="jd-file-icon">{getFileIcon(jd.fileType)}</span>
                    <a
                      href={jd.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {jd.title}
                    </a>
                  </div>
                  <button
                    className="view-status-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJD(jd);
                    }}
                  >
                    View Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="details-section">
            <button className="back-button" onClick={() => setSelectedJD(null)}>
              ← Back
            </button>

            <div className="workflow-container">
              {['comparisonStatus', 'topMatches', 'emailStatus'].map((step, idx) => {
                const label =
                  step === 'comparisonStatus'
                    ? 'JD Compared'
                    : step === 'topMatches'
                    ? 'Top 3 Matches'
                    : 'Email Sent';

                const className = getStepClass(selectedJD[step], step === 'topMatches' ? 'profiles' : '');
                const icon = getStepIcon(step, selectedJD[step]);

                return (
                  <div key={idx} className={`workflow-step ${className}`} title={label}>
                    <h4>{label}</h4>
                    <p>{icon}</p>
                    <span className="tooltip">{selectedJD[step]}</span>
                  </div>
                );
              })}

              <div className="overall-status-badge" title="Overall Status">
                ✅ Overall: {calculateOverallStatus(selectedJD)}
              </div>
            </div>

            <div className="profile-section">
  <h3>Top 3 Ranked Profiles</h3>
  {selectedJD.topMatches.length ? (
    <div className="profiles-grid">
      {selectedJD.topMatches.map((name, index) => {
        // Mock scores out of 100
        const categoryScores = {
          skills: Math.floor(Math.random() * 31 + 60), // 60-90
          experience: Math.floor(Math.random() * 31 + 60),
          education: Math.floor(Math.random() * 31 + 60),
        };
        // Average of categories for overall
        const overallScore = Math.floor(
          (categoryScores.skills + categoryScores.experience + categoryScores.education) / 3
        );

        return (
          <div className="profile-card enhanced" key={index}>
            <h4>{name}</h4>
            <p><strong>Email:</strong> {name.toLowerCase()}@example.com</p>
            <p><strong>Overall Match:</strong> {overallScore}%</p>
            <div className="match-bar-container">
              <div
                className="match-bar skills"
                style={{ width: `${categoryScores.skills}%` }}
                data-label={`${categoryScores.skills}%`}
              >
                Skills
              </div>
              <div
                className="match-bar experience"
                style={{ width: `${categoryScores.experience}%` }}
                data-label={`${categoryScores.experience}%`}
              >
                Experience
              </div>
              <div
                className="match-bar education"
                style={{ width: `${categoryScores.education}%` }}
                data-label={`${categoryScores.education}%`}
              >
                Education
              </div>
            </div>
            <p>Rank: {index + 1}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="no-profiles">No matches found.</p>
  )}
</div>


          </div>
        )}
      </div>
    </div>
  );
}

export default ARDashboard;
