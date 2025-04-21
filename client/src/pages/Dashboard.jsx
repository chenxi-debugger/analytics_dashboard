import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ visits: 0, sales: 0 });

  useEffect(() => {
    axios.get('http://localhost:5001/api/stats')
.then((res) => {
      setStats(res.data);
    });
  }, []);

  const chartOptions = {
    tooltip: {},
    xAxis: { data: ['Visits', 'Sales'] },
    yAxis: {},
    series: [{ type: 'bar', data: [stats.visits, stats.sales] }],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <ReactECharts option={chartOptions} />
    </div>
  );
};

export default Dashboard;
