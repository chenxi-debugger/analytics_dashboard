// getCalendarPageStyle.jsx
const getCalendarPageStyle = (key, options = {}) => {
    const { theme } = options;
    const styles = {
      mainContainer: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on larger
        flexGrow: 1,
        backgroundColor: theme?.palette?.background?.paper || '#212332', // Unified background
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        overflow: 'hidden', // Ensure no overflow outside the container
      },
      sidebarContainer: {
        width: { xs: '100%', md: '280px' }, // Full width on small screens, fixed on larger
        display: { xs: 'none', md: 'block' }, // Hidden by default on small screens
        backgroundColor: theme?.palette?.background?.paper || '#212332',
        p: 2,
        height: '750px', // Fixed height
      },
      drawerPaper: {
        width: '280px',
        backgroundColor: theme?.palette?.background?.paper || '#212332',
        borderRight: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
        borderRadius: '8px 0 0 0',
        top: '64px', // Adjust for Headerbar height (App.jsx has mt: 8, which is 64px)
        height: '750px', // Fixed height to match main calendar
      },
      miniCalendar: {
        backgroundColor: theme?.palette?.background?.paper || '#212332',
      },
      miniCalendarHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      },
      miniCalendarDays: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        textAlign: 'center',
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '10px',
      },
      miniCalendarDate: {
        p: 1,
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '12px',
        ...(options.selected && {
          backgroundColor: theme?.palette?.primary?.light || '#e0e7ff',
          borderRadius: '50%',
          color: theme?.palette?.primary?.main || '#696cff',
        }),
        ...(options.isCurrentDate && {
          backgroundColor: theme?.palette?.warning?.light || '#ffecd1',
          borderRadius: '10%',
          color: theme?.palette?.warning?.main || '#ff9f43',
        }),
      },
      filterSection: {
        mt: 2,
        borderTop: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
        pt: 2,
      },
      filterTitle: {
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '14px',
        fontWeight: 500,
        mb: 1,
        textTransform: 'uppercase',
      },
      filterCheckbox: {
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        '&.Mui-checked': {
          color: theme?.palette?.primary?.main || '#696cff',
        },
      },
      content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme?.palette?.background?.paper || '#212332',
        height: '750px', // Fixed height
      },
      calendarHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme?.palette?.background?.paper || '#212332',
        p: 1,
        borderBottom: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
      },
      addEventButton: {
        backgroundColor: theme?.palette?.primary?.main || '#696cff',
        color: theme?.palette?.primary?.contrastText || '#fff',
        textTransform: 'none',
        fontWeight: 500,
        padding: '8px 16px',
        borderRadius: '8px',
        mb: 2,
        width: '100%',
        '&:hover': {
          backgroundColor: theme?.palette?.primary?.dark || '#5a5fe6',
        },
      },
      calendarGrid: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)', // Single grid: 7 columns for days of the week
        gap: 0, // Remove gap to create a seamless grid
        backgroundColor: theme?.palette?.background?.paper || '#212332',
        p: 0, // Remove padding to ensure cells are adjacent
      },
      calendarDayHeader: {
        textAlign: 'center',
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '12px',
        fontWeight: 500,
        p: 1,
        borderBottom: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
        borderRight: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`, // Add right border for continuity
        '&:last-child': {
          borderRight: 'none', // Remove right border for the last header cell
        },
      },
      calendarDay: {
        borderRight: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
        borderBottom: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
        p: 1,
        minHeight: '100px',
        position: 'relative',
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '12px',
        '&:last-child': {
          borderRight: 'none', // Remove right border for the last cell in each row
        },
        '&:nth-child(7n)': {
          borderRight: 'none', // Remove right border for every 7th cell (end of row)
        },
        ...(options.disabled && {
          backgroundColor: theme?.palette?.action?.disabledBackground || '#2a2f3e',
          color: theme?.palette?.text?.disabled || '#6e6b7b',
        }),
        ...(options.isCurrentDate && {
          backgroundColor: theme?.palette?.warning?.light || '#ffecd1',
          border: `2px solid ${theme?.palette?.warning?.main || '#ff9f43'}`,
        }),
      },
      event: {
        backgroundColor: options.color || theme?.palette?.primary?.light || '#e0e7ff',
        color: theme?.palette?.text?.primary || '#5e5873',
        borderRadius: '4px',
        p: 0.5,
        fontSize: '10px',
        mb: 0.5,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      weekView: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '60px repeat(7, 1fr)',
        gap: 1,
        backgroundColor: theme?.palette?.background?.paper || '#212332',
        p: 2,
        overflowY: 'auto',
      },
      weekDayHeader: {
        textAlign: 'center',
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '12px',
        fontWeight: 500,
        p: 1,
        borderBottom: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
      },
      timeSlot: {
        borderBottom: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
        p: 1,
        height: '60px',
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '12px',
      },
      timeLabel: {
        textAlign: 'right',
        pr: 1,
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '12px',
      },
      weekEvent: {
        backgroundColor: options.color || theme?.palette?.primary?.light || '#e0e7ff',
        color: theme?.palette?.text?.primary || '#4b5563',
        borderRadius: '6px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        position: 'absolute',
        left: 2,
        right: 2,
        top: options.top || 0,
        height: options.height || '20px',
        zIndex: 1,
        fontSize: '11px',
        overflow: 'hidden',
      },
      dayView: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '60px 1fr',
        gap: 1,
        backgroundColor: theme?.palette?.background?.paper || '#212332',
        p: 2,
        overflowY: 'auto',
      },
      listView: {
        flex: 1,
        backgroundColor: theme?.palette?.background?.paper || '#212332',
        p: 2,
        overflowY: 'auto',
      },
      listEvent: {
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        borderBottom: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
      },
      listEventDate: {
        color: theme?.palette?.text?.secondary || '#a1a5b7',
        fontSize: '12px',
        fontWeight: 500,
        mb: 1,
      },
      listEventItem: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: options.color || theme?.palette?.primary?.light || '#e0e7ff',
        color: theme?.palette?.text?.primary || '#5e5873',
        borderRadius: '4px',
        p: 0.5,
        fontSize: '10px',
        mb: 0.5,
      },
    };
    return styles[key] || {};
  };
  
  export default getCalendarPageStyle;