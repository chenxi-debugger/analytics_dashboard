import React from 'react';
import ReactECharts from 'echarts-for-react';

const Chart = () => {
  const options = {
    tooltip: {},
    xAxis: { data: ['Visits', 'Sales'] },
    yAxis: {},
    series: [{ type: 'bar', data: [1000, 500] }],
  };

  return <ReactECharts option={options} />;
};

export default Chart;
