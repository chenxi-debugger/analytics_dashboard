import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const PerformanceCard = ({ data, theme, chartOption }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('performanceCard', theme), flexGrow: 1 }}>
      <Box sx={getEcommerceStyle('performanceHeader', theme)}>
        <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
          {data.title}
        </Typography>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Box>
      <Box sx={getEcommerceStyle('performanceStats', theme)}>
        <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
          {data.stats[0].label}: {data.stats[0].value}
        </Typography>
        <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
          {data.stats[1].label}: {data.stats[1].value}
        </Typography>
      </Box>
      <Box sx={getEcommerceStyle('performanceChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '180px', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default PerformanceCard;