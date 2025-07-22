import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const ConversionRateCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const chartOption = {
    xAxis: { show: false, type: 'category', data: [1, 2, 3, 4, 5, 6, 7] },
    yAxis: { show: false },
    grid: { left: 3, right: 3, top: 7, bottom: 7 },
    series: [
      {
        data: [0, 2, 4, 2, 2, 4, 5],
        type: 'line',
        smooth: true,
        lineStyle: { width: 7, color: '#6366F1' },
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: { color: '#6366F1', borderColor: '#fff', borderWidth: 2 },
        
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
        gap: 1.5,
        position: 'relative',
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
      <Typography variant="h5" fontWeight={700} color="text.secondary">
        Conversion Rate
      </Typography>
      <Typography variant="body1" color="text.disabled">
        Compared To Last Month
      </Typography>

      {/* 主值 + 增长 */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h4" fontWeight={700}>8.72%</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <ArrowUpward sx={{ fontSize: 16, color: '#4CAF50' }} />
          <Typography variant="body2" color="#4CAF50" fontWeight={600}>+4.8%</Typography>
        </Box>
      </Box>

      {/* 四行小项 */}
      {[
        { label: 'Impressions', sub: '12.4k Visits', growth: '12.8%', up: true },
        { label: 'Added To Cart', sub: '32 Product in cart', growth: '-8.3%', up: false },
        { label: 'Checkout', sub: '21 Product checkout', growth: '9.12%', up: true },
        { label: 'Purchased', sub: '12 Orders', growth: '2.24%', up: true },
      ].map((item, i) => (
        <Box key={i} display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Box>
            <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
            <Typography variant="body2" color="text.secondary">{item.sub}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            {item.up ? (
              <ArrowUpward sx={{ fontSize: 16, color: '#4CAF50' }} />
            ) : (
              <ArrowDownward sx={{ fontSize: 16, color: '#F44336' }} />
            )}
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: item.up ? '#4CAF50' : '#F44336' }}
            >
              {item.growth}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* 折线图右上角 */}
      <Box
        sx={{
          position: 'absolute',
          top: 66,
          right: 26,
          width: 120,
          height: 60,
        }}
      >
        <ReactECharts option={chartOption} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Paper>
  );
};

export default ConversionRateCard;
