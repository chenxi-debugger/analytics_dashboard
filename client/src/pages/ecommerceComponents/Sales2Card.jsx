import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const Sales2Card = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('salesCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
        {data.value}
      </Typography>
      <Box sx={getEcommerceStyle('salesStats', theme)}>
        <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
        <Typography variant="body2">{data.growth}</Typography>
      </Box>
      <Box sx={getEcommerceStyle('salesStats', theme)}>
        <Typography variant="body2">{data.stats[0].label}</Typography>
        <Typography variant="body2">{data.stats[0].value}</Typography>
      </Box>
    </Paper>
  );
};

export default Sales2Card;