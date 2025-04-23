import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const AnalyticsDashboardPage = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main>
          <AnalyticsDashboard />
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;
