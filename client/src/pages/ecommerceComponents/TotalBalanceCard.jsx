import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { ArrowForward, Wallet, Payments, MoreVert } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const TotalBalanceCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const chartOption = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#999',
        fontSize: 14,
      },
    },
    yAxis: { show: false },
    grid: { left: 0, right: 0, top: 20, bottom: 20 },
    series: [
      {
        data: [1.8, 2.4, 2.0, 2.8, 2.3, 3.5],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#F59E0B',
          width: 7,
        },
        symbol: 'circle',
        symbolSize: 15,
        itemStyle: {
          color: '#F59E0B',
          borderColor: '#fff',
          borderWidth: 2,
        },
        areaStyle: {
          color: 'rgba(245, 158, 11, 0.1)',
        },
      },
    ],
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        flexGrow: 1,
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
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Last Week</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Last Month</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Last Year</MenuItem>
        </Menu>
      </Box>

      {/* 标题 */}
      <Typography variant="h5" fontWeight={600} color="text.secondary">
        Total Balance
      </Typography>

            {/* 钱包 + Paypal */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
            <Wallet sx={{ color: '#F59E0B', fontSize: '44px' }} />
            <Box>
            <Typography fontWeight={700} sx={{ fontSize: '20px' }}>$2.54k</Typography>
            <Typography variant="body2" color="text.secondary">Wallet</Typography>
            </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
            <Payments sx={{ color: '#9CA3AF', fontSize: '44px' }} />
            <Box>
            <Typography fontWeight={700} sx={{ fontSize: '20px' }}>$4.21k</Typography>
            <Typography variant="body2" color="text.secondary">Paypal</Typography>
            </Box>
        </Stack>
        </Box>


      {/* 折线图 */}
      <Box sx={{ height: 200 }}>
        <ReactECharts option={chartOption} style={{ width: '100%', height: '100%' }} />
      </Box>

      {/* 底部说明 + 箭头 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          borderRadius: '8px',
          mt: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          You have done 57.6% more sales.
          Check your new badge in your profile.
        </Typography>
        <IconButton>
          <ArrowForward fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TotalBalanceCard;
