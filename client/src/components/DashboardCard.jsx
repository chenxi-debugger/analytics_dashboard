import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';

const DashboardCard = ({ title, value, growth }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
          <Typography
            variant="subtitle2"
            color={growth.startsWith('+') ? 'green' : 'red'}
            ml={1}
          >
            {growth}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  growth: PropTypes.string.isRequired,
};


export default DashboardCard;
