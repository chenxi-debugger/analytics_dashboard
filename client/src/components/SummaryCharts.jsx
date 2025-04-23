import React from 'react';
import ReactECharts from 'echarts-for-react';

const SummaryCharts = () => {
  const chartOptions = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Summary',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engines' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Affiliate' },
          { value: 300, name: 'Other' },
        ],
      },
    ],
  };

  return <ReactECharts option={chartOptions} style={{ height: '300px' }} />;
};

export default SummaryCharts;
