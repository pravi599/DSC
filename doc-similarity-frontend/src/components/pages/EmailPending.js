import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function EmailPending() {
  const navigate = useNavigate();

  const data = {
    labels: ['Emails Sent', 'Pending Emails'],
    datasets: [
      {
        data: [8, 2],
        backgroundColor: ['#26c6da', '#ab47bc'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Email Status Overview' },
    },
  };

  return (
    <>
      <div className="email-pending-page">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h2 className="email-title">Email Pending</h2>
        <div className="chart-container">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      <style jsx>{`
        .email-pending-page {
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

        .email-title {
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

export default EmailPending;
