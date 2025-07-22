import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

  const PerformanceCard = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);  

  const chartOption = {
    tooltip: { show: false },
    legend: { show: false },
    radar: {
      indicator: [
        { name: 'Jan', max: 100 },
        { name: 'Feb', max: 100 },
        { name: 'Mar', max: 100 },
        { name: 'Apr', max: 100 },
        { name: 'May', max: 100 },
        { name: 'Jun', max: 100 },
      ],
      radius: '100%',
      splitLine: {
        lineStyle: {
          color: '#eee',
        },
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [70, 100, 80, 90, 70, 100],
            name: 'Income',
            areaStyle: {
              color: 'rgba(99, 102, 241, 0.5)',
            },
            lineStyle: {
              color: '#6366F1',
            },
            symbol: 'none',
          },
          {
            value: [50, 50, 100, 80, 100, 40],
            name: 'Earning',
            areaStyle: {
              color: 'rgba(34, 211, 238, 0.5)',
            },
            lineStyle: {
              color: '#22D3EE',
            },
            symbol: 'none',
          },
        ],
      },
    ],
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        position: 'relative',
        height:'430px',
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

      {/* Header */}
      <Typography variant="h5" fontWeight={700} color="text.secondary">
        Performance
      </Typography>

      {/* Stats */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">Earning: <b>$846.17</b></Typography>
        <Typography variant="body2">Sales: <b>25.7M</b></Typography>
      </Box>

      {/* Chart */}
      <Box sx={{ height: 340 }}>
        <ReactECharts option={chartOption} style={{ width: '100%', height: '100%' }} />
      </Box>

      {/* Legend */}
      <Stack direction="row" justifyContent="center" spacing={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: '#6366F1' }} />
          <Typography variant="body2" color="text.secondary">
            Income
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: '#22D3EE' }} />
          <Typography variant="body2" color="text.secondary">
            Earning
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PerformanceCard;