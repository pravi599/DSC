import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import JDListAndSearch from './JDListAndSearch';
import JDDetailsView from './JDDetailsView';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ARDashboard.css';

function ARDashboard() {
  const [jdData, setJdData] = useState([]);
  const [selectedJD, setSelectedJD] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileSelect = (file) => setSelectedFile(file);
  const handleCancel = () => {
    setSelectedFile(null);
    setIsModalOpen(false);
  };

  const handleCompare = () => {
    if (!selectedFile) {
      toast.error('Please select a file to compare.');
      return;
    }
    setTimeout(() => {
      setSelectedFile(null);
      setIsModalOpen(false);
    }, 1500);
  };

  useEffect(() => {
    axios
      .get('https://localhost:7117/api/JobDescription')
      .then((res) => {
        const mapped = res.data.map((jd) => ({
          id: jd.jdId,
          title: jd.jdTitle,
          comparisonStatus: jd.requestors?.[0]?.comparisonStatus || 'Pending',
          emailStatus: jd.requestors?.[0]?.communicationStatus || 'Pending',
          topMatches: jd.resumeDetails
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map((res) => ({
              id: res.id,
              jdId: res.jdId,
              name: res.name,
              email: res.email,
              experience: res.experience,
              skills: res.skills,
              score: Math.round(Number(res.score) * 100) / 100,
            })),
        }));
        setJdData(mapped);
      })
      .catch((err) => {
        console.error('Error fetching JDs:', err);
        toast.error('Failed to load job descriptions');
      });
  }, []);

  const filteredJDs = jdData.filter((jd) =>
    jd.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <Layout active="dashboard" />
      <ToastContainer />
      <div className="ar-dashboard">
        {!selectedJD ? (
          <JDListAndSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            selectedFile={selectedFile}
            handleFileSelect={handleFileSelect}
            handleCancel={handleCancel}
            handleCompare={handleCompare}
            filteredJDs={filteredJDs}
            setSelectedJD={setSelectedJD}
          />
        ) : (
          <JDDetailsView selectedJD={selectedJD} setSelectedJD={setSelectedJD} />
        )}
      </div>
    </div>
  );
}

export default ARDashboard;
