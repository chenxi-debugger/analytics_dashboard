import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  useTheme,
  Stack,
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
import CustomersMembersCard from './CRMcomponents/CustomersMembersCard';
import SessionsCard from './CRMcomponents/SessionsCard';
import TeamMembersCard from './CRMcomponents/TeamMembersCard'
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
        const response = await fetch('http://localhost:5001/api/crm');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
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
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography color="error">Error: {error}</Typography></Box>;
  }

  if (!data) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography>No data available</Typography></Box>;
  }

  return (
    <Box sx={getCrmStyle('crmMain', theme)}>
      <Box sx={getCrmStyle('crmContent', theme)}>
        <Grid container spacing={3}>
          {/* First Row: Three Columns (Reference Analytics Layout) */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
            <CustomerRatingCard data={data} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
            <OverviewSalesCard theme={theme} />
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
            <Stack spacing={3} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <SessionsCard data={data?.sessions_card} theme={theme} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <OrdersCard data={data?.orders_card} theme={theme} />
                </Box>
              </Box>
              <Box>
                <GeneratedLeadsCard data={data?.generated_leads_card} theme={theme} />
              </Box>
            </Stack>
          </Grid>

          {/* Bottom Grid Blocks */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
            <TopProductsSalesCard data={data} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
            <TopProductsVolumeCard data={data} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
            <EarningReportCard data={data} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
            <SalesAnalyticsCard
              data={data}
              theme={theme}
              salesAnalyticsYear={salesAnalyticsYear}
              setSalesAnalyticsYear={setSalesAnalyticsYear}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
            <SalesCountriesCard data={data} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
            <SalesStatsCard data={data} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 5 }} sx={{ display: 'flex' }}>
            <TeamMembersCard data={data} theme={theme} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 7 }} sx={{ display: 'flex' }}>
            <CustomersMembersCard data={data} theme={theme} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CrmPage;
