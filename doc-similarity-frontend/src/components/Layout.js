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
          <NavLink to="/dashboard" className={active === 'dashboard' ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/jd-compared" className={active === 'jd-compared' ? 'active' : ''}>JD Compared</NavLink>
          <NavLink to="/email-status" className={active === 'email-status' ? 'active' : ''}>Email Status</NavLink>
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
          width: 150px;
          background: #fff;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
          padding: 20px 10px;
          transition: width 0.3s;
          position: fixed;
          left: 0;
          bottom: 0;
          z-index: 10;
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
          display: block;
          margin: 16px 0;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          white-space: nowrap;
          transition: 0.2s ease;
        }

        .sidebar.collapsed nav a {
          font-size: 0;
        }

        nav a.active {
          color: #1976d2;
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
