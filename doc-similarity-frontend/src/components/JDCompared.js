import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Layout from './Layout';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function JDCompared() {
  const [selectedJD, setSelectedJD] = useState(null);

  const jdData = [
    { id: 'React Developer', count: 3 },
    { id: 'Java Developer', count: 5 },
    { id: 'Python Engineer', count: 4 },
  ];

  const topProfiles = {
    'React Developer': [
      { id: 1, name: 'Alice', skills: ['React', 'JS'], similarityScore: 90 },
      { id: 2, name: 'Bob', skills: ['React', 'Redux'], similarityScore: 88 },
      { id: 3, name: 'Cara', skills: ['JS', 'CSS'], similarityScore: 85 },
    ],
    'Java Developer': [
      { id: 4, name: 'Dan', skills: ['Java', 'Spring'], similarityScore: 91 },
      { id: 5, name: 'Eve', skills: ['Java', 'Hibernate'], similarityScore: 89 },
      { id: 6, name: 'Frank', skills: ['Java', 'JSP'], similarityScore: 86 },
    ],
    'Python Engineer': [
      { id: 7, name: 'Grace', skills: ['Python', 'Flask'], similarityScore: 92 },
      { id: 8, name: 'Heidi', skills: ['Python', 'Django'], similarityScore: 87 },
      { id: 9, name: 'Ivan', skills: ['ML', 'Python'], similarityScore: 84 },
    ],
  };

  const chartData = {
    labels: jdData.map(jd => jd.id),
    datasets: [
      {
        label: 'Compared Profiles',
        data: jdData.map(jd => jd.count),
        backgroundColor: '#90caf9',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Profiles Compared Per JD' },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedJD(jdData[index].id);
      }
    },
  };

  return (
    <div className="layout">
      <Layout active="jd-compared" />
      <div className="content">
        <h2>JD Compared</h2>
        <div className="chart-box">
          <Bar data={chartData} options={options} />
        </div>

        {selectedJD && (
          <div className="profile-list">
            <h3>Top 3 Matches for {selectedJD}</h3>
            {topProfiles[selectedJD].map(profile => (
              <div key={profile.id} className="profile-card">
                <strong>{profile.name}</strong>
                <p>Skills: {profile.skills.join(', ')}</p>
                <span className="score">Score: {profile.similarityScore}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
          background: #f9fbfd;
        }
        .content {
          flex: 1;
          padding: 30px;
        }
        h2 {
          margin-bottom: 20px;
          margin-top:50px;
          color: #2c3e50;
        }
        .chart-box {
          height: 400px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .profile-list {
          margin-top: 30px;
        }
        .profile-card {
          background: #ffffff;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .score {
          color: #1976d2;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default JDCompared;
