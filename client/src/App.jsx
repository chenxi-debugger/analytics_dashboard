import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* Add more routes here as needed */}
    </Routes>
  </Router>
  );
};

export default App;
