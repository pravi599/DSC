import React from 'react';
import { consultantProfiles } from './data';
import './ConsultantList.css';

function ConsultantList() {
  return (
    <div className="card-grid">
      {consultantProfiles.map((c) => (
        <div key={c.id} className="consultant-card">
          <h3>{c.name}</h3>
          <p><strong>Skills:</strong> {c.skills.join(', ')}</p>
          <p><strong>Experience:</strong> {c.experience} yrs</p>
          <p><strong>Score:</strong> {c.similarityScore}</p>
        </div>
      ))}
    </div>
  );
}

export default ConsultantList;