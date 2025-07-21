import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const Expenses2Card = ({ data, theme, chartOption }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('expensesCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
        {data.value}
      </Typography>
      <Box sx={getEcommerceStyle('salesStats', theme)}>
        <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '16px' }} />
        <Typography variant="body2">{data.growth}</Typography>
      </Box>
      <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
        {data.chart.period}
      </Typography>
      <Box sx={getEcommerceStyle('expensesChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '60px', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default Expenses2Card;