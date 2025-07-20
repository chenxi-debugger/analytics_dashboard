import React from 'react';
import { Box, Typography, Paper, Stack, Grid, IconButton } from '@mui/material'; // 添加 IconButton
import { MoreVert } from '@mui/icons-material';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';

const TransactionsCard = ({ data, theme }) => {
  return (
    <Grid size={{ xs: 6, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('transactionsCard', theme)}>
        <Stack spacing={1}>
          <Box sx={getAnalyticsStyle('transactionsHeader', theme)}>
            <Typography variant="h6" sx={getAnalyticsStyle('transactionsTypographyH6', theme)}>
              {data.transactions_card.title}
            </Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
          <Stack spacing={1.5} sx={getAnalyticsStyle('transactionsList', theme)}>
            {data.transactions_card.list.map((transaction, index) => (
              <Box key={index} sx={getAnalyticsStyle('transactionsItem', theme)}>
                <Box sx={[getAnalyticsStyle('transactionsIcon', theme), { backgroundColor: transaction.color }]} />
                <Typography variant="body2" sx={getAnalyticsStyle('transactionsItemTypographyBody2', theme)}>
                  {transaction.type}
                </Typography>
                <Typography variant="body2" sx={[getAnalyticsStyle('transactionsItemTypographyBody2', theme), { fontWeight: 600 }]}>
                  {transaction.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default TransactionsCard;