import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useTheme, Grid, Stack } from '@mui/material';
import getEcommerceStyle from '../styles/ecommercepageStyle';
import CongratulationsCard from './ecommerceComponents/CongratulationsCard'
import NewVisitorsCard from './ecommerceComponents/NewVisitorsCard';
import ActivityCard from './ecommerceComponents/ActivityCard';
import SalesCard from './ecommerceComponents/SalesCard';
import ProfitCard from './ecommerceComponents/ProfitCard';
import TotalIncomeCard from './ecommerceComponents/TotalIncomeCard';
import ReportCard from './ecommerceComponents/ReportCard';
import ExpensesCard from './ecommerceComponents/ExpensesCard';
import TransactionsCard from './ecommerceComponents/TransactionsCard';
import PerformanceCard from './ecommerceComponents/PerformanceCard';
import ConversionRateCard from './ecommerceComponents/ConversionRateCard';
import RevenueCard from './ecommerceComponents/RevenueCard';
import Sales2Card from './ecommerceComponents/Sales2Card';
import Expenses2Card from './ecommerceComponents/Expenses2Card';
import TopProductsCard from './ecommerceComponents/TopProductsCard';
import TotalBalanceCard from './ecommerceComponents/TotalBalanceCard';


const EcommercePage = () => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEcommerceData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ecommerce`, {
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchEcommerceData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>No data available</Typography>
      </Box>
    );
  }



  return (
    <Box sx={getEcommerceStyle('ecommerceMain', theme)}>
      <Box sx={getEcommerceStyle('ecommerceContent', theme)}>
        <Grid container spacing={3} sx={{ alignItems: 'stretch'}}>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <CongratulationsCard data={data.congratulations_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <NewVisitorsCard
              data={data.new_visitors_card}
              theme={theme}
              
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <ActivityCard data={data.activity_card} theme={theme}/>
          </Grid>

          
          <Grid size={{ xs: 12, md: 12, lg: 4 }} sx={{ display: 'flex' }}>
            <Stack spacing={3} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <SalesCard data={data.sales_card} theme={theme} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <ProfitCard data={data.profit_card} theme={theme} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                  <ExpensesCard data={data.expenses_card} theme={theme}  />
              
              </Box>
              <Box sx={{ flex: 1 }}> 
                  <TransactionsCard data={data.transactions_card} theme={theme} />
                </Box>
              </Box>
            </Stack>
          </Grid>
  

          
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
            <TotalIncomeCard
              data={data.total_income_card}
              theme={theme}
              
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
            <ReportCard data={data.report_card} theme={theme} />
          </Grid>
          
          
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
            <PerformanceCard
              data={data.performance_card}
              theme={theme}
              
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
            <ConversionRateCard
              data={data.conversion_rate_card}
              theme={theme}
              
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, lg: 4 }} sx={{ display: 'flex' }}>
          <Stack gap={3} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1 }}>
            <RevenueCard data={data.revenue_2_card} theme={theme} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Sales2Card data={data.sales_2_card} theme={theme} />
          </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Expenses2Card data={data.expenses_2_card} theme={theme}/>
          </Box>
          </Stack>
          </Grid>


          <Grid size={{ xs: 12, md: 8, lg: 8 }} sx={{ display: 'flex' }}>
            <TopProductsCard data={data.top_products_card} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <TotalBalanceCard
              data={data.total_balance_card}
              theme={theme}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EcommercePage;