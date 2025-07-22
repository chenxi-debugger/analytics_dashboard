import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';

const ExpensesCard = () => {
  const chartOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '100%',
        center: ['50%', '75%'],
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: '#6366F1', // 蓝紫色
          },
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[1, '#E0E0E0']],
          },
        },
        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, 0],
          color: '#111',
          fontWeight: 600,
          formatter: () => '72%',
        },
        data: [
          {
            value: 72,
          },
        ],
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
        alignItems: 'center',
        gap: 0,
        height:'209px',
      }}
    >
      <Typography
        
        color="text.secondary"
        fontWeight={600}
        sx={{ alignSelf: 'flex-start', fontSize:'16px' }} 
        >
        Expenses
      </Typography>

      <Box sx={{ width: 100, height: 100 }}>
        <ReactECharts option={chartOption} style={{ width: '100%', height: '100%' }} />
      </Box>

      <Typography variant="body2" color="text.secondary" align="center">
        $2k Expenses more<br />than last month
      </Typography>
    </Paper>
  );
};

export default ExpensesCard;
