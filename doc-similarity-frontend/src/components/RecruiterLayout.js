import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Layout({ active, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navbarHeight = 60;

  return (
    <div className="layout-container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ top: `${navbarHeight}px` }}>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          ☰
        </button>
        <nav>
          <NavLink
            to="/recruiter"
            className={active === 'recruiter' ? 'active' : ''}
            title="Home"
          >
            🏠 <span className="link-text">Home</span>
          </NavLink>
          <NavLink
            to="/jd-report"
            className={active === 'jd-report' ? 'active' : ''}
            title="Reports"
          >
            📁 <span className="link-text">Reports</span>
          </NavLink>
        </nav>
      </div>

      <div className={`main-content ${collapsed ? 'collapsed' : ''}`} style={{ marginTop: `${navbarHeight}px` }}>
        {children}
      </div>

      <style jsx>{`
        .layout-container {
          display: flex;
        }

        .sidebar {
          width: 180px;
          background: #fff;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
          padding: 20px 10px;
          transition: width 0.3s;
          position: fixed;
          left: 0;
          bottom: 0;
          z-index: 10;
          height: 100vh;
        }

        .sidebar.collapsed {
          width: 60px;
        }

        .toggle-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }

        nav a {
          display: flex;
          align-items: center;
          margin: 16px 0;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: 0.2s ease;
          padding: 8px;
          border-radius: 6px;
        }

        nav a:hover {
          background: #f0f4ff;
        }

        nav a.active {
          color: #1976d2;
          background: #e3f2fd;
        }

        .link-text {
          margin-left: 10px;
          white-space: nowrap;
        }

        .sidebar.collapsed .link-text {
          display: none;
        }

        .main-content {
          flex-grow: 1;
          padding: 20px;
          margin-left: 200px;
          transition: margin-left 0.3s;
        }

        .main-content.collapsed {
          margin-left: 60px;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: absolute;
            z-index: 10;
          }

          .main-content {
            margin-left: 60px;
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;
