import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const NewVisitorsCard = () => {
    const chartOption = {
        xAxis: {
          type: 'category',
          data: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: true,
            color: '#999',
            fontSize: 12,
            margin: 8,
          },
        },
        yAxis: { show: false },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 20, // 👈 这里给 xAxis 留出空间
        },
        series: [
          {
            data: [60, 50, 30, 40, 50, 70, 40],
            type: 'bar',
            barWidth: 14,
            itemStyle: {
              borderRadius: 4,
              color: (params) =>
                params.dataIndex === 5 ? '#6366F1' : 'rgba(99,102,241,0.2)',
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
          New Visitors
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: '16px', fontWeight:'600' }}>
          Last Week
        </Typography>
      </Box>

      {/* Bottom Section: Left (23% ↓8.75%) and Right (chart) */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Left side: 23% and ↓8.75% */}
        <Box>
          <Typography variant="h4" fontWeight={600}>
            23%
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <ArrowDownward sx={{ color: '#F44336', fontSize: 20 }} />
            <Typography variant="body2" color="#F44336" fontWeight={500}>
              8.75%
            </Typography>
          </Box>
        </Box>

        {/* Right side: chart */}
        <Box width="60%">
          <ReactECharts option={chartOption} style={{ height: '110%', width: '100%' }} />
        </Box>
      </Box>
    </Paper>
  );
};

export default NewVisitorsCard;
