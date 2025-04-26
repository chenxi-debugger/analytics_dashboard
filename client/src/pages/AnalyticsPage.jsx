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
  Grid,
} from '@mui/material';
import {
  MoreVert,
  ArrowDropDown,
  ArrowUpward,
  ArrowDownward,
  Phone,
  Checkroom,
  Chair,
  SportsSoccer,
  Receipt,
  MeetingRoom,
  Group,
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import '../styles/analyticsPage.css';

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearAnchor, setYearAnchor] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Income');

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
  const handleTabChange = (tab) => setSelectedTab(tab);

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

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>No data available</Typography>
      </Box>
    );
  }

  // Map category names to icons
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Electronic':
        return <Phone />;
      case 'Fashion':
        return <Checkroom />;
      case 'Decor':
        return <Chair />;
      case 'Sports':
        return <SportsSoccer />;
      default:
        return null;
    }
  };

  // Map activity titles to icons
  const getActivityIcon = (activityTitle) => {
    switch (activityTitle) {
      case '12 Invoices have been paid':
        return <Receipt />;
      case 'Client Meeting':
        return <MeetingRoom />;
      case 'Create a new project for client':
        return <Group />;
      default:
        return null;
    }
  };

  // ECharts configurations with responsive heights
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
        showSymbol: true,
        symbolSize: 8,
        symbol: 'circle',
        areaStyle: { color: 'rgba(40, 199, 111, 0.1)' },
      },
    ],
    grid: { left: 0, right: 0, top: 10, bottom: 0 },
  };

  const totalRevenueChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_revenue_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: data.total_revenue_card.chart.series.map((serie) => ({
      name: serie.name,
      type: 'bar',
      data: serie.data,
      barWidth: 10,
      barGap: '0%',
      itemStyle: {
        color: serie.name === '2023' ? '#00cfe8' : '#7367f0',
        borderRadius: 4,
      },
    })),
    grid: { left: 20, right: 20, top: 10, bottom: 20 },
    legend: {
      data: ['2024', '2023'],
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: '#6e6b7b', fontSize: 10 },
    },
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
        barWidth: 6,
        itemStyle: { color: '#ff9f43', borderRadius: 4 },
      },
    ],
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
  };

  const incomeChartOption = {
    xAxis: {
      type: 'category',
      data: data.income_card[selectedTab.toLowerCase()].chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 8 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        data: data.income_card[selectedTab.toLowerCase()].chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#7367f0', width: 2 },
        areaStyle: { color: 'rgba(115, 103, 240, 0.1)' },
        itemStyle: { color: '#7367f0' },
        showSymbol: true,
        symbolSize: 6,
        symbol: 'circle',
      },
    ],
    grid: { left: 10, right: 10, top: 10, bottom: 10 },
  };

  const profitChartOption = {
    xAxis: {
      type: 'category',
      data: data.profit_report_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 8 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        type: 'line',
        data: data.profit_report_card.chart.data,
        smooth: true,
        lineStyle: { color: '#ff9f43', width: 2 },
        itemStyle: { color: '#ff9f43' },
        showSymbol: false,
      },
    ],
    grid: { left: 10, right: 10, top: 10, bottom: 10 },
  };

  return (
    <Box className="dashboard-main">
      <Box className="dashboard-content">
        <Grid container spacing={3}>
          {/* Row 1: Welcome Card (8) + Order Card (2) + Sales Card (2) */}
          <Box className="row-1-container">
            <Grid container spacing={3} className="row-grid">
              <Grid size={{ xs: 12, md: 8, lg: 8 }}>
                <Paper className="welcome-card">
                  <Box className="welcome-content">
                    <Typography variant="h6">{data.welcome_card.title} 🎉</Typography>
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

              <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                <Paper className="order-card">
                  <Box className="order-header">
                    <Typography variant="h6">{data.order_card.title}</Typography>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <Typography variant="h4" className="order-value">
                    {data.order_card.value}
                  </Typography>
                  <Box className="order-chart">
                    <ReactECharts option={orderChartOption} className="order-chart-responsive" />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                <Paper className="sales-card">
                  <Box className="sales-header">
                    <Typography variant="h6">{data.sales_card.title}</Typography>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <Typography variant="h4" className="sales-value">
                    {data.sales_card.value}
                  </Typography>
                  <Typography variant="body2" className="sales-growth">
                    <ArrowUpward style={{ fontSize: '12px', color: '#28c76f' }} /> {data.sales_card.growth}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Row 2: Total Revenue + Company Growth (8) + Payments (2) + Revenue Stats (2) + Profit Report (4) */}
          <Box className="row-2-container">
            <Grid container spacing={3} className="row-grid">
              <Grid size={{ xs: 12, md: 8, lg: 8 }}>
                <Paper className="revenue-growth-combined">
                  <Box className="revenue-growth-content">
                    {/* Total Revenue */}
                    <Box className="revenue-section">
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
                        <ReactECharts option={totalRevenueChartOption} className="revenue-chart-responsive" />
                      </Box>
                    </Box>

                    {/* Company Growth */}
                    <Box className="growth-section">
                      <Typography variant="h6">{data.company_growth_card.description}</Typography>
                      <Box className="growth-progress">
                        <CircularProgress
                          variant="determinate"
                          value={Number(data.company_growth_card.progress)}
                          size={80}
                        />
                        <Typography variant="h6" className="growth-value">
                          {data.company_growth_card.progress}% Growth
                        </Typography>
                      </Box>
                      <Box className="growth-stats">
                        {data.company_growth_card.stats.map((stat, index) => (
                          <Box key={index} className="growth-stat-item">
                            <Typography variant="body2">{stat.year}</Typography>
                            <Typography variant="body2">{stat.value}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                <Paper className="payments-card">
                  <Box className="payments-header">
                    <Typography variant="h6" style={{ fontSize: '12px' }}>{data.payments_card.title}</Typography>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <Typography variant="h4" className="payments-value">{data.payments_card.value}</Typography>
                  <Typography variant="body2" className="payments-growth">
                    <ArrowDownward style={{ fontSize: '10px', color: '#ea5455' }} /> {data.payments_card.growth}
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 4, lg: 2 }}>
                <Paper className="revenue-stats-card">
                  <Box className="revenue-stats-header">
                    <Typography variant="h6" style={{ fontSize: '12px' }}>{data.revenue_stats_card.title}</Typography>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <Typography variant="h4" className="revenue-stats-value">{data.revenue_stats_card.value}</Typography>
                  <Box className="revenue-stats-chart">
                    <ReactECharts option={revenueChartOption} className="revenue-stats-chart-responsive" />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Paper className="profit-card">
                  <Box className="profit-header">
                    <Typography variant="h6" style={{ fontSize: '12px' }}>{data.profit_report_card.title}</Typography>
                    <Typography variant="body2" className="profit-year" style={{ fontSize: '10px' }}>
                      Year {data.profit_report_card.year}
                    </Typography>
                  </Box>
                  <Typography variant="h4" className="profit-value">{data.profit_report_card.value}</Typography>
                  <Typography variant="body2" className="profit-growth">
                    <ArrowUpward style={{ fontSize: '10px', color: '#28c76f' }} /> {data.profit_report_card.growth}
                  </Typography>
                  <Box className="profit-chart">
                    <ReactECharts option={profitChartOption} className="profit-chart-responsive" />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Row 3: Order Statistics (2) + Income/Expenses/Profit (2) + Transactions (4) */}
          <Box className="row-3-container">
            <Grid container spacing={3} className="row-grid">
              <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                <Paper className="order-stats-card">
                  <Box className="order-stats-header">
                    <Typography variant="h6">{data.order_statistics_card.title}</Typography>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <Typography variant="h4" className="order-stats-value">{data.order_statistics_card.total_orders}</Typography>
                  <Typography variant="body2">Total Orders</Typography>
                  <Box className="order-stats-progress">
                    <CircularProgress
                      variant="determinate"
                      value={parseFloat(data.order_statistics_card.progress)}
                      size={40}
                    />
                    <Typography variant="body2">{parseFloat(data.order_statistics_card.progress)}%</Typography>
                  </Box>
                  <Box className="order-stats-list">
                    {data.order_statistics_card.categories.map((category, index) => (
                      <Box key={index} className="order-stats-item">
                        <Box className="order-stats-icon">
                          {getCategoryIcon(category.name)}
                        </Box>
                        <Box>
                          <Typography variant="body2">{category.name}</Typography>
                          <Typography variant="caption">{category.description}</Typography>
                        </Box>
                        <Typography variant="body2">{category.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                <Paper className="income-card">
                  <Box className="income-tabs">
                    {data.income_card.tabs.map((tab, index) => (
                      <Typography
                        key={index}
                        variant="button"
                        className={selectedTab === tab ? 'active-tab' : ''}
                        onClick={() => handleTabChange(tab)}
                      >
                        {tab}
                      </Typography>
                    ))}
                  </Box>
                  <Typography variant="h6">{data.income_card[selectedTab.toLowerCase()].title}</Typography>
                  <Typography variant="h4" className="income-value">{data.income_card[selectedTab.toLowerCase()].value}</Typography>
                  <Typography variant="body2" className="income-stats">
                    <ArrowUpward style={{ color: '#28c76f' }} /> {data.income_card[selectedTab.toLowerCase()].stats}
                  </Typography>
                  <Box className="income-chart">
                    <ReactECharts option={incomeChartOption} className="income-chart-responsive" />
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 4, lg: 4 }}>
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
            </Grid>
          </Box>

          {/* Row 4: Activity Timeline (8) + Browser/Country Stats (4) */}
          <Box className="row-4-container">
            <Grid container spacing={3} className="row-grid">
              <Grid size={{ xs: 12, md: 8, lg: 8 }}>
                <Paper className="activity-card">
                  <Box className="activity-header">
                    <Typography variant="h6">{data.activity_timeline_card.title}</Typography>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <Box className="activity-list">
                    {data.activity_timeline_card.activities.map((activity, index) => (
                      <Box key={index} className="activity-item">
                        <Avatar
                          className="activity-icon"
                          style={{ backgroundColor: activity.color }}
                        >
                          {getActivityIcon(activity.title)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{activity.title}</Typography>
                          <Typography variant="caption">{activity.subtitle || activity.description}</Typography>
                          {activity.attachment && (
                            <Typography variant="caption" className="activity-attachment">
                              {activity.attachment}
                            </Typography>
                          )}
                          {activity.client && (
                            <Box className="activity-client">
                              <Avatar
                                className="activity-avatar"
                                style={{ backgroundColor: activity.avatar_color }}
                              />
                              <Box>
                                <Typography variant="body2">{activity.client}</Typography>
                                <Typography variant="caption">CEO of ThemeSelection</Typography>
                              </Box>
                            </Box>
                          )}
                          {activity.avatars && (
                            <Box className="activity-avatars">
                              {activity.avatars.map((color, idx) => (
                                <Avatar
                                  key={idx}
                                  className="activity-avatar"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </Box>
                          )}
                        </Box>
                        <Typography variant="caption">{activity.description}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                <Paper className="browser-card">
                  <Box className="browser-tabs">
                    {data.browser_stats_card.tabs.map((tab, index) => (
                      <Typography key={index} variant="button">
                        {tab}
                      </Typography>
                    ))}
                  </Box>
                  <Box className="browser-list">
                    {data.browser_stats_card.country.stats.map((stat, index) => (
                      <Box key={index} className="browser-item">
                        <Typography variant="body2">{stat.rank}</Typography>
                        <Avatar
                          className="browser-icon"
                          style={{ backgroundColor: stat.color }}
                        />
                        <Typography variant="body2">{stat.country}</Typography>
                        <Typography variant="body2">{stat.value}</Typography>
                        <Box className="browser-progress">
                          <Box
                            className="browser-progress-bar"
                            style={{ width: stat.percentage, backgroundColor: stat.color }}
                          />
                        </Box>
                        <Typography variant="body2">{stat.percentage}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;