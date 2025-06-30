import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Info, FileText, Users, MailCheck } from 'lucide-react';

function EmailStatus() {
  const [jdEmailData, setJdEmailData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://localhost:7117/api/JobDescription');
        if (!res.ok) throw new Error('Failed to fetch JD data');
        const data = await res.json();

        const formatted = data.map((jd) => {
          const rawStatus = jd.requestors?.[0]?.communicationStatus || 'Pending';
          const normalizedStatus =
            rawStatus === 'Communication Sent' ? 'Sent' :
            rawStatus === 'Communication Failed' ? 'Failed' :
            'Pending';

          const top3 = jd.resumeDetails
            ? jd.resumeDetails
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map(r => r.name)
            : [];

          return {
            id: jd.jdId,
            title: jd.jdTitle,
            topMatches: top3,
            status: normalizedStatus
          };
        });

        setJdEmailData(formatted);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  const filteredData = jdEmailData.filter(jd =>
    statusFilter === 'All' || jd.status === statusFilter
  );

  return (
    <div className="layout">
      <Layout active="email-status" />

      <div className="content">
        {/* <h2 className="title">📧 Email Notification Summary</h2> */}

        <div className="filters">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Sent</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>

        {error && <div className="error-msg">Error: {error}</div>}

        <div className="status-table">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="header-icon-label">
                    <FileText size={16} />
                    <span>JD Title</span>
                  </div>
                </th>
                <th>
                  <div className="header-icon-label">
                    <Users size={16} />
                    <span>Top Matches</span>
                  </div>
                </th>
                <th>
                  <div className="header-icon-label">
                    <MailCheck size={16} />
                    <span>Status</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length ? (
                filteredData.map(jd => (
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
                    <td className={`status ${jd.status.toLowerCase()}`}>
                      {jd.status === 'Sent'
                        ? '📤 Sent'
                        : jd.status === 'Failed'
                        ? '❌ Failed'
                        : '⏳ Pending'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">No records found</td>
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
          background: #f1f5f9;
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
          margin-top: 40px;
          font-size: 26px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 20px;
        }

        .filters {
        margin-top: 60px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
        }

        select {
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 15px;
          outline: none;
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
        }

        .header-icon-label {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        td {
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 15px;
          color: #1e293b;
        }

        tr:hover td {
          background: #f8fafc;
        }

        .status.sent {
          color: #16a34a;
          font-weight: bold;
        }

        .status.pending {
          color: #f59e0b;
          font-weight: bold;
        }

        .status.failed {
          color: #dc2626;
          font-weight: bold;
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
        }

        .no-data {
          text-align: center;
          color: #9ca3af;
          padding: 24px;
          font-style: italic;
        }

        .error-msg {
          color: red;
          margin-bottom: 20px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .content {
            padding: 20px 15px;
          }

          th, td {
            padding: 10px 12px;
          }

          .filters {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default EmailStatus;
