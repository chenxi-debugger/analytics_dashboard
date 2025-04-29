import { css } from '@emotion/react';
import { Margin, Padding } from '@mui/icons-material';
import { color } from 'echarts';

const getAnalyticsStyle = (className) => {
  switch (className) {
    case 'analyticsMain':
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: '#f5f5f9',
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
        p: { xs: 1.5, md: 2.5 },
        color: '#7367f0',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        Padding: '50px',
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
      };

    case 'welcomeTypographyBody2':
      return {
        fontSize: '18px',
        width: '65%',
        color: 'grey',
        mt: 1,
        opacity: 0.9,
      };

    case 'welcomeAction':
      return {
        mt: { xs: 1, md: 1.5 },
        bgcolor: 'white',
        color: ' #7367f0',
        border: '1px solid #7367f0',
        p: { xs: '5px 10px', md: '6px 12px' },
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
        p: { xs: 1.5, md: 2 },
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
      };

    case 'orderHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };

    case 'orderValue':
      return {
        my: 1,
        color: '#1a1a1a',
        fontSize: { xs: '20px', md: '24px' },
        fontWeight: 700,
      };

    case 'orderChart':
      return {
        flex: 1,
        width: '100%',
        maxHeight: '80px',
      };

    // Sales Card
    case 'salesCard':
      return {
        p: { xs: 1.5, md: 2 },
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
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
        color: '#1a1a1a',
        fontSize: { xs: '20px', md: '24px' },
        fontWeight: 700,
      };

    case 'salesGrowth':
      return {
        color: '#28c76f',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      };

    // Total Revenue + Company Growth
    case 'revenueGrowthCombined':
  return {
    p: { xs: 1.5, md: 2.5 },
    borderRadius: '10px',
    bgcolor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    width: '100%',
  };

case 'revenueGrowthContent':
  return {
    gap: { xs: 1.5, md: 2.5 },
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
    mb: 1.5,
  };

case 'revenueHeaderTypographyH6':
  return {
    fontSize: { xs: '14px', md: '16px' },
    fontWeight: 600,
    color: '#1a1a1a',
  };

case 'revenueHeaderTypographyBody2':
  return {
    fontSize: { xs: '11px', md: '12px' },
    color: '#6e6b7b',
    bgcolor: '#f5f5f9',
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
    fontSize: { xs: '14px', md: '16px' },
    fontWeight: 600,
    color: '#6e6b7b',
    mb: 1,
  };

case 'growthProgress':
  return {
    position: 'relative',
    display: 'inline-flex',
    my: { xs: 1, md: 1.5 },
    '& .MuiCircularProgress-root': {
      color: '#7367f0', // Fallback color
      size: { xs: '60px', md: '80px' },
      thickness: 6,
      background: 'linear-gradient(90deg, #e0e0e0 0%, #e0e0e0 100%)',
      borderRadius: '50%',
    },
  };

case 'growthValue':
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: { xs: '18px', md: '20px' },
    fontWeight: 600,
    color: '#1a1a1a',
  };

case 'growthStats':
  return {
    justifyContent: 'center',
    gap: { xs: 1, md: 2 },
    mt: 1,
  };

