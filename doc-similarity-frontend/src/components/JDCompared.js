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
                  <div className="profile-rank">🏅 #{index + 1}</div>
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
          background: linear-gradient(120deg, #f5f7fa 0%, #e9ecf3 100%);
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
          color: #4f8cff;
          letter-spacing: -0.5px;
        }
        .error-msg {
          color: #7c3aed;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .chart-box {
          margin-top: 50px;
          height: 400px;
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(79,140,255,0.08);
          margin-bottom: 30px;
        }
        .details-section h3 {
          margin-bottom: 15px;
          color: #4f8cff;
        }
        .profiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .profile-card {
          background: #fff;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(79,140,255,0.06);
          transition: 0.2s;
          position: relative; /* Added for absolute positioning of rank */
        }
        .profile-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124,58,237,0.13);
        }
        .profile-rank {
          font-weight: bold;
          margin-bottom: 8px;
          color: #7c3aed;
        }
        .profile-card .profile-rank {
          position: absolute;
          top: 16px;
          right: 16px;
          color: #fff;
          padding: 7px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 2px 8px rgba(79,140,255,0.10);
          background: linear-gradient(90deg, #38bdf8 0%, #0ea5e9 100%); /* Default: sky blue */
        }
        .profile-card:nth-child(2) .profile-rank {
          background: linear-gradient(90deg, #f472b6 0%, #ec4899 100%); /* Pink */
        }
        .profile-card:nth-child(3) .profile-rank {
          background: linear-gradient(90deg, #34d399 0%, #06b6d4 100%); /* Mint/teal */
        }
        .match-bar-container {
          margin-top: 10px;
        }
        .match-bar.skills {
          background: linear-gradient(90deg, #4f8cff 0%, #7c3aed 100%);
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
