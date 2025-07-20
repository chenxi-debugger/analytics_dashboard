import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { earningReportChartOption } from '../CRMchartoptions';
import getCrmStyle from '../../styles/crmPageStyle';

const EarningReportCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getCrmStyle('earningReportCard', theme), flexGrow: 1 }}>
      <Box sx={getCrmStyle('earningReportHeader', theme)}>
        <Typography variant="h6">{data.earning_report_card.stats[0].label}</Typography>
        <Typography variant="body2">{data.earning_report_card.description}</Typography>
      </Box>
      <Box sx={getCrmStyle('earningReportStats', theme)}>
        <Box>
          <Typography variant="body2">{data.earning_report_card.stats[0].value}</Typography>
          <Box display="flex" alignItems="center">
            <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
            <Typography variant="body2">{data.earning_report_card.stats[0].growth}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default EarningReportCard;