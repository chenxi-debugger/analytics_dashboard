import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useTheme, Grid } from '@mui/material';
import getEcommerceStyle from '../styles/ecommercepageStyle';
import CongratulationsCard from './ecommerceComponents/CongratulationsCard'
import NewVisitorsCard from './ecommerceComponents/NewVisitorsCard';
import ActivityCard from './ecommerceComponents/ActivityCard';
import SalesCard from './ecommerceComponents/SalesCard';
import ProfitCard from './ecommerceComponents/ProfitCard';
import TotalIncomeCard from './ecommerceComponents/TotalIncomeCard';
import ReportCard from './ecommerceComponents/ReportCard';
import ExpensesCard from './ecommerceComponents/ExpensesCard';
import TransactionsCard from './ecommerceComponents/TransactionsCard';
import PerformanceCard from './ecommerceComponents/PerformanceCard';
import ConversionRateCard from './ecommerceComponents/ConversionRateCard';
import RevenueCard from './ecommerceComponents/RevenueCard';
import Sales2Card from './ecommerceComponents/Sales2Card';
import Expenses2Card from './ecommerceComponents/Expenses2Card';
import TopProductsCard from './ecommerceComponents/TopProductsCard';
import TotalBalanceCard from './ecommerceComponents/TotalBalanceCard';


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
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <CongratulationsCard data={data.congratulations_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <NewVisitorsCard
              data={data.new_visitors_card}
              theme={theme}
              chartOption={newVisitorsChartOption}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <ActivityCard
              data={data.activity_card}
              theme={theme}
              chartOption={activityChartOption}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <SalesCard data={data.sales_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <ProfitCard
              data={data.profit_card}
              theme={theme}
              chartOption={profitChartOption}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <TotalIncomeCard
              data={data.total_income_card}
              theme={theme}
              chartOption={totalIncomeChartOption}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <ReportCard data={data.report_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <ExpensesCard
              data={data.expenses_card}
              theme={theme}
              chartOption={expensesChartOption}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <TransactionsCard data={data.transactions_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <PerformanceCard
              data={data.performance_card}
              theme={theme}
              chartOption={performanceChartOption}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <ConversionRateCard
              data={data.conversion_rate_card}
              theme={theme}
              chartOption={conversionRateChartOption}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <RevenueCard data={data.revenue_2_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <Sales2Card data={data.sales_2_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <Expenses2Card
              data={data.expenses_2_card}
              theme={theme}
              chartOption={expenses2ChartOption}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 8 }} sx={{ display: 'flex' }}>
            <TopProductsCard data={data.top_products_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <TotalBalanceCard
              data={data.total_balance_card}
              theme={theme}
              chartOption={totalBalanceChartOption}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EcommercePage;