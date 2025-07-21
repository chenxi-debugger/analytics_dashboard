import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const ReportCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('reportCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
        {data.description}
      </Typography>
      <Box sx={getEcommerceStyle('reportItem', theme)}>
        <Typography variant="body2">{data.items[0].label}</Typography>
        <Typography variant="body2">{data.items[0].value}</Typography>
        <Box sx={getEcommerceStyle('reportGrowth', theme)}>
          <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
          <Typography variant="body2">{data.items[0].growth}</Typography>
        </Box>
      </Box>
      <Box sx={getEcommerceStyle('reportItem', theme)}>
        <Typography variant="body2">{data.items[1].label}</Typography>
        <Typography variant="body2">{data.items[1].value}</Typography>
        <Box sx={getEcommerceStyle('reportGrowth', theme)}>
          <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '16px' }} />
          <Typography variant="body2">{data.items[1].growth}</Typography>
        </Box>
      </Box>
      <Box sx={getEcommerceStyle('reportItem', theme)}>
        <Typography variant="body2">{data.items[2].label}</Typography>
        <Typography variant="body2">{data.items[2].value}</Typography>
        <Box sx={getEcommerceStyle('reportGrowth', theme)}>
          <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '16px' }} />
          <Typography variant="body2">{data.items[2].growth}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ReportCard;