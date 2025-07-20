import React from 'react';
import { Box, Typography, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import getCrmStyle from '../../styles/crmPageStyle';

const TopProductsVolumeCard = ({ data, theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ ...getCrmStyle('topProductsVolumeCard', theme), flexGrow: 1 }}>
      <Box sx={getCrmStyle('topProductsHeader', theme)}>
        <Typography variant="h6">{data.top_products_volume_card.title}</Typography>
        <IconButton aria-label="More options" onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Box>
      <Box sx={getCrmStyle('productsList', theme)}>
        {data.top_products_volume_card.products.map((product, index) => (
          <Box key={index} sx={getCrmStyle('productItem', theme)}>
            <Box sx={getCrmStyle('productIcon', theme)} style={{ backgroundColor: product.color }} />
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">{product.value}</Typography>
            <Box display="flex" alignItems="center">
              {product.growth.startsWith('-') ? (
                <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: '12px' }} />
              ) : (
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
              )}
              <Typography variant="body2">{product.growth}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
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

export default TopProductsVolumeCard;
