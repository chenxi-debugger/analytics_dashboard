import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../../styles/crmPageStyle';

const SalesAnalyticsCard = ({ theme }) => {
  const [year, setYear] = useState('2025');


  const heatmapData = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 8; j++) {
      heatmapData.push([j, i, Math.floor(Math.random() * 100)]);
    }
  }

  const chartOption = {
    tooltip: {
      position: 'top',
    },
    grid: {
      height: '60%',
      top: '20%',
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      splitArea: {
        show: true,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' },
    },
    yAxis: {
      type: 'category',
      data: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'].reverse(),
      splitArea: {
        show: true,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '-2%',
      inRange: {
        color: ['#f5f5ff', '#6c63ff'],
      },
    },
    series: [
      {
        name: 'Sales',
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
    ],
  };

  return (
    <Paper
      sx={{
        ...getCrmStyle('salesAnalyticsCard', theme),
        p: 3,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        flexGrow: 1,
        width: '100%',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '25px', color:'grey' }}>
          Sales Analytics
        </Typography>
        <FormControl size="small">
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={{
              fontSize: '17px',
              height: '28px',
              minWidth: 80,
              borderRadius: '8px',
              '& .MuiSelect-select': { padding: '4px 8px' },
            }}
          >
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Growth */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
            sx={{
            bgcolor: '#dfffe1',
            color: '#4caf50',
            fontWeight: 600,
            fontSize: '12px',
            px: 1,
            py: 1,
            borderRadius: '6px',
            }}
        >
            +42.6%
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Than last year
        </Typography>
        </Box>

      {/* Heatmap */}
      <Box sx={{ mt: 0 }}>
        <ReactECharts option={chartOption} style={{ width: '100%', height: 320 }} />
      </Box>

    </Paper>
  );
};

export default SalesAnalyticsCard;