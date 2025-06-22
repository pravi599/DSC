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
      sentDate: '2025-06-21',
    },
    {
      id: 'JD102',
      title: 'Backend Developer - Node.js',
      topMatches: ['Dan', 'Eva', 'Frank'],
      emailSentTo: 'AR Requestor',
      status: 'Sent',
      sentDate: '2025-06-21',
    },
    {
      id: 'JD103',
      title: 'Data Analyst',
      topMatches: [],
      emailSentTo: 'Recruiter',
      status: 'Sent',
      sentDate: '2025-06-20',
    },
    {
      id: 'JD104',
      title: 'Python Engineer',
      topMatches: ['Grace', 'Heidi', 'Ivan'],
      emailSentTo: 'AR Requestor',
      status: 'Pending',
      sentDate: '',
    },
  ];

  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const filteredData = jdEmailData.filter((jd) => {
    const statusMatch = statusFilter === 'All' || jd.status === statusFilter;
    const dateMatch = !dateFilter || jd.sentDate === dateFilter;
    return statusMatch && dateMatch;
  });

  return (
    <div className="layout">
      <Layout active="email-status" />
      <div className="content">
        <h2>Email Notification Summary</h2>

        <div className="filters">
          <div>
            <label>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All</option>
              <option>Sent</option>
              <option>Pending</option>
            </select>
          </div>

          <div>
            <label>Date:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
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
                <th>Sent Date</th>
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
                    <td>{jd.sentDate || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">No records found</td>
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
    background: #f4f6f8;
  }

  .content {
    flex: 1;
    padding: 30px;
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    margin-top: 50px;
  }

  .filters {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .filters label {
    font-weight: bold;
    margin-right: 6px;
  }

  select, input[type="date"] {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .status-table table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
    overflow: hidden;
  }

  th {
    background: #1976d2; /* solid clean blue */
    color: #ffffff;
    font-weight: 600;
    padding: 12px 15px;
    text-align: left;
  }

  td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    transition: background 0.2s ease;
  }

  tr:hover td {
    background: #f0f4f8;
  }

  .status.sent {
    color: #2e7d32;
    font-weight: 600;
  }

  .status.pending {
    color: #f57c00;
    font-weight: 600;
  }

  .no-matches {
    color: #e53935;
    font-style: italic;
    display: flex;
    align-items: center;
  }

  .info-icon {
    margin-left: 4px;
    color: #888;
    cursor: pointer;
  }

  .info-icon:hover {
    color: #1976d2;
  }

  .no-data {
    text-align: center;
    color: #999;
    padding: 20px;
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
