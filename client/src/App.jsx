import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar'; // Import Navbar
import Sidebar from './components/Sidebar'; // Import Sidebar
import './styles/app.css'; // Import global styles
import Dashboard from './pages/Dashboard';
import CrmPage from './pages/CrmPage';
import EcommercePage from './pages/EcommercePage';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Sidebar Component */}
        <div className="main-content">
          <Navbar /> {/* Navbar Component */}
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboards/analytics" element={<Dashboard />} />
            <Route path="/dashboards/crm" element={<CrmPage />} />
            <Route path="/dashboards/ecommerce" element={<EcommercePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
