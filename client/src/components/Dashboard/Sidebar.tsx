// Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>Home</li>
        <li>Dashboard</li>
        <li>Settings</li>
      </ul>
      <style jsx>{`
        .sidebar {
          width: 200px;
          background-color: #f4f4f4;
          padding: 15px;
        }
        ul {
          list-style-type: none;
        }
        li {
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
