import { css } from '@emotion/react';

const getCrmStyle = (className) => {
  switch (className) {
    case 'crmMain':
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: '#f8f9fd',
      };

    case 'crmContent':
      return {
        flex: 1,
        p: 2,
        overflowY: 'auto',
      };

    // Cards
    case 'customerRatingCard':
    case 'overviewSalesCard':
    case 'ordersCard':
    case 'generatedLeadsCard':
    case 'topProductsSalesCard':
    case 'topProductsVolumeCard':
    case 'earningReportCard':
    case 'salesAnalyticsCard':
    case 'salesCountriesCard':
    case 'salesStatsCard':
    case 'teamMembersCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    // Typography for h6 (titles)
    case 'typographyH6':
      return {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#5e5873',
      };

    // Typography for h4 (large values)
    case 'typographyH4':
      return {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#1a1a1a',
      };

    // Typography for body2 (secondary text)
    case 'typographyBody2':
      return {
        fontSize: '0.85rem',
        color: '#6e6b7b',
      };

    // Rating Value
    case 'ratingValue':
      return {
        display: 'flex',
        alignItems: 'center',
        my: 1,
      };

    // Stars
    case 'stars':
      return {
        ml: 1,
      };

    // Charts
    case 'customerRatingChart':
    case 'overviewSalesChart':
    case 'earningReportChart':
      return {
        height: '90px',
        bgcolor: '#f5f5f9',
        borderRadius: '6px',
        mt: 1.5,
      };

    // Headers
    case 'overviewSalesHeader':
    case 'topProductsHeader':
    case 'earningReportHeader':
    case 'salesAnalyticsHeader':
    case 'salesCountriesHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.5,
      };

    // Stats
    case 'overviewSalesStats':
    case 'earningReportStats':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        my: 1.5,
        '& > div': {
          display: 'flex',
          flexDirection: 'column',
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 600,
          color: '#1a1a1a',
          my: 0.5,
        },
        '& div': {
          display: 'flex',
          alignItems: 'center',
        },
        '& div .MuiTypography-body2': {
          ml: 0.5,
          fontSize: '0.75rem',
        },
      };

    // Generated Leads and Sales Stats Cards
    case 'generatedLeadsCard':
    case 'salesStatsCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      };

    case 'generatedLeadsChart':
    case 'salesStatsChart':
      return {
        position: 'relative',
        my: 1.5,
      };

    case 'leadsValue':
    case 'statsValue':
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1.5rem',
        fontWeight: 700,
      };

    case 'legendDot':
      return {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        mr: 0.5,
      };

    // Products and Countries Lists
    case 'productsList':
    case 'countriesList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      };

    case 'productItem':
    case 'countryItem':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .MuiTypography-body2': {
          flex: 1,
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 600,
          color: '#1a1a1a',
        },
      };

    case 'productIcon':
      return {
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        mr: 1,
      };

    // Sales Analytics Chart
    case 'salesAnalyticsChart':
      return {
        height: '200px',
      };

    // Team Members (Customers) List
    case 'teamMembersList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      };

    case 'teamMemberItem':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&.header .MuiTypography-body2': {
          fontWeight: 600,
          color: '#6e6b7b',
          fontSize: '0.8rem',
        },
        '& .MuiTypography-body2': {
          flex: 1,
          fontSize: '0.85rem',
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 500,
          color: '#1a1a1a',
        },
      };

    case 'memberIcon':
      return {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        mr: 1,
      };

    default:
      return {};
  }
};

export default getCrmStyle;