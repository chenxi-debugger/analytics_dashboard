import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { salesStatsChartOption } from '../CRMchartoptions';
import getCrmStyle from '../../styles/crmPageStyle';

const SalesStatsCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getCrmStyle('salesStatsCard', theme), flexGrow: 1 }}>
      <Typography variant="h6">{data.sales_stats_card.title}</Typography>
      <Box sx={getCrmStyle('salesStatsChart', theme)}>
        <ReactECharts option={salesStatsChartOption(theme)} style={{ height: '100px', width: '100px' }} />
        <Typography variant="h4" sx={getCrmStyle('statsValue', theme)}>
          {data.sales_stats_card.value}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box sx={getCrmStyle('legendDot', theme)} style={{ backgroundColor: theme.palette.success.main }} />
        <Typography variant="body2">{data.sales_stats_card.legend}</Typography>
      </Box>
      <Typography variant="body2">{data.sales_stats_card.description}</Typography>
    </Paper>
  );
};

export default SalesStatsCard;