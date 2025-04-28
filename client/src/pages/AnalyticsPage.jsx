import React, { useState, useEffect, useRef } from 'react';
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
  Stack,
  Divider,
  Tabs,
  Tab,
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
import getAnalyticsStyle from '../styles/analyticsPageStyle';

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearAnchor, setYearAnchor] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Income'); // For Income/Expenses/Profit Card
  const [statsTab, setStatsTab] = useState('browser'); // For Browser/Country Stats Card

  // Refs for chart instances and their containers
  const orderChartRef = useRef(null);
  const orderChartContainerRef = useRef(null);
  const totalRevenueChartRef = useRef(null);
  const totalRevenueChartContainerRef = useRef(null);
  const revenueChartRef = useRef(null);
  const revenueChartContainerRef = useRef(null);
  const incomeChartRef = useRef(null);
  const incomeChartContainerRef = useRef(null);
  const profitChartRef = useRef(null);
  const profitChartContainerRef = useRef(null);

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
        console.log('Data fetched successfully:', result);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    }
    fetchAnalyticsData();
  }, []);

  // Resize charts based on container size using ResizeObserver
  useEffect(() => {
    const resizeChart = (chartRef, containerRef) => {
      if (chartRef.current && containerRef.current) {
        const chartInstance = chartRef.current.getEchartsInstance();
        const { width, height } = containerRef.current.getBoundingClientRect();
        chartInstance.resize({ width, height });
        console.log(`Resized chart: width=${width}, height=${height}`);
      }
    };

    const observers = [];

    // Create ResizeObserver for each chart
    const createObserver = (chartRef, containerRef) => {
      if (containerRef.current) {
        const observer = new ResizeObserver(() => {
          resizeChart(chartRef, containerRef);
        });
        observer.observe(containerRef.current);
        observers.push(observer);
        // Initial resize
        resizeChart(chartRef, containerRef);
      }
    };

    createObserver(orderChartRef, orderChartContainerRef);
    createObserver(totalRevenueChartRef, totalRevenueChartContainerRef);
    createObserver(revenueChartRef, revenueChartContainerRef);
    createObserver(incomeChartRef, incomeChartContainerRef);
    createObserver(profitChartRef, profitChartContainerRef);

    // Cleanup observers on unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [data, selectedTab]);

  const handleOpenYearMenu = (event) => setYearAnchor(event.currentTarget);
  const handleCloseYearMenu = () => setYearAnchor(null);
  const handleTabChange = (tab) => setSelectedTab(tab);

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
        symbolSize: (val, params) => (params.dataIndex === data.order_card.chart.data.length - 1 ? 12 : 8),
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
    <Box sx={getAnalyticsStyle('analyticsMain')}>
      <Box sx={getAnalyticsStyle('analyticsContent')}>
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {/* Welcome Card */}
          <Grid size={{ xs: 12, md: 6, lg: 8 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('welcomeCard'), flexGrow: 1 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} sx={getAnalyticsStyle('welcomeContent')}>
                <Box>
                  <Typography variant="h6" sx={getAnalyticsStyle('welcomeTypographyH6')}>
                    {data.welcome_card.title} 🎉
                  </Typography>
                  <Typography variant="body2" sx={getAnalyticsStyle('welcomeTypographyBody2')}>
                    {data.welcome_card.message}
                  </Typography>
                  <Box sx={getAnalyticsStyle('welcomeAction')}>
                    <Typography variant="button">{data.welcome_card.action}</Typography>
                  </Box>
                </Box>
                <Box sx={getAnalyticsStyle('welcomeImage')}>
                  <img src="/welcome-image.png" alt="Welcome" />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Order Card */}
          <Grid size={{ xs: 6, md: 4, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('orderCard'), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('orderHeader')}>
                  <Typography variant="h6">{data.order_card.title}</Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={getAnalyticsStyle('orderValue')}>
                  {data.order_card.value}
                </Typography>
                <Box ref={orderChartContainerRef} sx={getAnalyticsStyle('orderChart')}>
                  <ReactECharts ref={orderChartRef} option={orderChartOption} />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Sales Card */}
          <Grid size={{ xs: 6, md: 4, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('salesCard'), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('salesHeader')}>
                  <Box>
                    <img src="/stats-vertical-wallet.png" alt="Welcome" style={{ width: '40px' }} />
                  </Box>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h6">{data.sales_card.title}</Typography>
                <Typography variant="h4" sx={getAnalyticsStyle('salesValue')}>
                  {data.sales_card.value}
                </Typography>
                <Typography variant="body2" sx={getAnalyticsStyle('salesGrowth')}>
                  <ArrowUpward sx={{ fontSize: '12px', color: '#28c76f' }} /> {data.sales_card.growth}
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* Total Revenue + Company Growth */}
          <Grid size={{ xs: 12, md: 12, lg: 8 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('revenueGrowthCombined'), flexGrow: 1 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} sx={getAnalyticsStyle('revenueGrowthContent')}>
                {/* Total Revenue Section */}
                <Box sx={getAnalyticsStyle('revenueSection')}>
                  <Box sx={getAnalyticsStyle('revenueHeader')}>
                    <Typography variant="h6" sx={getAnalyticsStyle('revenueHeaderTypographyH6')}>
                      {data.total_revenue_card.title}
                    </Typography>
                    <Box>
                      <IconButton onClick={handleOpenYearMenu}>
                        <Typography variant="body2" sx={getAnalyticsStyle('revenueHeaderTypographyBody2')}>
                          {data.total_revenue_card.years[0]}
                        </Typography>
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
                  <Box ref={totalRevenueChartContainerRef} sx={getAnalyticsStyle('revenueChart')}>
                    <ReactECharts ref={totalRevenueChartRef} option={totalRevenueChartOption} />
                  </Box>
                </Box>
                {/* Vertical Divider (only on md and larger screens) */}
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    bgcolor: '#e0e0e0',
                    mx: 2,
                  }}
                />
                {/* Company Growth Section */}
                <Box sx={getAnalyticsStyle('growthSection')}>
                  <Typography variant="h6" sx={getAnalyticsStyle('growthTypographyH6')}>
                    {data.company_growth_card.progress}% Company Growth
                  </Typography>
                  <Box sx={getAnalyticsStyle('growthProgress')}>
                    <CircularProgress
                      variant="determinate"
                      value={Number(data.company_growth_card.progress)}
                      size={80}
                      thickness={6}
                      sx={{
                        color: 'linear-gradient(90deg, #7367f0 0%, #9c93ff 100%)',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '50%',
                      }}
                    />
                    <Typography variant="h6" sx={getAnalyticsStyle('growthValue')}>
                      {data.company_growth_card.progress}%
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2} sx={getAnalyticsStyle('growthStats')}>
                    {data.company_growth_card.stats.map((stat, index) => (
                      <Box key={index} sx={getAnalyticsStyle('growthStatItem')}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {index === 0 ? (
                            <Typography variant="body2" sx={{ color: '#7367f0' }}>$</Typography>
                          ) : (
                            <Box sx={{ width: '12px', height: '12px', bgcolor: '#00cfe8', borderRadius: '2px' }} />
                          )}
                          <Typography variant="body2" sx={getAnalyticsStyle('growthStatTypographyBody2')}>
                            {stat.year}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={getAnalyticsStyle('growthStatTypographyBody2')}>
                          {stat.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Right Section: Payments, Revenue Stats, and Profit Report Cards */}
          <Grid size={{ xs: 12, md: 8, lg: 4 }} sx={{ display: 'flex' }}>
            <Stack spacing={3} sx={{ width: '100%' }}>
              {/* Top Stack: Payments Card and Revenue Stats Card */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                {/* Payments Card */}
                <Paper sx={getAnalyticsStyle('paymentsCard')}>
                  <Stack spacing={0.5}>
                    <Box sx={getAnalyticsStyle('paymentsHeader')}>
                      <Box>
                        <img src="/paypal.png" alt="paypal" style={{ width: '40px' }} />
                      </Box>
                      <IconButton>
                        <MoreVert />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" sx={{ fontSize: '12px' }}>
                      {data.payments_card.title}
                    </Typography>
                    <Typography variant="h4" sx={getAnalyticsStyle('paymentsValue')}>
                      {data.payments_card.value}
                    </Typography>
                    <Typography variant="body2" sx={getAnalyticsStyle('paymentsGrowth')}>
                      <ArrowUpward sx={{ fontSize: '10px', color: '#28c76f' }} /> {data.payments_card.growth}
                    </Typography>
                  </Stack>
                </Paper>

                {/* Revenue Stats Card */}
                <Paper sx={getAnalyticsStyle('revenueStatsCard')}>
                  <Stack spacing={1}>
                    <Box sx={getAnalyticsStyle('revenueStatsHeader')}>
                      <Typography variant="h6" sx={{ fontSize: '12px' }}>
                        {data.revenue_stats_card.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={getAnalyticsStyle('revenueStatsValue')}>
                      {data.revenue_stats_card.value}
                    </Typography>
                    <Box ref={revenueChartContainerRef} sx={getAnalyticsStyle('revenueStatsChart')}>
                      <ReactECharts ref={revenueChartRef} option={revenueChartOption} />
                    </Box>
                  </Stack>
                </Paper>
              </Box>

              {/* Bottom Stack: Profit Report Card */}
              <Paper sx={{ ...getAnalyticsStyle('profitCard'), flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                  {/* Text Section */}
                  <Box sx={getAnalyticsStyle('profitTextSection')}>
                    <Typography variant="h6" sx={getAnalyticsStyle('profitTypographyH6')}>
                      {data.profit_report_card.title}
                    </Typography>
                    <Typography variant="button" sx={getAnalyticsStyle('profitYear')}>
                      Year {data.profit_report_card.year}
                    </Typography>
                    <Typography variant="h4" sx={getAnalyticsStyle('profitValue')}>
                      {data.profit_report_card.value}
                    </Typography>
                    <Typography variant="body2" sx={getAnalyticsStyle('profitGrowth')}>
                      <ArrowUpward sx={{ fontSize: '10px', color: '#28c76f' }} /> +{data.profit_report_card.growth}
                    </Typography>
                  </Box>
                  {/* Chart Section */}
                  <Box ref={profitChartContainerRef} sx={getAnalyticsStyle('profitChart')}>
                    <ReactECharts ref={profitChartRef} option={profitChartOption} />
                  </Box>
                </Box>
              </Paper>
            </Stack>
          </Grid>

          {/* Order Statistics Card */}
          <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('orderStatsCard'), flexGrow: 1 }}>
              <Stack spacing={1} alignItems="center">
                <Box sx={getAnalyticsStyle('orderStatsHeader')}>
                  <Typography variant="h6" sx={getAnalyticsStyle('orderStatsTypographyH6')}>
                    {data.order_statistics_card.title}
                  </Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={getAnalyticsStyle('orderStatsValue')}>
                  {data.order_statistics_card.total_sales.replace(',', '.')}
                </Typography>
                <Typography variant="body2" sx={getAnalyticsStyle('orderStatsTypographyBody2')}>
                  Total Orders: {data.order_statistics_card.total_orders}
                </Typography>
                <Box sx={getAnalyticsStyle('orderStatsProgress')}>
                  <CircularProgress
                    variant="determinate"
                    value={parseFloat(data.order_statistics_card.progress)}
                    size={40}
                  />
                  <Typography variant="body2" sx={getAnalyticsStyle('orderStatsProgressTypographyBody2')}>
                    {parseFloat(data.order_statistics_card.progress)}%
                  </Typography>
                </Box>
                <Stack spacing={1} sx={getAnalyticsStyle('orderStatsList')}>
                  {data.order_statistics_card.categories.map((category, index) => (
                    <Box key={index} sx={getAnalyticsStyle('orderStatsItem')}>
                      <Box sx={getAnalyticsStyle('orderStatsIcon')}>{getCategoryIcon(category.name)}</Box>
                      <Box>
                        <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2')}>
                          {category.name}
                        </Typography>
                        <Typography variant="caption" sx={getAnalyticsStyle('orderStatsItemTypographyCaption')}>
                          {category.description}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={[getAnalyticsStyle('orderStatsItemTypographyBody2'), { fontWeight: 600 }]}>
                        {category.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Income/Expenses/Profit Card */}
          <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('incomeCard'), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('incomeTabs')}>
                  {data.income_card.tabs.map((tab, index) => (
                    <Typography
                      key={index}
                      variant="button"
                      sx={selectedTab === tab ? [getAnalyticsStyle('incomeTabTypographyButton'), getAnalyticsStyle('incomeActiveTab')] : getAnalyticsStyle('incomeTabTypographyButton')}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="h6" sx={getAnalyticsStyle('incomeTypographyH6')}>
                  {data.income_card[selectedTab.toLowerCase()].title}
                </Typography>
                <Typography variant="h4" sx={getAnalyticsStyle('incomeValue')}>
                  {data.income_card[selectedTab.toLowerCase()].value}
                </Typography>
                <Typography variant="body2" sx={getAnalyticsStyle('incomeStats')}>
                  <ArrowDownward sx={{ color: '#ea5455' }} /> 6.5% less than last week
                </Typography>
                <Box ref={incomeChartContainerRef} sx={getAnalyticsStyle('incomeChart')}>
                  <ReactECharts ref={incomeChartRef} option={incomeChartOption} />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Transactions Card */}
          <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('transactionsCard'), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('transactionsHeader')}>
                  <Typography variant="h6" sx={getAnalyticsStyle('transactionsTypographyH6')}>
                    {data.transactions_card.title}
                  </Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Stack spacing={1.5} sx={getAnalyticsStyle('transactionsList')}>
                  {data.transactions_card.list.map((transaction, index) => (
                    <Box key={index} sx={getAnalyticsStyle('transactionsItem')}>
                      <Box sx={[getAnalyticsStyle('transactionsIcon'), { backgroundColor: transaction.color }]} />
                      <Typography variant="body2" sx={getAnalyticsStyle('transactionsItemTypographyBody2')}>
                        {transaction.type}
                      </Typography>
                      <Typography variant="body2" sx={[getAnalyticsStyle('transactionsItemTypographyBody2'), { fontWeight: 600 }]}>
                        {transaction.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Activity Timeline Card */}
          <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('activityCard'), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('activityHeader')}>
                  <Typography variant="h6" sx={getAnalyticsStyle('activityTypographyH6')}>
                    {data.activity_timeline_card.title}
                  </Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Stack spacing={1.5} sx={getAnalyticsStyle('activityList')}>
                  {data.activity_timeline_card.activities.map((activity, index) => (
                    <Box key={index} sx={getAnalyticsStyle('activityItem')}>
                      <Avatar sx={[getAnalyticsStyle('activityIcon'), { bgcolor: activity.color }]}>
                        {getActivityIcon(activity.title)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={getAnalyticsStyle('activityItemTypographyBody2')}>
                          {activity.title}
                        </Typography>
                        <Typography variant="caption" sx={getAnalyticsStyle('activityItemTypographyCaption')}>
                          {activity.subtitle || activity.description}
                        </Typography>
                        {activity.attachment && (
                          <Typography variant="caption" sx={getAnalyticsStyle('activityAttachment')}>
                            {activity.attachment}
                          </Typography>
                        )}
                        {activity.client && (
                          <Box sx={getAnalyticsStyle('activityClient')}>
                            <Avatar sx={[getAnalyticsStyle('activityAvatar'), { bgcolor: activity.avatar_color }]} />
                            <Box>
                              <Typography variant="body2" sx={getAnalyticsStyle('activityClientTypographyBody2')}>
                                {activity.client}
                              </Typography>
                              <Typography variant="caption" sx={getAnalyticsStyle('activityClientTypographyCaption')}>
                                CEO of ThemeSelection
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        {activity.avatars && (
                          <Box sx={getAnalyticsStyle('activityAvatars')}>
                            {data.activity_timeline_card.activities[2].avatars.map((color, idx) => (
                              <Avatar
                                key={idx}
                                sx={[getAnalyticsStyle('activityAvatar'), { bgcolor: color }]}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                      <Typography variant="caption" sx={getAnalyticsStyle('activityItemTypographyCaption')}>
                        {activity.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Browser/Country Stats Card */}
          <Grid size={{ xs: 6, md: 6, lg: 6 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('browserCard'), flexGrow: 1 }}>
              <Stack spacing={1}>
                {/* Tabs */}
                <Tabs
                  value={statsTab}
                  onChange={(event, newValue) => setStatsTab(newValue)}
                  sx={getAnalyticsStyle('browserTabs')}
                >
                  {data.browser_stats_card.tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      label={tab}
                      value={tab.toLowerCase().replace(' ', '_')} // e.g., "browser", "operating_system", "country"
                      sx={
                        statsTab === tab.toLowerCase().replace(' ', '_')
                          ? [getAnalyticsStyle('browserTab'), getAnalyticsStyle('browserTabActive')]
                          : getAnalyticsStyle('browserTab')
                      }
                    />
                  ))}
                </Tabs>
                {/* Column Headers */}
                {data.browser_stats_card[statsTab] && data.browser_stats_card[statsTab].columns ? (
                  <Box sx={getAnalyticsStyle('browserColumns')}>
                    {data.browser_stats_card[statsTab].columns.map((column, index) => (
                      <Typography key={index} variant="body2" sx={getAnalyticsStyle('browserColumnTypography')}>
                        {column}
                      </Typography>
                    ))}
                  </Box>
                ) : null}
                {/* Stats List */}
                {data.browser_stats_card[statsTab] && data.browser_stats_card[statsTab].stats ? (
                  <Stack spacing={1.5} sx={getAnalyticsStyle('browserList')}>
                    {data.browser_stats_card[statsTab].stats.map((stat, index) => (
                      <Box key={index} sx={getAnalyticsStyle('browserItem')}>
                        <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2')}>
                          {stat.rank}
                        </Typography>
                        <Avatar
                          sx={[getAnalyticsStyle('browserIcon'), { bgcolor: 'transparent' }]}
                          src={
                            // Add icons for browsers (you can use real icons or placeholders)
                            stat.browser === 'Chrome' ? '/icons/chrome.png' :
                            stat.browser === 'Safari' ? '/icons/safari.png' :
                            stat.browser === 'Firefox' ? '/icons/firefox.png' :
                            stat.browser === 'Edge' ? '/icons/edge.png' :
                            stat.browser === 'Opera' ? '/icons/opera.png' :
                            stat.browser === 'Brave' ? '/icons/brave.png' :
                            null
                          }
                        />
                        <Typography
                          variant="body2"
                          sx={[getAnalyticsStyle('browserItemTypographyBody2'), { color: '#1a1a1a', fontWeight: 600 }]}
                        >
                          {stat[statsTab === 'browser' ? 'browser' : statsTab === 'operating_system' ? 'system' : 'country']}
                        </Typography>
                        <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2')}>
                          {stat.value}
                        </Typography>
                        <Box sx={getAnalyticsStyle('browserProgress')}>
                          <Box sx={[getAnalyticsStyle('browserProgressBar'), { width: stat.percentage, bgcolor: stat.color }]} />
                        </Box>
                        <Typography variant="body2" sx={[getAnalyticsStyle('browserItemTypographyBody2'), { fontWeight: 600 }]}>
                          {stat.percentage}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : null}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;