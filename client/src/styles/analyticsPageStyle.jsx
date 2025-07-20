import { css } from '@emotion/react';
import { Margin, Padding } from '@mui/icons-material';
import { color } from 'echarts';

const getAnalyticsStyle = (className, theme) => {
  switch (className) {
    case 'analyticsMain':
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default, // Use theme background
        minHeight: '100vh',
        width: '100%',
      };

    case 'analyticsContent':
      return {
        flex: 1,
        overflowY: 'auto',
      };

    // Welcome Card
    case 'welcomeCard':
      return {
        px: 3,
        py: 1,
        color: theme.palette.primary.main, // Use primary color (was #7367f0)
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        bgcolor: theme.palette.background.paper, // Add background
        height: '180px',
      };

    case 'welcomeContent':
      return {
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: { xs: 'center', md: 'left' },
      };

    case 'welcomeTypographyH6':
      return {
        fontSize: '24px',
        fontWeight: 500,
        color: theme.palette.text.primary.main, // Use theme text color
      };

    case 'welcomeTypographyBody2':
      return {
        fontSize: '16px',
        width: '70%',
        color: theme.palette.text.secondary, // Use theme secondary text (was grey)
        mt: 1,
        opacity: 0.9,
      };

    case 'welcomeAction':
      return {
        mt: { xs: 1, md: 1.5 },
        bgcolor: theme.palette.background.paper, // Use theme background (was white)
        color: theme.palette.primary.main, // Use primary color (was #7367f0)
        border: `1px solid ${theme.palette.primary.main}`,
        p: { xs: '5px 10px', md: '5px 12px' },
        borderRadius: '6px',
        display: 'inline-block',
        cursor: 'pointer',
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: { xs: '11px', md: '12px' },
      };

    case 'welcomeImage':
      return {
        mt: { xs: 1.5, md: 0 },
        '& img': {
          height: { xs: '80px', sm: '100px', md: '120px', lg: '160px' },
          width: 'auto',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
        },
      };

    // Order Card
    case 'orderCard':
      return {
        p: 2,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        height: '180px',
      };

    case 'orderHeader':
      return {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'grey',
      };

    case 'orderValue':
      return {
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
        fontSize: '25px',
        fontWeight: 500,
        color: 'darkgrey',
      };

    case 'orderChart':
      return {
        width: '100%',
        maxHeight: '70px',
        pb: 1,
      };

    // Sales Card
    case 'salesCard':
      return {
        p: 2,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        height: '180px',
      };

    case 'salesHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        
      };

    case 'salesValue':
      return {
        my: 1,
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 600,
        color: 'darkgrey',
      };

    case 'salesGrowth':
      return {
        color: theme.palette.success.main, // Use success color (was #28c76f)
        fontSize: { xs: '18px', md: '18px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center', 
      };

    // Total Revenue + Company Growth
    case 'revenueGrowthCombined':
      return {
        p: { xs: 2.5, md: 3 },
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
        height: '400px',
      };

    case 'revenueGrowthContent':
      return {
        height: '100%',
      };

    case 'revenueSection':
      return {
        flex: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      };

    case 'revenueHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      };

    case 'revenueHeaderTypographyH6':
      return {
        fontSize: { xs: '24px', md: '24px' },
        color:'grey',
        fontWeight: 600,
        // Use theme text color (was #1a1a1a)
      };

    case 'revenueHeaderTypographyBody2':
      return {
        fontSize: { xs: '20px', md: '20px' },
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
        bgcolor: theme.palette.action.disabledBackground, // Use theme disabled background (was #f5f5f9)
        borderRadius: '6px',
        px: 1,
        py: 0.5,
      };

    case 'revenueChart':
      return {
        flex: 1,
        width: '100%',
        maxHeight: '300px',
      };

      case 'growthSection':
        return {
          flex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        };
  
      case 'growthTypographyH6':
        return {
          fontSize: { xs: '20px', md: '20px' },
          fontWeight: 600,
          color: theme.palette.text.secondary,
          mb: 1,
        };
  
      case 'growthProgress':
        return {
          position: 'relative',
          display: 'block',
          my: { xs: 1, md: 1.5 },
          width: '100%',
          height: '200px', // 与 ReactECharts 的 style 高度一致
        };
  
      case 'growthValue':
        return {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: { xs: '18px', md: '20px' },
          fontWeight: 600,
          color: theme.palette.text.primary,
        };
  
      case 'growthStats':
        return {
          justifyContent: 'center',
          gap: { xs: 1, md: 2 },
          mt: 1,
        };
  
      case 'growthStatItem':
        return {
          bgcolor: theme.palette.action.disabledBackground,
          p: { xs: 0.75, md: 1 },
          borderRadius: '6px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '80px',
        };
  
      case 'growthStatTypographyBody2':
        return {
          fontSize: { xs: '11px', md: '12px' },
          color: theme.palette.text.secondary,
        };

   

    // Payments Card
    case 'paymentsCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '80%',
        flex: { xs: 'none', sm: 1 },
        height: '180px',
      };

    case 'paymentsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: { xs: '20px', md: '20px' },
      };

    case 'paymentsValue':
      return {
        my: 0.5,
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
        fontSize: { xs: '25px', md: '25px' },
        fontWeight: 700,
        color: 'grey',
      };

    case 'paymentsGrowth':
      return {
        color: theme.palette.success.main, // Use success color (was #28c76f)
        fontSize: { xs: '20px', md: '20px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
      };

    // Revenue Stats Card
    case 'revenueStatsCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        flex: { xs: 'none', sm: 1 },
      };

    case 'revenueStatsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
      };

    case 'revenueStatsValue':
      return {
        my: 0.5,
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
        fontSize: { xs: '20px', md: '20px' },
        fontWeight: 700,
        color: 'grey',
      };

    case 'revenueStatsChart':
      return {
        flex: 1,
        width: '100%',
        maxHeight: '60px',
      };
      // Profit Report Card
    case 'profitCard':
      return {
        p: { xs: 1, md: 1.25 },
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        height: '180px',
        width: '100%',
      };

    case 'profitTextSection':
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 2,
        gap: 1.5,
        maxWidth: '40%', // Limit text section width
      };

    case 'profitTypographyH6':
      return {
        fontSize: { xs: '13px', md: '14px' },
        fontWeight: 600,
        color: theme.palette.text.primary,
      };

    case 'profitYear':
      return {
        bgcolor: theme.palette.warning.light,
        borderRadius: '6px',
        width: 'fit-content',
        px: 1.5,
        py: 0.5,
        color: theme.palette.text.secondary,
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 500,
        textTransform: 'uppercase',
      };

    case 'profitValue':
      return {
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
        color: theme.palette.text.primary,
      };

    case 'profitGrowth':
      return {
        color: theme.palette.success.main,
        fontSize: { xs: '20px', md: '20px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      };

    case 'profitChart':
      return {
        flex: 3.2, // Chart takes more space
        width: '70%', // Allocate more width to chart
        height: '120%',
        pl: '10px',
      };

    // Order Statistics Card
    case 'orderStatsCard':
      return {
        p: { xs: 1, md: 1.25 },
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        overflow: 'hidden',
        width: '100%',
      };

    case 'orderStatsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
      };

    case 'orderStatsTypographyH6':
      return {
        fontSize: { xs: '13px', md: '14px' },
        fontWeight: 600,
        color: theme.palette.text.primary, // Use theme text color
      };

    case 'orderStatsValue':
      return {
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
        my: 0.5,
      };

    case 'orderStatsTypographyBody2':
      return {
        fontSize: { xs: '11px', md: '12px' },
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
      };

    case 'orderStatsProgress':
      return {
        position: 'relative',
        display: 'inline-flex',
        my: { xs: 0.75, md: 1 },
        '& .MuiCircularProgress-root': {
          color: theme.palette.success.main, // Use success color (was #28c76f)
          size: { xs: '40px', md: '40px' },
        },
      };

    case 'orderStatsProgressTypographyBody2':
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
      };

    case 'orderStatsList':
      return {
        mt: { xs: 1, md: 1.5 },
        alignItems: 'flex-start',
      };

    case 'orderStatsItem':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: { xs: 0.75, md: 1 },
        width: '100%',
      };

    case 'orderStatsIcon':
      return {
        mr: 1,
      };

    case 'orderStatsItemTypographyBody2':
      return {
        fontSize: { xs: '11px', md: '12px' },
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
      };

    case 'orderStatsItemTypographyCaption':
      return {
        fontSize: { xs: '9px', md: '10px' },
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
      };

    // Income/Expenses/Profit Card
    case 'incomeCard':
      return {
        p: { xs: 1, md: 1.25 },
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
      };

    case 'incomeTabs':
      return {
        display: 'flex',
        gap: { xs: 0.75, md: 1 },
        mb: { xs: 0.75, md: 1 },
      };

    case 'incomeTabTypographyButton':
      return {
        p: { xs: '3px 6px', md: '4px 8px' },
        borderRadius: '6px',
        bgcolor: theme.palette.action.disabledBackground, // Use theme disabled background (was #f5f5f9)
        cursor: 'pointer',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
      };

    case 'incomeActiveTab':
      return {
        bgcolor: theme.palette.primary.main, // Use primary color (was #7367f0)
        color: theme.palette.primary.contrastText, // Use contrast text (was #fff)
      };

    case 'incomeTypographyH6':
      return {
        fontSize: { xs: '13px', md: '14px' },
        fontWeight: 600,
        color: theme.palette.text.primary, // Use theme text color
      };

    case 'incomeValue':
      return {
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
        my: 0.5,
      };

    case 'incomeStats':
      return {
        color: theme.palette.error.main, // Use error color (was #ea5455)
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        '& .MuiSvgIcon-root': {
          fontSize: { xs: '11px', md: '12px' },
        },
      };

    case 'incomeChart':
      return {
        flex: 1,
        width: '100%',
        minHeight: '50px',
      };

    // Transactions Card
    case 'transactionsCard':
      return {
        p: 2.5,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        width: '100%',
      };

    case 'transactionsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: { xs: 1, md: 1.5 },
      };

    case 'transactionsTypographyH6':
      return {
        fontSize: { xs: '13px', md: '14px' },
        fontWeight: 600,
        color: theme.palette.text.primary, // Use theme text color
      };

    case 'transactionsList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, md: 1.5 },
      };

    case 'transactionsItem':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };

    case 'transactionsIcon':
      return {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        mr: 1,
      };

    case 'transactionsItemTypographyBody2':
      return {
        fontSize: { xs: '11px', md: '12px' },
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
      };

    // Activity Timeline Card
    case 'activityCard':
      return {
        p: 2.5,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        width: '100%',
      };

    case 'activityHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: { xs: 1, md: 1.5 },
      };

    case 'activityTypographyH6':
      return {
        fontSize: { xs: '14px', md: '16px' },
        fontWeight: 600,
        color: theme.palette.text.primary, // Use theme text color
      };

    case 'activityList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, md: 1.5 },
      };

    case 'activityItem':
      return {
        display: 'flex',
        gap: 1.5,
        alignItems: 'center',
      };

    case 'activityIcon':
      return {
        width: '40px',
        height: '40px',
        fontSize: '1rem',
        fontWeight: 600,
      };

    case 'activityItemTypographyBody2':
      return {
        fontSize: { xs: '11px', md: '12px' },
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
      };

    case 'activityItemTypographyCaption':
      return {
        fontSize: { xs: '9px', md: '10px' },
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
      };

    case 'activityAttachment':
      return {
        color: theme.palette.primary.main, // Use primary color (was #7367f0)
        mt: 0.5,
        display: 'block',
      };

    case 'activityClient':
      return {
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.75, md: 1 },
        mt: 0.5,
      };

    case 'activityClientTypographyBody2':
      return {
        fontSize: { xs: '11px', md: '12px' },
        color: theme.palette.text.primary, // Use theme text color (was #1a1a1a)
      };

    case 'activityClientTypographyCaption':
      return {
        fontSize: { xs: '9px', md: '10px' },
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
      };

    case 'activityAvatars':
      return {
        display: 'flex',
        mt: { xs: 0.75, md: 1 },
      };

    case 'activityAvatar':
      return {
        width: { xs: '20px', md: '24px' },
        height: { xs: '20px', md: '24px' },
        mr: { xs: '-6px', md: '-8px' },
        border: `2px solid ${theme.palette.background.paper}`, // Use theme background (was #fff)
      };

    // Browser/Country Stats Card
    case 'browserCard':
      return {
        p: 2.5,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper, // Use theme background (was #fff)
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        width: '100%',
      };

    case 'browserTabs':
      return {
        display: 'flex',
        gap: { xs: 1, md: 1.5 },
        mb: { xs: 1, md: '1.5' },
      };

    case 'browserTabTypographyButton':
      return {
        p: { xs: '5px 10px', md: '6px 12px' },
        borderRadius: '6px',
        bgcolor: theme.palette.action.disabledBackground, // Use theme disabled background (was #f5f5f9)
        cursor: 'pointer',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
      };

    case 'browserList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, md: 1.5 },
      };

    case 'browserItem':
      return {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      };

    case 'browserItemTypographyBody2':
      return {
        fontSize: { xs: '11px', md: '12px' },
        color: theme.palette.text.secondary, // Use theme secondary text (was #6e6b7b)
      };

    case 'browserIcon':
      return {
        width: { xs: '20px', md: '24px' },
        height: { xs: '20px', md: '24px' },
      };

    case 'browserProgress':
      return {
        flex: 1,
        height: { xs: '6px', md: '8px' },
        bgcolor: theme.palette.action.disabledBackground, // Use theme disabled background (was #f5f5f9)
        borderRadius: '4px',
        overflow: 'hidden',
      };

    case 'browserProgressBar':
      return {
        height: '100%',
        borderRadius: '4px',
      };

    default:
      return {};
  }
};

export default getAnalyticsStyle;