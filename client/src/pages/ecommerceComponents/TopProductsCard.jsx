import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const TopProductsCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('topProductsCard', theme), flexGrow: 1 }}>
      <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
        {data.title}
      </Typography>
      <Box sx={getEcommerceStyle('productsList', theme)}>
        <Box sx={[getEcommerceStyle('productItem', theme), { header: true }]}>
          {data.columns.map((column, index) => (
            <Typography key={index} variant="body2">{column}</Typography>
          ))}
        </Box>
        {data.products.map((product, index) => (
          <Box key={index} sx={getEcommerceStyle('productItem', theme)}>
            <Box display="flex" alignItems="center">
              <Box sx={getEcommerceStyle('productIcon', theme)} />
              <Typography variant="body2">{product.name}</Typography>
            </Box>
            <Typography variant="body2">{product.category}</Typography>
            <Typography variant="body2">{product.payment}</Typography>
            <Typography
              variant="body2"
              sx={{
                color: product.status === 'COMPLETED' || product.status === 'CONFIRMED' ? theme.palette.success.main : theme.palette.warning.main,
              }}
            >
              {product.status}
            </Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default TopProductsCard;