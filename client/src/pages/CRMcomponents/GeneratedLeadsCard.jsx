// src/pages/CRMcomponents/GeneratedLeadsCard.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../../styles/crmPageStyle';

const GeneratedLeadsCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const chartOption = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: '25%\nAverage',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#444',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <Paper
      sx={{
        ...getCrmStyle('generatedLeadsCard', theme),
        flexGrow: 1,
        p: 2,
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      {/* Left: Text content */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 600, color: 'grey' }}>
            Generated Leads
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '15px', color: theme.palette.success.light, fontWeight: 600 }}>
          Monthly Report
        </Typography>

        <Typography variant="h4" sx={{ fontSize: '30px', fontWeight: 700, color: '#3f3f3f', my: 1 }}>
          4,234
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', color: theme.palette.success.main }}>
          <ArrowUpward sx={{ fontSize: '20px', mr: 0.5 }} /> +12.8%
        </Typography>
      </Box>

      {/* Right: Pie chart */}
      <Box sx={{ flex: 1, height: 140, width: 140 }}>
        <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
      </Box>

    
    </Paper>
  );
};

export default GeneratedLeadsCard;
