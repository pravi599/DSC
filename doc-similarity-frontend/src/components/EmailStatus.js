import React, { useState, useEffect } from 'react';
import Layout from './Layout';

function EmailStatus() {
  const [selectedJD, setSelectedJD] = useState('React Developer');

  const jdList = ['React Developer', 'Java Developer', 'Python Engineer'];

  const mockEmailStatus = {
    'React Developer': [
      { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Sent' },
      { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Sent' },
      { id: 3, name: 'Cara', email: 'cara@example.com', status: 'Pending' },
    ],
    'Java Developer': [
      { id: 4, name: 'Dan', email: 'dan@example.com', status: 'Pending' },
      { id: 5, name: 'Eve', email: 'eve@example.com', status: 'Sent' },
      { id: 6, name: 'Frank', email: 'frank@example.com', status: 'Sent' },
    ],
    'Python Engineer': [
      { id: 7, name: 'Grace', email: 'grace@example.com', status: 'Pending' },
      { id: 8, name: 'Heidi', email: 'heidi@example.com', status: 'Pending' },
      { id: 9, name: 'Ivan', email: 'ivan@example.com', status: 'Sent' },
    ],
  };

  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    // Simulate axios call
    setEmailData(mockEmailStatus[selectedJD]);
    // axios.get(`/api/email-status?jd=${selectedJD}`).then(res => setEmailData(res.data));
  }, [selectedJD]);

  return (
    <div className="layout">
      <Layout active="email-status" />
      <div className="content">
        <h2>Email Notification Status</h2>

        <div className="dropdown">
          <label>Select JD:</label>
          <select value={selectedJD} onChange={e => setSelectedJD(e.target.value)}>
            {jdList.map(jd => (
              <option key={jd} value={jd}>{jd}</option>
            ))}
          </select>
        </div>

        <div className="status-table">
          <table>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {emailData.map(candidate => (
                <tr key={candidate.id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td className={candidate.status === 'Sent' ? 'sent' : 'pending'}>
                    {candidate.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          color: #2c3e50;
          margin-bottom: 20px;
          margin-top:50px;
        }

        .dropdown {
          margin-bottom: 20px;
        }

        label {
          margin-right: 10px;
          font-weight: bold;
        }

        select {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .status-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border-radius: 8px;
          overflow: hidden;
        }

        .status-table th, .status-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .status-table th {
          background-color: #f2f2f2;
        }

        .sent {
          color: #2e7d32;
          font-weight: bold;
        }

        .pending {
          color: #ff9800;
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .content {
            padding: 15px;
          }

          table {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default EmailStatus;
