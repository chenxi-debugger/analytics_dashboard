import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { ArrowUpward, MoreVert } from '@mui/icons-material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const TransactionsCard = () => {
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
        gap: 1.5,
        position: 'relative',
        height:'209px',
      }}
    >
      {/* 三点菜单 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <IconButton aria-label="More options" onClick={handleOpenMenu}>
          <MoreVert/>
        </IconButton>
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

      {/* 图标 */}
      <Avatar
        variant="rounded"
        sx={{
          bgcolor: 'rgba(103, 80, 164, 0.12)',
          width: 44,
          height: 44,
        }}
      >
        <CreditCardIcon sx={{ color: '#6750A4' }} />
      </Avatar>

      {/* 内容 */}
      <Typography variant="subtitle3" color="text.secondary" fontWeight={600}>
        Transactions
      </Typography>

      <Typography variant="h5" fontWeight={700}>
        $14,854
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <ArrowUpward sx={{ color: '#4CAF50', fontSize: 16 }} />
        <Typography variant="body2" fontWeight={700} color="#4CAF50">
          17.53%
        </Typography>
      </Box>
    </Paper>
  );
};

export default TransactionsCard;
