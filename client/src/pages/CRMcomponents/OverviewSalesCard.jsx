// src/pages/CRMcomponents/OverviewSalesCard.jsx
import React, { useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../../styles/crmPageStyle';

const OverviewSalesCard = ({ theme }) => {
  const chartRef = useRef(null);

  // 硬编码图表数据
  const xAxisData = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AGU'];
  const data1 = [0.5, 1.2, 0.8, 1.5, 0.9, 1.3, 0.7, 1.0, 1.4, 0.6]; // 模拟销售额部分
  const data2 = [1.2, 2.5, 1.8, 3.0, 2.1, 2.8, 1.5, 2.3, 2.9, 1.7]; // 模拟会话数部分
  const data3 = [1.3, 1.6, 1.4, 1.8, 1.5, 1.7, 1.2, 1.4, 1.9, 1.3]; // 模拟其他指标1
  const data4 = [0.7, 0.9, 0.6, 0.8, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5]; // 模拟其他指标2

  const emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)',
    },
  };

  const chartOption = {
    xAxis: {
      data: xAxisData,
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
    },
    yAxis: {},
    grid: {
      bottom: 100,
    },
    series: [
      {
        name: 'bar',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data1,
      },
      {
        name: 'bar2',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data2,
      },
      {
        name: 'bar3',
        type: 'bar',
        stack: 'two',
        emphasis: emphasisStyle,
        data: data3,
      },
      {
        name: 'bar4',
        type: 'bar',
        stack: 'two',
        emphasis: emphasisStyle,
        data: data4,
      },
    ],
  };


  return (
    <Paper
    sx={{
      ...getCrmStyle('overviewSalesCard', theme),
      flexGrow: 1,
      width: '100%',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      height:'430px',
    }}
  >  

      <Box sx={getCrmStyle('overviewSalesHeader', theme)}>
        <Typography variant="h5" sx={{ color: theme.palette.grey[600], fontSize: '25px',fontWeight: 700}}>Overview & Sales Activity</Typography>
        
      </Box>
      <Box sx={getCrmStyle('overviewSalesStats', theme)}>
        <Box>
          <Typography variant="body3" sx={{ color: theme.palette.grey[500]}}>Check out each column for more details</Typography>
        </Box>
      </Box>
      <Box sx={getCrmStyle('overviewSalesChart', theme)}>
        <ReactECharts
          ref={chartRef}
          option={chartOption}
          style={{ height: '350px', width: '100%', paddingBottom: '30px' }}
        />
      </Box>
    </Paper>
  );
};

export default OverviewSalesCard;