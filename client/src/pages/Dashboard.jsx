import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert, ArrowDropDown } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react'; // Import ECharts for React
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [yearAnchor, setYearAnchor] = React.useState(null);

  const handleOpenYearMenu = (event) => setYearAnchor(event.currentTarget);
  const handleCloseYearMenu = () => setYearAnchor(null);

  // ECharts configuration for Order Chart (Line Chart)
  const orderChartOption = {
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4'],
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
        data: [20, 40, 60, 80],
        type: 'line',
        smooth: true,
        lineStyle: { color: '#28c76f', width: 2 },
        itemStyle: { color: '#28c76f' },
        showSymbol: false,
      },
    ],
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
  };

  // ECharts configuration for Total Revenue Chart (Bar Chart)
  const totalRevenueChartOption = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLabel: { color: '#5e5873', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: '2023',
        type: 'bar',
        data: [10, 0, 20, 0, 5, 0],
        barWidth: 10,
        itemStyle: { color: '#00cfe8', borderRadius: 4 },
      },
      {
        name: '2024',
        type: 'bar',
        data: [0, 30, 0, 25, 0, 15],
        barWidth: 10,
        itemStyle: { color: '#7367f0', borderRadius: 4 },
      },
    ],
    grid: { left: 20, right: 20, top: 10, bottom: 20 },
  };

  // ECharts configuration for Profit Report Chart (Bar Chart)
  const profitChartOption = {
    xAxis: {
      type: 'category',
      data: ['M', 'T', 'W', 'T', 'F'],
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
        data: [30, 50, 70, 40, 60],
        barWidth: 10,
        itemStyle: { color: '#ff9f43', borderRadius: 4 },
      },
    ],
    grid: { left: 20, right: 20, top: 10, bottom: 20 },
  };

  // ECharts configuration for Revenue Chart (Bar Chart)
  const revenueChartOption = {
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5'],
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
        data: [20, 40, 60, 30, 50],
        barWidth: 10,
        itemStyle: { color: '#ff9f43', borderRadius: 4 },
      },
    ],
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
  };

  // ECharts configuration for Income Chart (Line Chart)
  const incomeChartOption = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLabel: { color: '#5e5873', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: [20, 40, 60, 80, 50, 30],
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
          {/* Welcome Card */}
          <Grid item xs={12} md={8}>
            <Paper className="welcome-card">
              <Box className="welcome-content">
                <Typography variant="h6">Congratulations John! 🎉</Typography>
                <Typography variant="body2">
                  You have done 72% more sales today. Check your new badge in your profile.
                </Typography>
                <Box className="welcome-action">
                  <Typography variant="button">View Badges</Typography>
                </Box>
              </Box>
              <Box className="welcome-image">
                <img src="/welcome-image.png" alt="Welcome" />
              </Box>
            </Paper>
          </Grid>

          {/* Order Card */}
          <Grid item xs={12} md={4}>
            <Paper className="order-card">
              <Typography variant="h6">Order</Typography>
              <Typography variant="h4" className="order-value">
                276k
              </Typography>
              <Typography variant="body2" className="order-stats">
                Sales <span className="order-stats-value">4,679</span>
              </Typography>
              <Box className="order-chart">
                <ReactECharts option={orderChartOption} style={{ height: '80px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Total Revenue */}
          <Grid item xs={12} md={8}>
            <Paper className="revenue-card">
              <Box className="revenue-header">
                <Typography variant="h6">Total Revenue</Typography>
                <Box>
                  <IconButton onClick={handleOpenYearMenu}>
                    <Typography variant="body2">2025</Typography>
                    <ArrowDropDown />
                  </IconButton>
                  <Menu
                    anchorEl={yearAnchor}
                    open={Boolean(yearAnchor)}
                    onClose={handleCloseYearMenu}
                  >
                    <MenuItem>2025</MenuItem>
                    <MenuItem>2024</MenuItem>
                    <MenuItem>2023</MenuItem>
                  </Menu>
                </Box>
              </Box>
              <Box className="revenue-chart">
                <ReactECharts option={totalRevenueChartOption} style={{ height: '200px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Company Growth */}
          <Grid item xs={12} md={4}>
            <Paper className="growth-card">
              <Typography variant="h6">Company Growth</Typography>
              <Box className="growth-progress">
                <CircularProgress variant="determinate" value={78} size={100} />
                <Typography variant="h6" className="growth-value">
                  78%
                </Typography>
              </Box>
              <Box className="growth-stats">
                <Typography variant="body2">2024 $32.5k</Typography>
                <Typography variant="body2">2025 $41.2k</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Profit Report */}
          <Grid item xs={12} md={4}>
            <Paper className="profit-card">
              <Box className="profit-header">
                <Typography variant="h6">Profit Report</Typography>
                <Typography variant="body2" className="profit-year">
                  Year 2025
                </Typography>
              </Box>
              <Typography variant="h4">$84,686k</Typography>
              <Typography variant="body2" className="profit-growth">
                68.2% <span className="profit-growth-icon">⬆</span>
              </Typography>
              <Box className="profit-chart">
                <ReactECharts option={profitChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Revenue */}
          <Grid item xs={12} md={4}>
            <Paper className="revenue-stats-card">
              <Box className="revenue-stats-header">
                <Typography variant="h6">Revenue</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Typography variant="h4">425k</Typography>
              <Typography variant="body2" className="revenue-growth">
                $2,468 <span className="revenue-growth-icon">+14.82%</span>
              </Typography>
              <Box className="revenue-stats-chart">
                <ReactECharts option={revenueChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Order Statistics */}
          <Grid item xs={12} md={4}>
            <Paper className="order-stats-card">
              <Typography variant="h6">Order Statistics</Typography>
              <Typography variant="h4">8,258</Typography>
              <Typography variant="body2">Total Orders</Typography>
              <Box className="order-stats-progress">
                <CircularProgress variant="determinate" value={38} size={100} />
                <Typography variant="body2">38%</Typography>
              </Box>
              <Box className="order-stats-list">
                <Box className="order-stats-item">
                  <Typography variant="body2">Electronic</Typography>
                  <Typography variant="body2">82.5k</Typography>
                </Box>
                <Box className="order-stats-item">
                  <Typography variant="body2">Fashion</Typography>
                  <Typography variant="body2">23.8k</Typography>
                </Box>
                <Box className="order-stats-item">
                  <Typography variant="body2">Decor</Typography>
                  <Typography variant="body2">849</Typography>
                </Box>
                <Box className="order-stats-item">
                  <Typography variant="body2">Sports</Typography>
                  <Typography variant="body2">99</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Income, Expenses, Profit Tabs */}
          <Grid item xs={12} md={8}>
            <Paper className="income-card">
              <Box className="income-tabs">
                <Typography variant="button">Income</Typography>
                <Typography variant="button">Expenses</Typography>
                <Typography variant="button">Profit</Typography>
              </Box>
              <Typography variant="h6">Total Income</Typography>
              <Typography variant="h4">$459.1k</Typography>
              <Typography variant="body2" className="income-stats">
                42.9% <span className="income-stats-icon">⬆</span>
              </Typography>
              <Box className="income-chart">
                <ReactECharts option={incomeChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Income This Week */}
          <Grid item xs={12} md={8}>
            <Paper className="income-week-card">
              <Typography variant="body2" className="income-week">
                Income this week
              </Typography>
              <Typography variant="body2" className="income-week-stats">
                0.5k 39% less than last week
              </Typography>
            </Paper>
          </Grid>

          {/* Transactions */}
          <Grid item xs={12} md={4}>
            <Paper className="transactions-card">
              <Box className="transactions-header">
                <Typography variant="h6">Transactions</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box className="transactions-list">
                <Box className="transactions-item">
                  <Box className="transactions-icon" style={{ backgroundColor: '#7367f0' }} />
                  <Typography variant="body2">Send Money</Typography>
                  <Typography variant="body2">+82.6 USD</Typography>
                </Box>
                <Box className="transactions-item">
                  <Box className="transactions-icon" style={{ backgroundColor: '#00cfe8' }} />
                  <Typography variant="body2">Wallet</Typography>
                  <Typography variant="body2">+270.69 USD</Typography>
                </Box>
                <Box className="transactions-item">
                  <Box className="transactions-icon" style={{ backgroundColor: '#28c76f' }} />
                  <Typography variant="body2">Refund</Typography>
                  <Typography variant="body2">+637.91 USD</Typography>
                </Box>
                <Box className="transactions-item">
                  <Box className="transactions-icon" style={{ backgroundColor: '#ea5455' }} />
                  <Typography variant="body2">Credit Card</Typography>
                  <Typography variant="body2">-838.71 USD</Typography>
                </Box>
                <Box className="transactions-item">
                  <Box className="transactions-icon" style={{ backgroundColor: '#ff9f43' }} />
                  <Typography variant="body2">Ordered Food</Typography>
                  <Typography variant="body2">-92.45 USD</Typography>
                </Box>
                <Box className="transactions-item">
                  <Box className="transactions-icon" style={{ backgroundColor: '#ff3e1d' }} />
                  <Typography variant="body2">Starbucks</Typography>
                  <Typography variant="body2">+203.33 USD</Typography>
                </Box>
                <Box className="transactions-item">
                  <Box className="transactions-icon" style={{ backgroundColor: '#ff9f43' }} />
                  <Typography variant="body2">Mastercard</Typography>
                  <Typography variant="body2">+92.45 USD</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Activity Timeline */}
          <Grid item xs={12} md={8}>
            <Paper className="activity-card">
              <Typography variant="h6">Activity Timeline</Typography>
              <Box className="activity-list">
                <Box className="activity-item">
                  <Avatar className="activity-icon" style={{ backgroundColor: '#7367f0' }}>
                    12
                  </Avatar>
                  <Box>
                    <Typography variant="body2">12 Invoices have been paid</Typography>
                    <Typography variant="caption">Invoices.pdf</Typography>
                  </Box>
                </Box>
                <Box className="activity-item">
                  <Avatar className="activity-icon" style={{ backgroundColor: '#ff9f43' }}>
                    C
                  </Avatar>
                  <Box>
                    <Typography variant="body2">Client Meeting</Typography>
                    <Typography variant="caption">
                      Project meeting with John @10:15am
                    </Typography>
                  </Box>
                </Box>
                <Box className="activity-item">
                  <Avatar className="activity-icon" style={{ backgroundColor: '#00cfe8' }}>
                    S
                  </Avatar>
                  <Box>
                    <Typography variant="body2">Steven Nash (Client)</Typography>
                    <Typography variant="caption">CEO of ThemeSelection</Typography>
                  </Box>
                </Box>
                <Box className="activity-item">
                  <Avatar className="activity-icon" style={{ backgroundColor: '#e0e0e0' }}>
                    C
                  </Avatar>
                  <Box>
                    <Typography variant="body2">Create a new project for client</Typography>
                    <Typography variant="caption">5 team members in a project</Typography>
                    <Box className="activity-avatars">
                      <Avatar className="activity-avatar" style={{ backgroundColor: '#ff9f43' }} alt="Team Member" />
                      <Avatar className="activity-avatar" style={{ backgroundColor: '#7367f0' }} alt="Team Member" />
                      <Avatar className="activity-avatar" style={{ backgroundColor: '#28c76f' }} alt="Team Member" />
                      <Avatar className="activity-avatar" style={{ backgroundColor: '#00cfe8' }} alt="Team Member" />
                      <Avatar className="activity-avatar" style={{ backgroundColor: '#ea5455' }} alt="Team Member" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Browser Stats */}
          <Grid item xs={12} md={4}>
            <Paper className="browser-card">
              <Box className="browser-header">
                <Typography variant="h6">Browser</Typography>
                <Typography variant="h6">Operating System</Typography>
                <Typography variant="h6">Country</Typography>
              </Box>
              <Box className="browser-list">
                <Box className="browser-item">
                  <Typography variant="body2">1</Typography>
                  <Avatar className="browser-icon" style={{ backgroundColor: '#28c76f' }} />
                  <Typography variant="body2">Chrome</Typography>
                  <Typography variant="body2">8.92k</Typography>
                  <Box className="browser-progress">
                    <Box className="browser-progress-bar" style={{ width: '64.91%' }} />
                  </Box>
                  <Typography variant="body2">64.91%</Typography>
                </Box>
                <Box className="browser-item">
                  <Typography variant="body2">2</Typography>
                  <Avatar className="browser-icon" style={{ backgroundColor: '#00cfe8' }} />
                  <Typography variant="body2">Safari</Typography>
                  <Typography variant="body2">1.29k</Typography>
                  <Box className="browser-progress">
                    <Box className="browser-progress-bar" style={{ width: '19.03%' }} />
                  </Box>
                  <Typography variant="body2">19.03%</Typography>
                </Box>
                <Box className="browser-item">
                  <Typography variant="body2">3</Typography>
                  <Avatar className="browser-icon" style={{ backgroundColor: '#ff9f43' }} />
                  <Typography variant="body2">Firefox</Typography>
                  <Typography variant="body2">328</Typography>
                  <Box className="browser-progress">
                    <Box className="browser-progress-bar" style={{ width: '3.26%' }} />
                  </Box>
                  <Typography variant="body2">3.26%</Typography>
                </Box>
                <Box className="browser-item">
                  <Typography variant="body2">4</Typography>
                  <Avatar className="browser-icon" style={{ backgroundColor: '#7367f0' }} />
                  <Typography variant="body2">Edge</Typography>
                  <Typography variant="body2">142</Typography>
                  <Box className="browser-progress">
                    <Box className="browser-progress-bar" style={{ width: '3.89%' }} />
                  </Box>
                  <Typography variant="body2">3.89%</Typography>
                </Box>
                <Box className="browser-item">
                  <Typography variant="body2">5</Typography>
                  <Avatar className="browser-icon" style={{ backgroundColor: '#ea5455' }} />
                  <Typography variant="body2">Opera</Typography>
                  <Typography variant="body2">85</Typography>
                  <Box className="browser-progress">
                    <Box className="browser-progress-bar" style={{ width: '2.12%' }} />
                  </Box>
                  <Typography variant="body2">2.12%</Typography>
                </Box>
                <Box className="browser-item">
                  <Typography variant="body2">6</Typography>
                  <Avatar className="browser-icon" style={{ backgroundColor: '#ff3e1d' }} />
                  <Typography variant="body2">Brave</Typography>
                  <Typography variant="body2">36</Typography>
                  <Box className="browser-progress">
                    <Box className="browser-progress-bar" style={{ width: '1.06%' }} />
                  </Box>
                  <Typography variant="body2">1.06%</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box className="dashboard-footer">
        <Typography variant="caption">
          © 2025, Made with ❤️ by ThemeSelection
        </Typography>
        <Box className="footer-links">
          <Typography variant="caption">License</Typography>
          <Typography variant="caption">More Themes</Typography>
          <Typography variant="caption">Documentation</Typography>
          <Typography variant="caption">Support</Typography>
        </Box>
        <Box className="footer-action">
          <Typography variant="button">Buy Now</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;