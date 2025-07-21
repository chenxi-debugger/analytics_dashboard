// src/pages/CRMcomponents/OrdersCard.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, ArrowDownward } from '@mui/icons-material';
import getCrmStyle from '../../styles/crmPageStyle';

const OrdersCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ ...getCrmStyle('ordersCard', theme), flexGrow: 1, p: 2, borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box>
          <img src="/order-icon.png" alt="order" style={{ width: '40px' }} />
        </Box>
        <IconButton aria-label="More options" onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Box>
      <Typography variant="h6" sx={{ fontSize: '20px', color: 'grey' }} >Orders</Typography>
      <Typography variant="h4" sx={{ fontSize: '1.75rem', fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
        $1,286
      </Typography>
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.error.main }}>
        <ArrowDownward sx={{ fontSize: '24px', color: theme.palette.error.main }} /> -13.24%
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Refresh</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Update</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default OrdersCard;