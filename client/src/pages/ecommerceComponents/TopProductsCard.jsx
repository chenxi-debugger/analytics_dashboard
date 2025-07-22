import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import MouseIcon from '@mui/icons-material/Mouse';
import ComputerIcon from '@mui/icons-material/Computer';
import TvIcon from '@mui/icons-material/Tv';

const TopProductsCard = () => {
  const columns = ['Product', 'Category', 'Payment', 'Order Status', 'Actions'];

  const products = [
    {
      image: '/oneplusp.png',
      name: 'OnePlus 7Pro',
      subtitle: 'OnePlus',
      category: 'Smart Phone',
      payment: { amount: '$120/$499', status: 'Partially Paid' },
      status: 'CONFIRMED',
    },
    {
      image: '/mouse.png',
      name: 'Magic Mouse',
      subtitle: 'Apple',
      category: 'Mouse',
      payment: { amount: '$149', status: 'Fully Paid' },
      status: 'COMPLETED',
    },
    {
      image: '/imac.png',
      name: 'iMac Pro',
      subtitle: 'Apple',
      category: 'Computer',
      payment: { amount: '$0/$899', status: 'Unpaid' },
      status: 'CANCELLED',
    },
    {
      image: '/note10.png',
      name: 'Note 10',
      subtitle: 'Samsung',
      category: 'Smart Phone',
      payment: { amount: '$169', status: 'Fully Paid' },
      status: 'COMPLETED',
    },
    {
      image: '/iphone11.png',
      name: 'iPhone 11 Pro',
      subtitle: 'Apple',
      category: 'Smart Phone',
      payment: { amount: '$399', status: 'Fully Paid' },
      status: 'COMPLETED',
    },
    {
      image: '/mi-tv.png',
      name: 'Mi Led TV 4X',
      subtitle: 'Xiaomi',
      category: 'Smart TV',
      payment: { amount: '$349/$2599', status: 'Partially Paid' },
      status: 'CONFIRMED',
    },
    {
      image: '/logitech.png',
      name: 'Logitech MX',
      subtitle: 'Logitech',
      category: 'Mouse',
      payment: { amount: '$89', status: 'Fully Paid' },
      status: 'COMPLETED',
    },
  ];
  

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Smart Phone':
        return <SmartphoneIcon fontSize="small" sx={{ color: '#6366F1' }} />;
      case 'Mouse':
        return <MouseIcon fontSize="small" sx={{ color: '#F59E0B' }} />;
      case 'Computer':
        return <ComputerIcon fontSize="small" sx={{ color: '#4CAF50' }} />;
      case 'Smart TV':
        return <TvIcon fontSize="small" sx={{ color: '#EF4444' }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return '#6366F1';
      case 'COMPLETED':
        return '#4CAF50';
      case 'CANCELLED':
        return '#FF7043';
      default:
        return '#999';
    }
  };

  // 每个产品独立菜单状态
  const [menus, setMenus] = React.useState({});

  const handleOpenMenu = (index, event) => {
    setMenus((prev) => ({ ...prev, [index]: event.currentTarget }));
  };

  const handleCloseMenu = (index) => {
    setMenus((prev) => ({ ...prev, [index]: null }));
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex', 
        flexDirection: 'column',
        gap: 0,
        overflowX: 'auto',
        flexGrow: 1,
      }}
    >

      <Box display="flex" justifyContent="space-between" px={1} pb={1}>
        {columns.map((col, i) => (
          <Typography key={i} variant="body1" sx={{ flex: i === 0 ? 2 : 1, fontWeight: 700, color: 'text.disabled' }}>
            {col}
          </Typography>
        ))}
      </Box>

      {products.map((item, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={1}
          py={1.2}
          sx={{ borderTop: index === 0 ? 'none' : '1px solid #eee' }}
        >
          {/* Product */}
          <Box sx={{ flex: 1.8, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar src={item.image} variant="rounded" sx={{ width: 36, height: 36 }} />
            <Box>
              <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary" fontSize="0.75rem">{item.subtitle}</Typography>
            </Box>
          </Box>

          {/* Category with icon */}
          <Box sx={{ flex: 1.2, display: 'flex', alignItems: 'center', gap: 1 }}>
            {getCategoryIcon(item.category)}
            <Typography variant="body2">{item.category}</Typography>
          </Box>

          {/* Payment */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={600}>{item.payment.amount}</Typography>
            <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
              {item.payment.status}
            </Typography>
          </Box>

          {/* Order Status */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: getStatusColor(item.status),
                color: '#fff',
                px: 1,
                py: 0.3,
                borderRadius: '5px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textAlign: 'center',
                minWidth: 80,
              }}
            >
              {item.status}
            </Box>
          </Box>

          {/* Actions: menu */}
          <Box sx={{ flex: 1 }}>
            <IconButton onClick={(e) => handleOpenMenu(index, e)}>
              <MoreVert fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={menus[index]}
              open={Boolean(menus[index])}
              onClose={() => handleCloseMenu(index)}
            >
              <MenuItem onClick={() => handleCloseMenu(index)}>View Detials</MenuItem>
              <MenuItem onClick={() => handleCloseMenu(index)}>Print Invoice</MenuItem>
              <MenuItem onClick={() => handleCloseMenu(index)}>Buy Again</MenuItem>
              <MenuItem onClick={() => handleCloseMenu(index)}>Detail History</MenuItem>
            </Menu>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default TopProductsCard;
