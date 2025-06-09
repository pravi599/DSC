import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function ProfilesRanked() {
  const navigate = useNavigate();

  const data = {
    labels: ['Highly Matched', 'Moderate Match', 'Low Match'],
    datasets: [
      {
        label: 'Ranking Distribution',
        data: [5, 10, 3],
        backgroundColor: ['#66bb6a', '#ffa726', '#ef5350'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Profile Ranking Distribution' },
    },
  };

  return (
    <>
      <div className="profiles-ranked-page">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h2 className="page-title">Profiles Ranked</h2>
        <div className="chart-container">
          <Pie data={data} options={options} />
        </div>
      </div>

      <style jsx>{`
        .profiles-ranked-page {
          max-width: 650px;
          margin: 40px auto;
          padding: 30px;
          background: #f7faff;
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        .back-btn {
          background-color: #e0e7ff;
          color: #1e40af;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 20px;
          float: left;
          transition: background-color 0.3s ease;
        }
        .back-btn:hover {
          background-color: #c7d2fe;
        }

        .page-title {
          font-size: 24px;
          color: #333;
          margin-bottom: 30px;
          clear: both;
        }

        .chart-container {
          height: 400px;
          position: relative;
        }
      `}</style>
    </>
  );
}

export default ProfilesRanked;
