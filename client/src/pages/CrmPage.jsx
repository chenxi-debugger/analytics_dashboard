import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  MenuItem,
  Select,
  Grid,
  Stack,
  CircularProgress,
} from '@mui/material';
import { MoreVert, Star, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../styles/crmPageStyle';

const CrmPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesAnalyticsYear, setSalesAnalyticsYear] = useState('2025');

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>No data available</Typography>
      </Box>
    );
  }

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
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: data.overview_sales_card.chart.data,
        barWidth: 6,
        itemStyle: { color: '#ea5455', borderRadius: 4 },
      },
      {
        name: 'Sessions',
        type: 'bar',
        data: data.sessions_card.chart.data,
        barWidth: 6,
        itemStyle: { color: '#d3d3d3', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const generatedLeadsChartOption = {
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        data: [
          { name: 'Leads', value: 25, itemStyle: { color: '#28c76f' } },
          { name: 'Remaining', value: 75, itemStyle: { color: '#e0e0e0' } },
        ],
        label: { show: false },
      },
    ],
  };

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

  const salesAnalyticsChartOption = {
    visualMap: {
      min: 0,
      max: 8000,
      show: false,
      inRange: { color: ['#e0e0e0', '#7367f0'] },
    },
    calendar: {
      range: salesAnalyticsYear,
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
          `${salesAnalyticsYear}-${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
          Math.floor(Math.random() * 8000),
        ]),
      },
    ],
  };

  const salesStatsChartOption = {
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        data: [
          { name: 'Sales', value: 75, itemStyle: { color: '#28c76f' } },
          { name: 'Remaining', value: 25, itemStyle: { color: '#e0e0e0' } },
        ],
        label: { show: false },
      },
    ],
  };

  return (
    <Box sx={getCrmStyle('crmMain')}>
      <Box sx={getCrmStyle('crmContent')}>
        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          {/* Customer Rating */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('customerRatingCard'), flexGrow: 1 }}>
              <Typography variant="h6">{data.customer_rating_card.title}</Typography>
              <Box sx={getCrmStyle('ratingValue')}>
                <Typography variant="h4">{data.customer_rating_card.rating}</Typography>
                <Box sx={getCrmStyle('stars')}>
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
              <Box sx={getCrmStyle('customerRatingChart')}>
                <ReactECharts option={customerRatingChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Overview & Sales Activity */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('overviewSalesCard'), flexGrow: 1 }}>
              <Box sx={getCrmStyle('overviewSalesHeader')}>
                <Typography variant="h6">{data.overview_sales_card.title}</Typography>
                <Typography variant="body2">{data.overview_sales_card.description}</Typography>
              </Box>
              <Box sx={getCrmStyle('overviewSalesStats')}>
                <Box>
                  <Typography variant="body2">{data.overview_sales_card.title}</Typography>
                  <Typography variant="h4">$1,286</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">{data.sessions_card.title}</Typography>
                  <Typography variant="h4">{data.sessions_card.value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">13.24%</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={getCrmStyle('overviewSalesChart')}>
                <ReactECharts option={overviewSalesChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Generated Leads */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('generatedLeadsCard'), flexGrow: 1 }}>
              <Typography variant="h6">{data.generated_leads_card.title}</Typography>
              <Typography variant="body2">{data.generated_leads_card.description}</Typography>
              <Box sx={getCrmStyle('generatedLeadsChart')}>
                <ReactECharts option={generatedLeadsChartOption} style={{ height: '100px', width: '100px' }} />
                <Typography variant="h4" sx={getCrmStyle('leadsValue')}>
                  {data.generated_leads_card.value}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                <Typography variant="body2">{data.generated_leads_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Orders */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('ordersCard'), flexGrow: 1 }}>
              <Typography variant="h6">{data.orders_card.title}</Typography>
              <Typography variant="h4">{data.orders_card.value}</Typography>
              <Box display="flex" alignItems="center">
                <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                <Typography variant="body2">{data.orders_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Top Products by Sales */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('topProductsSalesCard'), flexGrow: 1 }}>
              <Box sx={getCrmStyle('topProductsHeader')}>
                <Typography variant="h6">{data.top_products_sales_card.title}</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box sx={getCrmStyle('productsList')}>
                {data.top_products_sales_card.products.map((product, index) => (
                  <Box key={index} sx={getCrmStyle('productItem')}>
                    <Box sx={getCrmStyle('productIcon')} style={{ backgroundColor: product.color }} />
                    <Typography variant="body2">{product.name}</Typography>
                    <Typography variant="body2">{product.value}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Top Products by Volume */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('topProductsVolumeCard'), flexGrow: 1 }}>
              <Box sx={getCrmStyle('topProductsHeader')}>
                <Typography variant="h6">{data.top_products_volume_card.title}</Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box sx={getCrmStyle('productsList')}>
                {data.top_products_volume_card.products.map((product, index) => (
                  <Box key={index} sx={getCrmStyle('productItem')}>
                    <Box sx={getCrmStyle('productIcon')} style={{ backgroundColor: product.color }} />
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
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('earningReportCard'), flexGrow: 1 }}>
              <Box sx={getCrmStyle('earningReportHeader')}>
                <Typography variant="h6">{data.earning_report_card.stats[0].label}</Typography>
                <Typography variant="body2">{data.earning_report_card.description}</Typography>
              </Box>
              <Box sx={getCrmStyle('earningReportStats')}>
                <Box>
                  <Typography variant="body2">{data.earning_report_card.stats[0].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">{data.earning_report_card.stats[0].growth}</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Generated Leads (Moved) */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('generatedLeadsCard'), flexGrow: 1 }}>
              <Typography variant="h6">{data.earning_report_card.stats[1].label}</Typography>
              <Typography variant="body2">{data.earning_report_card.description}</Typography>
              <Box sx={getCrmStyle('generatedLeadsChart')}>
                <ReactECharts option={earningReportChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
              <Box display="flex" alignItems="center">
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                <Typography variant="body2">{data.earning_report_card.stats[1].growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Sales Analytics */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('salesAnalyticsCard'), flexGrow: 1 }}>
              <Box sx={getCrmStyle('salesAnalyticsHeader')}>
                <Typography variant="h6">{data.sales_analytics_card.title}</Typography>
                <Select
                  value={salesAnalyticsYear}
                  onChange={(e) => setSalesAnalyticsYear(e.target.value)}
                  size="small"
                >
                  {data.sales_analytics_card.year.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </Box>
              <Typography variant="body2">{data.sales_analytics_card.growth}</Typography>
              <Box sx={getCrmStyle('salesAnalyticsChart')}>
                <ReactECharts option={salesAnalyticsChartOption} style={{ height: '200px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales by Countries */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('salesCountriesCard'), flexGrow: 1 }}>
              <Box sx={getCrmStyle('salesCountriesHeader')}>
                <Typography variant="h6">{data.sales_countries_card.title}</Typography>
                <Typography variant="body2">{data.sales_countries_card.description}</Typography>
              </Box>
              <Box sx={getCrmStyle('countriesList')}>
                {data.sales_countries_card.countries.map((country, index) => (
                  <Box key={index} sx={getCrmStyle('countryItem')}>
                    <Typography variant="body2">{country.flag} {country.name}</Typography>
                    <Typography variant="body2">{country.sales}</Typography>
                    <Box display="flex" alignItems="center">
                      <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                      <Typography variant="body2">{country.growth}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Sales Stats */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('salesStatsCard'), flexGrow: 1 }}>
              <Typography variant="h6">{data.sales_stats_card.title}</Typography>
              <Box sx={getCrmStyle('salesStatsChart')}>
                <ReactECharts option={salesStatsChartOption} style={{ height: '100px', width: '100px' }} />
                <Typography variant="h4" sx={getCrmStyle('statsValue')}>
                  {data.sales_stats_card.value}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box sx={getCrmStyle('legendDot')} style={{ backgroundColor: '#28c76f' }} />
                <Typography variant="body2">{data.sales_stats_card.legend}</Typography>
              </Box>
              <Typography variant="body2">{data.sales_stats_card.description}</Typography>
            </Paper>
          </Grid>

          {/* Customers */}
          <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getCrmStyle('teamMembersCard'), flexGrow: 1 }}>
              <Typography variant="h6">{data.customer_card.title}</Typography>
              <Box sx={getCrmStyle('teamMembersList')}>
                <Box sx={[getCrmStyle('teamMemberItem'), { header: true }]}>
                  {data.customer_card.columns.map((column, index) => (
                    <Typography key={index} variant="body2">{column}</Typography>
                  ))}
                </Box>
                {data.customer_card.customers.map((customer, index) => (
                  <Box key={index} sx={getCrmStyle('teamMemberItem')}>
                    <Box display="flex" alignItems="center">
                      <Box sx={getCrmStyle('memberIcon')} style={{ backgroundColor: '#e0e0e0' }} />
                      <Typography variant="body2">{customer.name}</Typography>
                    </Box>
                    <Typography variant="body2">{customer.amount}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: customer.status === 'PAID' ? '#28c76f' : customer.status === 'PENDING' ? '#ff9f43' : '#ea5455',
                      }}
                    >
                      {customer.status}
                    </Typography>
                    <Typography variant="body2">{customer.paid_by}</Typography>
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