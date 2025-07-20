import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { overviewSalesChartOption } from '../CRMchartoptions';
import getCrmStyle from '../../styles/crmPageStyle';

const OverviewSalesCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getCrmStyle('overviewSalesCard', theme), flexGrow: 1 }}>
      <Box sx={getCrmStyle('overviewSalesHeader', theme)}>
        <Typography variant="h6">{data.overview_sales_card.title}</Typography>
        <Typography variant="body2">{data.overview_sales_card.description}</Typography>
      </Box>
      <Box sx={getCrmStyle('overviewSalesStats', theme)}>
        <Box>
          <Typography variant="body2">{data.overview_sales_card.title}</Typography>
          <Typography variant="h4">$1,286</Typography>
        </Box>
        <Box>
          <Typography variant="body2">{data.sessions_card.title}</Typography>
          <Typography variant="h4">{data.sessions_card.value}</Typography>
          <Box display="flex" alignItems="center">
            <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '12px' }} />
            <Typography variant="body2">13.24%</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={getCrmStyle('overviewSalesChart', theme)}>
        <ReactECharts option={overviewSalesChartOption(theme)} style={{ height: '90px', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default OverviewSalesCard;