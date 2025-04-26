import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  MenuItem,
  Select,
  Grid, // Use Grid (Grid v2 in MUI v7)
} from '@mui/material';
import { MoreVert, Star, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import '../styles/CrmPage.css';

const CrmPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchCrmData() {
      try {
        const response = await fetch('http://localhost:5001/api/crm', {
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
    fetchCrmData();
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

  // Customer Rating Line Chart
  const customerRatingChartOption = {
    xAxis: {
      type: 'category',
      data: data.customer_rating_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.customer_rating_card.chart.data,
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
      data: data.overview_sales_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: data.overview_sales_card.chart.series.map((serie) => ({
      name: serie.name,
      type: 'bar',
      data: serie.data,
      barWidth: 6,
      itemStyle: { color: serie.name === 'Sessions' ? '#d3d3d3' : '#ea5455', borderRadius: 4 },
    })),
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Generated Leads Circular Progress (using pie chart)
  const generatedLeadsChartOption = {
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        data: data.generated_leads_card.chart.data.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.name === 'Leads' ? '#28c76f' : '#e0e0e0' },
        })),
        label: { show: false },
      },
    ],
  };

  // Earning Report Bar Chart
  const earningReportChartOption = {
    xAxis: {
      type: 'category',
      data: data.earning_report_card.chart.xAxis,
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
        data: data.earning_report_card.chart.data,
        barWidth: 6,
        itemStyle: { color: '#7367f0', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  // Sales Analytics Heatmap
  // Note: 'heatmap_data_for_2025' is a placeholder in crmPageData.json. Using random data as in original code.
  // Replace with actual heatmap data if available.
  const salesAnalyticsChartOption = {
    visualMap: {
      min: 0,
      max: 8000,
      show: false,
      inRange: { color: ['#e0e0e0', '#7367f0'] },
    },
    calendar: {
      range: data.sales_analytics_card.chart.calendar_range,
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
          `${data.sales_analytics_card.chart.calendar_range}-${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
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
        data: data.sales_stats_card.chart.data.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.name === 'Sales' ? '#28c76f' : '#e0e0e0' },
        })),
        label: { show: false },
      },
    ],
  };

  return (
    <Box className="crm-main">
      <Box className="crm-content">
        <Grid spacing={2}>
          {/* Customer Rating */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="customer-rating-card">
              <Typography variant="h6">{data.customer_rating_card.title}</Typography>
              <Box display="flex" alignItems="center" className="rating-value">
                <Typography variant="h4">{data.customer_rating_card.rating}</Typography>
                <Box className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      sx={{
                        color: i < data.customer_rating_card.stars ? '#ff9f43' : '#e0e0e0',
                        fontSize: '16px',
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Typography variant="body2">{data.customer_rating_card.change}</Typography>
              <Box className="customer-rating-chart">
                <ReactECharts option={customerRatingChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Overview & Sales Activity */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="overview-sales-card">
              <Box className="overview-sales-header">
                <Typography variant="h6">{data.overview_sales_card.title}</Typography>
                <Typography variant="body2">{data.overview_sales_card.description}</Typography>
              </Box>
              <Box className="overview-sales-stats">
                <Box>
                  <Typography variant="body2">{data.overview_sales_card.stats[0].label}</Typography>
                  <Typography variant="h4">{data.overview_sales_card.stats[0].value}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">{data.overview_sales_card.stats[1].label}</Typography>
                  <Typography variant="h4">{data.overview_sales_card.stats[1].value}</Typography>
                  <Box display="flex" alignItems="center">
                    {data.overview_sales_card.stats[1].growth.startsWith('-') ? (
                      <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    ) : (
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    )}
                    <Typography variant="body2">{data.overview_sales_card.stats[1].growth}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="overview-sales-chart">
                <ReactECharts option={overviewSalesChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Generated Leads */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="generated-leads-card">
              <Typography variant="h6">{data.generated_leads_card.title}</Typography>
              <Typography variant="body2">{data.generated_leads_card.description}</Typography>
              <Box className="generated-leads-chart">
                <ReactECharts option={generatedLeadsChartOption} style={{ height: '100px', width: '100px' }} />
                <Typography variant="h4" className="leads-value">{data.generated_leads_card.value}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                {data.generated_leads_card.growth.startsWith('-') ? (
                  <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                ) : (
                  <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                )}
                <Typography variant="body2">{data.generated_leads_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Top Products by Sales */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="top-products-sales-card">
              <Box className="top-products-header">
                <Typography variant="h6">{data.top_products_sales_card.title}</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box className="products-list">
                {data.top_products_sales_card.products.map((product, index) => (
                  <Box key={index} className="product-item">
                    <Box className="product-icon" style={{ backgroundColor: product.color }} />
                    <Typography variant="body2">{product.name}</Typography>
                    <Typography variant="body2">{product.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Top Products by Volume */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="top-products-volume-card">
              <Box className="top-products-header">
                <Typography variant="h6">{data.top_products_volume_card.title}</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box className="products-list">
                {data.top_products_volume_card.products.map((product, index) => (
                  <Box key={index} className="product-item">
                    <Box className="product-icon" style={{ backgroundColor: product.color }} />
                    <Typography variant="body2">{product.name}</Typography>
                    <Typography variant="body2">{product.value}</Typography>
                    <Box display="flex" alignItems="center">
                      {product.growth.startsWith('-') ? (
                        <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                      ) : (
                        <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                      )}
                      <Typography variant="body2">{product.growth}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Earning Report */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="earning-report-card">
              <Box className="earning-report-header">
                <Typography variant="h6">{data.earning_report_card.title}</Typography>
                <Typography variant="body2">{data.earning_report_card.description}</Typography>
              </Box>
              <Box className="earning-report-stats">
                <Box>
                  <Typography variant="body2">{data.earning_report_card.stats[0].label}</Typography>
                  <Typography variant="body2">{data.earning_report_card.stats[0].value}</Typography>
                  <Box display="flex" alignItems="center">
                    {data.earning_report_card.stats[0].growth.startsWith('-') ? (
                      <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    ) : (
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    )}
                    <Typography variant="body2">{data.earning_report_card.stats[0].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.earning_report_card.stats[1].label}</Typography>
                  <Typography variant="body2">{data.earning_report_card.stats[1].value}</Typography>
                  <Box display="flex" alignItems="center">
                    {data.earning_report_card.stats[1].growth.startsWith('-') ? (
                      <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    ) : (
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    )}
                    <Typography variant="body2">{data.earning_report_card.stats[1].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.earning_report_card.stats[2].label}</Typography>
                  <Typography variant="body2">{data.earning_report_card.stats[2].value}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">{data.earning_report_card.stats[3].label}</Typography>
                  <Typography variant="body2">{data.earning_report_card.stats[3].value}</Typography>
                  <Box display="flex" alignItems="center">
                    {data.earning_report_card.stats[3].growth.startsWith('-') ? (
                      <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    ) : (
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    )}
                    <Typography variant="body2">{data.earning_report_card.stats[3].growth}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="earning-report-chart">
                <ReactECharts option={earningReportChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales Analytics */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="sales-analytics-card">
              <Box className="sales-analytics-header">
                <Typography variant="h6">{data.sales_analytics_card.title}</Typography>
                <Select defaultValue={data.sales_analytics_card.year} size="small">
                  <MenuItem value={data.sales_analytics_card.year}>{data.sales_analytics_card.year}</MenuItem>
                </Select>
              </Box>
              <Typography variant="body2">{data.sales_analytics_card.growth}</Typography>
              <Box className="sales-analytics-chart">
                <ReactECharts option={salesAnalyticsChartOption} style={{ height: '200px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales by Countries */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="sales-countries-card">
              <Box className="sales-countries-header">
                <Typography variant="h6">{data.sales_countries_card.title}</Typography>
                <Typography variant="body2">{data.sales_countries_card.description}</Typography>
              </Box>
              <Box className="countries-list">
                {data.sales_countries_card.countries.map((country, index) => (
                  <Box key={index} className="country-item">
                    <Typography variant="body2">{country.flag} {country.name}</Typography>
                    <Typography variant="body2">{country.sales}</Typography>
                    <Typography variant="body2">{country.volume}</Typography>
                    <Box display="flex" alignItems="center">
                      {country.growth.startsWith('-') ? (
                        <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                      ) : (
                        <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                      )}
                      <Typography variant="body2">{country.growth}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Sales Stats */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="sales-stats-card">
              <Typography variant="h6">{data.sales_stats_card.title}</Typography>
              <Box className="sales-stats-chart">
                <ReactECharts option={salesStatsChartOption} style={{ height: '100px', width: '100px' }} />
                <Typography variant="h4" className="stats-value">{data.sales_stats_card.value}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box className="legend-dot" style={{ backgroundColor: '#28c76f' }} />
                <Typography variant="body2">{data.sales_stats_card.legend}</Typography>
              </Box>
              <Typography variant="body2">{data.sales_stats_card.description}</Typography>
            </Paper>
          </Grid>

          {/* Team Members */}
          <Grid size={{ xs: 12 }}>
            <Paper className="team-members-card">
              <Typography variant="h6">{data.team_members_card.title}</Typography>
              <Box className="team-members-list">
                <Box className="team-member-item header">
                  <Typography variant="body2">{data.team_members_card.columns[0]}</Typography>
                  <Typography variant="body2">{data.team_members_card.columns[1]}</Typography>
                  <Typography variant="body2">{data.team_members_card.columns[2]}</Typography>
                  <Typography variant="body2">{data.team_members_card.columns[3]}</Typography>
                  <Typography variant="body2">{data.team_members_card.columns[4]}</Typography>
                  <Typography variant="body2">{data.team_members_card.columns[5]}</Typography>
                  <Typography variant="body2">{data.team_members_card.columns[6]}</Typography>
                </Box>
                {data.team_members_card.members.map((member, index) => (
                  <Box key={index} className="team-member-item">
                    <Box display="flex" alignItems="center">
                      <Box className="member-icon" style={{ backgroundColor: member.color }} />
                      <Typography variant="body2">{member.name}</Typography>
                    </Box>
                    <Typography variant="body2">{member.project}</Typography>
                    <Typography variant="body2">{member.tasks}</Typography>
                    <Typography variant="body2">{member.amount}</Typography>
                    <Typography variant="body2" sx={{ color: member.status === 'Paid' ? '#28c76f' : member.status === 'Pending' ? '#ff9f43' : '#ea5455' }}>
                      {member.status}
                    </Typography>
                    <Typography variant="body2">{member.paid_by}</Typography>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CrmPage;