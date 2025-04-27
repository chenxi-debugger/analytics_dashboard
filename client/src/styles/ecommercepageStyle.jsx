import { css } from '@emotion/react';

const getEcommerceStyle = (className) => {
  switch (className) {
    case 'ecommerceMain':
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: '#f8f9fd',
      };

    case 'ecommerceContent':
      return {
        flex: 1,
        p: 2,
        overflowY: 'auto',
      };

    case 'congratulationsCard':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        bgcolor: 'linear-gradient(135deg, #7367f0, #9c93ff)',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      };

    case 'congratulationsContent':
      return {
        flex: 1,
      };

    case 'congratulationsAction':
      return {
        mt: 1.5,
        bgcolor: '#3b82f6',
        color: '#fff',
        p: '6px 12px',
        borderRadius: '4px',
        display: 'inline-block',
        cursor: 'pointer',
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
      };

    case 'congratulationsImage':
      return {
        '& img': {
          height: '80px',
          width: 'auto',
        },
      };

    case 'newVisitorsCard':
    case 'activityCard':
    case 'profitCard':
    case 'totalIncomeCard':
    case 'reportCard':
    case 'performanceCard':
    case 'conversionRateCard':
    case 'salesCard':
    case 'transactionsCard':
    case 'expensesCard':
    case 'revenueCard':
    case 'topProductsCard':
    case 'totalBalanceCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'typographyH6':
      return {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#5e5873',
      };

    case 'typographyH4':
      return {
        my: 1,
        color: '#1a1a1a',
        fontSize: '1.75rem',
        fontWeight: 700,
      };

    case 'typographyBody2':
      return {
        fontSize: '0.85rem',
        color: '#6e6b7b',
      };

    case 'visitorsStats':
    case 'activityStats':
    case 'salesStats':
      return {
        color: '#6e6b7b',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        '& .MuiTypography-body2': {
          ml: 0.5,
        },
      };

    case 'newVisitorsChart':
    case 'activityChart':
    case 'conversionRateChart':
    case 'expensesChart':
    case 'totalBalanceChart':
      return {
        height: '60px',
        bgcolor: '#f5f5f9',
        borderRadius: '6px',
        mt: 1.5,
      };

    case 'totalIncomeChart':
      return {
        height: '100px',
        bgcolor: '#f5f5f9',
        borderRadius: '6px',
        mt: 1.5,
      };

    case 'reportItem':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        my: 1,
        '& .MuiTypography-body2': {
          fontSize: '0.85rem',
          color: '#6e6b7b',
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 600,
          color: '#1a1a1a',
        },
      };

    case 'reportGrowth':
      return {
        display: 'flex',
        alignItems: 'center',
        '& .MuiTypography-body2': {
          ml: 0.5,
          fontSize: '0.8rem',
        },
      };

    case 'performanceHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.5,
      };

    case 'performanceStats':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        mb: 1.5,
        '& .MuiTypography-body2': {
          fontSize: '0.85rem',
          color: '#6e6b7b',
        },
      };

    case 'performanceChart':
      return {
        height: '180px',
        bgcolor: '#f5f5f9',
        borderRadius: '6px',
      };

    case 'conversionRateStats':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        my: 1.5,
        '& > div': {
          display: 'flex',
          flexDirection: 'column',
        },
        '& .MuiTypography-body2': {
          fontSize: '0.85rem',
          color: '#6e6b7b',
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

    case 'productsList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      };

    case 'productItem':
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
          fontSize: '0.85rem',
          color: '#5e5873',
          flex: 1,
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 500,
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

    case 'totalBalanceStats':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        my: 1.5,
        '& .MuiTypography-body2': {
          fontSize: '0.85rem',
          color: '#6e6b7b',
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 600,
          color: '#1a1a1a',
        },
      };

    case 'totalBalanceNote':
      return {
        fontSize: '0.75rem',
        color: '#6e6b7b',
        mt: 1.5,
      };

    case 'visitorsValue':
    case 'activityValue':
      return {
        my: 1,
        color: '#1a1a1a',
        fontSize: '1.75rem',
        fontWeight: 700,
      };

    default:
      return {};
  }
};

export default getEcommerceStyle;