import React, { useState } from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import ReactECharts from 'echarts-for-react';

const IncomeCard = () => {
  const [selectedTab, setSelectedTab] = useState('INCOME');

  const tabData = {
    INCOME: {
      title: 'Total Income',
      value: '$459.1k',
      growth: '↑ 42.9%',
      weekValue: '6.5k',
      weekDesc: '$39k less than last week',
      icon: '/INCOME1.png',
      color: '#6366f1',
      lineData: [40, 400, 200, 460, 190, 40, 500],
    },
    EXPENSES: {
      title: 'Total Expenses',
      value: '$316.5k',
      growth: '↑ 27.8%',
      weekValue: '7.2k',
      weekDesc: '$16k less than last week',
      icon: '/EXPENSES.png',
      color: '#ef4444',
      lineData: [20, 300, 450, 50, 460, 240, 410],
    },
    PROFIT: {
      title: 'Total Profit',
      value: '$147.9k',
      growth: '↑ 35.1%',
      weekValue: '4.2k',
      weekDesc: '$28k less than last week',
      icon: '/PROFIT1.png',
      color: '#10b981',
      lineData: [0, 200, 110, 280, 330, 200, 310],
    },
  };

  const data = tabData[selectedTab];

  const lineChartOption = {
    grid: { top: 20, left: 10, right: 10, bottom: 30 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisLabel: { color: '#9ca3af' },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
    },
    yAxis: { show: false },
    series: [
      {
        data: data.lineData,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: 'rgba(99, 102, 241, 0.1)',
        },
        lineStyle: {
          color: '#6366f1',
          width: 5,
        },
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {
          color: '#6366f1',
        },
      },
    ],
  };

  const pieChartOption = {
    series: [
      {
        type: 'pie',
        radius: ['85%', '100%'],
        startAngle: 90,
        avoidLabelOverlap: false,
        silent: true,
        label: { show: false },
        labelLine: { show: false },
        data: [
          {
            value: 70,
            itemStyle: { color: data.color },
          },
          {
            value: 30,
            itemStyle: { color: '#e5e7eb' },
          },
        ],
      },
    ],
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        flexGrow: 1,
        width:'100%',
      }}
    >
      {/* Tabs with underline */}
      <Box display="flex" justifyContent="space-between">
        {['INCOME', 'EXPENSES', 'PROFIT'].map((tab) => (
          <Box
            key={tab}
            onClick={() => setSelectedTab(tab)}
            sx={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
              pb: 1,
              borderBottom: selectedTab === tab ? '3px solid #6366f1' : '3px solid transparent',
              color: selectedTab === tab ? '#6366f1' : '#6b7280',
              cursor: 'pointer',
            }}
          >
            {tab}
          </Box>
        ))}
      </Box>

      {/* Icon + Title */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Icon */}
        <Box
          component="img"
          src={data.icon}
          alt={selectedTab}
          sx={{
            width: 50,
            height: 50,
            borderRadius: '8px',
            bgcolor: '#f3f4f6',
            objectFit: 'contain',

          }}
        />
        {/* Texts */}
        <Box>
          <Typography fontSize={18} fontWeight={400} color="#6b7280">
            {data.title}
          </Typography>
          <Typography fontSize={22} fontWeight={700}>
            {data.value}{' '}
            <Typography component="span" fontSize={16} fontWeight={600} color="#10b981">
              {data.growth}
            </Typography>
          </Typography>
        </Box>
      </Stack>


      {/* Line Chart */}
      <Box height={220}>
        <ReactECharts option={lineChartOption} style={{ width: '100%', height: '100%' }} />
      </Box>

      {/* Weekly Summary */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box width={50} height={50} position="relative">
              <ReactECharts option={pieChartOption} style={{ width: '100%', height: '100%' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#4b5563',
                }}
              >
                {data.weekValue}
              </Box>
            </Box>
            <Box>
              <Typography fontSize={16} fontWeight={600}>
                {data.title.replace('Total ', '')} this week
              </Typography>
              <Typography fontSize={16} color="#9ca3af">
                {data.weekDesc}
              </Typography>
            </Box>
          </Box>
        </Box>

    </Paper>
  );
};

export default IncomeCard;
