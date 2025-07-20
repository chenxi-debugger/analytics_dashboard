import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, Grid } from '@mui/material';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';
import ReactECharts from 'echarts-for-react';

const IncomeCard = ({ theme }) => {
  const [selectedTab, setSelectedTab] = useState('INCOME');

  // 硬编码线状图数据
  const lineChartData = {
    'INCOME': {
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      data: [400, 450, 500, 420, 480, 460, 390]
    },
    'EXPENSES': {
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      data: [300, 320, 350, 310, 340, 330, 280]
    },
    'PROFIT': {
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      data: [100, 130, 150, 110, 140, 130, 110]
    }
  };

  const lineChartOption = {
    xAxis: {
      type: 'category',
      data: lineChartData[selectedTab].xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 8 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisLine: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        data: lineChartData[selectedTab].data,
        type: 'line',
        smooth: true,
        lineStyle: { color: theme.palette.primary.main, width: 2 },
        areaStyle: { color: theme.palette.primary.light },
        itemStyle: { color: theme.palette.primary.main },
        showSymbol: true,
        symbolSize: 6,
        symbol: 'circle'
      }
    ],
    grid: { left: 10, right: 10, top: 10, bottom: 10 }
  };

  // 硬编码饼图数据
  const pieChartOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 459.1, name: 'INCOME' },
          { value: 316.5, name: 'EXPENSES' },
          { value: 147.9, name: 'PROFIT' }
        ]
      }
    ]
  };

  // 硬编码 tab 数据
  const tabData = {
    'INCOME': { title: 'Total Income', value: '$459.1k', change: '↑ 4.2%', week: '6.5k', weekChange: '$39k less than last week' },
    'EXPENSES': { title: 'Total Expenses', value: '$316.5k', change: '↑ 27.8%', week: '7.2k', weekChange: '$16k less than last week' },
    'PROFIT': { title: 'Total Profit', value: '$147.9k', change: '↑ 35.1%', week: '4.2k', weekChange: '$28k less than last week' }
  }[selectedTab];

  return (
    <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('incomeCard', theme)}>
        <Stack spacing={1}>
          <Box sx={getAnalyticsStyle('incomeTabs', theme)}>
            {['INCOME', 'EXPENSES', 'PROFIT'].map((tab, index) => (
              <Typography
                key={index}
                variant="button"
                sx={selectedTab === tab ? [getAnalyticsStyle('incomeTabTypographyButton', theme), getAnalyticsStyle('incomeActiveTab', theme)] : getAnalyticsStyle('incomeTabTypographyButton', theme)}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </Typography>
            ))}
          </Box>
          <hr/>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.primary.light, borderRadius: '50%' }} />
            <Typography variant="h6" sx={getAnalyticsStyle('incomeTypographyH6', theme)}>
              {tabData.title}
            </Typography>
          </Stack>
          <Typography variant="h4" sx={getAnalyticsStyle('incomeValue', theme)}>
            {tabData.value} {tabData.change}
          </Typography>
          <Box sx={{ ...getAnalyticsStyle('incomeChart', theme), width: '100%', height: '100px', overflow: 'hidden'}}> 
            <ReactECharts option={lineChartOption} />
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={getAnalyticsStyle('incomeChart', theme)}>
              <ReactECharts option={pieChartOption} />
            </Box>
            <Typography variant="body2" sx={getAnalyticsStyle('incomeStats', theme)}>
              {tabData.week} {tabData.weekChange}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default IncomeCard;