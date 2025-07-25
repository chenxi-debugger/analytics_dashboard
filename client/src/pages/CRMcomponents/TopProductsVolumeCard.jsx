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

const TopProductsVolumeCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const products = [
    {
      name: 'ENVY Laptop',
      brand: 'HP',
      value: '12.4k',
      growth: '+12.4%',
      image: 'envy.png',
      bgColor: '#eaeef3',
      growthColor: 'success',
    },
    {
      name: 'Apple',
      brand: 'iMac Pro',
      value: '74.9k',
      growth: '-8.5%',
      image: 'apple.png',
      bgColor: '#fff0cc',
      growthColor: 'error',
    },
    {
      name: 'Smart Watch',
      brand: 'Fitbit',
      value: '4.4k',
      growth: '+17.6%',
      image: 'watch.png',
      bgColor: '#ffe5e0',
      growthColor: 'success',
    },
    {
      name: 'Oneplus Nord',
      brand: 'Oneplus',
      value: '12.34k',
      growth: '+13.9%',
      image: 'oneplus-nord.png',
      bgColor: '#e4f9db',
      growthColor: 'success',
    },
    {
      name: 'Pixel 4a',
      brand: 'Google',
      value: '8.65k',
      growth: '-11.8%',
      image: 'google-pixel.png',
      bgColor: '#e5e6fe',
      growthColor: 'error',
    },
  ];

  return (
    <Paper
      sx={{
        ...getCrmStyle('topProductsVolumeCard', theme),
        p: 3,
        borderRadius: '10px',
        flexGrow: 1,
        height: '100%', // ✅ 关键
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb:1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '25px', color:'grey' }}>
          Top Products by Volume
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
            py: 0.2,
          }}
        >
          {/* Left: image + name + brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
            <Box
              sx={{
                bgcolor: product.bgColor,
                borderRadius: '12px',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={`/${product.image}`}
                alt={product.name}
                style={{ width: 20, height: 20 }}
              />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                {product.brand}
              </Typography>
            </Box>
          </Box>

          {/* Right: value + growth */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {product.value}
            </Typography>
            <Box
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                color: product.growthColor === 'success'
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                backgroundColor: product.growthColor === 'success'
                  ? theme.palette.success.light
                  : theme.palette.error.light,
                px: 1,
                py: 0.5,
                borderRadius: '6px',
              }}
            >
              {product.growth}
            </Box>
          </Box>
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

export default TopProductsVolumeCard;
