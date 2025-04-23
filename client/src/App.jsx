import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar'; // Import Navbar
import Sidebar from './components/Sidebar'; // Import Sidebar
import './styles/app.css'; // Import global styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Sidebar Component */}
        <div className="main-content">
          <Navbar /> {/* Navbar Component */}
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboards/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
