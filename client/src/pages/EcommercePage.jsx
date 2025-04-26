import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid, // Use Grid (Grid v2 in MUI v7)
} from '@mui/material';
import { MoreVert, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import '../styles/EcommercePage.css';

const EcommercePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchEcommerceData() {
      try {
        const response = await fetch('http://localhost:5001/api/ecommerce', {
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchEcommerceData();
  }, []);

  // Loading and error states
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  // New Visitors Bar Chart
  const newVisitorsChartOption = {
    xAxis: {
      type: 'category',
      data: data.new_visitors_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: data.new_visitors_card.chart.data,
        barWidth: 6,
        itemStyle: { color: '#ff9f43', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Activity Line Chart
  const activityChartOption = {
    xAxis: {
      type: 'category',
      data: data.activity_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.activity_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#28c76f', width: 2 },
        itemStyle: { color: '#28c76f' },
        showSymbol: false,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Total Income Line Chart
  const totalIncomeChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_income_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.total_income_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#7367f0', width: 2 },
        itemStyle: { color: '#7367f0' },
        showSymbol: false,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Performance Radar Chart
  const performanceChartOption = {
    radar: {
      indicator: data.performance_card.chart.indicators.map((indicator) => ({
        name: indicator,
        max: 100,
      })),
      axisName: { color: '#6e6b7b', fontSize: 10 },
      splitLine: { lineStyle: { color: '#e0e0e0' } },
    },
    series: [
      {
        type: 'radar',
        data: data.performance_card.chart.data.map((serie) => ({
          value: serie.values,
          name: serie.name,
          areaStyle: { color: serie.name === 'Earning' ? 'rgba(0, 207, 232, 0.2)' : 'rgba(115, 103, 240, 0.2)' },
          lineStyle: { color: serie.name === 'Earning' ? '#00cfe8' : '#7367f0', width: 2 },
          itemStyle: { color: serie.name === 'Earning' ? '#00cfe8' : '#7367f0' },
        })),
      },
    ],
  };

  // Conversion Rate Line Chart
  const conversionRateChartOption = {
    xAxis: {
      type: 'category',
      data: data.conversion_rate_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.conversion_rate_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#28c76f', width: 2 },
        itemStyle: { color: '#28c76f' },
        showSymbol: false,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Expenses Bar Chart
  const expensesChartOption = {
    xAxis: {
      type: 'category',
      data: data.expenses_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: data.expenses_card.chart.data,
        barWidth: 6,
        itemStyle: { color: '#ff9f43', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Total Balance Line Chart
  const totalBalanceChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_balance_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.total_balance_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#ff9f43', width: 2 },
        itemStyle: { color: '#ff9f43' },
        showSymbol: true,
        symbolSize: 8,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  return (
    <Box className="ecommerce-main">
      <Box className="ecommerce-content">
        <Grid spacing={2}>
          {/* Congratulations Banner */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="congratulations-card">
              <Box className="congratulations-content">
                <Typography variant="h6">{data.congratulations_card.title} 🎉</Typography>
                <Typography variant="body2">{data.congratulations_card.message}</Typography>
                <Typography variant="h4">{data.congratulations_card.value}</Typography>
                <Box className="congratulations-action">
                  <Typography variant="button">{data.congratulations_card.action}</Typography>
                </Box>
              </Box>
              <Box className="congratulations-image">
                <img src="/congratulations-image.png" alt="Congratulations" />
              </Box>
            </Paper>
          </Grid>

          {/* New Visitors */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="new-visitors-card">
              <Typography variant="h6">{data.new_visitors_card.title}</Typography>
              <Typography variant="h4" className="visitors-value">
                {data.new_visitors_card.value}
              </Typography>
              <Box display="flex" alignItems="center" className="visitors-stats">
                {data.new_visitors_card.growth.startsWith('-') ? (
                  <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                ) : (
                  <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                )}
                <Typography variant="body2">{data.new_visitors_card.growth}</Typography>
              </Box>
              <Box className="new-visitors-chart">
                <ReactECharts option={newVisitorsChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Activity */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="activity-card">
              <Typography variant="h6">{data.activity_card.title}</Typography>
              <Typography variant="h4" className="activity-value">
                {data.activity_card.value}
              </Typography>
              <Box display="flex" alignItems="center" className="activity-stats">
                {data.activity_card.growth.startsWith('-') ? (
                  <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                ) : (
                  <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                )}
                <Typography variant="body2">{data.activity_card.growth}</Typography>
              </Box>
              <Box className="activity-chart">
                <ReactECharts option={activityChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Profit */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Paper className="profit-card">
              <Typography variant="h6">{data.profit_card.title}</Typography>
              <Typography variant="h4">{data.profit_card.value}</Typography>
              <Box display="flex" alignItems="center" className="profit-stats">
                {data.profit_card.growth.startsWith('-') ? (
                  <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                ) : (
                  <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                )}
                <Typography variant="body2">{data.profit_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Total Income */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper className="total-income-card">
              <Typography variant="h6">{data.total_income_card.title}</Typography>
              <Typography variant="body2">{data.total_income_card.description}</Typography>
              <Typography variant="h4">{data.total_income_card.value}</Typography>
              <Box className="total-income-chart">
                <ReactECharts option={totalIncomeChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Report */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="report-card">
              <Typography variant="h6">{data.report_card.title}</Typography>
              <Box className="report-item">
                <Typography variant="body2">{data.report_card.items[0].label}</Typography>
                <Typography variant="body2">{data.report_card.items[0].value}</Typography>
                <Box display="flex" alignItems="center" className="report-growth">
                  {data.report_card.items[0].growth.startsWith('-') ? (
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                  ) : (
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                  )}
                  <Typography variant="body2">{data.report_card.items[0].growth}</Typography>
                </Box>
              </Box>
              <Box className="report-item">
                <Typography variant="body2">{data.report_card.items[1].label}</Typography>
                <Typography variant="body2">{data.report_card.items[1].value}</Typography>
                <Box display="flex" alignItems="center" className="report-growth">
                  {data.report_card.items[1].growth.startsWith('-') ? (
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                  ) : (
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                  )}
                  <Typography variant="body2">{data.report_card.items[1].growth}</Typography>
                </Box>
              </Box>
              <Box className="report-item">
                <Typography variant="body2">{data.report_card.items[2].label}</Typography>
                <Typography variant="body2">{data.report_card.items[2].value}</Typography>
                <Box display="flex" alignItems="center" className="report-growth">
                  {data.report_card.items[2].growth.startsWith('-') ? (
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                  ) : (
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                  )}
                  <Typography variant="body2">{data.report_card.items[2].growth}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Performance */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="performance-card">
              <Box className="performance-header">
                <Typography variant="h6">{data.performance_card.title}</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box className="performance-stats">
                <Typography variant="body2">{data.performance_card.stats[0].label}: {data.performance_card.stats[0].value}</Typography>
                <Typography variant="body2">{data.performance_card.stats[1].label}: {data.performance_card.stats[1].value}</Typography>
              </Box>
              <Box className="performance-chart">
                <ReactECharts option={performanceChartOption} style={{ height: '200px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Conversion Rate */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="conversion-rate-card">
              <Typography variant="h6">{data.conversion_rate_card.title}</Typography>
              <Typography variant="body2">{data.conversion_rate_card.description}</Typography>
              <Typography variant="h4">{data.conversion_rate_card.value}</Typography>
              <Box className="conversion-rate-stats">
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[0].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[0].value}</Typography>
                  <Box display="flex" alignItems="center">
                    {data.conversion_rate_card.stats[0].growth.startsWith('-') ? (
                      <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    ) : (
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    )}
                    <Typography variant="body2">{data.conversion_rate_card.stats[0].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[1].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[1].value}</Typography>
                  <Box display="flex" alignItems="center">
                    {data.conversion_rate_card.stats[1].growth.startsWith('-') ? (
                      <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    ) : (
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    )}
                    <Typography variant="body2">{data.conversion_rate_card.stats[1].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[2].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[2].value}</Typography>
                  <Box display="flex" alignItems="center">
                    {data.conversion_rate_card.stats[2].growth.startsWith('-') ? (
                      <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    ) : (
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    )}
                    <Typography variant="body2">{data.conversion_rate_card.stats[2].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[3].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[3].value}</Typography>
                  <Box display="flex" alignItems="center">
                    {data.conversion_rate_card.stats[3].growth.startsWith('-') ? (
                      <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    ) : (
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    )}
                    <Typography variant="body2">{data.conversion_rate_card.stats[3].growth}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="conversion-rate-chart">
                <ReactECharts option={conversionRateChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="sales-card">
              <Typography variant="h6">{data.sales_card.title}</Typography>
              <Typography variant="h4">{data.sales_card.value}</Typography>
              <Box className="sales-stats">
                <Box>
                  <Typography variant="body2">{data.sales_card.stats[0].label}</Typography>
                  <Typography variant="body2">{data.sales_card.stats[0].value}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">{data.sales_card.stats[1].label}</Typography>
                  <Typography variant="body2">{data.sales_card.stats[1].value}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Expenses */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="expenses-card">
              <Typography variant="h6">{data.expenses_card.title}</Typography>
              <Typography variant="h4">{data.expenses_card.value}</Typography>
              <Box className="expenses-chart">
                <ReactECharts option={expensesChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Top Products */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="top-products-card">
              <Typography variant="h6">{data.top_products_card.title}</Typography>
              <Box className="products-list">
                <Box className="product-item header">
                  <Typography variant="body2">{data.top_products_card.columns[0]}</Typography>
                  <Typography variant="body2">{data.top_products_card.columns[1]}</Typography>
                  <Typography variant="body2">{data.top_products_card.columns[2]}</Typography>
                  <Typography variant="body2">{data.top_products_card.columns[3]}</Typography>
                </Box>
                {data.top_products_card.products.map((product, index) => (
                  <Box key={index} className="product-item">
                    <Box display="flex" alignItems="center">
                      <Box className="product-icon" style={{ backgroundColor: product.color }} />
                      <Typography variant="body2">{product.name}</Typography>
                    </Box>
                    <Typography variant="body2">{product.category}</Typography>
                    <Typography variant="body2">{product.payment}</Typography>
                    <Typography variant="body2" sx={{ color: product.status === 'Complete' || product.status === 'Confirmed' ? '#28c76f' : product.status === 'Partially Paid' ? '#ff9f43' : '#ea5455' }}>
                      {product.status}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Total Balance */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="total-balance-card">
              <Typography variant="h6">{data.total_balance_card.title}</Typography>
              <Typography variant="h4">{data.total_balance_card.value}</Typography>
              <Box className="total-balance-stats">
                <Box>
                  <Typography variant="body2">{data.total_balance_card.stats[0].label}</Typography>
                  <Typography variant="body2">{data.total_balance_card.stats[0].value}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">{data.total_balance_card.stats[1].label}</Typography>
                  <Typography variant="body2">{data.total_balance_card.stats[1].value}</Typography>
                </Box>
              </Box>
              <Box className="total-balance-chart">
                <ReactECharts option={totalBalanceChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
              <Typography variant="body2" className="total-balance-note">
                {data.total_balance_card.note}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EcommercePage;