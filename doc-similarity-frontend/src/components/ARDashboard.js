import React, { useState } from 'react';
import Layout from '../components/Layout';
import JDListAndSearch from './JDListAndSearch';
import JDDetailsView from './JDDetailsView';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ARDashboard.css';


const jdMockData = [
  {
    id: 'JD101',
    title: 'Frontend Developer - React',
    comparisonStatus: 'Completed',
    topMatches: [
      {
        id: 1,
        jdId: 101,
        name: 'Vallela Praveena',
        email: 'praveena.vallela2002@gmail.com',
        experience: 2,
        score: 90,
        skills: 'Dotnet, SQL, React',
      },
      {
        id: 2,
        jdId: 101,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        experience: 3,
        score: 85,
        skills: 'React, Node.js, MongoDB',
      },
      {
        id: 3,
        jdId: 101,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        experience: 4,
        score: 80,
        skills: 'Angular, Java, SQL',
      }
    ],
    emailStatus: 'Sent',
  },
  {
    id: 'JD102',
    title: 'Backend Developer - Node.js',
    comparisonStatus: 'Completed',
    topMatches: [],
    emailStatus: 'Sent',
  },
  
];

function ARDashboard() {
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

  const filteredJDs = jdMockData.filter((jd) =>
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