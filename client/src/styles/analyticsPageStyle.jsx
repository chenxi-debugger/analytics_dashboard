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
        color: theme.palette.primary.main,
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        bgcolor: theme.palette.background.paper,
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
        color: theme.palette.text.primary.main,
      };

    case 'welcomeTypographyBody2':
      return {
        fontSize: '16px',
        width: '70%',
        color: theme.palette.text.secondary,
        mt: 1,
        opacity: 0.9,
      };

    case 'welcomeAction':
      return {
        mt: { xs: 1, md: 1.5 },
        bgcolor: theme.palette.background.paper,
        color: theme.palette.primary.main,
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
        bgcolor: theme.palette.background.paper,
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
        color: theme.palette.text.primary,
        fontSize: '25px',
        fontWeight: 500,
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
        bgcolor: theme.palette.background.paper,
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
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 600,
        color: 'darkgrey',
      };

    case 'salesGrowth':
      return {
        color: theme.palette.success.main,
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
        bgcolor: theme.palette.background.paper,
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
        color: 'grey',
        fontWeight: 600,
      };

    case 'revenueHeaderTypographyBody2':
      return {
        fontSize:'20px',
        color: theme.palette.text.secondary,
        bgcolor: theme.palette.action.disabledBackground,
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
        fontSize: '20px',
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
        height: '200px',
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
        fontSize: '20px',
      };

    case 'paymentsValue':
      return {
        my: 0.5,
        fontSize: '25px',
        fontWeight: 700,
        color: 'grey',
      };

    case 'paymentsGrowth':
      return {
        color: theme.palette.success.main,
        fontSize: '20px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
      };

    // Revenue Stats Card
    case 'revenueStatsCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
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
        
        fontSize: '20px' ,
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
        maxWidth: '40%',
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
        fontSize: '20px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      };

    case 'profitChart':
      return {
        flex: 3.2,
        width: '70%',
        height: '120%',
        pl: '10px',
      };

    // Order Statistics Card
    case 'orderStatsCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
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
        fontSize: { xs: '24px', md: '24px' },
        fontWeight: 600,
        color: 'grey',
      };

    case 'orderStatsValue':
      return {
        fontSize: { xs: '14px', md: '14px' },
        fontWeight: 400,
        color: 'grey',
        pl: 0,
      };

    case 'orderStatsTypographyBody2':
      return {
        fontSize: { xs: '18px', md: '18px' },
        color: theme.palette.text.secondary,
      };

    case 'orderStatsProgress':
      return {
        position: 'relative',
        display: 'inline-flex',
        my: { xs: 0.75, md: 1 },
        '& .MuiCircularProgress-root': {
          color: theme.palette.success.main,
          size: { xs: '40px', md: '40px' },
        },
      };

    case 'orderStatsProgressTypographyBody2':
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        fontWeight: 600,
        color: theme.palette.text.primary,
      };

    case 'orderStatsList':
      return {
        mt: { xs: 1, md: 2 },
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
        size: '40px',
      };

    case 'orderStatsItemTypographyBody2':
      return {
        fontSize: { xs: '18px', md: '18px' },
        color: theme.palette.text.primary,
      };

    case 'orderStatsItemTypographyCaption':
      return {
        fontSize: { xs: '15px', md: '15px' },
        color: theme.palette.text.secondary,
      };

    // Income/Expenses/Profit Card
    case 'incomeCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
      };

    case 'incomeTabs':
      return {
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        mb: 2,
      };

    case 'incomeTabTypographyButton':
      return {
        p: '6px 10px',
        borderRadius: '6px',
        bgcolor: theme.palette.action.disabledBackground,
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 500,
        color: theme.palette.text.secondary,
        mb: 1,
      };

    case 'incomeActiveTab':
      return {
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      };

    case 'incomeTypographyH6':
      return {
        fontSize: { xs: '13px', md: '20px' },
        fontWeight: 600,
        color: 'grey',
      };

    case 'incomeValue':
      return {
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
        color: 'green',
        my: 0.5,
      };

    case 'incomeStats':
      return {
        color: theme.palette.success.main,
        fontSize: '14px',
        fontWeight: 600,
      };

    case 'incomeChart':
      return {
        width: '100%',
        maxHeight: '100px',
        minHeight: '50px',
      };

    // TransactionsCard Styles
    case 'transactionsCard':
      return {
        p: 4,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
      };

    case 'transactionsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
      };

    case 'transactionsTypographyH6':
      return {
        fontSize: { xs: '13px', md: '14px' },
        fontWeight: 600,
        color: theme.palette.text.primary,
      };

    case 'transactionsList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, md: 2 },
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
        color: theme.palette.text.secondary,
      };

    // Activity Timeline Card
    case 'activityCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
        mb: 1,
        
      };

    case 'activityHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      };

    case 'activityTypographyH6':
      return {
        fontSize: '25px',
        fontWeight: 600,
        color: 'grey',
        width: '100%',
        mb: 3,
      };

    case 'activityList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      };

    case 'activityItem':
      return {
        display: 'flex',
        justifyContent: 'space-around',
        gap: 4,
        alignItems: 'center',
        width: '90%',
      };

    case 'activityIcon':
      return {
        width: '50px',
        height: '50px',
        fontSize: '1rem',
        fontWeight: 600,
      };

    case 'activityItemTypographyBody2':
      return {
        fontSize: '18px',
        color: 'green',
      };

    case 'activityItemTypographyCaption':
      return {
        fontSize: '15px',
        color: theme.palette.text.secondary,
      };

    case 'activityAttachment':
      return {
        color: theme.palette.primary.main,
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
        fontSize: '15px',
        color: theme.palette.text.primary,
      };

    case 'activityClientTypographyCaption':
      return {
        fontSize: '12px',
        color: theme.palette.text.secondary,
      };

    case 'activityAvatars':
      return {
        display: 'flex',
        mt: { xs: 0.75, md: 1 },
      };

    case 'activityAvatar':
      return {
        width: '50px',
        height: '50px',
        mr: { xs: '-6px', md: '-8px' },
        border: `2px solid ${theme.palette.background.paper}`,
      };

    // Browser/Country Stats Card
    case 'browserCard':
      return {
        p: 3,
        borderRadius: '10px',
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '100%',
        mb: 1,
      };

    case 'browserTabs':
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItem:'center',
        gap: 4,
      };

    case 'browserTabTypographyButton':
      return {
        p: '6px 12px',
        borderRadius: '6px',
        bgcolor: theme.palette.action.disabledBackground,
        cursor: 'pointer',
        fontSize: { xs: '11px', md: '18px' },
        fontWeight: 700,
        color: theme.palette.text.secondary,
        mb:3,
      };

    case 'browserActiveTab':
      return {
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      };

    case 'browserList':
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      };

    case 'browserItem':
      return {
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      };

    case 'browserItemTypographyBody2':
      return {
        fontSize:'18px',
        color: theme.palette.text.secondary,
      };

    case 'browserIcon':
      return {
        width: '32px' ,
        height: '32px' ,
      };

    case 'browserProgress':
      return {
        flex: 1,
        height: '10px' ,
        bgcolor: theme.palette.action.disabledBackground,
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