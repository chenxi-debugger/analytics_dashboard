import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { generatedLeadsChartOption } from '../CRMchartoptions';
import getCrmStyle from '../../styles/crmPageStyle';

const GeneratedLeadsCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getCrmStyle('generatedLeadsCard', theme), flexGrow: 1 }}>
      <Typography variant="h6">{data.generated_leads_card.title}</Typography>
      <Typography variant="body2">{data.generated_leads_card.description}</Typography>
      <Box sx={getCrmStyle('generatedLeadsChart', theme)}>
        <ReactECharts option={generatedLeadsChartOption(theme)} style={{ height: '100px', width: '100px' }} />
        <Typography variant="h4" sx={getCrmStyle('leadsValue', theme)}>
          {data.generated_leads_card.value}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
        <Typography variant="body2">{data.generated_leads_card.growth}</Typography>
      </Box>
    </Paper>
  );
};

export default GeneratedLeadsCard;