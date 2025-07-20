import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  useTheme,
} from '@mui/material';
import CustomerRatingCard from './CRMcomponents/CustomerRatingCard';
import OverviewSalesCard from './CRMcomponents/OverviewSalesCard';
import GeneratedLeadsCard from './CRMcomponents/GeneratedLeadsCard';
import OrdersCard from './CRMcomponents/OrdersCard';
import TopProductsSalesCard from './CRMcomponents/TopProductsSalesCard';
import TopProductsVolumeCard from './CRMcomponents/TopProductsVolumeCard';
import EarningReportCard from './CRMcomponents/EarningReportCard';
import SalesAnalyticsCard from './CRMcomponents/SalesAnalyticsCard';
import SalesCountriesCard from './CRMcomponents/SalesCountriesCard';
import SalesStatsCard from './CRMcomponents/SalesStatsCard';
import TeamMembersCard from './CRMcomponents/TeamMembersCard';
import getCrmStyle from '../styles/crmPageStyle';

const CrmPage = () => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesAnalyticsYear, setSalesAnalyticsYear] = useState('2025');

  useEffect(() => {
    async function fetchCrmData() {
      try {
        const response = await fetch('http://localhost:5001/api/crm', {
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
    fetchCrmData();
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
    <Box sx={getCrmStyle('crmMain', theme)}>
      <Box sx={getCrmStyle('crmContent', theme)}>
        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          {/* Customer Rating */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <CustomerRatingCard data={data} theme={theme} />
          </Grid>

          {/* Overview & Sales Activity */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <OverviewSalesCard data={data} theme={theme} />
          </Grid>

          {/* Generated Leads */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <GeneratedLeadsCard data={data} theme={theme} />
          </Grid>

          {/* Orders */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <OrdersCard data={data} theme={theme} />
          </Grid>

          {/* Top Products by Sales */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <TopProductsSalesCard data={data} theme={theme} />
          </Grid>

          {/* Top Products by Volume */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <TopProductsVolumeCard data={data} theme={theme} />
          </Grid>

          {/* Earning Report */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <EarningReportCard data={data} theme={theme} />
          </Grid>

          {/* Generated Leads (Moved) */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }} sx={{ display: 'flex' }}>
            <GeneratedLeadsCard data={data} theme={theme} />
          </Grid>

          {/* Sales Analytics */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <SalesAnalyticsCard data={data} theme={theme} salesAnalyticsYear={salesAnalyticsYear} setSalesAnalyticsYear={setSalesAnalyticsYear} />
          </Grid>

          {/* Sales by Countries */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <SalesCountriesCard data={data} theme={theme} />
          </Grid>

          {/* Sales Stats */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex' }}>
            <SalesStatsCard data={data} theme={theme} />
          </Grid>

          {/* Customers */}
          <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ display: 'flex' }}>
            <TeamMembersCard data={data} theme={theme} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CrmPage;