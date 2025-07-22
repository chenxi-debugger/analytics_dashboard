import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';

const TotalIncomeCard = () => {
  const chartOption = {
    grid: { left: 20, right: 10, top: 10, bottom: 20 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#999',
        fontSize: 12,
      },
    },
    yAxis: {
      type: 'value',
      min: 1000,
      max: 6000,
      interval: 1000,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        formatter: value => `$${value / 1000}k`,
        color: '#999',
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: '#eee',
        },
      },
    },
    series: [
      {
        data: [3000, 3000, 5000, 5000, 3000, 3000, 1500, 1500, 3000, 3000, 6000, 6000],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#6366F1',
          width: 4,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(99, 102, 241, 0.2)' },
              { offset: 1, color: 'rgba(99, 102, 241, 0)' },
            ],
          },
        },
        symbol: 'none',
      },
    ],
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        height:'444px',
      }}
    >
      <Typography variant="h5" color="text.secondary" fontWeight={600}>
        Total Income
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Yearly report overview
      </Typography>
      <Box sx={{ height: 250, mt: 1 }}>
        <ReactECharts option={chartOption} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Paper>
  );
};

export default TotalIncomeCard;
