import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const NewVisitorsCard = ({ data, theme, chartOption }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('newVisitorsCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="h4" sx={getEcommerceStyle('visitorsValue', theme)}>
        {data.value}
      </Typography>
      <Box sx={getEcommerceStyle('visitorsStats', theme)}>
        <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '16px' }} />
        <Typography variant="body2">{data.growth}</Typography>
      </Box>
      <Box sx={getEcommerceStyle('newVisitorsChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '60px', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default NewVisitorsCard;