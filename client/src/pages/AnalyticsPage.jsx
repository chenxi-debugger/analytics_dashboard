import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import OrderStatsCard from './analyticsComponents/OrderStatsCard';
import IncomeCard from './analyticsComponents/IncomeCard';
import TransactionsCard from './analyticsComponents/TransactionsCard';
import ActivityTimelineCard from './analyticsComponents/ActivityTimelineCard';
import BrowserCard from './analyticsComponents/BrowserCard';
import {
  getOrderChartOption,
  getTotalRevenueChartOption,
  getRevenueChartOption,
  getIncomeChartOption,
  getProfitChartOption,
  getGrowthChartOption,
} from './analyticsComponents/chartOptions';

const AnalyticsPage = () => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesAnchorEl, setSalesAnchorEl] = useState(null);
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

  // 将 useMemo 放在顶部，确保顺序一致
  const orderChartOption = useMemo(() => getOrderChartOption(data, theme), [data, theme]);
  const totalRevenueChartOption = useMemo(() => getTotalRevenueChartOption(theme), [theme]);
  const revenueChartOption = useMemo(() => getRevenueChartOption(data, theme), [data, theme]);
  const incomeChartOption = useMemo(() => getIncomeChartOption(data, selectedTab, theme), [data, selectedTab, theme]);
  const profitChartOption = useMemo(() => getProfitChartOption(), []);
  const growthChartOption = useMemo(() => getGrowthChartOption(), []);

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

  const handleOpenMenu = (event, setAnchorEl) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (setAnchorEl) => {
    setAnchorEl(null);
  };

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
                  <Typography>{data.order_card.title}</Typography>
                </Box>
                <Typography sx={getAnalyticsStyle('orderValue', theme)}>
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
                  <IconButton
                    onClick={(event) => handleOpenMenu(event, setSalesAnchorEl)}
                    aria-label="More options"
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h6">{data.sales_card.title}</Typography>
                <Typography variant="h4" sx={getAnalyticsStyle('salesValue', theme)}>
                  {data.sales_card.value}
                </Typography>
                <Typography variant="body2" sx={getAnalyticsStyle('salesGrowth', theme)}>
                  <ArrowUpward sx={{ fontSize: '18px', color: theme.palette.success.main }} />{' '}
                  {data.sales_card.growth}
                </Typography>
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Menu
                  anchorEl={salesAnchorEl}
                  open={Boolean(salesAnchorEl)}
                  onClose={() => handleCloseMenu(setSalesAnchorEl)}
                >
                  <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Refresh</MenuItem>
                  <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Share</MenuItem>
                  <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Update</MenuItem>
                </Menu>
              </Box>
            </Paper>
          </Grid>

          {/* Total Revenue + Company Growth */}
          <Grid size={{ xs: 12, md: 12, lg: 8 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getAnalyticsStyle('revenueGrowthCombined', theme), flexGrow: 1 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} sx={getAnalyticsStyle('revenueGrowthContent', theme)}>
                {/* Total Revenue Section */}
                <Box sx={getAnalyticsStyle('revenueSection', theme)}>
                  <Box sx={getAnalyticsStyle('revenueHeader', theme)}>
                    <Typography sx={getAnalyticsStyle('revenueHeaderTypographyH6', theme)}>
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
                    <ReactECharts option={growthChartOption} style={{ height: '200px', width: '100%' }} />
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
                    <Typography variant="h6" sx={{ fontSize: '16px' }}>
                      {data.payments_card.title}
                    </Typography>
                    <Typography variant="h4" sx={getAnalyticsStyle('paymentsValue', theme)}>
                      {data.payments_card.value}
                    </Typography>
                    <Typography variant="body2" sx={getAnalyticsStyle('paymentsGrowth', theme)}>
                      <ArrowUpward sx={{ fontSize: '20px', color: theme.palette.success.main }} /> {data.payments_card.growth}
                    </Typography>
                  </Stack>
                </Paper>

                {/* Revenue Stats Card */}
                <Paper sx={getAnalyticsStyle('revenueStatsCard', theme)}>
                  <Stack spacing={1}>
                    <Box sx={getAnalyticsStyle('revenueStatsHeader', theme)}>
                      <Typography variant="h6" sx={{ fontSize: '18px' }}>
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
                      <ArrowUpward sx={{ fontSize: '20px', color: theme.palette.success.main }} /> +{data.profit_report_card.growth}
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
          <OrderStatsCard data={data} theme={theme} />

          {/* Income/Expenses/Profit Card */}
          <IncomeCard data={data} theme={theme} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          {/* Transactions Card */}
          <TransactionsCard data={data} theme={theme} />

          {/* Activity Timeline Card */}
          <ActivityTimelineCard data={data} theme={theme} />

          {/* Browser/Country Stats Card */}
          <BrowserCard data={data} theme={theme} statsTab={statsTab} setStatsTab={setStatsTab} />
        </Grid>
      </Box>
    </Box>
  );
};

export default AnalyticsPage;