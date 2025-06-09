import React from 'react';
import { useNavigate } from 'react-router-dom';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function JDCompared() {
  const navigate = useNavigate();

  const data = {
    labels: ['JD1', 'JD2', 'JD3'],
    datasets: [
      {
        label: 'Compared Profiles',
        data: [3, 5, 4],
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
  };

  return (
    <>
      <div className="jd-compared-page">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h2 className="jd-title">JD Compared</h2>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>

      <style jsx>{`
        .jd-compared-page {
          max-width: 800px;
          margin: 40px auto;
          padding: 30px;
          background: #f7faff;
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }

        .back-btn {
          background-color: #e0e7ff;
          color: #1e40af;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 15px;
          transition: background-color 0.3s ease;
        }
        .back-btn:hover {
          background-color: #c7d2fe;
        }

        .jd-title {
          text-align: center;
          font-size: 24px;
          color: #333;
          margin-bottom: 30px;
        }

        .chart-container {
          height: 400px;
        }
      `}</style>
    </>
  );
}

export default JDCompared;
