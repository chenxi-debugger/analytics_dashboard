import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';

const ProfitCard = () => {
  const theme = useTheme(); // ✅ 获取当前 theme 对象

  const profitChartOption = {
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], show: false },
    yAxis: { type: 'value', show: false },
    series: [
      {
        data: [0, 500, 300, 700, 400, 800],
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#f59e0b', width: 4 },
        areaStyle: { color: 'transparent' },
      },
    ],
  };

  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 160,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        gap: 3,
        flexGrow: 1,
        ...getAnalyticsStyle('profitCard', theme), // ✅ 使用主题样式
      }}
    >
      {/* Left Section */}
      <Box display="flex" flexDirection="column" gap={1} p={3}>
      <Typography fontSize={22} fontWeight={600} color={theme.palette.text.primary}>
        Profit Report
      </Typography>

        <Box sx={{ bgcolor: '#fef3c7', color: '#b45309', fontSize: 12, fontWeight: 600, px: 1.5, py: 0.5, borderRadius: 1, width: 'fit-content' }}>YEAR 2025</Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <ArrowUpward sx={{ fontSize: 16, color: '#10b981' }} />
          <Typography fontSize={14} fontWeight={600} color="#10b981">68.2%</Typography>
        </Box>
        <Typography fontSize={24} fontWeight={700} color="#111827">$84,686k</Typography>
      </Box>

      {/* Right Section */}
      <Box sx={{ width: '60%', height: '80%' }}>
        <ReactECharts option={profitChartOption} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Paper>
  );
};

export default ProfitCard;
