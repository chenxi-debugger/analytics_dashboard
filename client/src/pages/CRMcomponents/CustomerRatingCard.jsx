// src/pages/CRMcomponents/CustomerRatingCard.jsx
import React from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, Star } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../../styles/crmPageStyle';

const CustomerRatingCard = ({ data, theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const chartOption = {
    backgroundColor: 'transparent',
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          color: theme.palette.text.secondary,
          fontSize: 10,
        },
        axisLine: { lineStyle: { color: theme.palette.divider } },
      },
    ],
    yAxis: [
      {
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value}',
          color: theme.palette.text.secondary,
          fontSize: 10,
        },
      },
      {
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value}',
          color: theme.palette.text.secondary,
          fontSize: 10,
        },
      },
    ],
    series: [
      {
        type: 'bar',
        data: [2.0, 302.9, 207.0, 100.2, 4425.6],
        itemStyle: {
          color: theme.palette.error.main,
        },
      },
      {
        type: 'bar',
        data: [102.6, 131.9, 229.0, 326.4, 428.7],
        itemStyle: {
          color: theme.palette.primary.main,
        },
      },
      {
        type: 'line',
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3],
        lineStyle: {
          color: theme.palette.success.main,
          width: 2,
        },
        itemStyle: {
          color: theme.palette.success.main,
        },
      },
    ],
  };

  return (
    <Box
    sx={{
      ...getCrmStyle('customerRatingCard', theme),
      flexGrow: 1,
      width: '100%',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Header with title and menu */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={getCrmStyle('customerRatingTitle', theme)}>
          {data.customer_rating_card.title}
        </Typography>
        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
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

      {/* Rating */}
      <Box sx={getCrmStyle('ratingValue', theme)}>
        <Typography variant="h4">{data.customer_rating_card.rating}</Typography>
        <Box sx={getCrmStyle('stars', theme)}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              sx={{
                color: i < data.customer_rating_card.stars ? theme.palette.warning.main : theme.palette.divider,
                fontSize: '25px',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Change */}
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
        {data.customer_rating_card.change}
      </Typography>

      {/* Chart */}
      <Box sx={getCrmStyle('customerRatingChart', theme)}>
        <ReactECharts option={chartOption} style={{ height: '240px', width: '100%' }} />
      </Box>
    </Box>
  );
};

export default CustomerRatingCard;
