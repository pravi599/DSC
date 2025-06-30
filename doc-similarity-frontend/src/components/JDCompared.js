import React, { useEffect, useState } from 'react';
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
  const [jdData, setJdData] = useState([]);
  const [selectedJD, setSelectedJD] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJDData = async () => {
      try {
        const res = await fetch('https://localhost:7117/api/JobDescription');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();

        const formatted = data.filter(jd => jd.resumeDetails?.length).map(jd => ({
          id: jd.jdId,
          title: jd.jdTitle,
          count: jd.resumeDetails.length,
          resumes: [...jd.resumeDetails].sort((a, b) => b.score - a.score),
        }));

        setJdData(formatted);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJDData();
  }, []);

  const chartData = {
    labels: jdData.map(jd => jd.title),
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
        setSelectedJD(jdData[index]);
      }
    },
  };

  return (
    <div className="layout">
      <Layout active="jd-compared" />
      <div className="content">
        {/* <h2 className="title">JD Compared Details</h2> */}

        {error && <div className="error-msg">Error: {error}</div>}

        <div className="chart-box">
          <Bar data={chartData} options={options} />
        </div>

        {selectedJD && (
          <div className="details-section">
            <h3>All Compared Profiles for {selectedJD.title}</h3>
            <div className="profiles-grid">
              {selectedJD.resumes.map((profile, index) => (
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
                      data-label={`${profile.score.toFixed(2)}%`}
                    >
                      Score
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
        .error-msg {
          color: red;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .chart-box {
        margin-top: 50px;
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
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
          color: #2563eb;
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
          position: relative;
        }
        .match-bar.skills::after {
          content: attr(data-label);
          position: absolute;
          right: 10px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export default JDCompared;
