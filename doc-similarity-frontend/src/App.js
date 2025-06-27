import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import RecruiterConsole from './components/RecruiterConsole';
import ARDashboard from './components/ARDashboard';
import EmailStatus from './components/EmailStatus';
import JDCompared from './components/JDCompared';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <ARDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/email-status" 
          element={
            <PrivateRoute>
              <EmailStatus />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/recruiter" 
          element={
            <PrivateRoute>
              <RecruiterConsole />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/jd-compared" 
          element={
            <PrivateRoute>
              <JDCompared />
            </PrivateRoute>
          } 
        />
      </Routes> 
    </Router>
  );
}

export default App;
