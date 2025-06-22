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
    { id: 'Data Scientist', count: 6 },
    { id: 'DevOps Engineer', count: 2 },
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
      { id: 7, name: 'Gina', skills: ['Java', 'Microservices'], similarityScore: 83 },
      { id: 8, name: 'Hank', skills: ['Java', 'Kafka'], similarityScore: 80 },
    ],
    'Python Engineer': [
      { id: 9, name: 'Grace', skills: ['Python', 'Flask'], similarityScore: 92 },
      { id: 10, name: 'Heidi', skills: ['Python', 'Django'], similarityScore: 87 },
      { id: 11, name: 'Ivan', skills: ['ML', 'Python'], similarityScore: 84 },
      { id: 12, name: 'Jack', skills: ['Python', 'Pandas'], similarityScore: 82 },
    ],
    'Data Scientist': [
      { id: 13, name: 'Liam', skills: ['Python', 'TensorFlow'], similarityScore: 93 },
      { id: 14, name: 'Mia', skills: ['R', 'ML'], similarityScore: 89 },
      { id: 15, name: 'Noah', skills: ['Python', 'Scikit-learn'], similarityScore: 88 },
      { id: 16, name: 'Olivia', skills: ['ML', 'Pandas'], similarityScore: 85 },
      { id: 11, name: 'Ivan', skills: ['ML', 'Python'], similarityScore: 84 },
      { id: 12, name: 'Jack', skills: ['Python', 'Pandas'], similarityScore: 82 },
    ],
    'DevOps Engineer': [
      { id: 17, name: 'Paul', skills: ['AWS', 'Docker'], similarityScore: 90 },
      { id: 18, name: 'Quinn', skills: ['Kubernetes', 'CI/CD'], similarityScore: 87 },
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
        <h2>JD Compared Details</h2>
        <div className="chart-box">
          <Bar data={chartData} options={options} />
        </div>

        {selectedJD && (
          <div className="details-section">
            <h3>Compared Profiles for {selectedJD}</h3>
            <div className="profiles-grid">
              {topProfiles[selectedJD].map((profile, index) => {
                const scores = {
                  skills: Math.floor(Math.random() * 21 + 80),
                  experience: Math.floor(Math.random() * 21 + 75),
                  education: Math.floor(Math.random() * 21 + 70),
                };
                const overall = Math.floor(
                  (scores.skills + scores.experience + scores.education) / 3
                );

                return (
                  <div key={profile.id} className="profile-card">
                    <h4>{profile.name}</h4>
                    <p><strong>Email:</strong> {profile.name.toLowerCase()}@example.com</p>
                    <p><strong>Rank:</strong> {index + 1}</p>
                    <p><strong>Overall Match:</strong> {overall}%</p>
                    <div className="progress-container">
                      <div className="progress-bar skills" style={{ width: `${scores.skills}%` }}>
                        Skills: {scores.skills}%
                      </div>
                      <div className="progress-bar experience" style={{ width: `${scores.experience}%` }}>
                        Experience: {scores.experience}%
                      </div>
                      <div className="progress-bar education" style={{ width: `${scores.education}%` }}>
                        Education: {scores.education}%
                      </div>
                    </div>
                    <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
          background: #f4f6f8;
        }
        .content {
          flex: 1;
          padding: 30px;
        }
        h2 {
          margin-bottom: 20px;
          margin-top: 50px;
          color: #2c3e50;
        }
        .chart-box {
          height: 400px;
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-bottom: 30px;
        }
        .details-section h3 {
          margin-bottom: 15px;
          color: #333;
        }
        .profiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
        }
        .profile-card {
          background: #fff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          transition: 0.2s;
        }
        .profile-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .progress-container {
          margin: 10px 0;
        }
        .progress-bar {
          height: 20px;
          color: #fff;
          padding-left: 5px;
          margin-bottom: 4px;
          border-radius: 4px;
          font-size: 12px;
          display: flex;
          align-items: center;
        }
        .skills {
          background: #1976d2;
        }
        .experience {
          background: #388e3c;
        }
        .education {
          background: #f9a825;
        }
      `}</style>
    </div>
  );
}

export default JDCompared;
