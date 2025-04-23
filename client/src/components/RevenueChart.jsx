import React from 'react';
import ReactECharts from 'echarts-for-react';

const RevenueChart = () => {
  const chartOptions = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        data: [1200, 2000, 1500, 800, 1700, 2500],
      },
    ],
  };

  return <ReactECharts option={chartOptions} style={{ height: '300px' }} />;
};

export default RevenueChart;
