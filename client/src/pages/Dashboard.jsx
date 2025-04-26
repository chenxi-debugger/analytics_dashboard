import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Grid, // Use Grid (Grid v2 in MUI v7)
} from '@mui/material';
import { MoreVert, ArrowDropDown } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearAnchor, setYearAnchor] = useState(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        const response = await fetch('http://localhost:5001/api/analytics', {
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
    fetchAnalyticsData();
  }, []);

  const handleOpenYearMenu = (event) => setYearAnchor(event.currentTarget);
  const handleCloseYearMenu = () => setYearAnchor(null);

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

  // ECharts configurations using fetched data
  const orderChartOption = {
    xAxis: {
      type: 'category',
      data: data.order_card.chart.xAxis,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.order_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#28c76f', width: 2 },
        itemStyle: { color: '#28c76f' },
        showSymbol: false,
      },
    ],
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
  };

  const totalRevenueChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_revenue_card.chart.xAxis,
      axisLabel: { color: '#5e5873', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: data.total_revenue_card.chart.series.map((serie) => ({
      name: serie.name,
      type: 'bar',
      data: serie.data,
      barWidth: 10,
      itemStyle: {
        color: serie.name === '2023' ? '#00cfe8' : '#7367f0',
        borderRadius: 4,
      },
    })),
    grid: { left: 20, right: 20, top: 10, bottom: 20 },
  };

  const profitChartOption = {
    xAxis: {
      type: 'category',
      data: data.profit_report_card.chart.xAxis,
      axisLabel: { color: '#5e5873', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: data.profit_report_card.chart.data,
        barWidth: 10,
        itemStyle: { color: '#ff9f43', borderRadius: 4 },
      },
    ],
    grid: { left: 20, right: 20, top: 10, bottom: 20 },
  };

  const revenueChartOption = {
    xAxis: {
      type: 'category',
      data: data.revenue_stats_card.chart.xAxis,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: data.revenue_stats_card.chart.data,
        barWidth: 10,
        itemStyle: { color: '#ff9f43', borderRadius: 4 },
      },
    ],
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
  };

  const incomeChartOption = {
    xAxis: {
      type: 'category',
      data: data.income_card.chart.xAxis,
      axisLabel: { color: '#5e5873', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.income_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#7367f0', width: 2 },
        itemStyle: { color: '#7367f0' },
        showSymbol: false,
      },
    ],
    grid: { left: 20, right: 20, top: 10, bottom: 20 },
  };

  return (
    <Box className="dashboard-main">
      <Box className="dashboard-content">
        <Grid container spacing={3}>
          {/* Row 1: Welcome Card (8) + Order Card (4) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper className="welcome-card">
              <Box className="welcome-content">
                <Box display="flex" alignItems="center">
                  <Avatar src="/user.png" alt="User" className="welcome-avatar" sx={{ mr: 2 }} />
                  <Typography variant="h6">{data.welcome_card.title} 🎉</Typography>
                </Box>
                <Typography variant="body2">{data.welcome_card.message}</Typography>
                <Box className="welcome-action">
                  <Typography variant="button">{data.welcome_card.action}</Typography>
                </Box>
              </Box>
              <Box className="welcome-image">
                <img src="/welcome-image.png" alt="Welcome" />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="order-card">
              <Typography variant="h6">{data.order_card.title}</Typography>
              <Typography variant="h4" className="order-value">
                {data.order_card.value}
              </Typography>
              <Typography variant="body2" className="order-stats">
                {data.order_card.stats.label}{' '}
                <span className="order-stats-value">{data.order_card.stats.value}</span>
              </Typography>
              <Box className="order-chart">
                <ReactECharts option={orderChartOption} style={{ height: '80px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Row 2: Total Revenue (8) + Company Growth (4) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper className="revenue-card">
              <Box className="revenue-header">
                <Typography variant="h6">{data.total_revenue_card.title}</Typography>
                <Box>
                  <IconButton onClick={handleOpenYearMenu}>
                    <Typography variant="body2">{data.total_revenue_card.years[0]}</Typography>
                    <ArrowDropDown />
                  </IconButton>
                  <Menu
                    anchorEl={yearAnchor}
                    open={Boolean(yearAnchor)}
                    onClose={handleCloseYearMenu}
                  >
                    {data.total_revenue_card.years.map((year) => (
                      <MenuItem key={year} onClick={handleCloseYearMenu}>
                        {year}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
              <Box className="revenue-chart">
                <ReactECharts option={totalRevenueChartOption} style={{ height: '200px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="growth-card">
              <Typography variant="h6">{data.company_growth_card.title}</Typography>
              <Box className="growth-progress">
                <CircularProgress
                  variant="determinate"
                  value={data.company_growth_card.progress}
                  size={100}
                />
                <Typography variant="h6" className="growth-value">
                  {data.company_growth_card.progress}%
                </Typography>
              </Box>
              <Box className="growth-stats">
                {data.company_growth_card.stats.map((stat, index) => (
                  <Typography key={index} variant="body2">
                    {stat.year} {stat.value}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Row 3: Profit Report (4) + Revenue (4) + Order Statistics (4) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="profit-card">
              <Box className="profit-header">
                <Typography variant="h6">{data.profit_report_card.title}</Typography>
                <Typography variant="body2" className="profit-year">
                  Year {data.profit_report_card.year}
                </Typography>
              </Box>
              <Typography variant="h4">{data.profit_report_card.value}</Typography>
              <Typography variant="body2" className="profit-growth">
                {data.profit_report_card.growth} <span className="profit-growth-icon">⬆</span>
              </Typography>
              <Box className="profit-chart">
                <ReactECharts option={profitChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="revenue-stats-card">
              <Box className="revenue-stats-header">
                <Typography variant="h6">{data.revenue_stats_card.title}</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h4">{data.revenue_stats_card.value}</Typography>
              <Typography variant="body2" className="revenue-growth">
                {data.revenue_stats_card.growth.value}{' '}
                <span className="revenue-growth-icon">{data.revenue_stats_card.growth.percentage}</span>
              </Typography>
              <Box className="revenue-stats-chart">
                <ReactECharts option={revenueChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="order-stats-card">
              <Typography variant="h6">{data.order_statistics_card.title}</Typography>
              <Typography variant="h4">{data.order_statistics_card.total_orders}</Typography>
              <Typography variant="body2">Total Orders</Typography>
              <Box className="order-stats-progress">
                <CircularProgress
                  variant="determinate"
                  value={data.order_statistics_card.progress}
                  size={100}
                />
                <Typography variant="body2">{data.order_statistics_card.progress}%</Typography>
              </Box>
              <Box className="order-stats-list">
                {data.order_statistics_card.categories.map((category, index) => (
                  <Box key={index} className="order-stats-item">
                    <Typography variant="body2">{category.name}</Typography>
                    <Typography variant="body2">{category.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Row 4: Income Card (8) + Transactions (4) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper className="income-card">
              <Box className="income-tabs">
                {data.income_card.tabs.map((tab, index) => (
                  <Typography key={index} variant="button">
                    {tab}
                  </Typography>
                ))}
              </Box>
              <Typography variant="h6">{data.income_card.title}</Typography>
              <Typography variant="h4">{data.income_card.value}</Typography>
              <Typography variant="body2" className="income-stats">
                {data.income_card.stats} <span className="income-stats-icon">⬆</span>
              </Typography>
              <Box className="income-chart">
                <ReactECharts option={incomeChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="transactions-card">
              <Box className="transactions-header">
                <Typography variant="h6">{data.transactions_card.title}</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box className="transactions-list">
                {data.transactions_card.list.map((transaction, index) => (
                  <Box key={index} className="transactions-item">
                    <Box
                      className="transactions-icon"
                      style={{ backgroundColor: transaction.color }}
                    />
                    <Typography variant="body2">{transaction.type}</Typography>
                    <Typography variant="body2">{transaction.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Row 5: Income This Week (8) + Empty Space (4) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper className="income-week-card">
              <Typography variant="body2" className="income-week">
                {data.income_week_card.title}
              </Typography>
              <Typography variant="body2" className="income-week-stats">
                {data.income_week_card.value} {data.income_week_card.comparison}
              </Typography>
            </Paper>
          </Grid>

          {/* Empty Space to Maintain Alignment */}
          <Grid size={{ xs: 12, md: 4 }} />

          {/* Row 6: Activity Timeline (8) + Browser Stats (4) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper className="activity-card">
              <Typography variant="h6">{data.activity_timeline_card.title}</Typography>
              <Box className="activity-list">
                {data.activity_timeline_card.activities.map((activity, index) => (
                  <Box key={index} className="activity-item">
                    <Avatar
                      className="activity-icon"
                      style={{ backgroundColor: activity.color }}
                    >
                      {activity.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">{activity.title}</Typography>
                      <Typography variant="caption">{activity.description}</Typography>
                      {activity.avatars && (
                        <Box className="activity-avatars">
                          {activity.avatars.map((color, idx) => (
                            <Avatar
                              key={idx}
                              className="activity-avatar"
                              style={{ backgroundColor: color }}
                              alt="Team Member"
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="browser-card">
              <Box className="browser-header">
                {data.browser_stats_card.columns.map((column, index) => (
                  <Typography key={index} variant="h6">
                    {column}
                  </Typography>
                ))}
              </Box>
              <Box className="browser-list">
                {data.browser_stats_card.stats.map((stat, index) => (
                  <Box key={index} className="browser-item">
                    <Typography variant="body2">{stat.rank}</Typography>
                    <Avatar
                      className="browser-icon"
                      style={{ backgroundColor: stat.color }}
                    />
                    <Typography variant="body2">{stat.browser}</Typography>
                    <Typography variant="body2">{stat.value}</Typography>
                    <Box className="browser-progress">
                      <Box
                        className="browser-progress-bar"
                        style={{ width: stat.percentage }}
                      />
                    </Box>
                    <Typography variant="body2">{stat.percentage}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Footer: Full Width */}
          {/* <Grid size={{ xs: 12, md: 12 }}>
            <Box className="dashboard-footer">
              <Typography variant="caption">{data.footer.text}</Typography>
              <Box className="footer-links">
                {data.footer.links.map((link, index) => (
                  <Typography key={index} variant="caption">
                    {link}
                  </Typography>
                ))}
              </Box>
              <Box className="footer-action">
                <Typography variant="button">{data.footer.action}</Typography>
              </Box>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;