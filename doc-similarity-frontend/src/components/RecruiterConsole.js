import React from 'react';
import ConsultantList from './ConsultantList';
import AgenticMonitor from './AgenticMonitor';
import './RecruiterConsole.css';
import RecruiterLayout from './RecruiterLayout';
 
function RecruiterConsole() {
  return (
<RecruiterLayout active="recruiter">
<div className="recruiter-console">
{/* <h2 className="console-title">Recruiter Console</h2> */}
<ConsultantList />
<AgenticMonitor />
</div>
</RecruiterLayout>
  );
}
export default RecruiterConsole;