import { css } from '@emotion/react';

const getEcommerceStyle = (className, theme) => {
  switch (className) {
    case 'ecommerceMain':
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
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
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
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
        bgcolor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
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
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'activityCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'profitCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'totalIncomeCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'reportCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'performanceCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'conversionRateCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'salesCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'transactionsCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'expensesCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'revenueCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'topProductsCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'totalBalanceCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      };

    case 'typographyH6':
      return {
        fontSize: '1rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
      };

    case 'typographyH4':
      return {
        my: 1,
        color: theme.palette.text.primary,
        fontSize: '1.75rem',
        fontWeight: 700,
      };

    case 'typographyBody2':
      return {
        fontSize: '0.85rem',
        color: theme.palette.text.secondary,
      };

    case 'visitorsStats':
      return {
        color: theme.palette.text.secondary,
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        '& .MuiTypography-body2': {
          ml: 0.5,
        },
      };

    case 'activityStats':
      return {
        color: theme.palette.text.secondary,
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        '& .MuiTypography-body2': {
          ml: 0.5,
        },
      };

    case 'salesStats':
      return {
        color: theme.palette.text.secondary,
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        '& .MuiTypography-body2': {
          ml: 0.5,
        },
      };

    case 'newVisitorsChart':
      return {
        height: '60px',
        bgcolor: theme.palette.action.disabledBackground,
        borderRadius: '6px',
        mt: 1.5,
      };

    case 'activityChart':
      return {
        height: '60px',
        bgcolor: theme.palette.action.disabledBackground,
        borderRadius: '6px',
        mt: 1.5,
      };

    case 'conversionRateChart':
      return {
        height: '60px',
        bgcolor: theme.palette.action.disabledBackground,
        borderRadius: '6px',
        mt: 1.5,
      };

    case 'expensesChart':
      return {
        height: '60px',
        bgcolor: theme.palette.action.disabledBackground,
        borderRadius: '6px',
        mt: 1.5,
      };

    case 'totalBalanceChart':
      return {
        height: '60px',
        bgcolor: theme.palette.action.disabledBackground,
        borderRadius: '6px',
        mt: 1.5,
      };

    case 'totalIncomeChart':
      return {
        height: '100px',
        bgcolor: theme.palette.action.disabledBackground,
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
          color: theme.palette.text.secondary,
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 600,
          color: theme.palette.text.primary,
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
          color: theme.palette.text.secondary,
        },
      };

    case 'performanceChart':
      return {
        height: '180px',
        bgcolor: theme.palette.action.disabledBackground,
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
          color: theme.palette.text.secondary,
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 600,
          color: theme.palette.text.primary,
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
          color: theme.palette.text.secondary,
          fontSize: '0.8rem',
        },
        '& .MuiTypography-body2': {
          fontSize: '0.85rem',
          color: theme.palette.text.primary,
          flex: 1,
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 500,
          color: theme.palette.text.primary,
        },
      };

    case 'productIcon':
      return {
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        mr: 1,
        bgcolor: theme.palette.divider,
      };

    case 'totalBalanceStats':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        my: 1.5,
        '& .MuiTypography-body2': {
          fontSize: '0.85rem',
          color: theme.palette.text.secondary,
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 600,
          color: theme.palette.text.primary,
        },
      };

    case 'totalBalanceNote':
      return {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
        mt: 1.5,
      };

    case 'visitorsValue':
      return {
        my: 1,
        color: theme.palette.text.primary,
        fontSize: '1.75rem',
        fontWeight: 700,
      };

    case 'activityValue':
      return {
        my: 1,
        color: theme.palette.text.primary,
        fontSize: '1.75rem',
        fontWeight: 700,
      };

    default:
      return {};
  }
};

export default getEcommerceStyle;