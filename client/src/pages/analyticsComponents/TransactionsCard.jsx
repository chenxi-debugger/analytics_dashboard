import React from 'react';
import { Box, Typography, IconButton, Grid, Paper, Menu, MenuItem, Stack } from '@mui/material';
import { MoreVert, AccountBalanceWallet, Fastfood, CreditCard, LocalCafe } from '@mui/icons-material'; // 添加更多图标
import getAnalyticsStyle from '../../styles/analyticsPageStyle';

const TransactionsCard = ({ data, theme, salesAnchorEl, handleOpenMenu, handleCloseMenu, setSalesAnchorEl }) => {
  // 自定义图标映射，根据交易类型选择图标
  const getTransactionIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'paypal':
        return <img src="/paypal.png" alt="Paypal" style={{ width: '40px', height: '40px' }} />;
      case 'wallet':
        return <AccountBalanceWallet sx={{ fontSize: '40px', color: '#4CAF50' }} />;
      case 'mac\'d':
      case 'starbucks':
        return <LocalCafe sx={{ fontSize: '40px', color: '#FF9800' }} />; // 使用咖啡杯图标代表 Starbucks/Mac'D
      case 'ordered food':
        return <Fastfood sx={{ fontSize: '40px', color: '#FF5722' }} />;
      case 'credit card':
      case 'mastercard':
        return <CreditCard sx={{ fontSize: '40px', color: '#2196F3' }} />;
      default:
        return <Box sx={{ width: '40px', height: '40px', backgroundColor: '#757575' }} />; // 默认颜色块
    }
  };

  // 手动定义交易数据（替换或补充 data.transactions_card.list）
  const transactions = [
    { type: 'Paypal', description: 'sendmoney', value: '+82.6 USD', color: '#2196F3' },
    { type: 'Wallet', description: 'Mac\'D', value: '+270.69 USD', color: '#4CAF50' },
    { type: 'Paypal', description: 'Refund', value: '+637.91 USD', color: '#4CAF50' },
    { type: 'Credit Card', description: 'Ordered Food', value: '-838.71 USD', color: '#F44336' },
    { type: 'Wallet', description: 'Starbucks', value: '+203.33 USD', color: '#FF9800' },
    { type: 'Mastercard', description: 'Ordered Food', value: '-92.45 USD', color: '#F44336' },
  ];

  return (
    <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('orderStatsCard', theme)}>
        <Box sx={getAnalyticsStyle('orderStatsHeader', theme)}>
          <Typography variant="h6" sx={getAnalyticsStyle('orderStatsTypographyH6', theme)}>
            {data.transactions_card.title}
          </Typography>
          <IconButton aria-label="More options" onClick={(event) => handleOpenMenu(event, setSalesAnchorEl)}>
            <MoreVert />
          </IconButton>
        </Box>
        <Box>
          {transactions.map((transaction, index) => (
            <Box key={index} sx={getAnalyticsStyle('orderStatsItem', theme)}>
              <Box sx={getAnalyticsStyle('orderStatsIcon', theme)}>
                {getTransactionIcon(transaction.type)}
              </Box>
              <Stack direction="column" spacing={1.1} sx={{ flexGrow: 1, ml: 1 }}>
                <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>{transaction.type}</Typography>
                <Typography variant="caption" sx={getAnalyticsStyle('orderStatsItemTypographyCaption', theme)}>{transaction.description}</Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={[getAnalyticsStyle('orderStatsItemTypographyBody2', theme), { fontWeight: 600, color: transaction.value.startsWith('-') ? '#F44336' : '#4CAF50' }]}
              >
                {transaction.value}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <Menu
            anchorEl={salesAnchorEl}
            open={Boolean(salesAnchorEl)}
            onClose={() => handleCloseMenu(setSalesAnchorEl)}
          >
            <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Refresh</MenuItem>
            <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Share</MenuItem>
            <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Update</MenuItem>
          </Menu>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TransactionsCard;