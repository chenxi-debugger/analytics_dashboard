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
  useTheme,
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
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearAnchor, setYearAnchor] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Income');
  const [statsTab, setStatsTab] = useState('browser');

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

    const createObserver = (chartRef, containerRef) => {
      if (containerRef.current) {
        const observer = new ResizeObserver(() => {
          resizeChart(chartRef, containerRef);
        });
        observer.observe(containerRef.current);
        observers.push(observer);
        resizeChart(chartRef, containerRef);
      }
    };

    createObserver(orderChartRef, orderChartContainerRef);
    createObserver(totalRevenueChartRef, totalRevenueChartContainerRef);
    createObserver(revenueChartRef, revenueChartContainerRef);
    createObserver(incomeChartRef, incomeChartContainerRef);
    createObserver(profitChartRef, profitChartContainerRef);

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

  if (!data || Object.keys(data).length === 0) {
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
        lineStyle: { color: theme.palette.success.main, width: 2 },
        itemStyle: { color: theme.palette.success.main },
        showSymbol: true,
        symbolSize: (val, params) => (params.dataIndex === data.order_card.chart.data.length - 1 ? 12 : 8),
        symbol: 'circle',
        areaStyle: { color: theme.palette.success.light },
      },
    ],
    grid: { left: 0, right: 0, top: 10, bottom: 0 },
  };

  const totalRevenueChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_revenue_card.chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
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
        color: serie.name === '2023' ? theme.palette.info.main : theme.palette.primary.main,
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
      textStyle: { color: theme.palette.text.secondary, fontSize: 10 },
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
        itemStyle: { color: theme.palette.warning.main, borderRadius: 4 },
      },
    ],
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
  };

  const incomeChartOption = {
    xAxis: {
      type: 'category',
      data: data.income_card[selectedTab.toLowerCase()].chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 8 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
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
        lineStyle: { color: theme.palette.primary.main, width: 2 },
        areaStyle: { color: theme.palette.primary.light },
        itemStyle: { color: theme.palette.primary.main },
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
      axisLabel: { color: theme.palette.text.secondary, fontSize: 8 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
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
        lineStyle: { color: theme.palette.warning.main, width: 2 },
        itemStyle: { color: theme.palette.warning.main },
        showSymbol: false,
      },
    ],
    grid: { left: 10, right: 10, top: 10, bottom: 10 },
  };

  return (
    <Box sx={getAnalyticsStyle('analyticsMain', theme)}>
      <Box sx={getAnalyticsStyle('analyticsContent', theme)}>
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {/* Welcome Card */}
          <Grid size={{ xs: 12, md: 6, lg: 8 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('welcomeCard', theme), flexGrow: 1 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} sx={getAnalyticsStyle('welcomeContent', theme)}>
                <Box>
                  <Typography variant="h6" sx={getAnalyticsStyle('welcomeTypographyH6', theme)}>
                    {data.welcome_card.title} 🎉
                  </Typography>
                  <Typography variant="body2" sx={getAnalyticsStyle('welcomeTypographyBody2', theme)}>
                    {data.welcome_card.message}
                  </Typography>
                  <Box sx={getAnalyticsStyle('welcomeAction', theme)}>
                    <Typography variant="button">{data.welcome_card.action}</Typography>
                  </Box>
                </Box>
                <Box sx={getAnalyticsStyle('welcomeImage', theme)}>
                  <img src="/welcome-image.png" alt="Welcome" />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Order Card */}
          <Grid size={{ xs: 6, md: 4, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('orderCard', theme), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('orderHeader', theme)}>
                  <Typography variant="h6">{data.order_card.title}</Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={getAnalyticsStyle('orderValue', theme)}>
                  {data.order_card.value}
                </Typography>
                <Box ref={orderChartContainerRef} sx={getAnalyticsStyle('orderChart', theme)}>
                  <ReactECharts ref={orderChartRef} option={orderChartOption} />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Sales Card */}
          <Grid size={{ xs: 6, md: 4, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('salesCard', theme), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('salesHeader', theme)}>
                  <Box>
                    <img src="/stats-vertical-wallet.png" alt="Welcome" style={{ width: '40px' }} />
                  </Box>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h6">{data.sales_card.title}</Typography>
                <Typography variant="h4" sx={getAnalyticsStyle('salesValue', theme)}>
                  {data.sales_card.value}
                </Typography>
                <Typography variant="body2" sx={getAnalyticsStyle('salesGrowth', theme)}>
                  <ArrowUpward sx={{ fontSize: '12px', color: theme.palette.success.main }} /> {data.sales_card.growth}
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* Total Revenue + Company Growth */}
          <Grid size={{ xs: 12, md: 12, lg: 8 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('revenueGrowthCombined', theme), flexGrow: 1 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} sx={getAnalyticsStyle('revenueGrowthContent', theme)}>
                {/* Total Revenue Section */}
                <Box sx={getAnalyticsStyle('revenueSection', theme)}>
                  <Box sx={getAnalyticsStyle('revenueHeader', theme)}>
                    <Typography variant="h6" sx={getAnalyticsStyle('revenueHeaderTypographyH6', theme)}>
                      {data.total_revenue_card.title}
                    </Typography>
                    <Box>
                      <IconButton onClick={handleOpenYearMenu}>
                        <Typography variant="body2" sx={getAnalyticsStyle('revenueHeaderTypographyBody2', theme)}>
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
                  <Box ref={totalRevenueChartContainerRef} sx={getAnalyticsStyle('revenueChart', theme)}>
                    <ReactECharts ref={totalRevenueChartRef} option={totalRevenueChartOption} />
                  </Box>
                </Box>
                {/* Vertical Divider (only on md and larger screens) */}
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    bgcolor: theme.palette.divider,
                    mx: 2,
                  }}
                />
                {/* Company Growth Section */}
                <Box sx={getAnalyticsStyle('growthSection', theme)}>
                  <Typography variant="h6" sx={getAnalyticsStyle('growthTypographyH6', theme)}>
                    {data.company_growth_card.progress}% Company Growth
                  </Typography>
                  <Box sx={getAnalyticsStyle('growthProgress', theme)}>
                    <CircularProgress
                      variant="determinate"
                      value={Number(data.company_growth_card.progress)}
                      size={80}
                      thickness={6}
                      sx={{
                        color: theme.palette.primary.main,
                        backgroundColor: theme.palette.divider,
                        borderRadius: '50%',
                      }}
                    />
                    <Typography variant="h6" sx={getAnalyticsStyle('growthValue', theme)}>
                      {data.company_growth_card.progress}%
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2} sx={getAnalyticsStyle('growthStats', theme)}>
                    {data.company_growth_card.stats.map((stat, index) => (
                      <Box key={index} sx={getAnalyticsStyle('growthStatItem', theme)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {index === 0 ? (
                            <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>$</Typography>
                          ) : (
                            <Box sx={{ width: '12px', height: '12px', bgcolor: theme.palette.info.main, borderRadius: '2px' }} />
                          )}
                          <Typography variant="body2" sx={getAnalyticsStyle('growthStatTypographyBody2', theme)}>
                            {stat.year}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={getAnalyticsStyle('growthStatTypographyBody2', theme)}>
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
                <Paper sx={getAnalyticsStyle('paymentsCard', theme)}>
                  <Stack spacing={0.5}>
                    <Box sx={getAnalyticsStyle('paymentsHeader', theme)}>
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
                    <Typography variant="h4" sx={getAnalyticsStyle('paymentsValue', theme)}>
                      {data.payments_card.value}
                    </Typography>
                    <Typography variant="body2" sx={getAnalyticsStyle('paymentsGrowth', theme)}>
                      <ArrowUpward sx={{ fontSize: '10px', color: theme.palette.success.main }} /> {data.payments_card.growth}
                    </Typography>
                  </Stack>
                </Paper>

                {/* Revenue Stats Card */}
                <Paper sx={getAnalyticsStyle('revenueStatsCard', theme)}>
                  <Stack spacing={1}>
                    <Box sx={getAnalyticsStyle('revenueStatsHeader', theme)}>
                      <Typography variant="h6" sx={{ fontSize: '12px' }}>
                        {data.revenue_stats_card.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={getAnalyticsStyle('revenueStatsValue', theme)}>
                      {data.revenue_stats_card.value}
                    </Typography>
                    <Box ref={revenueChartContainerRef} sx={getAnalyticsStyle('revenueStatsChart', theme)}>
                      <ReactECharts ref={revenueChartRef} option={revenueChartOption} />
                    </Box>
                  </Stack>
                </Paper>
              </Box>

              {/* Bottom Stack: Profit Report Card */}
              <Paper sx={{ ...getAnalyticsStyle('profitCard', theme), flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                  {/* Text Section */}
                  <Box sx={getAnalyticsStyle('profitTextSection', theme)}>
                    <Typography variant="h6" sx={getAnalyticsStyle('profitTypographyH6', theme)}>
                      {data.profit_report_card.title}
                    </Typography>
                    <Typography variant="button" sx={getAnalyticsStyle('profitYear', theme)}>
                      Year {data.profit_report_card.year}
                    </Typography>
                    <Typography variant="h4" sx={getAnalyticsStyle('profitValue', theme)}>
                      {data.profit_report_card.value}
                    </Typography>
                    <Typography variant="body2" sx={getAnalyticsStyle('profitGrowth', theme)}>
                      <ArrowUpward sx={{ fontSize: '10px', color: theme.palette.success.main }} /> +{data.profit_report_card.growth}
                    </Typography>
                  </Box>
                  {/* Chart Section */}
                  <Box ref={profitChartContainerRef} sx={getAnalyticsStyle('profitChart', theme)}>
                    <ReactECharts ref={profitChartRef} option={profitChartOption} />
                  </Box>
                </Box>
              </Paper>
            </Stack>
          </Grid>

          {/* Order Statistics Card */}
          <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('orderStatsCard', theme), flexGrow: 1 }}>
              <Stack spacing={1} alignItems="center">
                <Box sx={getAnalyticsStyle('orderStatsHeader', theme)}>
                  <Typography variant="h6" sx={getAnalyticsStyle('orderStatsTypographyH6', theme)}>
                    {data.order_statistics_card.title}
                  </Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={getAnalyticsStyle('orderStatsValue', theme)}>
                  {data.order_statistics_card.total_sales.replace(',', '.')}
                </Typography>
                <Typography variant="body2" sx={getAnalyticsStyle('orderStatsTypographyBody2', theme)}>
                  Total Orders: {data.order_statistics_card.total_orders}
                </Typography>
                <Box sx={getAnalyticsStyle('orderStatsProgress', theme)}>
                  <CircularProgress
                    variant="determinate"
                    value={parseFloat(data.order_statistics_card.progress)}
                    size={40}
                  />
                  <Typography variant="body2" sx={getAnalyticsStyle('orderStatsProgressTypographyBody2', theme)}>
                    {parseFloat(data.order_statistics_card.progress)}%
                  </Typography>
                </Box>
                <Stack spacing={1} sx={getAnalyticsStyle('orderStatsList', theme)}>
                  {data.order_statistics_card.categories.map((category, index) => (
                    <Box key={index} sx={getAnalyticsStyle('orderStatsItem', theme)}>
                      <Box sx={getAnalyticsStyle('orderStatsIcon', theme)}>{getCategoryIcon(category.name)}</Box>
                      <Box>
                        <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>
                          {category.name}
                        </Typography>
                        <Typography variant="caption" sx={getAnalyticsStyle('orderStatsItemTypographyCaption', theme)}>
                          {category.description}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={[getAnalyticsStyle('orderStatsItemTypographyBody2', theme), { fontWeight: 600 }]}>
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
            <Paper sx={{ ...getAnalyticsStyle('incomeCard', theme), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('incomeTabs', theme)}>
                  {data.income_card.tabs.map((tab, index) => (
                    <Typography
                      key={index}
                      variant="button"
                      sx={selectedTab === tab ? [getAnalyticsStyle('incomeTabTypographyButton', theme), getAnalyticsStyle('incomeActiveTab', theme)] : getAnalyticsStyle('incomeTabTypographyButton', theme)}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="h6" sx={getAnalyticsStyle('incomeTypographyH6', theme)}>
                  {data.income_card[selectedTab.toLowerCase()].title}
                </Typography>
                <Typography variant="h4" sx={getAnalyticsStyle('incomeValue', theme)}>
                  {data.income_card[selectedTab.toLowerCase()].value}
                </Typography>
                <Typography variant="body2" sx={getAnalyticsStyle('incomeStats', theme)}>
                  <ArrowDownward sx={{ color: theme.palette.error.main }} /> 6.5% less than last week
                </Typography>
                <Box ref={incomeChartContainerRef} sx={getAnalyticsStyle('incomeChart', theme)}>
                  <ReactECharts ref={incomeChartRef} option={incomeChartOption} />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Transactions Card */}
          <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('transactionsCard', theme), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('transactionsHeader', theme)}>
                  <Typography variant="h6" sx={getAnalyticsStyle('transactionsTypographyH6', theme)}>
                    {data.transactions_card.title}
                  </Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Stack spacing={1.5} sx={getAnalyticsStyle('transactionsList', theme)}>
                  {data.transactions_card.list.map((transaction, index) => (
                    <Box key={index} sx={getAnalyticsStyle('transactionsItem', theme)}>
                      <Box sx={[getAnalyticsStyle('transactionsIcon', theme), { backgroundColor: transaction.color }]} />
                      <Typography variant="body2" sx={getAnalyticsStyle('transactionsItemTypographyBody2', theme)}>
                        {transaction.type}
                      </Typography>
                      <Typography variant="body2" sx={[getAnalyticsStyle('transactionsItemTypographyBody2', theme), { fontWeight: 600 }]}>
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
            <Paper sx={{ ...getAnalyticsStyle('activityCard', theme), flexGrow: 1 }}>
              <Stack spacing={1}>
                <Box sx={getAnalyticsStyle('activityHeader', theme)}>
                  <Typography variant="h6" sx={getAnalyticsStyle('activityTypographyH6', theme)}>
                    {data.activity_timeline_card.title}
                  </Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Stack spacing={1.5} sx={getAnalyticsStyle('activityList', theme)}>
                  {data.activity_timeline_card.activities.map((activity, index) => (
                    <Box key={index} sx={getAnalyticsStyle('activityItem', theme)}>
                      <Avatar sx={[getAnalyticsStyle('activityIcon', theme), { bgcolor: activity.color }]}>
                        {getActivityIcon(activity.title)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={getAnalyticsStyle('activityItemTypographyBody2', theme)}>
                          {activity.title}
                        </Typography>
                        <Typography variant="caption" sx={getAnalyticsStyle('activityItemTypographyCaption', theme)}>
                          {activity.subtitle || activity.description}
                        </Typography>
                        {activity.attachment && (
                          <Typography variant="caption" sx={getAnalyticsStyle('activityAttachment', theme)}>
                            {activity.attachment}
                          </Typography>
                        )}
                        {activity.client && (
                          <Box sx={getAnalyticsStyle('activityClient', theme)}>
                            <Avatar sx={[getAnalyticsStyle('activityAvatar', theme), { bgcolor: activity.avatar_color }]} />
                            <Box>
                              <Typography variant="body2" sx={getAnalyticsStyle('activityClientTypographyBody2', theme)}>
                                {activity.client}
                              </Typography>
                              <Typography variant="caption" sx={getAnalyticsStyle('activityClientTypographyCaption', theme)}>
                                CEO of ThemeSelection
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        {activity.avatars && (
                          <Box sx={getAnalyticsStyle('activityAvatars', theme)}>
                            {data.activity_timeline_card.activities[2].avatars.map((color, idx) => (
                              <Avatar
                                key={idx}
                                sx={[getAnalyticsStyle('activityAvatar', theme), { bgcolor: color }]}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                      <Typography variant="caption" sx={getAnalyticsStyle('activityItemTypographyCaption', theme)}>
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
            <Paper sx={{ ...getAnalyticsStyle('browserCard', theme), flexGrow: 1 }}>
              <Stack spacing={1}>
                {/* Tabs */}
                <Tabs
                  value={statsTab}
                  onChange={(event, newValue) => setStatsTab(newValue)}
                  sx={getAnalyticsStyle('browserTabs', theme)}
                >
                  {data.browser_stats_card.tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      label={tab}
                      value={tab.toLowerCase().replace(' ', '_')}
                      sx={
                        statsTab === tab.toLowerCase().replace(' ', '_')
                          ? [getAnalyticsStyle('browserTabTypographyButton', theme), getAnalyticsStyle('incomeActiveTab', theme)]
                          : getAnalyticsStyle('browserTabTypographyButton', theme)
                      }
                    />
                  ))}
                </Tabs>
                {/* Stats List */}
                {data.browser_stats_card[statsTab] && data.browser_stats_card[statsTab].stats ? (
                  <Stack spacing={1.5} sx={getAnalyticsStyle('browserList', theme)}>
                    {data.browser_stats_card[statsTab].stats.map((stat, index) => (
                      <Box key={index} sx={getAnalyticsStyle('browserItem', theme)}>
                        <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                          {stat.rank}
                        </Typography>
                        <Avatar
                          sx={[getAnalyticsStyle('browserIcon', theme), { bgcolor: 'transparent' }]}
                          src={
                            stat.browser === 'Chrome' ? '/chrome.png' :
                            stat.browser === 'Safari' ? '/safari.png' :
                            stat.browser === 'Firefox' ? '/firefox.png' :
                            stat.browser === 'Edge' ? '/edge.png' :
                            stat.browser === 'Opera' ? '/opera.png' :
                            stat.browser === 'Brave' ? '/brave.png' :
                            null
                          }
                        />
                        <Typography
                          variant="body2"
                          sx={[getAnalyticsStyle('browserItemTypographyBody2', theme), { color: theme.palette.text.primary, fontWeight: 600 }]}
                        >
                          {stat[statsTab === 'browser' ? 'browser' : statsTab === 'operating_system' ? 'system' : 'country']}
                        </Typography>
                        <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                          {stat.value}
                        </Typography>
                        <Box sx={getAnalyticsStyle('browserProgress', theme)}>
                          <Box sx={[getAnalyticsStyle('browserProgressBar', theme), { width: stat.percentage, bgcolor: stat.color }]} />
                        </Box>
                        <Typography variant="body2" sx={[getAnalyticsStyle('browserItemTypographyBody2', theme), { fontWeight: 600 }]}>
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