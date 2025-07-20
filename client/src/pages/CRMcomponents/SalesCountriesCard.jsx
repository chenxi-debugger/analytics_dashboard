import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';
import getCrmStyle from '../../styles/crmPageStyle';

const SalesCountriesCard = ({ data, theme }) => {
  return (
    <Paper sx={{ ...getCrmStyle('salesCountriesCard', theme), flexGrow: 1 }}>
      <Box sx={getCrmStyle('salesCountriesHeader', theme)}>
        <Typography variant="h6">{data.sales_countries_card.title}</Typography>
        <Typography variant="body2">{data.sales_countries_card.description}</Typography>
      </Box>
      <Box sx={getCrmStyle('countriesList', theme)}>
        {data.sales_countries_card.countries.map((country, index) => (
          <Box key={index} sx={getCrmStyle('countryItem', theme)}>
            <Typography variant="body2">{country.flag} {country.name}</Typography>
            <Typography variant="body2">{country.sales}</Typography>
            <Box display="flex" alignItems="center">
              <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: '12px' }} />
              <Typography variant="body2">{country.growth}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default SalesCountriesCard;