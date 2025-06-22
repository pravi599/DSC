import React from 'react';
import './ReportSection.css';

function ReportSection() {
  const generateReportByJD = () => {
    alert('Report by JD generated (mock)');
  };

  const generateReportByConsultant = () => {
    alert('Report by Consultant generated (mock)');
  };

  return (
    <div className="report-section">
      <h3>Generate Report</h3>
      <button onClick={generateReportByJD}>By JD</button>
      <button onClick={generateReportByConsultant}>By Consultant</button>
    </div>
  );
}

export default ReportSection;