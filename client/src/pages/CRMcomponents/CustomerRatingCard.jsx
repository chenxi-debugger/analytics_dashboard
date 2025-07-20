import React from 'react';
import { Box, Typography, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, Star } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { customerRatingChartOption } from '../CRMchartoptions';
import getCrmStyle from '../../styles/crmPageStyle';

const CustomerRatingCard = ({ data, theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ ...getCrmStyle('customerRatingCard', theme), flexGrow: 1 }}>
      <Typography variant="h6">{data.customer_rating_card.title}</Typography>
      <Box sx={getCrmStyle('ratingValue', theme)}>
        <Typography variant="h4">{data.customer_rating_card.rating}</Typography>
        <Box sx={getCrmStyle('stars', theme)}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              sx={{
                color: i < data.customer_rating_card.stars ? theme.palette.warning.main : theme.palette.divider,
                fontSize: '16px',
              }}
            />
          ))}
        </Box>
      </Box>
      <Typography variant="body2">{data.customer_rating_card.change}</Typography>
      <Box sx={getCrmStyle('customerRatingChart', theme)}>
        <ReactECharts option={customerRatingChartOption(theme)} style={{ height: '90px', width: '100%' }} />
      </Box>
      <IconButton aria-label="More options" onClick={handleOpenMenu}>
        <MoreVert />
      </IconButton>
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
    </Paper>
  );
};

export default CustomerRatingCard;