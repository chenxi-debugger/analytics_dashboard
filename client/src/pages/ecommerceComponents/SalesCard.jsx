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
import WalletIcon from '@mui/icons-material/AccountBalanceWallet'; // 替代图标

const SalesCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        flexGrow: 1,
        position: 'relative', 
        height:'209px',
      }}
    >
      {/* 右上角菜单按钮 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: 8, right: 8 }}>
        <IconButton aria-label="More options" onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Refresh</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Update</MenuItem>
        </Menu>
      </Box>

      {/* 图标 */}
      <Avatar
        variant="rounded"
        sx={{
          bgcolor: 'rgba(0, 184, 217, 0.12)',
          width: 44,
          height: 44,
        }}
      >
        <WalletIcon sx={{ color: '#00B8D9' }} />
      </Avatar>

      {/* 内容 */}
      <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
        Sales
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        $4,679
      </Typography>
      <Box display="flex" alignItems="center" gap={0.5}>
        <ArrowUpward sx={{ color: '#4CAF50', fontSize: 16 }} />
        <Typography variant="body2" fontWeight={600} color="#4CAF50">
          28.14%
        </Typography>
      </Box>
    </Paper>
  );
};

export default SalesCard;
