import React from 'react';
import Filters from './Filters';
import ConsultantList from './ConsultantList';
import AgenticMonitor from './AgenticMonitor';
import ReportSection from './ReportSection';
import '../styles/RecruiterConsole.css';

function RecruiterConsole() {
  return (
    <div className="recruiter-console">
      <h2 className="console-title">Recruiter Console</h2>
      <Filters />
      <ConsultantList />
      <AgenticMonitor />
      <ReportSection />
    </div>
  );
}
export default RecruiterConsole;