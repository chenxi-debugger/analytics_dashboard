import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  Stack,
  CircularProgress,
} from '@mui/material';
import { MoreVert, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../styles/ecommercepageStyle';

const EcommercePage = () => {
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
        data: data.new_visitors_card.chart.data,
        barWidth: 6,
        itemStyle: { color: '#ff9f43', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const activityChartOption = {
    xAxis: {
      type: 'category',
      data: data.activity_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
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
        lineStyle: { color: '#28c76f', width: 2 },
        itemStyle: { color: '#28c76f' },
        showSymbol: false,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const profitChartOption = {
    xAxis: {
      type: 'category',
      data: data.profit_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
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
        itemStyle: { color: '#28c76f', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const totalIncomeChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_income_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}k', color: '#6e6b7b', fontSize: 10 },
      splitLine: { lineStyle: { color: '#e0e0e0' } },
    },
    series: [
      {
        data: data.total_income_card.chart.data,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#7367f0', width: 2 },
        areaStyle: { color: 'rgba(115, 103, 240, 0.1)' },
        itemStyle: { color: '#7367f0' },
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
          { name: 'Expenses', value: 72, itemStyle: { color: '#ff9f43' } },
          { name: 'Remaining', value: 28, itemStyle: { color: '#e0e0e0' } },
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
      axisName: { color: '#6e6b7b', fontSize: 10 },
      splitLine: { lineStyle: { color: '#e0e0e0' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data.performance_card.chart.data[0].values,
            name: 'Income',
            areaStyle: { color: 'rgba(115, 103, 240, 0.2)' },
            lineStyle: { color: '#7367f0', width: 2 },
            itemStyle: { color: '#7367f0' },
          },
          {
            value: data.performance_card.chart.data[1].values,
            name: 'Earning',
            areaStyle: { color: 'rgba(0, 207, 232, 0.2)' },
            lineStyle: { color: '#00cfe8', width: 2 },
            itemStyle: { color: '#00cfe8' },
          },
        ],
      },
    ],
  };

  const conversionRateChartOption = {
    xAxis: {
      type: 'category',
      data: data.conversion_rate_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
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
        lineStyle: { color: '#28c76f', width: 2 },
        itemStyle: { color: '#28c76f' },
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
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
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
        itemStyle: { color: '#7367f0', borderRadius: 4 },
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  const totalBalanceChartOption = {
    xAxis: {
      type: 'category',
      data: data.total_balance_card.chart.xAxis,
      axisLabel: { color: '#6e6b7b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#e0e0e0' } },
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
        lineStyle: { color: '#ff9f43', width: 2 },
        itemStyle: { color: '#ff9f43' },
        showSymbol: true,
        symbolSize: 8,
      },
    ],
    grid: { left: 5, right: 5, top: 5, bottom: 15 },
  };

  return (
    <Box sx={getEcommerceStyle('ecommerceMain')}>
      <Box sx={getEcommerceStyle('ecommerceContent')}>
        <Grid container spacing={2}>
          {/* Congratulations Banner */}
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('congratulationsCard')}>
              <Box sx={getEcommerceStyle('congratulationsContent')}>
                <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                  {data.congratulations_card.title} 🎉
                </Typography>
                <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                  {data.congratulations_card.message}
                </Typography>
                <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                  {data.congratulations_card.value}
                </Typography>
                <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                  {data.congratulations_card.target}
                </Typography>
                <Box sx={getEcommerceStyle('congratulationsAction')}>
                  <Typography variant="button">{data.congratulations_card.action}</Typography>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('congratulationsImage')}>
                <img src="/congratulations-image.png" alt="Congratulations" />
              </Box>
            </Paper>
          </Grid>

          {/* New Visitors */}
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('newVisitorsCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.new_visitors_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('visitorsValue')}>
                {data.new_visitors_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('visitorsStats')}>
                <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                <Typography variant="body2">{data.new_visitors_card.growth}</Typography>
              </Box>
              <Box sx={getEcommerceStyle('newVisitorsChart')}>
                <ReactECharts option={newVisitorsChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Activity */}
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('activityCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.activity_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('activityValue')}>
                {data.activity_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('activityStats')}>
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                <Typography variant="body2">{data.activity_card.growth}</Typography>
              </Box>
              <Box sx={getEcommerceStyle('activityChart')}>
                <ReactECharts option={activityChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Sales */}
          <Grid item xs={12} md={2}>
            <Paper sx={getEcommerceStyle('salesCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.sales_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.sales_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats')}>
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                <Typography variant="body2">{data.sales_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Profit */}
          <Grid item xs={12} md={2}>
            <Paper sx={getEcommerceStyle('profitCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.profit_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.profit_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('newVisitorsChart')}>
                <ReactECharts option={profitChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Total Income */}
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('totalIncomeCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.total_income_card.title}
              </Typography>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                {data.total_income_card.description}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.total_income_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('totalIncomeChart')}>
                <ReactECharts option={totalIncomeChartOption} style={{ height: '120px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Report */}
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('reportCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.report_card.title}
              </Typography>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                {data.report_card.description}
              </Typography>
              <Box sx={getEcommerceStyle('reportItem')}>
                <Typography variant="body2">{data.report_card.items[0].label}</Typography>
                <Typography variant="body2">{data.report_card.items[0].value}</Typography>
                <Box sx={getEcommerceStyle('reportGrowth')}>
                  <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                  <Typography variant="body2">{data.report_card.items[0].growth}</Typography>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('reportItem')}>
                <Typography variant="body2">{data.report_card.items[1].label}</Typography>
                <Typography variant="body2">{data.report_card.items[1].value}</Typography>
                <Box sx={getEcommerceStyle('reportGrowth')}>
                  <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                  <Typography variant="body2">{data.report_card.items[1].growth}</Typography>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('reportItem')}>
                <Typography variant="body2">{data.report_card.items[2].label}</Typography>
                <Typography variant="body2">{data.report_card.items[2].value}</Typography>
                <Box sx={getEcommerceStyle('reportGrowth')}>
                  <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                  <Typography variant="body2">{data.report_card.items[2].growth}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Expenses */}
          <Grid item xs={12} md={2}>
            <Paper sx={getEcommerceStyle('expensesCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.expenses_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.expenses_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('expensesChart')}>
                <ReactECharts option={expensesChartOption} style={{ height: '100px', width: '100px' }} />
              </Box>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                {data.expenses_card.additional_info}
              </Typography>
            </Paper>
          </Grid>

          {/* Transactions */}
          <Grid item xs={12} md={2}>
            <Paper sx={getEcommerceStyle('transactionsCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.transactions_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.transactions_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats')}>
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                <Typography variant="body2">{data.transactions_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Performance */}
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('performanceCard')}>
              <Box sx={getEcommerceStyle('performanceHeader')}>
                <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                  {data.performance_card.title}
                </Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Box sx={getEcommerceStyle('performanceStats')}>
                <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                  {data.performance_card.stats[0].label}: {data.performance_card.stats[0].value}
                </Typography>
                <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                  {data.performance_card.stats[1].label}: {data.performance_card.stats[1].value}
                </Typography>
              </Box>
              <Box sx={getEcommerceStyle('performanceChart')}>
                <ReactECharts option={performanceChartOption} style={{ height: '180px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Conversion Rate */}
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('conversionRateCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.conversion_rate_card.title}
              </Typography>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                {data.conversion_rate_card.description}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.conversion_rate_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('conversionRateStats')}>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[0].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[0].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">{data.conversion_rate_card.stats[0].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[1].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[1].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowDownward sx={{ color: '#ea5455', fontSize: '12px' }} />
                    <Typography variant="body2">{data.conversion_rate_card.stats[1].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[2].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[2].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">{data.conversion_rate_card.stats[2].growth}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2">{data.conversion_rate_card.stats[3].label}</Typography>
                  <Typography variant="body2">{data.conversion_rate_card.stats[3].value}</Typography>
                  <Box display="flex" alignItems="center">
                    <ArrowUpward sx={{ color: '#28c76f', fontSize: '12px' }} />
                    <Typography variant="body2">{data.conversion_rate_card.stats[3].growth}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('conversionRateChart')}>
                <ReactECharts option={conversionRateChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Revenue */}
          <Grid item xs={12} md={2}>
            <Paper sx={getEcommerceStyle('revenueCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.revenue_2_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.revenue_2_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats')}>
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                <Typography variant="body2">{data.revenue_2_card.growth}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Sales */}
          <Grid item xs={12} md={2}>
            <Paper sx={getEcommerceStyle('salesCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.sales_2_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.sales_2_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats')}>
                <ArrowUpward sx={{ color: '#28c76f', fontSize: '16px' }} />
                <Typography variant="body2">{data.sales_2_card.growth}</Typography>
              </Box>
              <Box sx={getEcommerceStyle('salesStats')}>
                <Typography variant="body2">{data.sales_2_card.stats[0].label}</Typography>
                <Typography variant="body2">{data.sales_2_card.stats[0].value}</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Expenses */}
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('expensesCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.expenses_2_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.expenses_2_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('salesStats')}>
                <ArrowDownward sx={{ color: '#ea5455', fontSize: '16px' }} />
                <Typography variant="body2">{data.expenses_2_card.growth}</Typography>
              </Box>
              <Typography variant="body2" sx={getEcommerceStyle('typographyBody2')}>
                {data.expenses_2_card.chart.period}
              </Typography>
              <Box sx={getEcommerceStyle('expensesChart')}>
                <ReactECharts option={expenses2ChartOption} style={{ height: '60px', width: '100%' }} />
              </Box>
            </Paper>
          </Grid>

          {/* Top Products */}
          <Grid item xs={12} md={8}>
            <Paper sx={getEcommerceStyle('topProductsCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.top_products_card.title}
              </Typography>
              <Box sx={getEcommerceStyle('productsList')}>
                <Box sx={[getEcommerceStyle('productItem'), { header: true }]}>
                  {data.top_products_card.columns.map((column, index) => (
                    <Typography key={index} variant="body2">{column}</Typography>
                  ))}
                </Box>
                {data.top_products_card.products.map((product, index) => (
                  <Box key={index} sx={getEcommerceStyle('productItem')}>
                    <Box display="flex" alignItems="center">
                      <Box sx={getEcommerceStyle('productIcon')} style={{ backgroundColor: '#e0e0e0' }} />
                      <Typography variant="body2">{product.name}</Typography>
                    </Box>
                    <Typography variant="body2">{product.category}</Typography>
                    <Typography variant="body2">{product.payment}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: product.status === 'COMPLETED' || product.status === 'CONFIRMED' ? '#28c76f' : '#ff9f43',
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
          <Grid item xs={12} md={4}>
            <Paper sx={getEcommerceStyle('totalBalanceCard')}>
              <Typography variant="h6" sx={getEcommerceStyle('typographyH6')}>
                {data.total_balance_card.title}
              </Typography>
              <Typography variant="h4" sx={getEcommerceStyle('typographyH4')}>
                {data.total_balance_card.value}
              </Typography>
              <Box sx={getEcommerceStyle('totalBalanceStats')}>
                <Box>
                  <Typography variant="body2">{data.total_balance_card.stats[0].label}</Typography>
                  <Typography variant="body2">{data.total_balance_card.stats[0].value}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">{data.total_balance_card.stats[1].label}</Typography>
                  <Typography variant="body2">{data.total_balance_card.stats[1].value}</Typography>
                </Box>
              </Box>
              <Box sx={getEcommerceStyle('totalBalanceChart')}>
                <ReactECharts option={totalBalanceChartOption} style={{ height: '90px', width: '100%' }} />
              </Box>
              <Typography variant="body2" sx={getEcommerceStyle('totalBalanceNote')}>
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