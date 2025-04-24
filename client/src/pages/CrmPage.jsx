import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  MenuItem,
  Select,
} from '@mui/material';
import { MoreVert, Star, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import '../styles/CrmPage.css';

const CrmPage = () => {
  // Customer Rating Line Chart
  const customerRatingChartOption = {
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
        data: [3.8, 4.0, 4.2, 4.0, 4.1, 3.9, 4.0],
        type: 'line',
        smooth: true,
        lineStyle: { color: '#7367f0', width: 2 },
        itemStyle: { color: '#7367f0' },
        showSymbol: true,
        symbolSize: 8,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Overview & Sales Activity Bar Chart
  const overviewSalesChartOption = {
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
        name: 'Sessions',
        type: 'bar',
        data: [2000, 2500, 1800, 3000, 2200, 2700, 2845],
        barWidth: 6,
        itemStyle: { color: '#d3d3d3', borderRadius: 4 },
      },
      {
        name: 'Orders',
        type: 'bar',
        data: [800, 1000, 1200, 900, 1100, 1300, 1286],
        barWidth: 6,
        itemStyle: { color: '#ea5455', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Generated Leads Circular Progress (using pie chart)
  const generatedLeadsChartOption = {
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        data: [
          { value: 25, name: 'Leads', itemStyle: { color: '#28c76f' } },
          { value: 75, name: 'Remaining', itemStyle: { color: '#e0e0e0' } },
        ],
        label: { show: false },
      },
    ],
  };

  // Earning Report Bar Chart
  const earningReportChartOption = {
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
        data: [300, 400, 500, 600, 700, 800, 900],
        barWidth: 6,
        itemStyle: { color: '#7367f0', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Sales Analytics Heatmap
  const salesAnalyticsChartOption = {
    visualMap: {
      min: 0,
      max: 8000,
      show: false,
      inRange: { color: ['#e0e0e0', '#7367f0'] },
    },
    calendar: {
      range: '2025',
      cellSize: ['auto', 10],
      dayLabel: { show: false },
      monthLabel: { nameMap: 'en', color: '#6e6b7b', fontSize: 10 },
      yearLabel: { show: false },
    },
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: Array.from({ length: 365 }, (_, i) => [
          `2025-${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
          Math.floor(Math.random() * 8000),
        ]),
      },
    ],
  };

  // Sales Stats Circular Progress (using pie chart)
  const salesStatsChartOption = {
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        data: [
          { value: 75, name: 'Sales', itemStyle: { color: '#28c76f' } },
          { value: 25, name: 'Remaining', itemStyle: { color: '#e0e0e0' } },
        ],
        label: { show: false },
      },
    ],
  };

  return (
    <Box className="crm-main">
      <Box className="crm-content">
        <Grid container spacing={2}>
          {/* Customer Rating */}
          <Grid item xs={12} md={4}>
            <Paper className="customer-rating-card">
              <Typography variant="h6">Customer Rating</Typography>
              <Box display="flex" alignItems="center" className="rating-value">
                <Typography variant="h4">4.0</Typography>
                <Box className="stars">
                  <Star sx={{ color: '#ff9f43', fontSize: '16px' }} />
                  <Star sx={{ color: '#ff9f43', fontSize: '16px' }} />
                  <Star sx={{ color: '#ff9f43', fontSize: '16px' }} />
                  <Star sx={{ color: '#ff9f43', fontSize: '16px' }} />
                  <Star sx={{ color: '#e0e0e0', fontSize: '16px' }} />
                </Box>
              </Box>
              <Typography variant="body2">+5.0 Points from last month</Typography>
              <Box className="customer-rating-chart">
                <ReactECharts option={customerRatingChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Overview & Sales Activity */}
          <Grid item xs={12} md={4}>
            <Paper className="overview-sales-card">
              <Box className="overview-sales-header">
                <Typography variant="h6">Overview & Sales Activity</Typography>
                <Typography variant="body2">Checkout each column for more details</Typography>
              </Box>
              <Box className="overview-sales-stats">
                <Box>
                  <Typography variant="body2">Sessions</Typography>
                  <Typography variant="h4">2845</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Order</Typography>
                  <Typography variant="h4">1,286</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">13.24%</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="overview-sales-chart">
                <ReactECharts option={overviewSalesChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Generated Leads */}
          <Grid item xs={12} md={4}>
            <Paper className="generated-leads-card">
              <Typography variant="h6">Generated Leads</Typography>
              <Typography variant="body2">Monthly Report</Typography>
              <Box className="generated-leads-chart">
                <ReactECharts option={generatedLeadsChartOption} style={{ height: '100px', width: '100px' }} />
                <Typography variant="h4" className="leads-value">25%</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                <Typography variant="body2">12.8%</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Top Products by Sales */}
          <Grid item xs={12} md={4}>
            <Paper className="top-products-sales-card">
              <Box className="top-products-header">
                <Typography variant="h6">Top Products by Sales</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box className="products-list">
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                  <Typography variant="body2">Oneplus Nord</Typography>
                  <Typography variant="body2">$98,348</Typography>
                </Box>
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                  <Typography variant="body2">Smart Band 4</Typography>
                  <Typography variant="body2">$15,459</Typography>
                </Box>
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                  <Typography variant="body2">Surface Pro X</Typography>
                  <Typography variant="body2">$5,589</Typography>
                </Box>
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                  <Typography variant="body2">iPhone 13</Typography>
                  <Typography variant="body2">$84,345</Typography>
                </Box>
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                  <Typography variant="body2">Beats Earphone</Typography>
                  <Typography variant="body2">$10,374</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Top Products by Volume */}
          <Grid item xs={12} md={4}>
            <Paper className="top-products-volume-card">
              <Box className="top-products-header">
                <Typography variant="h6">Top Products by Volume</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box className="products-list">
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#d3d3d3' }} />
                  <Typography variant="body2">ENVY Laptop</Typography>
                  <Typography variant="body2">12.4k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">14.2%</Typography>
                  </Box>
                </Box>
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#ffeb3b' }} />
                  <Typography variant="body2">Apple iMac Pro</Typography>
                  <Typography variant="body2">7.4k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">8.5%</Typography>
                  </Box>
                </Box>
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#f06292' }} />
                  <Typography variant="body2">Smart Watch Fitbit</Typography>
                  <Typography variant="body2">4.2k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">17.6%</Typography>
                  </Box>
                </Box>
                <Box className="product-item">
                  <Box className="product-icon" style={{ backgroundColor: '#e0e0e0' }} />
                  <Typography variant="body2">Oneplus Nord</Typography>
                  <Typography variant="body2">12.3k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">11.8%</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Earning Report */}
          <Grid item xs={12} md={4}>
            <Paper className="earning-report-card">
              <Box className="earning-report-header">
                <Typography variant="h6">Earning Report</Typography>
                <Typography variant="body2">Weekly Earning Overview</Typography>
              </Box>
              <Box className="earning-report-stats">
                <Box>
                  <Typography variant="body2">Net Profit</Typography>
                  <Typography variant="body2">$1,619</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">18.6%</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">Total Income</Typography>
                  <Typography variant="body2">$3,571</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">38.3%</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">Sales</Typography>
                  <Typography variant="body2">$2,340</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Total Expenses</Typography>
                  <Typography variant="body2">$430</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">52.8%</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="earning-report-chart">
                <ReactECharts option={earningReportChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales Analytics */}
          <Grid item xs={12} md={4}>
            <Paper className="sales-analytics-card">
              <Box className="sales-analytics-header">
                <Typography variant="h6">Sales Analytics</Typography>
                <Select defaultValue="2025" size="small">
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </Box>
              <Typography variant="body2">
                +42.6% than last year
              </Typography>
              <Box className="sales-analytics-chart">
                <ReactECharts option={salesAnalyticsChartOption} style={{ height: '200px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales by Countries */}
          <Grid item xs={12} md={4}>
            <Paper className="sales-countries-card">
              <Box className="sales-countries-header">
                <Typography variant="h6">Sales by Countries</Typography>
                <Typography variant="body2">Monthly Sales Overview</Typography>
              </Box>
              <Box className="countries-list">
                <Box className="country-item">
                  <Typography variant="body2">🇺🇸 United States</Typography>
                  <Typography variant="body2">$8,656k</Typography>
                  <Typography variant="body2">89.4k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">25.8%</Typography>
                  </Box>
                </Box>
                <Box className="country-item">
                  <Typography variant="body2">🇧🇷 Brazil</Typography>
                  <Typography variant="body2">$2,415k</Typography>
                  <Typography variant="body2">64.5k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">6.2%</Typography>
                  </Box>
                </Box>
                <Box className="country-item">
                  <Typography variant="body2">🇮🇳 India</Typography>
                  <Typography variant="body2">$865k</Typography>
                  <Typography variant="body2">14.8k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">12.4%</Typography>
                  </Box>
                </Box>
                <Box className="country-item">
                  <Typography variant="body2">🇦🇺 Australia</Typography>
                  <Typography variant="body2">$745k</Typography>
                  <Typography variant="body2">8.6k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">11.9%</Typography>
                  </Box>
                </Box>
                <Box className="country-item">
                  <Typography variant="body2">🇧🇪 Belgium</Typography>
                  <Typography variant="body2">$312k</Typography>
                  <Typography variant="body2">4.2k</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">14.8%</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Sales Stats */}
          <Grid item xs={12} md={4}>
            <Paper className="sales-stats-card">
              <Typography variant="h6">Sales Stats</Typography>
              <Box className="sales-stats-chart">
                <ReactECharts option={salesStatsChartOption} style={{ height: '100px', width: '100px' }} />
                <Typography variant="h4" className="stats-value">75%</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box className="legend-dot" style={{ backgroundColor: '#28c76f' }} />
                <Typography variant="body2">Conversion Ratio</Typography>
              </Box>
              <Typography variant="body2">Total Requirements</Typography>
            </Paper>
          </Grid>

          {/* Team Members */}
          <Grid item xs={12}>
            <Paper className="team-members-card">
              <Typography variant="h6">Team Members</Typography>
              <Box className="team-members-list">
                <Box className="team-member-item header">
                  <Typography variant="body2">Name</Typography>
                  <Typography variant="body2">Project</Typography>
                  <Typography variant="body2">Tasks</Typography>
                  <Typography variant="body2">Amount</Typography>
                  <Typography variant="body2">Status</Typography>
                  <Typography variant="body2">Paid By</Typography>
                  <Typography variant="body2">Actions</Typography>
                </Box>
                <Box className="team-member-item">
                  <Box display="flex" alignItems="center">
                    <Box className="member-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Nathan Wagner</Typography>
                  </Box>
                  <Typography variant="body2">ZIPCAR</Typography>
                  <Typography variant="body2">87/135</Typography>
                  <Typography variant="body2">$459.65</Typography>
                  <Typography variant="body2" sx={{ color: '#28c76f' }}>Paid</Typography>
                  <Typography variant="body2">Mastercard</Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Box className="team-member-item">
                  <Box display="flex" alignItems="center">
                    <Box className="member-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Emma Bowen</Typography>
                  </Box>
                  <Typography variant="body2">BITBANK</Typography>
                  <Typography variant="body2">340/420</Typography>
                  <Typography variant="body2">$974.31</Typography>
                  <Typography variant="body2" sx={{ color: '#ff9f43' }}>Pending</Typography>
                  <Typography variant="body2">Visa</Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Box className="team-member-item">
                  <Box display="flex" alignItems="center">
                    <Box className="member-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Adrian McGuire</Typography>
                  </Box>
                  <Typography variant="body2">PAYERS</Typography>
                  <Typography variant="body2">50/82</Typography>
                  <Typography variant="body2">$794.97</Typography>
                  <Typography variant="body2" sx={{ color: '#28c76f' }}>Paid</Typography>
                  <Typography variant="body2">Paypal</Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Box className="team-member-item">
                  <Box display="flex" alignItems="center">
                    <Box className="member-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Alma Gonzalez</Typography>
                  </Box>
                  <Typography variant="body2">BRANDI</Typography>
                  <Typography variant="body2">98/260</Typography>
                  <Typography variant="body2">$819.49</Typography>
                  <Typography variant="body2" sx={{ color: '#28c76f' }}>Paid</Typography>
                  <Typography variant="body2">Mastercard</Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Box className="team-member-item">
                  <Box display="flex" alignItems="center">
                    <Box className="member-icon" style={{ backgroundColor: '#e0e0e0' }} />
                    <Typography variant="body2">Travis Collins</Typography>
                  </Box>
                  <Typography variant="body2">AVIATO</Typography>
                  <Typography variant="body2">12/25</Typography>
                  <Typography variant="body2">$636.27</Typography>
                  <Typography variant="body2" sx={{ color: '#ea5455' }}>Failed</Typography>
                  <Typography variant="body2">Paypal</Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CrmPage;