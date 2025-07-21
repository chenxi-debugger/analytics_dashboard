import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const CongratulationsCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('congratulationsCard', theme), flexGrow: 1 }}>
      <Box sx={getEcommerceStyle('congratulationsContent', theme)}>
        <Typography variant="h6" sx={getEcommerceStyle('typographyH6', theme)}>
          {data.title} 🎉
        </Typography>
        <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
          {data.message}
        </Typography>
        <Typography variant="h4" sx={getEcommerceStyle('typographyH4', theme)}>
          {data.value}
        </Typography>
        <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
          {data.target}
        </Typography>
        <Box sx={getEcommerceStyle('congratulationsAction', theme)}>
          <Typography variant="button">{data.action}</Typography>
        </Box>
      </Box>
      <Box sx={getEcommerceStyle('congratulationsImage', theme)}>
        <img src="/congratulations-image.png" alt="Congratulations" />
      </Box>
    </Paper>
  );
};

export default CongratulationsCard;