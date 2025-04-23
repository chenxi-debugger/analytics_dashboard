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
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [yearAnchor, setYearAnchor] = React.useState(null);

  const handleOpenYearMenu = (event) => setYearAnchor(event.currentTarget);
  const handleCloseYearMenu = () => setYearAnchor(null);

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
              <Box className="order-chart">Chart Placeholder</Box>
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
              <Box className="revenue-chart">Bar Chart Placeholder</Box>
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
              <Box className="profit-chart">Bar Chart Placeholder</Box>
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
              <Box className="revenue-stats-chart">Chart Placeholder</Box>
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
                {[
                  { label: 'Electronic', value: '82.5k' },
                  { label: 'Fashion', value: '23.8k' },
                  { label: 'Decor', value: '849' },
                  { label: 'Sports', value: '99' },
                ].map((item, index) => (
                  <Box key={index} className="order-stats-item">
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2">{item.value}</Typography>
                  </Box>
                ))}
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
              <Box className="income-chart">Line Chart Placeholder</Box>
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
                {[
                  { label: 'Send Money', value: '+82.6 USD', color: 'purple' },
                  { label: 'Wallet', value: '+270.69 USD', color: 'blue' },
                  { label: 'Refund', value: '+637.91 USD', color: 'green' },
                  { label: 'Credit Card', value: '-838.71 USD', color: 'red' },
                  { label: 'Ordered Food', value: '-92.45 USD', color: 'yellow' },
                  { label: 'Starbucks', value: '+203.33 USD', color: 'pink' },
                  { label: 'Mastercard', value: '+92.45 USD', color: 'orange' },
                ].map((item, index) => (
                  <Box key={index} className="transactions-item">
                    <Box className="transactions-icon" style={{ backgroundColor: item.color }} />
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2">{item.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Activity Timeline */}
          <Grid item xs={12} md={8}>
            <Paper className="activity-card">
              <Typography variant="h6">Activity Timeline</Typography>
              <Box className="activity-list">
                <Box className="activity-item">
                  <Avatar className="activity-icon" style={{ backgroundColor: 'purple' }}>
                    12
                  </Avatar>
                  <Box>
                    <Typography variant="body2">12 Invoices have been paid</Typography>
                    <Typography variant="caption">Invoices.pdf</Typography>
                  </Box>
                </Box>
                <Box className="activity-item">
                  <Avatar className="activity-icon" style={{ backgroundColor: 'yellow' }}>
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
                  <Avatar className="activity-icon" style={{ backgroundColor: 'blue' }}>
                    S
                  </Avatar>
                  <Box>
                    <Typography variant="body2">Steven Nash (Client)</Typography>
                    <Typography variant="caption">CEO of ThemeSelection</Typography>
                  </Box>
                </Box>
                <Box className="activity-item">
                  <Avatar className="activity-icon" style={{ backgroundColor: 'lightblue' }}>
                    C
                  </Avatar>
                  <Box>
                    <Typography variant="body2">Create a new project for client</Typography>
                    <Typography variant="caption">5 team members in a project</Typography>
                    <Box className="activity-avatars">
                      {[...Array(5)].map((_, i) => (
                        <Avatar key={i} className="activity-avatar" />
                      ))}
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
                {[
                  { browser: 'Chrome', visits: '8.92k', percentage: '64.91%' },
                  { browser: 'Safari', visits: '1.29k', percentage: '19.03%' },
                  { browser: 'Firefox', visits: '328', percentage: '3.26%' },
                  { browser: 'Edge', visits: '142', percentage: '3.89%' },
                  { browser: 'Opera', visits: '85', percentage: '2.12%' },
                  { browser: 'Brave', visits: '36', percentage: '1.06%' },
                ].map((item, index) => (
                  <Box key={index} className="browser-item">
                    <Typography variant="body2">{index + 1}</Typography>
                    <Avatar className="browser-icon" />
                    <Typography variant="body2">{item.browser}</Typography>
                    <Typography variant="body2">{item.visits}</Typography>
                    <Box className="browser-progress">
                      <Box className="browser-progress-bar" style={{ width: item.percentage }} />
                    </Box>
                    <Typography variant="body2">{item.percentage}</Typography>
                  </Box>
                ))}
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