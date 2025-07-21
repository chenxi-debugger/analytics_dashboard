import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { MoreVert, ArrowUpward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../../styles/crmPageStyle';

const SessionsCard = ({ theme }) => {
  const chartRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const value = '2845';

  const chartOption = {
    backgroundColor: 'transparent',
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
        axisLine: { show: false },       // 隐藏 y 轴线
        axisTick: { show: false },       // 隐藏刻度线
        axisLabel: { show: false },      // 隐藏刻度文字
        splitLine: { show: false },      // 隐藏网格线
      },
    series: [
      {
        name: 'Sessions',
        type: 'bar',
        data: [120, 200, 250, 180, 260, 220, 190],
        itemStyle: { color: 'green' },
      },
    ],
    grid: { left: '3%', right: '4%', bottom: '3%', top: '20%', containLabel: true },
  };

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Box sx={getCrmStyle('sessionsCard', theme)}>
      <Stack spacing={0.5}>
        {/* Header with title and menu */}
        <Box sx={getCrmStyle('sessionsHeader', theme)}>
          <Typography variant="h6" sx={{ fontSize: '16px', color: 'grey',fontWeight: 700 }}>
        Sessions
          </Typography>
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
        </Box>

        {/* Value */}
        <Typography variant="h2" sx={getCrmStyle('sessionsValue', theme)}>
          {value}
        </Typography>
      </Stack>

      {/* Chart */}
      <Box sx={getCrmStyle('sessionsChart', theme)}>
        <ReactECharts ref={chartRef} option={chartOption} style={{ height: '60px', width: '100%' }} />
      </Box>

      {/* Dropdown Menu */}
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
    </Box>
  );
};

export default SessionsCard;
