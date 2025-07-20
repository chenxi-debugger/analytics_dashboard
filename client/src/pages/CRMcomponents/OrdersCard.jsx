// src/pages/CRMcomponents/OrdersCard.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import getCrmStyle from '../../styles/crmPageStyle';

const OrdersCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getCrmStyle('ordersCard', theme), flexGrow: 1 }}>
      <Typography variant="h6">{data.orders_card.title}</Typography>
      <Typography variant="h4">{data.orders_card.value}</Typography>
      <Box display="flex" alignItems="center">
        <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '12px' }} />
        <Typography variant="body2">{data.orders_card.growth}</Typography>
      </Box>
    </Paper>
  );
};

export default OrdersCard;