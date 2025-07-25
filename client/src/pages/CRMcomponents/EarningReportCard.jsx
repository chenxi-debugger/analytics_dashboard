import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert, ArrowUpward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../../styles/crmPageStyle';

const EarningReportCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const items = [
    {
      title: 'Net Profit',
      subtitle: '12.4k Sales',
      value: '$1,619',
      growth: '18.6%',
      color: '#e5e6fe',
      icon: '/profit.png', // optional icon
    },
    {
      title: 'Total Income',
      subtitle: 'Sales, Affiliation',
      value: '$3,571',
      growth: '39.6%',
      color: '#dbf7e7',
      icon: '/income.png',
    },
    {
      title: 'Total Expenses',
      subtitle: 'ADVT, Marketing',
      value: '$430',
      growth: '52.8%',
      color: '#eaeef3',
      icon: '/expense.png',
    },
  ];

  const chartOption = {
    tooltip: {},
    grid: { left: '0%', right: '0%', bottom: '0%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' },
    },
    yAxis: { show: false },
    series: [
      {
        type: 'bar',
        data: [100, 220, 180, 130, 240, 160, 200],
        itemStyle: {
          color: (params) => (params.dataIndex === 4 ? '#6366F1' : '#dcdcff'),
          borderRadius: 8,
        },
        barWidth: '20%',
      },
    ],
  };

  return (
    <Paper
      sx={{
        ...getCrmStyle('earningReportCard', theme),
        p: 3,
        borderRadius: '10px',
        flexGrow: 1,
        height: '100%', // ✅ 关键
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700,fontSize: '25px', color:'grey' }}>
          Earning Report
        </Typography>
        <IconButton aria-label="More options" onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Box>

      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '16px', pb: 1.5}}>
        Weekly Earnings Overview
      </Typography>

      {/* Info Items */}
      {items.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          {/* Left: icon + label */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Box
              sx={{
                bgcolor: item.color,
                borderRadius: '12px',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={item.icon || '/default-icon.png'} alt={item.title} style={{ width: 18, height: 18 }} />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.title}</Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>{item.subtitle}</Typography>
            </Box>
          </Box>

          {/* Right: value + growth */}
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.value}</Typography>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.success.main }}>
              <ArrowUpward sx={{ fontSize: 14 }} /> {item.growth}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Chart */}
      <Box sx={{ mt: 3 }}>
        <ReactECharts option={chartOption} style={{ width: '100%', height: '140%' }} />
      </Box>

      {/* Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Refresh</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Update</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default EarningReportCard;
