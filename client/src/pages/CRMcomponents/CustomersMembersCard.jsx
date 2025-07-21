import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import getCrmStyle from '../../styles/crmPageStyle';

const customers = [
  {
    name: 'Henry Barnes',
    email: 'jok@puc.co.uk',
    amount: '$459.65',
    status: 'PAID',
    statusColor: '#d4f5dd',
    method: '/mastercard.png',
    avatar: '/1.png',
  },
  {
    name: 'Herman Holland',
    email: 'sami@lelo.com',
    amount: '$93.81',
    status: 'PENDING',
    statusColor: '#ffeacc',
    method: '/visa.png',
    avatar: '/2.png',
  },
  {
    name: 'Hallie Warner',
    email: 'initus@odemi.com',
    amount: '$934.34',
    status: 'PENDING',
    statusColor: '#ffeacc',
    method: '/visa.png',
    avatar: '/3.png',
  },
  {
    name: 'John Davidson',
    email: 'tum@upkesja.gov',
    amount: '$794.97',
    status: 'PAID',
    statusColor: '#d4f5dd',
    method: '/paypal1.png',
    avatar: '/4.png',
  },
  {
    name: 'Cora Schmidt',
    email: 'wipare@tin.com',
    amount: '$19.49',
    status: 'PAID',
    statusColor: '#d4f5dd',
    method: '/mastercard.png',
    avatar: '/5.png',
  },
  {
    name: 'Betty Ross',
    email: 'nur@kaomor.edu',
    amount: '$636.27',
    status: 'FAILED',
    statusColor: '#ffe3e1',
    method: '/paypal1.png',
    avatar: '/6.png',
  },
];

const CustomersMembersCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Paper
      sx={{
        ...getCrmStyle('salesStatsCard', theme),
        p: 3,
        borderRadius: '10px',
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height:'440px',
      }}
    >
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 500,
          fontSize: '13px',
          color: theme.palette.text.secondary,
          px: 1,
        }}
      >
        <Box sx={{ flex: 2 }}>CUSTOMER</Box>
        <Box sx={{ flex: 1 }}>AMOUNT</Box>
        <Box sx={{ flex: 1 }}>STATUS</Box>
        <Box sx={{ flex: 1 }}>PAID BY</Box>
        <Box sx={{ flex: 0.5 }}>ACTIONS</Box>
      </Box>

      {/* Data Rows */}
      {customers.map((cust, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
            px: 1,
            borderBottom: index !== customers.length - 1 ? '1px solid #f0f0f0' : 'none',
          }}
        >
          {/* Customer Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
            <Avatar src={cust.avatar} alt={cust.name} sx={{ width: 40, height: 40, mr: 1.5 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>{cust.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {cust.email}
              </Typography>
            </Box>
          </Box>

          {/* Amount */}
          <Typography variant="body2" sx={{ flex: 1 }}>
            {cust.amount}
          </Typography>

          {/* Status */}
          <Box
            sx={{
              flex: 1,
              bgcolor: cust.statusColor,
              px: 0,
              py: 0.5,
              borderRadius: '10px',
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: 600,
              color:
                cust.status === 'PAID'
                  ? theme.palette.success.main
                  : cust.status === 'PENDING'
                  ? theme.palette.warning.main
                  : theme.palette.error.main,
            }}
          >
            {cust.status}
          </Box>

          {/* Paid By */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <img src={cust.method} alt="method" style={{ height: 35 }} />
          </Box>

          {/* Action */}
          <Box sx={{ flex: 0.5 }}>
            <IconButton onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
      ))}

      {/* Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Refresh</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Update</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default CustomersMembersCard;
