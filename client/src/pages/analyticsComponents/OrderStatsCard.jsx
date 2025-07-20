import React, { useMemo } from 'react'; // 添加 useMemo 优化性能
import { Box, Typography, Paper, Avatar, CircularProgress, IconButton, Stack, Grid } from '@mui/material';
import { MoreVert, Phone, Checkroom, Chair, SportsSoccer } from '@mui/icons-material';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';
import { getOrderChartOption } from './chartOptions'; // 导入 chartOptions.jsx
import ReactECharts from 'echarts-for-react';

const OrderStatsCard = ({ data, theme }) => {
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

  // 使用 useMemo 动态生成 chart option
  const orderChartOption = useMemo(() => getOrderChartOption(data, theme), [data, theme]);

  return (
    <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('orderStatsCard', theme)}>
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
          {/* 添加图表部分，假设 orderChart 已定义 */}
          <Box sx={getAnalyticsStyle('orderChart', theme)}>
            <ReactECharts option={orderChartOption} />
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default OrderStatsCard;