import { css } from '@emotion/react';

const getCrmStyle = (className, theme) => {
  switch (className) {
    // crmMain and crmContent (Global Layout)
    case 'crmMain':
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',

      };

    case 'crmContent':
      return {
        flex: 1,
        p: 1,
        overflowY: 'hidden',
      };

    // Typography Styles (Global)
    case 'typographyH6':
      return {
        fontSize: '1rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
      };

    case 'typographyH4':
      return {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: theme.palette.text.primary,
      };

    case 'typographyBody2':
      return {
        fontSize: '0.85rem',
        color: theme.palette.text.secondary,
      };

    // Customer Rating Card
    case 'customerRatingCard':
  return {
    p: 3,
    borderRadius: '8px',
    bgcolor: theme.palette.background.paper,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    height: '400px',
    width: '100%',
    flexGrow: 1,
    display: 'flex',          // ✅ add this
    flexDirection: 'column',  // ✅ and this
  };


      case 'customerRatingTitle':
        return {
          fontSize: '24px',
          fontWeight: 600,
          color: theme.palette.grey[600], // 灰色，使用 Material-UI 的 grey[600] 作为示例
        };

    case 'ratingValue':
      return {
        display: 'flex',
        alignItems: 'center',
        fontSize: '24px',
        my: 2,
      };

    case 'stars':
      return {
        ml: 2,
      };

    case 'customerRatingChart':
      return {
        height: '150px',
        borderRadius: '6px',

      };

    // Overview Sales Card
    case 'overviewSalesCard':
      return {
        p: 3,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height: '400px',
      };

    case 'overviewSalesHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.5,
      };

    case 'overviewSalesStats':
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

    case 'overviewSalesChart':
      return {
        height: '60px', // 保持与图片一致
        borderRadius: '6px',
      };

     //session card
      case 'sessionsCard':
        return {
          p: 3,
          borderRadius: '10px',
          bgcolor: theme.palette.background.paper,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '180px',
          width: '100%',
        };

      case 'sessionsHeader':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: { xs: '16px', md: '18px' },
          fontWeight: 600,
          color: theme.palette.text.primary,
        };

      case 'sessionsValue':
        return {
          my: 0.5,
          fontSize: { xs: '24px', md: '26px' },
          fontWeight: 700,
          color: theme.palette.text.primary,
        };

      case 'sessionsGrowth':
        return {
          color: theme.palette.success.main,
          fontSize: { xs: '14px', md: '16px' },
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
        };

      case 'sessionsChart':
        return {
          mt: 1,
          height: '60px',
          width: '100%',
        };

    // Orders Card
    case 'ordersCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        flex: { xs: 'none', sm: 1 },
        height: '180px',
      };

    case 'ordersHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: { xs: '20px', md: '20px' },
      };

    case 'ordersValue':
      return {
        my: 0.5,
        color: theme.palette.text.primary,
        fontSize: { xs: '25px', md: '25px' },
        fontWeight: 700,
        color: 'grey',
      };

    case 'ordersGrowth':
      return {
        color: theme.palette.error.main,
        fontSize: { xs: '20px', md: '20px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
      };

    // Generated Leads Card
    case 'generatedLeadsCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        flex: { xs: 'none', sm: 1 },
        height: '195px',
      };

    case 'generatedLeadsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: { xs: '20px', md: '20px' },
      };

    case 'generatedLeadsValue':
      return {
        my: 0.5,
        fontSize: { xs: '25px', md: '25px' },
        fontWeight: 700,
        color: 'grey',
      };

    case 'generatedLeadsGrowth':
      return {
        color: theme.palette.success.main,
        fontSize: { xs: '20px', md: '20px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
      };

    

    // Top Products by Sales Card
    case 'topProductsSalesCard':
      return {
        p: 3,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height: '440px',
      };

    case 'topProductsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
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
        '& .MuiTypography-body2': {
          flex: 1,
          fontSize: '0.85rem',
          color: theme.palette.text.secondary,
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 600,
          color: theme.palette.text.primary,
        },
      };

    case 'productIcon':
      return {
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        mr: 1,
      };

    // Top Products by Volume Card
    case 'topProductsVolumeCard':
      return {
        p: 3,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height: '440px',
      };

    // Earning Report Card
    case 'earningReportCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      };

    case 'earningReportHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.5,
      };

    case 'earningReportStats':
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

    case 'earningReportChart':
      return {
        height: '90px',
        borderRadius: '6px',
        mt: 1.5,
      };

    // Sales Analytics Card
    case 'salesAnalyticsCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height:'440px',
      };

    case 'salesAnalyticsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1.5,
      };

    case 'salesAnalyticsChart':
      return {
        height: '200px',
      };

    // Sales Countries Card
    case 'salesCountriesCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height:'540px',
      };


    // Sales Stats Card
    case 'salesStatsCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        height:'440px',
      };

    case 'salesStatsChart':
      return {
        position: 'relative',
        my: 1.5,
      };

    case 'statsValue':
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: theme.palette.text.primary,
      };

    case 'legendDot':
      return {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        mr: 0.5,
      };

    // Team Members (Customers) Card
    case 'customersMembersCard':
      return {
        p: 2,
        borderRadius: '8px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      };

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
          color: theme.palette.text.secondary,
          fontSize: '0.8rem',
        },
        '& .MuiTypography-body2': {
          flex: 1,
          fontSize: '0.85rem',
        },
        '& .MuiTypography-body2:nth-of-type(2)': {
          fontWeight: 500,
          color: theme.palette.text.primary,
        },
      };

    case 'memberIcon':
      return {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        mr: 1,
        bgcolor: theme.palette.divider,
      };

    default:
      return {};
  }
};

export default getCrmStyle;