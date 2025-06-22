import React, { useEffect, useState } from 'react';

function ProgressBar({ jd }) {
  const [dates, setDates] = useState({});

  // Simulate mock dynamic dates
  useEffect(() => {
    const baseDate = new Date('2025-06-15');
    const getFormatted = (d) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const jdDate = new Date(baseDate);
    const profileDate = new Date(baseDate.setDate(baseDate.getDate() + 1));
    const emailDate = new Date(baseDate.setDate(baseDate.getDate() + 1));

    setDates({
      jd: getFormatted(jdDate),
      profiles: getFormatted(profileDate),
      email: jd.emailStatus === 'Sent' ? getFormatted(emailDate) : '-',
    });
  }, [jd]);

  const getStatusInfo = (type) => {
    if (type === 'comparison') {
      return {
        label: 'JD Compared',
        status: jd.comparisonStatus,
        icon: jd.comparisonStatus === 'Completed' ? '✔️' : '⏳',
        style: jd.comparisonStatus === 'Completed' ? 'done' : 'pending',
        date: dates.jd,
      };
    }
    if (type === 'profiles') {
      return {
        label: 'Profiles Ranked',
        status: jd.topMatches.length ? 'Listed' : 'Not Found',
        icon: jd.topMatches.length ? '✔️' : '❌',
        style: jd.topMatches.length ? 'done' : 'notfound',
        date: dates.profiles,
      };
    }
    if (type === 'email') {
      return {
        label: 'Email Sent',
        status: jd.emailStatus,
        icon: jd.emailStatus === 'Sent' ? '✔️' : '⏳',
        style: jd.emailStatus === 'Sent' ? 'done' : 'pending',
        date: dates.email,
      };
    }
    return {};
  };

  const steps = ['comparison', 'profiles', 'email'];

  return (
    <div className="progress-wrapper">
      <div className="arrow-flow-bar">
        {steps.map((step, index) => {
          const { label, status, icon, style, date } = getStatusInfo(step);
          const isLast = index === steps.length - 1;
          return (
            <div key={step} className={`step-box ${style} ${isLast ? 'no-arrow' : ''}`}>
              <div className="icon">{icon}</div>
              <div className="label">{`${index + 1}. ${label}`}</div>
              <div className="status">({status})</div>
              <div className="date">{date}</div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .progress-wrapper {
          width: 100%;
          padding: 20px 10px;
          box-sizing: border-box;
        }

        .arrow-flow-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .step-box {
          position: relative;
          flex: 1;
          min-width: 220px;
          padding: 14px 18px;
          background-color: #eee;
          clip-path: polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%);
          transition: all 0.4s ease;
          text-align: center;
          font-size: 13px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .step-box.no-arrow {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .icon {
          font-size: 20px;
          font-weight: bold;
        }

        .label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .status {
          font-size: 13px;
          color: #555;
        }

        .date {
          font-size: 11px;
          color: #999;
          margin-top: 2px;
        }

        .done {
          background-color: #d4edda;
          color: #155724;
        }

        .pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .notfound {
          background-color: #f8d7da;
          color: #721c24;
        }

        @media (max-width: 768px) {
          .arrow-flow-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .step-box {
            clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%);
            height: auto;
            padding: 12px;
          }

          .step-box.no-arrow {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
      `}</style>
    </div>
  );
}

export default ProgressBar;
