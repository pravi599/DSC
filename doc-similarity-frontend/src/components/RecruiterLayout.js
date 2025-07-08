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
          box-shadow: 2px 0 8px rgba(60,72,88,0.06);
          padding: 20px 10px;
          transition: width 0.3s;
          position: fixed;
          left: 0;
          bottom: 0;
          z-index: 10;
          height: 100vh;
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
          color: #3a5a97;
        }
        nav a {
          display: flex;
          align-items: center;
          margin: 16px 0;
          text-decoration: none;
          color: #3a5a97;
          font-weight: 500;
          transition: 0.2s ease;
          padding: 8px;
          border-radius: 6px;
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          border-bottom: 3px solid transparent;
        }
        nav a:hover {
          background: #f6f7fb;
          color: #23272f;
        }
        nav a.active {
          color: #3a5a97;
          background: #fdf2f8;
          border-bottom: 3px solid #f9a8d4;
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
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
