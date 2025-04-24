import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import { MoreVert, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import '../styles/EcommercePage.css';

const EcommercePage = () => {
  // New Visitors Bar Chart
  const newVisitorsChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
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
        data: [40, 60, 30, 50, 70, 20, 80],
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
      data: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [20, 40, 60, 30, 50, 70, 80],
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
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [10, 20, 15, 25, 30, 20, 35, 40, 30, 50, 60, 45],
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
      indicator: [
        { name: 'Jan', max: 100 },
        { name: 'Feb', max: 100 },
        { name: 'Mar', max: 100 },
        { name: 'Apr', max: 100 },
        { name: 'May', max: 100 },
        { name: 'Jun', max: 100 },
      ],
      axisName: { color: '#6e6b7b', fontSize: 10 },
      splitLine: { lineStyle: { color: '#e0e0e0' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [70, 60, 80, 50, 90, 40],
            name: 'Earning',
            areaStyle: { color: 'rgba(0, 207, 232, 0.2)' },
            lineStyle: { color: '#00cfe8', width: 2 },
            itemStyle: { color: '#00cfe8' },
          },
          {
            value: [50, 70, 40, 80, 60, 90],
            name: 'Sales',
            areaStyle: { color: 'rgba(115, 103, 240, 0.2)' },
            lineStyle: { color: '#7367f0', width: 2 },
            itemStyle: { color: '#7367f0' },
          },
        ],
      },
    ],
  };

  // Conversion Rate Line Chart
  const conversionRateChartOption = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [2, 4, 8.72, 6, 7, 5, 8],
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
      data: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
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
        data: [50, 30, 60, 40, 70, 20, 80],
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
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [20, 30, 40, 50, 60, 70],
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
        <Grid container spacing={2}>
          {/* Congratulations Banner */}
          <Grid item xs={12} md={4}>
            <Paper className="congratulations-card">
              <Box className="congratulations-content">
                <Typography variant="h6">Congratulations Katie! 🎉</Typography>
                <Typography variant="body2">
                  Best Seller of the Month
                </Typography>
                <Typography variant="h4">$48.9k</Typography>
                <Box className="congratulations-action">
                  <Typography variant="button">View Sales</Typography>
                </Box>
              </Box>
              <Box className="congratulations-image">
                <img src="/congratulations-image.png" alt="Congratulations" />
              </Box>
            </Paper>
          </Grid>

          {/* New Visitors */}
          <Grid item xs={12} md={4}>
            <Paper className="new-visitors-card">
              <Typography variant="h6">New Visitors</Typography>
              <Typography variant="h4" className="visitors-value">
                23%
              </Typography>
              <Box display="flex" alignItems="center" className="visitors-stats">
                <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                <Typography variant="body2">8.75%</Typography>
              </Box>
              <Box className="new-visitors-chart">
                <ReactECharts option={newVisitorsChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Activity */}
          <Grid item xs={12} md={4}>
            <Paper className="activity-card">
              <Typography variant="h6">Activity</Typography>
              <Typography variant="h4" className="activity-value">
                82%
              </Typography>
              <Box display="flex" alignItems="center" className="activity-stats">
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                <Typography variant="body2">19.6%</Typography>
              </Box>
              <Box className="activity-chart">
                <ReactECharts option={activityChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Profit */}
          <Grid item xs={12} md={2}>
            <Paper className="profit-card">
              <Typography variant="h6">Profit</Typography>
              <Typography variant="h4">$624k</Typography>
              <Box display="flex" alignItems="center" className="profit-stats">
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                <Typography variant="body2">28.14%</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Total Income */}
          <Grid item xs={12} md={6}>
            <Paper className="total-income-card">
              <Typography variant="h6">Total Income</Typography>
              <Typography variant="body2">Yearly Report Overview</Typography>
              <Typography variant="h4">$45,578k</Typography>
              <Box className="total-income-chart">
                <ReactECharts option={totalIncomeChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Report */}
          <Grid item xs={12} md={4}>
            <Paper className="report-card">
              <Typography variant="h6">Report</Typography>
              <Box className="report-item">
                <Typography variant="body2">Income</Typography>
                <Typography variant="body2">$42,845</Typography>
                <Box display="flex" alignItems="center" className="report-growth">
                  <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                  <Typography variant="body2">+2.7k</Typography>
                </Box>
              </Box>
              <Box className="report-item">
                <Typography variant="body2">Expense</Typography>
                <Typography variant="body2">$38,658</Typography>
                <Box display="flex" alignItems="center" className="report-growth">
                  <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                  <Typography variant="body2">-1.5k</Typography>
                </Box>
              </Box>
              <Box className="report-item">
                <Typography variant="body2">Profit</Typography>
                <Typography variant="body2">$18,220</Typography>
                <Box display="flex" alignItems="center" className="report-growth">
                  <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                  <Typography variant="body2">+1.34k</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Performance */}
          <Grid item xs={12} md={4}>
            <Paper className="performance-card">
              <Box className="performance-header">
                <Typography variant="h6">Performance</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box className="performance-stats">
                <Typography variant="body2">Earning: $846.17</Typography>
                <Typography variant="body2">Sales: 25.7M</Typography>
              </Box>
              <Box className="performance-chart">
                <ReactECharts option={performanceChartOption} style={{ height: '200px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Conversion Rate */}
          <Grid item xs={12} md={4}>
            <Paper className="conversion-rate-card">
              <Typography variant="h6">Conversion Rate</Typography>
              <Typography variant="body2">Compared to Last Month</Typography>
              <Typography variant="h4">8.72%</Typography>
              <Box className="conversion-rate-stats">
                <Box>
                  <Typography variant="body2">Impressions</Typography>
                  <Typography variant="body2">12.4k Visits</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">12.8%</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">Added To Cart</Typography>
                  <Typography variant="body2">32%</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">8.3%</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">Checkout</Typography>
                  <Typography variant="body2">21%</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">9.12%</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">Purchased</Typography>
                  <Typography variant="body2">2.24%</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">2.24%</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="conversion-rate-chart">
                <ReactECharts option={conversionRateChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales */}
          <Grid item xs={12} md={4}>
            <Paper className="sales-card">
              <Typography variant="h6">Sales</Typography>
              <Typography variant="h4">482k</Typography>
              <Box className="sales-stats">
                <Box>
                  <Typography variant="body2">Revenue</Typography>
                  <Typography variant="body2">$42,389</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Target</Typography>
                  <Typography variant="body2">78%</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Expenses */}
          <Grid item xs={12} md={4}>
            <Paper className="expenses-card">
              <Typography variant="h6">Expenses</Typography>
              <Typography variant="h4">$84.7k</Typography>
              <Box className="expenses-chart">
                <ReactECharts option={expensesChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Top Products */}
          <Grid item xs={12} md={4}>
            <Paper className="top-products-card">
              <Typography variant="h6">Top Products</Typography>
              <Box className="products-list">
                <Box className="product-item header">
                  <Typography variant="body2">Product</Typography>
                  <Typography variant="body2">Category</Typography>
                  <Typography variant="body2">Payment</Typography>
                  <Typography variant="body2">Order Stat</Typography>
                </Box>
                <Box className="product-item">
                  <Box display="flex" alignItems="center">
                    <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">OnePlus 7 Pro</Typography>
                  </Box>
                  <Typography variant="body2">Smart Phone</Typography>
                  <Typography variant="body2">$120/$499</Typography>
                  <Typography variant="body2" sx={{ color: '#28c76f' }}>Confirmed</Typography>
                </Box>
                <Box className="product-item">
                  <Box display="flex" alignItems="center">
                    <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Magic Mouse</Typography>
                  </Box>
                  <Typography variant="body2">Mouse</Typography>
                  <Typography variant="body2">$149</Typography>
                  <Typography variant="body2" sx={{ color: '#ff9f43' }}>Partially Paid</Typography>
                </Box>
                <Box className="product-item">
                  <Box display="flex" alignItems="center">
                    <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">iMac Pro</Typography>
                  </Box>
                  <Typography variant="body2">Computer</Typography>
                  <Typography variant="body2">$0/$899</Typography>
                  <Typography variant="body2" sx={{ color: '#ea5455' }}>Unpaid</Typography>
                </Box>
                <Box className="product-item">
                  <Box display="flex" alignItems="center">
                    <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Note 10</Typography>
                  </Box>
                  <Typography variant="body2">Smart Phone</Typography>
                  <Typography variant="body2">$169</Typography>
                  <Typography variant="body2" sx={{ color: '#28c76f' }}>Complete</Typography>
                </Box>
                <Box className="product-item">
                  <Box display="flex" alignItems="center">
                    <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">iPhone 11 Pro</Typography>
                  </Box>
                  <Typography variant="body2">Smart Phone</Typography>
                  <Typography variant="body2">$399</Typography>
                  <Typography variant="body2" sx={{ color: '#28c76f' }}>Complete</Typography>
                </Box>
                <Box className="product-item">
                  <Box display="flex" alignItems="center">
                    <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Mi LED TV 4X</Typography>
                  </Box>
                  <Typography variant="body2">Smart TV</Typography>
                  <Typography variant="body2">$349/$2599</Typography>
                  <Typography variant="body2" sx={{ color: '#ff9f43' }}>Partially Paid</Typography>
                </Box>
                <Box className="product-item">
                  <Box display="flex" alignItems="center">
                    <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Logitech MX</Typography>
                  </Box>
                  <Typography variant="body2">Mouse</Typography>
                  <Typography variant="body2">$89</Typography>
                  <Typography variant="body2" sx={{ color: '#28c76f' }}>Complete</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Total Balance */}
          <Grid item xs={12} md={4}>
            <Paper className="total-balance-card">
              <Typography variant="h6">Total Balance</Typography>
              <Typography variant="h4">$2,541k</Typography>
              <Box className="total-balance-stats">
                <Box>
                  <Typography variant="body2">Wallet</Typography>
                  <Typography variant="body2">$4.21k</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Paypal</Typography>
                  <Typography variant="body2">$5.14k</Typography>
                </Box>
              </Box>
              <Box className="total-balance-chart">
                <ReactECharts option={totalBalanceChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
              <Typography variant="body2" className="total-balance-note">
                You have done 57.6% more sales. Check your new badge in your profile.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EcommercePage;