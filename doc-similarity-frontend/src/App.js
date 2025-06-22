import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
// import Dashboard from './components/pages/Dashboard';
import RecruiterConsole from './components/pages/RecruiterConsole';
// import JDCompared from './components/pages/JDCompared';
// import ProfilesRanked from './components/pages/ProfilesRanked';
// import EmailPending from './components/pages/EmailPending';
import ARDashboard from './components/ARDashboard';
import ProfilesRanked from './components/ProfilesRanked';
import EmailStatus from './components/EmailStatus';
import JDCompared from './components/JDCompared';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ARDashboard />} />
      <Route path="/email-status" element={<EmailStatus />} />
      <Route path="/recruiter" element={<RecruiterConsole />} />
      <Route path="/jd-compared" element={<JDCompared />} />
      <Route path="/profiles-ranked" element={<ProfilesRanked />} />

      </Routes> 


    </Router>
  );
}

export default App;