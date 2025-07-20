import React from 'react';
import { Box, Typography, Paper, Select, MenuItem } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { salesAnalyticsChartOption } from '../CRMchartoptions';
import getCrmStyle from '../../styles/crmPageStyle';

const SalesAnalyticsCard = ({ data, theme, salesAnalyticsYear, setSalesAnalyticsYear }) => {
  return (
    <Paper sx={{ ...getCrmStyle('salesAnalyticsCard', theme), flexGrow: 1 }}>
      <Box sx={getCrmStyle('salesAnalyticsHeader', theme)}>
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
      <Box sx={getCrmStyle('salesAnalyticsChart', theme)}>
        <ReactECharts option={salesAnalyticsChartOption(salesAnalyticsYear, theme)} style={{ height: '200px', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default SalesAnalyticsCard;