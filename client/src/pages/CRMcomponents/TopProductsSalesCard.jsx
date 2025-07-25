import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import getCrmStyle from '../../styles/crmPageStyle';

const TopProductsSalesCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const products = [
    {
      name: 'Oneplus Nord',
      brand: 'Oneplus',
      price: '$98,348',
      image: 'oneplus.png',
      bgColor: '#ffe4e0',
    },
    {
      name: 'Smart Band 4',
      brand: 'Xiaomi',
      price: '$15,459',
      image: 'smart.png',
      bgColor: '#e5e6fe',
    },
    {
      name: 'Surface Pro X',
      brand: 'Microsoft',
      price: '$4,589',
      image: 'surface.png',
      bgColor: '#d6f6fb',
    },
    {
      name: 'iPhone 13',
      brand: 'Apple',
      price: '$84,345',
      image: 'iPhone.png',
      bgColor: '#e4f9db',
    },
    {
      name: 'Bluetooth Earphone',
      brand: 'Beats',
      price: '$10,3748',
      image: 'headphone.png',
      bgColor: '#eaeef3',
    },
  ];

  return (
    <Paper
      sx={{
        ...getCrmStyle('topProductsSalesCard', theme),
        p: 3,
        borderRadius: '10px',
        flexGrow: 1,
        height: '100%', // ✅ 关键
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',pb:1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '24px', color: 'grey'}}>
          Top Products by <span style={{ color: 'grey' }}>Sales</span>
        </Typography>
        <IconButton aria-label="More options" onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Box>

      {/* Product list */}
      {products.map((product, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
          }}
        >
          {/* Left: image */}
          <Box
            sx={{
              bgcolor: product.bgColor,
              borderRadius: '12px',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <img
              src={`/${product.image}`}
              alt={product.name}
              style={{ width: 20, height: 20 }}
            />
          </Box>

          {/* Middle: name + brand */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {product.name}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {product.brand}
            </Typography>
          </Box>

          {/* Right: price */}
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {product.price}
          </Typography>
        </Box>
      ))}

      {/* Footer menu */}
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

export default TopProductsSalesCard;
