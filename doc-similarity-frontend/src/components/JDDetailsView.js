import React from 'react';
import './ARDashboard.css';

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

function JDDetailsView({ selectedJD, setSelectedJD }) {
  return (
    <div className="details-section">
      <button className="back-button" onClick={() => setSelectedJD(null)}>
        ← Back
      </button>

      <div className="workflow-container with-arrows">
        {["comparisonStatus", "topMatches", "emailStatus"].map((step, idx) => {
          const label =
            step === "comparisonStatus"
              ? "JD Compared"
              : step === "topMatches"
              ? "Top 3 Matches"
              : "Email Sent";

          const className = getStepClass(selectedJD[step], step === "topMatches" ? "profiles" : "");
          const icon = getStepIcon(step, selectedJD[step]);

          return (
            <div key={idx} className={`workflow-step ${className}`} title={label}>
              <h4>{label}</h4>
              <p>{icon}</p>
              <span className="tooltip">
                {typeof selectedJD[step] === 'object' ? '' : selectedJD[step]}
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
        {selectedJD.topMatches.length ? (
          <div className="profiles-grid">
            {selectedJD.topMatches.map((match, index) => (
              <div className="profile-card enhanced uniform" key={match.id}>
                <div className="profile-rank">🏅 Rank #{index + 1}</div>
                <h4>{match.name}</h4>
                <p><strong>Email:</strong> {match.email}</p>
                <p><strong>Experience:</strong> {match.experience} years</p>
                <p><strong>Skills:</strong> {match.skills}</p>
                <div className="match-bar-container">
                  <div
                    className="match-bar skills"
                    style={{ width: `${match.score}%` }}
                    data-label={`${match.score}%`}
                  >
                    Similarity Score
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
