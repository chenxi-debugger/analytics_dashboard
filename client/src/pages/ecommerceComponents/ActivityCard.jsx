import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const ActivityCard = () => {
  const chartOption = {
    xAxis: {
      type: 'category',
      data: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        color: '#999',
        fontSize: 12,
        margin: 1,
      },
    },
    yAxis: { show: false },
    grid: {
      left: 10,
      right: 10,
      top: 0,
      bottom: 20,
    },
    series: [
      {
        data: [20, 75, 30, 50, 70, 40, 60],
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(102, 187, 106, 0.4)' },
              { offset: 1, color: 'rgba(102, 187, 106, 0)' },
            ],
          },
        },
        lineStyle: {
          color: '#66BB6A',
          width: 2,
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
        gap: 2,
        flexGrow: 1,
        height:'200px',
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
         <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
            sx={{ fontSize: '22px' }}
            >
            Activity
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: '16px', fontWeight:'600' }}>
          Last Week
        </Typography>
      </Box>

      {/* Bottom Content: Left stat + Right chart */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Left: Percentage + Growth */}
        <Box>
          <Typography variant="h4" fontWeight={700}>
            82%
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <ArrowUpward sx={{ color: '#4CAF50', fontSize: 18 }} />
            <Typography variant="body2" color="#4CAF50" fontWeight={700}>
              19.6%
            </Typography>
          </Box>
        </Box>

        {/* Right: Chart */}
        <Box width="60%">
          <ReactECharts option={chartOption} style={{ height:'110%', width: '100%' }} />
        </Box>
      </Box>
    </Paper>
  );
};

export default ActivityCard;
