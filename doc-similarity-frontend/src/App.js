import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import RecruiterConsole from './components/RecruiterConsole';
import ARDashboard from './components/ARDashboard';
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
      </Routes> 
    </Router>
  );
}

export default App;