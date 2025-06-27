import React, { useState } from 'react';
import Layout from './Layout';
import { Info } from 'lucide-react';

function EmailStatus() {
  const jdEmailData = [
    {
      id: 'JD101',
      title: 'Frontend Developer - React',
      topMatches: ['Alice', 'Bob', 'Cara'],
      emailSentTo: 'AR Requestor',
      status: 'Sent',
    },
    {
      id: 'JD102',
      title: 'Backend Developer - Node.js',
      topMatches: ['Dan', 'Eva', 'Frank'],
      emailSentTo: 'AR Requestor',
      status: 'Sent',
    },
    {
      id: 'JD103',
      title: 'Data Analyst',
      topMatches: [],
      emailSentTo: 'Recruiter',
      status: 'Sent',
    },
    {
      id: 'JD104',
      title: 'Python Engineer',
      topMatches: ['Grace', 'Heidi', 'Ivan'],
      emailSentTo: 'AR Requestor',
      status: 'Pending',
    },
  ];

  const [statusFilter, setStatusFilter] = useState('All');
  const filteredData = jdEmailData.filter((jd) => {
    const statusMatch = statusFilter === 'All' || jd.status === statusFilter;
    return statusMatch;
  });

  return (
    <div className="layout">
      <Layout active="email-status" />
      <div className="content">
        <h2 className="title">Email Notification Summary</h2>

        <div className="filters">
          <div>
            <label>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All</option>
              <option>Sent</option>
              <option>Pending</option>
            </select>
          </div>
          </div>

        <div className="status-table">
          <table>
            <thead>
              <tr>
                <th>JD Title</th>
                <th>Top Matches</th>
                <th>Email Sent To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length ? (
                filteredData.map((jd) => (
                  <tr key={jd.id}>
                    <td>{jd.title}</td>
                    <td>
                      {jd.topMatches.length ? (
                        jd.topMatches.join(', ')
                      ) : (
                        <span className="no-matches">
                          No Matches <Info className="info-icon" title="Sent to recruiter because no matches found" size={14} />
                        </span>
                      )}
                    </td>
                    <td>{jd.emailSentTo}</td>
                    <td className={`status ${jd.status.toLowerCase()}`}>
                      {jd.status === 'Sent' ? '📤 Sent' : '⏳ Pending'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
  .layout {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(to right, #f8fafc, #e2e8f0);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .content {
    flex: 1;
    padding: 30px;
          padding-left: 0;
    max-width: 1200px;
    margin: 0 auto;
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

  .filters {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 32px 0 24px;
    flex-wrap: wrap;
    padding: 12px 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  }

  .filters label {
    font-weight: 600;
    margin-right: 6px;
    color: #1e293b;
  }

  select, input[type="date"] {
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 15px;
    transition: border 0.3s ease, box-shadow 0.3s ease;
    outline: none;
  }

  select:focus, input[type="date"]:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  .status-table table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  th {
    background: linear-gradient(to right, #3b82f6, #2563eb);
    color: #ffffff;
    font-weight: 600;
    padding: 14px 18px;
    text-align: left;
    font-size: 15px;
    letter-spacing: 0.3px;
  }

  td {
    padding: 14px 18px;
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.2s ease;
    font-size: 15px;
    color: #1e293b;
  }

  tr:hover td {
    background: #f8fafc;
  }

  .status.sent {
    color: #16a34a;
    font-weight: 700;
  }

  .status.pending {
    color: #f97316;
    font-weight: 700;
  }

  .no-matches {
    color: #ef4444;
    font-style: italic;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .info-icon {
    color: #6b7280;
    transition: color 0.2s ease;
  }

  .info-icon:hover {
    color: #3b82f6;
  }

  .no-data {
    text-align: center;
    color: #9ca3af;
    padding: 24px;
    font-style: italic;
    background: #fefefe;
  }

  @media (max-width: 768px) {
    .content {
      padding: 20px 15px;
    }

    table {
      font-size: 14px;
    }

    th, td {
      padding: 10px 12px;
    }

    .filters {
      padding: 16px;
    }
  }
`}</style>



    </div>
  );
}

export default EmailStatus;
