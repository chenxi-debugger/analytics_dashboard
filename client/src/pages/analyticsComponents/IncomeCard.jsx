import React, { useMemo } from 'react';
import { Box, Typography, Paper, Stack, Grid } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';
import ReactECharts from 'echarts-for-react';

const IncomeCard = ({ data, theme, selectedTab, setSelectedTab }) => {
  // 使用 useMemo 动态生成 chart option
  const incomeChartOption = useMemo(() => ({
    xAxis: {
      type: 'category',
      data: data?.income_card?.[selectedTab.toLowerCase()]?.chart?.xAxis || [],
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
        data: data?.income_card?.[selectedTab.toLowerCase()]?.chart?.data || [],
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
  }), [data, selectedTab, theme]);

  return (
    <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('incomeCard', theme)}>
        <Stack spacing={1}>
          <Box sx={getAnalyticsStyle('incomeTabs', theme)}>
            {data?.income_card?.tabs?.map((tab, index) => (
              <Typography
                key={index}
                variant="button"
                sx={selectedTab === tab ? [getAnalyticsStyle('incomeTabTypographyButton', theme), getAnalyticsStyle('incomeActiveTab', theme)] : getAnalyticsStyle('incomeTabTypographyButton', theme)}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </Typography>
            ))}
          </Box>
          <Typography variant="h6" sx={getAnalyticsStyle('incomeTypographyH6', theme)}>
            {data?.income_card?.[selectedTab.toLowerCase()]?.title || 'No Data'}
          </Typography>
          <Typography variant="h4" sx={getAnalyticsStyle('incomeValue', theme)}>
            {data?.income_card?.[selectedTab.toLowerCase()]?.value || '0'}
          </Typography>
          <Typography variant="body2" sx={getAnalyticsStyle('incomeStats', theme)}>
            <ArrowDownward sx={{ color: theme.palette.error.main }} /> 6.5% less than last week
          </Typography>
          <Box sx={getAnalyticsStyle('incomeChart', theme)}>
            <ReactECharts option={incomeChartOption} />
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default IncomeCard;