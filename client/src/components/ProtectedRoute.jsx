import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// Route guard: only logged-in users may see the wrapped pages.
// Anyone else is sent to /auth/login, and we remember where they wanted to go
// so the login page can send them back there afterwards.
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // While we are still checking a saved token, show a spinner instead of flashing the login page.
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return children;
};

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

export default ProtectedRoute;
