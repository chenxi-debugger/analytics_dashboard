import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import getEcommerceStyle from '../../styles/ecommercepageStyle';

const CongratulationsCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getEcommerceStyle('congratulationsCard', theme),
        p: 2,
        borderRadius: '10px',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        gap: 0,
        height:'200px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Box sx={getEcommerceStyle('congratulationsContent', theme)}>
        <Typography sx={{ ...getEcommerceStyle('typographyH6', theme), color: 'grey', fontSize: '18px', fontWeight:700}}>
            {data.title} 
        </Typography>
        <Typography variant="body2" sx={getEcommerceStyle('typographyBody2', theme)}>
          {data.message}
        </Typography>
        <Typography variant="h4" sx={{ ...getEcommerceStyle('typographyH4', theme), color: 'rgb(105, 108, 255)' }}>
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