import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Stack,
} from '@mui/material';
import { MoreVert, ArrowUpward, DesktopMac } from '@mui/icons-material';

const RevenueCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        flexGrow: 1,
        position: 'relative',
        height:"200px",
      }}
    >
      {/* 右上角菜单 */}
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
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Refresh</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Update</MenuItem>
        </Menu>
      </Box>

      {/* 图标 + 文本 */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          sx={{
            bgcolor: '#FCD34D',
            width: 44,
            height: 44,
          }}
        >
          <DesktopMac sx={{ color: '#fff' }} />
        </Avatar>
      </Stack>

      <Typography variant="h6" color="text.secondary" fontWeight={600}>
        Revenue
      </Typography>

      <Typography variant="h5" fontWeight={700}>
        $42,389
      </Typography>

      <Box display="flex" alignItems="center" gap={0.5}>
        <ArrowUpward sx={{ color: '#4CAF50', fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
          52.76%
        </Typography>
      </Box>
    </Paper>
  );
};

export default RevenueCard;
