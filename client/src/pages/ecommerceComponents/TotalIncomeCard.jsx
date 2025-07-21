import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const TotalIncomeCard = ({ data, theme, chartOption }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('totalIncomeCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
        {data.description}
      </Typography>
      <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
        {data.value}
      </Typography>
      <Box sx={getEcommerceStyle('totalIncomeChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '120px', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default TotalIncomeCard;