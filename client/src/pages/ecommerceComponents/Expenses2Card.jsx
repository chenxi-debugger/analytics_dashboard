import React from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const Expenses2Card = () => {
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  const chartOption = {
    xAxis: {
      type: 'category',
      show: false,
      data: Array.from({ length: 12 }, (_, i) => i + 1),
    },
    yAxis: {
      show: false,
    },
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    series: [
      {
        type: 'bar',
        data: [1, 2.5, 1.8, 3.5, 2.2, 4, 3.6, 3, 2, 1.5, 2.2, 2.8],
        itemStyle: { color: '#6366F1' }, // Indigo
        barWidth: '50%',
        stack: 'expenses',
      },
      {
        type: 'bar',
        data: [-1.4, -2.2, -1.5, -2.8, -3.4, -3.8, -2.9, -2.4, -1.8, -1.3, -1.6, -2.0],
        itemStyle: { color: '#F59E0B' }, // Amber
        barWidth: '40%',
        stack: 'expenses',
      },
    ],
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        flexGrow: 1,
        height:"205px",
      }}
    >
      {/* Left Content */}
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="h5" fontWeight={700} color="text.secondary">
          Expenses
        </Typography>

        <Typography variant="h5" fontWeight={500}>$84.7k</Typography>

        <Box display="flex" alignItems="center" gap={0.5}>
          <ArrowDownward sx={{ color: '#EF4444', fontSize: 18 }} />
          <Typography variant="body2" color="#EF4444" fontWeight={600}>8.2%</Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            bgcolor: '#F3F4F6',
            color: '#6B7280',
            px: 1.5,
            py: 0.5,
            borderRadius: '5px',
            width: 'fit-content',
          }}
        >
          {month.toUpperCase()} {year}
        </Typography>
      </Box>

      {/* Right Chart */}
      <Box sx={{ height:'100%', width: '70%' }}>
        <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default Expenses2Card;
