import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
