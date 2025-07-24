import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';

const ProfitCard = () => {
  const chartOption = {
    tooltip: { show: false },
    legend: { show: false },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 20,
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Apr', 'Jul', 'Oct'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        color: '#999',
        fontSize: 12,
      },
    },
    yAxis: { show: false },
    series: [
      {
        data: [40, 20, 50, 80],
        type: 'bar',
        barWidth: 12,
        itemStyle: {
          color: '#4CAF50',
          borderRadius: 4,
        },
      },
      {
        data: [30, 15, 45, 70],
        type: 'bar',
        barWidth: 8,
        itemStyle: {
          color: 'rgba(76, 175, 80, 0.2)',
          borderRadius: 4,
        },
      },
    ],
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        flexGrow: 1,
        height:'209px',
      }}
    >
      <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
        Profit
      </Typography>
      <Typography variant="h5" fontWeight={700}>
        624k
      </Typography>
      <Box sx={{ height: '90px' }}>
        <ReactECharts option={chartOption} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Paper>
  );
};

export default ProfitCard;
