import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const ExpensesCard = ({ data, theme, chartOption }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('expensesCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
        {data.value}
      </Typography>
      <Box sx={getEcommerceStyle('expensesChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '100px', width: '100px' }} />
      </Box>
      <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
        {data.additional_info}
      </Typography>
    </Paper>
  );
};

export default ExpensesCard;