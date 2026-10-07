import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

export const BRAND = 'InsightBoard';

// Centered card used by login / register / forgot password (no sidebar or header).
const AuthLayout = ({ title, subtitle, children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: 6,
        background: `radial-gradient(circle at 15% 20%, ${alpha(theme.palette.primary.main, 0.12)}, transparent 40%),
                     radial-gradient(circle at 85% 80%, ${alpha(theme.palette.primary.main, 0.1)}, transparent 40%),
                     ${theme.palette.background.default}`,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 440, boxShadow: theme.shadows[6] }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 4, textDecoration: 'none' }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 1.5,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
              }}
            >
              IB
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {BRAND}
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {subtitle}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

export default AuthLayout;
