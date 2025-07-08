// src/pages/ARDashboard.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
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
  const connectionRef = useRef(null);

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

  const fetchJDList = () => {
    axios.get('https://localhost:7117/api/JobDescription')
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
  };

  const fetchJDById = async (id) => {
    try {
      const res = await axios.get(`https://localhost:7117/api/JobDescription/${id}`);
      const jd = res.data;
      const mappedJD = {
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
        _refreshKey: new Date().getTime(), // 🔁 Force re-render
      };
      setSelectedJD(mappedJD);
    } catch (error) {
      console.error('Error fetching JD by ID:', error);
      toast.error('Unable to load JD details');
    }
  };

  useEffect(() => {
    fetchJDList();

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7117/resumeHub')
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log('✅ SignalR connected'))
      .catch((err) => console.error('❌ SignalR error:', err));

    connection.on('JobDescriptionUploaded', () => {
      // toast.success('📡 JD uploaded. Refreshing list...');
      fetchJDList();
    });

    connection.on('ResumeUpdated', () => {
      toast.info(`🔁 New resume processed, Refreshing JD status...`, );
      if (selectedJD?.id) fetchJDById(selectedJD.id);
    });

    connectionRef.current = connection;

    return () => {
      if (connectionRef.current) connectionRef.current.stop();
    };
  }, [selectedJD?.id]);

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
            setSelectedJD={fetchJDById}
            refreshJDList={fetchJDList}
          />
        ) : (
          <JDDetailsView selectedJD={selectedJD} setSelectedJD={setSelectedJD} />
        )}
      </div>
    </div>
  );
}

export default ARDashboard;
