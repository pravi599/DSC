import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import RecruiterConsole from './components/pages/RecruiterConsole';
import JDCompared from './components/pages/JDCompared';
import ProfilesRanked from './components/pages/ProfilesRanked';
import EmailPending from './components/pages/EmailPending';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recruiter" element={<RecruiterConsole />} />
        <Route path="/jd-compared" element={<JDCompared />} />
        <Route path="/profiles-ranked" element={<ProfilesRanked />} />
        <Route path="/email-pending" element={<EmailPending />} />
      </Routes>
    </Router>
  );
}

export default App;