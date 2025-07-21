import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const ActivityCard = ({ data, theme, chartOption }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('activityCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="h4" sx={getEcommerceStyle('activityValue', theme)}>
        {data.value}
      </Typography>
      <Box sx={getEcommerceStyle('activityStats', theme)}>
        <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
        <Typography variant="body2">{data.growth}</Typography>
      </Box>
      <Box sx={getEcommerceStyle('activityChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '60px', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default ActivityCard;