import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreVert } from '@mui/icons-material';
import getCrmStyle from '../../styles/crmPageStyle';

const SalesCountriesCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const countries = [
    {
      flag: '/usa.png',
      sales: '$8,656k',
      growth: '25.8%',
      name: 'United states of america',
      volume: '894k',
    },
    {
      flag: '/brazil.png',
      sales: '$2,415k',
      growth: '-6.2%',
      name: 'Brazil',
      volume: '645k',
    },
    {
      flag: '/india.png',
      sales: '$865k',
      growth: '12.4%',
      name: 'India',
      volume: '148k',
    },
    {
      flag: '/australia.png',
      sales: '$745k',
      growth: '-11.9%',
      name: 'Australia',
      volume: '86k',
    },
    {
      flag: '/belgium.png',
      sales: '$45k',
      growth: '16.2%',
      name: 'Belgium',
      volume: '42k',
    },
    {
      flag: '/china.png',
      sales: '$12k',
      growth: '14.8%',
      name: 'China',
      volume: '8k',
    },
  ];

  return (
    <Paper
      sx={{
        ...getCrmStyle('salesCountriesCard', theme),
        p: 3,
        borderRadius: '10px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '25px', color:'grey' }}>
            Sales by Countries
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Monthly Sales Overview
          </Typography>
        </Box>
        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Box>

      {/* Country Rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px:1.5 }}>
        {countries.map((country, idx) => {
          const isNegative = parseFloat(country.growth) < 0;
          return (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* Left: Flag */}
              <Avatar
                src={country.flag}
                alt={country.name}
                sx={{ width: 40, height: 40 }}
              />

              {/* Center: Sales + Country Name + Growth */}
              <Box sx={{ flex: 1, mx: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Typography fontWeight={600}>{country.sales}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: isNegative ? '#ffe5e5' : '#e6f4ea',
                      color: isNegative
                        ? theme?.palette?.error.main || 'red'
                        : theme?.palette?.success.main || 'green',
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {isNegative ? (
                      <ArrowDownward sx={{ fontSize: 14, mr: 0.5 }} />
                    ) : (
                      <ArrowUpward sx={{ fontSize: 14, mr: 0.5 }} />
                    )}
                    {country.growth}
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {country.name}
                </Typography>
              </Box>

              {/* Right: Volume */}
              <Typography fontWeight={700}>{country.volume}</Typography>
            </Box>
          );
        })}
      </Box>

      {/* Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Last 28 Days</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Last Month</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Last Year</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default SalesCountriesCard;
