import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  Stack,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { MoreVert, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../styles/ecommercepageStyle';

const EcommercePage = () => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEcommerceData() {
      try {
        const response = await fetch('http://localhost:5001/api/ecommerce', {
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
    fetchEcommerceData();
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

  const newVisitorsChartOption = {
    xAxis: {
      type: 'category',
      data: data.new_visitors_card.chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: data.new_visitors_card.chart.data,
        barWidth: 6,
        itemStyle: { color: theme.palette.warning.main, borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const activityChartOption = {
    xAxis: {
      type: 'category',
      data: data.activity_card.chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.activity_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: theme.palette.success.main, width: 2 },
        itemStyle: { color: theme.palette.success.main },
        showSymbol: false,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const profitChartOption = {
    xAxis: {
      type: 'category',
      data: data.profit_card.chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.profit_card.chart.data,
        type: 'bar',
        barWidth: 6,
        itemStyle: { color: theme.palette.success.main, borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const totalIncomeChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_income_card.chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}k', color: theme.palette.text.secondary, fontSize: 10 },
      splitLine: { lineStyle: { color: theme.palette.divider } },
    },
    series: [
      {
        data: data.total_income_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: theme.palette.primary.main, width: 2 },
        areaStyle: { color: theme.palette.primary.light },
        itemStyle: { color: theme.palette.primary.main },
        showSymbol: true,
        symbolSize: 8,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const expensesChartOption = {
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        data: [
          { name: 'Expenses', value: 72, itemStyle: { color: theme.palette.warning.main } },
          { name: 'Remaining', value: 28, itemStyle: { color: theme.palette.divider } },
        ],
        label: { show: false },
      },
    ],
  };

  const performanceChartOption = {
    radar: {
      indicator: data.performance_card.chart.indicators.map((indicator) => ({
        name: indicator,
        max: 100,
      })),
      axisName: { color: theme.palette.text.secondary, fontSize: 10 },
      splitLine: { lineStyle: { color: theme.palette.divider } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data.performance_card.chart.data[0].values,
            name: 'Income',
            areaStyle: { color: theme.palette.primary.light },
            lineStyle: { color: theme.palette.primary.main, width: 2 },
            itemStyle: { color: theme.palette.primary.main },
          },
          {
            value: data.performance_card.chart.data[1].values,
            name: 'Earning',
            areaStyle: { color: theme.palette.info.light },
            lineStyle: { color: theme.palette.info.main, width: 2 },
            itemStyle: { color: theme.palette.info.main },
          },
        ],
      },
    ],
  };

  const conversionRateChartOption = {
    xAxis: {
      type: 'category',
      data: data.conversion_rate_card.chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.conversion_rate_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: theme.palette.success.main, width: 2 },
        itemStyle: { color: theme.palette.success.main },
        showSymbol: true,
        symbolSize: 8,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const expenses2ChartOption = {
    xAxis: {
      type: 'category',
      data: data.expenses_2_card.chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.expenses_2_card.chart.data,
        type: 'bar',
        barWidth: 6,
        itemStyle: { color: theme.palette.primary.main, borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const totalBalanceChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_balance_card.chart.xAxis,
      axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
      axisLine: { lineStyle: { color: theme.palette.divider } },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: data.total_balance_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: theme.palette.warning.main, width: 2 },
        itemStyle: { color: theme.palette.warning.main },
        showSymbol: true,
        symbolSize: 8,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  return (
    <Box sx={getEcommerceStyle('ecommerceMain', theme)}>
      <Box sx={getEcommerceStyle('ecommerceContent', theme)}>
        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          {/* Congratulations Banner */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('congratulationsCard', theme), flexGrow: 1 }}>
              <Box sx={getEcommerceStyle('congratulationsContent', theme)}>
                <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                  {data.congratulations_card.title} 🎉
                </Typography>
                <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                  {data.congratulations_card.message}
                </Typography>
                <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                  {data.congratulations_card.value}
                </Typography>
                <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                  {data.congratulations_card.target}
                </Typography>
                <Box sx={getEcommerceStyle('congratulationsAction', theme)}>
                  <Typography variant="button">{data.congratulations_card.action}</Typography>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('congratulationsImage', theme)}>
                <img src="/congratulations-image.png" alt="Congratulations" />
              </Box>
            </Paper>
          </Grid>

          {/* New Visitors */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('newVisitorsCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.new_visitors_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('visitorsValue', theme)}>
                {data.new_visitors_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('visitorsStats', theme)}>
                <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '16px' }} />
                <Typography variant="body2">{data.new_visitors_card.growth}</Typography>
              </Box>
              <Box sx={getEcommerceStyle('newVisitorsChart', theme)}>
                <ReactECharts option={newVisitorsChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Activity */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('activityCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.activity_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('activityValue', theme)}>
                {data.activity_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('activityStats', theme)}>
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
                <Typography variant="body2">{data.activity_card.growth}</Typography>
              </Box>
              <Box sx={getEcommerceStyle('activityChart', theme)}>
                <ReactECharts option={activityChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('salesCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.sales_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.sales_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats', theme)}>
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
                <Typography variant="body2">{data.sales_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Profit */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('profitCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.profit_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.profit_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('newVisitorsChart', theme)}>
                <ReactECharts option={profitChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Total Income */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('totalIncomeCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.total_income_card.title}
              </Typography>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                {data.total_income_card.description}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.total_income_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('totalIncomeChart', theme)}>
                <ReactECharts option={totalIncomeChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Report */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('reportCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.report_card.title}
              </Typography>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                {data.report_card.description}
              </Typography>
              <Box sx={getEcommerceStyle('reportItem', theme)}>
                <Typography variant="body2">{data.report_card.items[0].label}</Typography>
                <Typography variant="body2">{data.report_card.items[0].value}</Typography>
                <Box sx={getEcommerceStyle('reportGrowth', theme)}>
                  <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
                  <Typography variant="body2">{data.report_card.items[0].growth}</Typography>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('reportItem', theme)}>
                <Typography variant="body2">{data.report_card.items[1].label}</Typography>
                <Typography variant="body2">{data.report_card.items[1].value}</Typography>
                <Box sx={getEcommerceStyle('reportGrowth', theme)}>
                  <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '16px' }} />
                  <Typography variant="body2">{data.report_card.items[1].growth}</Typography>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('reportItem', theme)}>
                <Typography variant="body2">{data.report_card.items[2].label}</Typography>
                <Typography variant="body2">{data.report_card.items[2].value}</Typography>
                <Box sx={getEcommerceStyle('reportGrowth', theme)}>
                  <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
                  <Typography variant="body2">{data.report_card.items[2].growth}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Expenses */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('expensesCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.expenses_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.expenses_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('expensesChart', theme)}>
                <ReactECharts option={expensesChartOption} style={{ height: '100px', width: '100px' }} />
              </Box>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                {data.expenses_card.additional_info}
              </Typography>
            </Paper>
          </Grid>

          {/* Transactions */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('transactionsCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.transactions_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.transactions_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats', theme)}>
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
                <Typography variant="body2">{data.transactions_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Performance */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('performanceCard', theme), flexGrow: 1 }}>
              <Box sx={getEcommerceStyle('performanceHeader', theme)}>
                <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                  {data.performance_card.title}
                </Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box sx={getEcommerceStyle('performanceStats', theme)}>
                <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                  {data.performance_card.stats[0].label}: {data.performance_card.stats[0].value}
                </Typography>
                <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                  {data.performance_card.stats[1].label}: {data.performance_card.stats[1].value}
                </Typography>
              </Box>
              <Box sx={getEcommerceStyle('performanceChart', theme)}>
                <ReactECharts option={performanceChartOption} style={{ height: '180px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Conversion Rate */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('conversionRateCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.conversion_rate_card.title}
              </Typography>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                {data.conversion_rate_card.description}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.conversion_rate_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('conversionRateStats', theme)}>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[0].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[0].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
                    <Typography variant="body2">{data.conversion_rate_card.stats[0].value}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[1].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[1].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '12px' }} />
                    <Typography variant="body2">{data.conversion_rate_card.stats[1].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[2].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[2].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
                    <Typography variant="body2">{data.conversion_rate_card.stats[2].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[3].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[3].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
                    <Typography variant="body2">{data.conversion_rate_card.stats[3].growth}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('conversionRateChart', theme)}>
                <ReactECharts option={conversionRateChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Revenue */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('revenueCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.revenue_2_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.revenue_2_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats', theme)}>
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
                <Typography variant="body2">{data.revenue_2_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Sales */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('salesCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.sales_2_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.sales_2_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats', theme)}>
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
                <Typography variant="body2">{data.sales_2_card.growth}</Typography>
              </Box>
              <Box sx={getEcommerceStyle('salesStats', theme)}>
                <Typography variant="body2">{data.sales_2_card.stats[0].label}</Typography>
                <Typography variant="body2">{data.sales_2_card.stats[0].value}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Expenses */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('expensesCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.expenses_2_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.expenses_2_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats', theme)}>
                <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '16px' }} />
                <Typography variant="body2">{data.expenses_2_card.growth}</Typography>
              </Box>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
                {data.expenses_2_card.chart.period}
              </Typography>
              <Box sx={getEcommerceStyle('expensesChart', theme)}>
                <ReactECharts option={expenses2ChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Top Products */}
          <Grid size={{ xs: 12, md: 8, lg: 8 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('topProductsCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.top_products_card.title}
              </Typography>
              <Box sx={getEcommerceStyle('productsList', theme)}>
                <Box sx={[getEcommerceStyle('productItem', theme), { header: true }]}>
                  {data.top_products_card.columns.map((column, index) => (
                    <Typography key={index} variant="body2">{column}</Typography>
                  ))}
                </Box>
                {data.top_products_card.products.map((product, index) => (
                  <Box key={index} sx={getEcommerceStyle('productItem', theme)}>
                    <Box display="flex" alignItems="center">
                      <Box sx={getEcommerceStyle('productIcon', theme)} />
                      <Typography variant="body2">{product.name}</Typography>
                    </Box>
                    <Typography variant="body2">{product.category}</Typography>
                    <Typography variant="body2">{product.payment}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: product.status === 'COMPLETED' || product.status === 'CONFIRMED' ? theme.palette.success.main : theme.palette.warning.main,
                      }}
                    >
                      {product.status}
                    </Typography>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Total Balance */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Paper sx={{ ...getEcommerceStyle('totalBalanceCard', theme), flexGrow: 1 }}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
                {data.total_balance_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
                {data.total_balance_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('totalBalanceStats', theme)}>
                <Box>
                  <Typography variant="body2">{data.total_balance_card.stats[0].label}</Typography>
                  <Typography variant="body2">{data.total_balance_card.stats[0].value}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">{data.total_balance_card.stats[1].label}</Typography>
                  <Typography variant="body2">{data.total_balance_card.stats[1].value}</Typography>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('totalBalanceChart', theme)}>
                <ReactECharts option={totalBalanceChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
              <Typography variant="body2" sx={getEcommerceStyle('totalBalanceNote', theme)}>
                {data.total_balance_card.note}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EcommercePage;