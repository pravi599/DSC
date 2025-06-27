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
      { id: 1, name: 'Alice', email: 'alice@example.com', experience: 2, skills: 'React, JS', score: 90 },
      { id: 2, name: 'Bob', email: 'bob@example.com', experience: 3, skills: 'React, Redux', score: 88 },
      { id: 3, name: 'Cara', email: 'cara@example.com', experience: 2, skills: 'JS, CSS', score: 85 },
    ],
    'Java Developer': [
      { id: 4, name: 'Dan', email: 'dan@example.com', experience: 4, skills: 'Java, Spring', score: 91 },
      { id: 5, name: 'Eve', email: 'eve@example.com', experience: 3, skills: 'Java, Hibernate', score: 89 },
      { id: 6, name: 'Frank', email: 'frank@example.com', experience: 5, skills: 'Java, JSP', score: 86 },
      { id: 7, name: 'Gina', email: 'gina@example.com', experience: 4, skills: 'Java, Microservices', score: 83 },
      { id: 8, name: 'Hank', email: 'hank@example.com', experience: 3, skills: 'Java, Kafka', score: 80 },
    ],
    'Python Engineer': [
      { id: 9, name: 'Grace', email: 'grace@example.com', experience: 3, skills: 'Python, Flask', score: 92 },
      { id: 10, name: 'Heidi', email: 'heidi@example.com', experience: 4, skills: 'Python, Django', score: 87 },
      { id: 11, name: 'Ivan', email: 'ivan@example.com', experience: 3, skills: 'ML, Python', score: 84 },
      { id: 12, name: 'Jack', email: 'jack@example.com', experience: 2, skills: 'Python, Pandas', score: 82 },
    ],
    'Data Scientist': [
      { id: 13, name: 'Liam', email: 'liam@example.com', experience: 5, skills: 'Python, TensorFlow', score: 93 },
      { id: 14, name: 'Mia', email: 'mia@example.com', experience: 4, skills: 'R, ML', score: 89 },
      { id: 15, name: 'Noah', email: 'noah@example.com', experience: 3, skills: 'Python, Scikit-learn', score: 88 },
      { id: 16, name: 'Olivia', email: 'olivia@example.com', experience: 3, skills: 'ML, Pandas', score: 85 },
      { id: 17, name: 'Ivan', email: 'ivan@example.com', experience: 3, skills: 'ML, Python', score: 84 },
      { id: 18, name: 'Jack', email: 'jack@example.com', experience: 2, skills: 'Python, Pandas', score: 82 },
    ],
    'DevOps Engineer': [
      { id: 19, name: 'Paul', email: 'paul@example.com', experience: 4, skills: 'AWS, Docker', score: 90 },
      { id: 20, name: 'Quinn', email: 'quinn@example.com', experience: 3, skills: 'Kubernetes, CI/CD', score: 87 },
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
        <h2 className="title">JD Compared Details</h2>
        <div className="chart-box">
          <Bar data={chartData} options={options} />
        </div>

        {selectedJD && (
          <div className="details-section">
            <h3>All Compared Profiles for {selectedJD}</h3>
            <div className="profiles-grid">
              {topProfiles[selectedJD].map((profile, index) => (
                <div key={profile.id} className="profile-card">
                  <div className="profile-rank">🏅 Rank #{index + 1}</div>
                  <h4>{profile.name}</h4>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Experience:</strong> {profile.experience} years</p>
                  <p><strong>Skills:</strong> {profile.skills}</p>
                  <div className="match-bar-container">
                    <div
                      className="match-bar skills"
                      style={{ width: `${profile.score}%` }}
                      data-label={`${profile.score}%`}
                    >
                      Similarity Score
                    </div>
                  </div>
                </div>
              ))}
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
          padding-left: 0;
        }
        .title {
        margin-top: 50px;
          font-size: 25px;
  font-weight: 700;
  color: #0f172a;
  background: linear-gradient(180deg, #1e293b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
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
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
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
        .profile-rank {
          font-weight: bold;
          margin-bottom: 8px;
        }
        .match-bar-container {
          margin-top: 10px;
        }
        .match-bar.skills {
          background-color: #1976d2;
          color: #fff;
          height: 22px;
          border-radius: 4px;
          padding-left: 10px;
          display: flex;
          align-items: center;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}

export default JDCompared;
