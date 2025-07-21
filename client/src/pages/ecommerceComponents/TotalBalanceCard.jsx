import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const TotalBalanceCard = ({ data, theme, chartOption }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('totalBalanceCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
        {data.value}
      </Typography>
      <Box sx={getEcommerceStyle('totalBalanceStats', theme)}>
        <Box>
          <Typography variant="body2">{data.stats[0].label}</Typography>
          <Typography variant="body2">{data.stats[0].value}</Typography>
        </Box>
        <Box>
          <Typography variant="body2">{data.stats[1].label}</Typography>
          <Typography variant="body2">{data.stats[1].value}</Typography>
        </Box>
      </Box>
      <Box sx={getEcommerceStyle('totalBalanceChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '90px', width: '100%' }} />
      </Box>
      <Typography variant="body2" sx={getEcommerceStyle('totalBalanceNote', theme)}>
        {data.note}
      </Typography>
    </Paper>
  );
};

export default TotalBalanceCard;