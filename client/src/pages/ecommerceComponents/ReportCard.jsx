import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert } from '@mui/icons-material';
import PaymentIcon from '@mui/icons-material/Payment';
import LockIcon from '@mui/icons-material/Lock';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';

const ReportCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        height:'444px',
      }}
    >
      {/* 三点菜单 */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <IconButton aria-label="More options" onClick={handleOpenMenu}>
          <MoreVert/>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Last Week</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Last Month</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Last Year</MenuItem>
        </Menu>
      </Box>

      {/* 标题 */}
      <Typography variant="h5" fontWeight={700} color="text.secondary">
        Report
      </Typography>
      <Typography variant="body1" color="text.disabled">
        Monthly Avg. $45.578k
      </Typography>

      {/* 每一行 */}
      {[
        {
          label: 'Income',
          icon: <PaymentIcon sx={{ color: '#6366F1' }} />,
          bgcolor: 'rgba(36, 36, 75, 0.1)',
          value: '$42,845',
          growth: '+2.7k',
          growthColor: '#4CAF50',
          arrow: <ArrowUpward fontSize="small" sx={{ color: '#4CAF50' }} />,
        },
        {
          label: 'Expense',
          icon: <LockIcon sx={{ color: '#F44336' }} />,
          bgcolor: 'rgba(244, 67, 54, 0.1)',
          value: '$38,658',
          growth: '-1.15k',
          growthColor: '#F44336',
          arrow: <ArrowDownward fontSize="small" sx={{ color: '#F44336' }} />,
        },
        {
          label: 'Profit',
          icon: <WalletIcon sx={{ color: '#00B8D9' }} />,
          bgcolor: 'rgba(0, 184, 217, 0.1)',
          value: '$18,220',
          growth: '+1.34k',
          growthColor: '#4CAF50',
          arrow: <ArrowUpward fontSize="small" sx={{ color: '#4CAF50' }} />,
        },
      ].map((item, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#F9FAFB',
            p: 2.5,
            borderRadius: '10px',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar variant="rounded" sx={{ bgcolor: item.bgcolor, width: 44, height: 44 }}>
              {item.icon}
            </Avatar>
            <Box>
              <Typography variant="body1" fontWeight={600}>
                {item.label}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {item.value}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {item.arrow}
            <Typography variant="body1" fontWeight={600} sx={{ color: item.growthColor }}>
              {item.growth}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default ReportCard;
