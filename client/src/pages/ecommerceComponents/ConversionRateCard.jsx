import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const ConversionRateCard = ({ data, theme, chartOption }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('conversionRateCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
        {data.description}
      </Typography>
      <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
        {data.value}
      </Typography>
      <Box sx={getEcommerceStyle('conversionRateStats', theme)}>
        <Box>
          <Typography variant="body2">{data.stats[0].label}</Typography>
          <Typography variant="body2">{data.stats[0].value}</Typography>
          <Box display="flex" alignItems="center">
            <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
            <Typography variant="body2">{data.stats[0].growth}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">{data.stats[1].label}</Typography>
          <Typography variant="body2">{data.stats[1].value}</Typography>
          <Box display="flex" alignItems="center">
            <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '12px' }} />
            <Typography variant="body2">{data.stats[1].growth}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">{data.stats[2].label}</Typography>
          <Typography variant="body2">{data.stats[2].value}</Typography>
          <Box display="flex" alignItems="center">
            <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
            <Typography variant="body2">{data.stats[2].growth}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">{data.stats[3].label}</Typography>
          <Typography variant="body2">{data.stats[3].value}</Typography>
          <Box display="flex" alignItems="center">
            <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
            <Typography variant="body2">{data.stats[3].growth}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={getEcommerceStyle('conversionRateChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '90px', width: '100%' }} />
      </Box>
    </Paper>
  );
};

export default ConversionRateCard;