case 'growthStatItem':
  return {
    bgcolor: '#f5f5f9',
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
    color: '#6e6b7b',
  };

    // Payments Card
    case 'paymentsCard':
      return {
        p: { xs: 1, md: 1.25 },
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        width: '100%',
       
        flex: { xs: 'none', sm: 1 }, // Flex 1 on sm+ to split space evenly, none on xs
      };

    case 'paymentsHeader':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };

    case 'paymentsValue':
      return {
        my: 0.5,
        color: '#1a1a1a',
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
      };

    case 'paymentsGrowth':
      return {
        color: '#28c76f',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      };

    // Revenue Stats Card
    case 'revenueStatsCard':
      return {
        p: { xs: 1, md: 1.25 },
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        flex: { xs: 'none', sm: 1 }, // Flex 1 on sm+ to split space evenly, none on xs
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
        color: '#1a1a1a',
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
      };

    case 'revenueStatsChart':
      return {
        flex: 1,
        width: '100%',
        maxHeight: '50px',
      };

    // Profit Report Card
    case 'profitCard':
      return {
        p: { xs: 1, md: 1.25 },
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        // width: '100%',
        display: 'flex',
        flexDirection: 'row',
      };
    
    case 'profitTextSection':
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '30px',
        gap: 2,
      };
    
    case 'profitTypographyH6':
      return {
        fontSize: { xs: '13px', md: '14px' },
        fontWeight: 600,
        mb: 0.5,
      };
    
    case 'profitYear':
      return {
        bgcolor: '#ffe4b5', // Light orange background as in the image
        borderRadius: '6px',
        width: 'fit-content',
        px: 1.5,
        py: 0.5,
        color: '#6e6b7b',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 500,
        textTransform: 'uppercase',
        mb: 1,
      };
    
    case 'profitValue':
      return {
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
        color: '#1a1a1a',
        mb: 0.5,
      };
    
    case 'profitGrowth':
      return {
        color: '#28c76f',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      };
    
    case 'profitChart':
      return {
        flex: 1,
        width: '150px',
        height: '200px', // Stretch to fit the card height
        // minWidth: '100px', 
      };

    // Order Statistics Card
    case 'orderStatsCard':
      return {
        p: { xs: 1, md: 1.25 },
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        overflow: 'hidden',
        width: '100%',
        // height: '100%',
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
      };

    case 'orderStatsValue':
      return {
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
        color: '#1a1a1a',
        my: 0.5,
      };

    case 'orderStatsTypographyBody2':
      return {
        fontSize: { xs: '11px', md: '12px' },
        color: '#6e6b7b',
      };

    case 'orderStatsProgress':
      return {
        position: 'relative',
        display: 'inline-flex',
        my: { xs: 0.75, md: 1 },
        '& .MuiCircularProgress-root': {
          color: '#28c76f',
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
        color: '#1a1a1a',
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
        color: '#1a1a1a',
      };

    case 'orderStatsItemTypographyCaption':
      return {
        fontSize: { xs: '9px', md: '10px' },
        color: '#6e6b7b',
      };

    // Income/Expenses/Profit Card
    case 'incomeCard':
      return {
        p: { xs: 1, md: 1.25 },
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        // height: '100%',
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
        bgcolor: '#f5f5f9',
        cursor: 'pointer',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        color: '#6e6b7b',
      };

    case 'incomeActiveTab':
      return {
        bgcolor: '#7367f0',
        color: '#fff',
      };

    case 'incomeTypographyH6':
      return {
        fontSize: { xs: '13px', md: '14px' },
        fontWeight: 600,
      };

    case 'incomeValue':
      return {
        fontSize: { xs: '18px', md: '20px' },
        fontWeight: 700,
        color: '#1a1a1a',
        my: 0.5,
      };

    case 'incomeStats':
      return {
        color: '#ea5455',
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
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        width: '100%',
        // height: '100%',
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
        color: '#6e6b7b',
      };

    // Activity Timeline Card
    case 'activityCard':
      return {
        p: 2.5,
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        width: '100%',
        // height: '100%',
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
        color: '#1a1a1a',
      };

    case 'activityItemTypographyCaption':
      return {
        fontSize: { xs: '9px', md: '10px' },
        color: '#6e6b7b',
      };

    case 'activityAttachment':
      return {
        color: '#7367f0',
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
        color: '#1a1a1a',
      };

    case 'activityClientTypographyCaption':
      return {
        fontSize: { xs: '9px', md: '10px' },
        color: '#6e6b7b',
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
        border: '2px solid #fff',
      };

    // Browser/Country Stats Card
    case 'browserCard':
      return {
        p: 2.5,
        borderRadius: '10px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        width: '100%',
        // height: '100%',
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
        bgcolor: '#f5f5f9',
        cursor: 'pointer',
        fontSize: { xs: '11px', md: '12px' },
        fontWeight: 600,
        color: '#6e6b7b',
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
        color: '#6e6b7b',
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
        bgcolor: '#f5f5f9',
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