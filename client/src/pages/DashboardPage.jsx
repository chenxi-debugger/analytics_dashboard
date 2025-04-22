import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar />
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
