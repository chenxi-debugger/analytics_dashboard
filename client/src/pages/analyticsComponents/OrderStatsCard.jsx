import React from 'react';
import { Box, Typography, IconButton, Grid, Paper, Menu, MenuItem, Stack } from '@mui/material';
import { MoreVert, Phone, Checkroom, Chair, SportsSoccer } from '@mui/icons-material';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';
import ReactECharts from 'echarts-for-react';

const OrderStatsCard = ({ theme, salesAnchorEl, handleOpenMenu, handleCloseMenu, setSalesAnchorEl }) => {
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Electronic': return <Phone />;
      case 'Fashion': return <Checkroom />;
      case 'Decor': return <Chair />;
      case 'Sports': return <SportsSoccer />;
      default: return null;
    }
  };

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };

  return (
    <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('orderStatsCard', theme)}>
        <Box sx={getAnalyticsStyle('orderStatsHeader', theme)}>
          <Typography variant="h6" sx={getAnalyticsStyle('orderStatsTypographyH6', theme)}>
            Order Statistics
          </Typography>
          <IconButton aria-label="More options" onClick={(event) => handleOpenMenu(event, setSalesAnchorEl)}>
            <MoreVert />
          </IconButton>
        </Box>
        <Typography variant="h4" sx={getAnalyticsStyle('orderStatsValue', theme)}>
          42.82k Total Sales
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ mr: 3, fontSize: '40px', fontWeight: '600' }}>8,258</Typography>
          <Typography variant="body2" sx={getAnalyticsStyle('orderStatsTypographyBody2', theme)}>
            Total Orders
          </Typography>
          <Box sx={{ width: '100%', height: '120px' }}>
            <ReactECharts option={option} style={{ width: '100%', height: '120px' }} />
          </Box>
        </Box>
        <Box>
          <Box sx={getAnalyticsStyle('orderStatsItem', theme)}>
            <Box sx={getAnalyticsStyle('orderStatsIcon', theme)}><Phone sx={{ color: '#9575cd', fontSize: '40px' }} /></Box>
            <Stack direction="column" spacing={0.5} sx={{ flexGrow: 1, ml: 1 }}>
              <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>Electronic</Typography>
              <Typography variant="caption" sx={getAnalyticsStyle('orderStatsItemTypographyCaption', theme)}>Mobile, Earbuds, TV</Typography>
            </Stack>
            <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>82.5k</Typography>
          </Box>
          <Box sx={getAnalyticsStyle('orderStatsItem', theme)}>
            <Box sx={getAnalyticsStyle('orderStatsIcon', theme)}><Checkroom sx={{ color: '#81c784', fontSize: '40px' }} /></Box>
            <Stack direction="column" spacing={0.5} sx={{ flexGrow: 1, ml: 1 }}>
              <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>Fashion</Typography>
              <Typography variant="caption" sx={getAnalyticsStyle('orderStatsItemTypographyCaption', theme)}>Tshirt, Jeans, Shoes</Typography>
            </Stack>
            <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>23.8k</Typography>
          </Box>
          <Box sx={getAnalyticsStyle('orderStatsItem', theme)}>
            <Box sx={getAnalyticsStyle('orderStatsIcon', theme)}><Chair sx={{ color: '#bbdefb', fontSize: '40px' }} /></Box>
            <Stack direction="column" spacing={0.5} sx={{ flexGrow: 1, ml: 1 }}>
              <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>Decor</Typography>
              <Typography variant="caption" sx={getAnalyticsStyle('orderStatsItemTypographyCaption', theme)}>Fine Art, Dining</Typography>
            </Stack>
            <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>849</Typography>
          </Box>
          <Box sx={getAnalyticsStyle('orderStatsItem', theme)}>
            <Box sx={getAnalyticsStyle('orderStatsIcon', theme)}><SportsSoccer sx={{ color: '#ce93d8', fontSize: '40px' }} /></Box>
            <Stack direction="column" spacing={0.5} sx={{ flexGrow: 1, ml: 1 }}>
              <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>Sports</Typography>
              <Typography variant="caption" sx={getAnalyticsStyle('orderStatsItemTypographyCaption', theme)}>Football, Cricket Kit</Typography>
            </Stack>
            <Typography variant="body2" sx={getAnalyticsStyle('orderStatsItemTypographyBody2', theme)}>99</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <Menu
            anchorEl={salesAnchorEl}
            open={Boolean(salesAnchorEl)}
            onClose={() => handleCloseMenu(setSalesAnchorEl)}
          >
            <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Refresh</MenuItem>
            <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Share</MenuItem>
            <MenuItem onClick={() => handleCloseMenu(setSalesAnchorEl)}>Update</MenuItem>
          </Menu>
        </Box>
      </Paper>
    </Grid>
  );
};

export default OrderStatsCard;