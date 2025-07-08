// src/pages/JDDetailsView.js
import React from 'react';
import './ARDashboard.css';

function getStepClass(status, isProfilesStep = false) {
  if (isProfilesStep) return status.length ? 'done' : 'notfound';
  if (status === 'Comparison Completed' || status === 'Communication Sent') return 'done';
  if (status === 'In Progress' || status === 'Communication Failed') return 'pending';
  return 'notstarted';
}

function getStepIcon(step, status) {
  if (step === 'comparisonStatus') return status === 'Comparison Completed' ? '✔️' : '⏳';
  if (step === 'topMatches') return status.length ? '🏆' : '❌';
  if (step === 'emailStatus') return status === 'Communication Sent' ? '📤' : '⏳';
  return '⏳';
}

function calculateOverallStatus(jd) {
  const isComparisonDone = jd.comparisonStatus === 'Comparison Completed';
  const isTopMatchesDone = jd.topMatches && jd.topMatches.length > 0;
  const isEmailSent = jd.emailStatus === 'Communication Sent';

  if (isComparisonDone && isTopMatchesDone && isEmailSent) return 'Completed';
  if (isComparisonDone || isTopMatchesDone || isEmailSent) return 'In Progress';
  return 'Pending';
}

function JDDetailsView({ selectedJD, setSelectedJD }) {
  const sortedTop3 = [...selectedJD.topMatches]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="details-section">
      <button className="back-button" onClick={() => setSelectedJD(null)}>
        ← Back
      </button>

      <div className="workflow-container with-arrows">
        {['comparisonStatus', 'topMatches', 'emailStatus'].map((step, idx) => {
          const label = step === 'comparisonStatus'
            ? 'JD Compared'
            : step === 'topMatches'
              ? 'Top 3 Matches'
              : 'Email Sent';

          const status = selectedJD[step];
          const isProfilesStep = step === 'topMatches';
          const className = getStepClass(status, isProfilesStep);
          const icon = getStepIcon(step, status);

          return (
            <div key={idx} className={`workflow-step ${className}`} title={label}>
              <h4>{label}</h4>
              <p>{icon}</p>
              <span className="tooltip">
                {typeof status === 'object' ? '' : status}
              </span>
            </div>
          );
        })}

        <div className="overall-status-badge" title="Overall Status">
          ✅ Overall: {calculateOverallStatus(selectedJD)}
        </div>
      </div>

      <div className="profile-section">
        <h3>Top 3 Ranked Profiles</h3>
        {sortedTop3.length ? (
          <div className="profiles-grid">
            {sortedTop3.map((match, index) => (
              <div className="profile-card enhanced uniform" key={match.id}>
                <div className="profile-rank">🏅 #{index + 1}</div>
                <h4>{match.name}</h4>
                <p><strong>Email:</strong> {match.email}</p>
                <p><strong>Experience:</strong> {match.experience} years</p>
                <p><strong>Skills:</strong> {match.skills}</p>
                <div className="match-bar-container">
                  <div
                    className="match-bar skills"
                    style={{ width: `${match.score}%` }}
                    data-label={`${match.score.toFixed(2)}%`}
                  >
                    Score
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-profiles">No matches found.</p>
        )}
      </div>
    </div>
  );
}

export default JDDetailsView;
