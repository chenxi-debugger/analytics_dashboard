import { Margin } from "@mui/icons-material";

const getEmailPageStyle = (key, options = {}) => {
    const { theme } = options; // Ensure theme is passed in options
    const styles = {
      mainContainer: {
        display: 'flex',
        height: '100vh',
        backgroundColor: theme?.palette?.background?.default || '#1a1d29', // Dark background
      },
      sidebar: {
        width: '250px',
        borderRight: `1px solid ${theme?.palette?.divider || '#2a2f3e'}`,
        backgroundColor: theme?.palette?.background?.paper || '#212332', // Darker sidebar background
        display: 'flex',
        borderRadius: '8px 0 0 0',
        flexDirection: 'column',
      },
      composeButton: {
        backgroundColor: theme?.palette?.primary?.main || '#696cff', // Theme primary color for compose button
        color: theme?.palette?.primary?.contrastText || '#fff',
        textTransform: 'none',
        fontWeight: 500,
        padding: '8px 16px',
        borderRadius: '8px',
        marginLeft: '14px',
        marginTop: '6px',
        width: '190px',
        '&:hover': {
          backgroundColor: theme?.palette?.primary?.dark || '#5a5fe6', // Darker shade of primary on hover
        },
      },
      navItem: {
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: theme?.palette?.action?.hover || '#2a2f3e', // Hover effect using theme
        },
        ...(options.selected && {
          backgroundColor: theme?.palette?.action?.selected || '#2a2f3e', // Selected state background
          fontWeight: 600,
        }),
      },
      navIcon: {
        color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color for icons
        minWidth: '40px',
        ...(options.selected && {
          color: theme?.palette?.primary?.main || '#696cff', // Primary color for selected icon
        }),
      },
      navText: {
        color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color
        fontSize: '14px',
        ...(options.selected && {
          color: theme?.palette?.text?.primary || '#fff', // Primary text color for selected
          fontWeight: 600,
        }),
      },
      tabCount: {
        backgroundColor: theme?.palette?.action?.disabledBackground || '#2a2f3e', // Disabled background for tab count
        borderRadius: '12px',
        padding: '2px 8px',
        marginLeft: '8px',
      },
      labelsSection: {
        padding: '16px',
      },
      labelsTitle: {
        color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color for labels title
        fontSize: '12px',
        fontWeight: 500,
        marginBottom: '8px',
      },
      labelItem: {
        padding: '4px 16px',
        '&:hover': {
          backgroundColor: theme?.palette?.action?.hover || '#2a2f3e', // Hover effect using theme
        },
        ...(options.selected && {
          backgroundColor: theme?.palette?.action?.selected || '#2a2f3e', // Selected state background
        }),
      },
      labelDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: options.color || theme?.palette?.action?.disabled || '#ccc', // Use the label color or fallback
        marginRight: '8px',
      },
      labelText: {
        color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color for label text
        fontSize: '14px',
        ...(options.selected && {
          color: theme?.palette?.text?.primary || '#fff', // Primary text color for selected
          fontWeight: 600,
        }),
      },
      content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        backgroundColor: theme?.palette?.background?.default || '#1a1d29', // Dark background for content
      },
      breadcrumbs: {
        marginBottom: '16px',
      },
      breadcrumbItem: {
        color: options.active
          ? theme?.palette?.primary?.main || '#696cff'
          : theme?.palette?.text?.secondary || '#a1a5b7', // Primary for active, secondary for inactive
        fontSize: '14px',
        ...(options.active && {
          fontWeight: 600,
        }),
      },
      searchBarContainer: {
        marginBottom: '16px',
      },
      searchField: {
        width: '100%',
        backgroundColor: theme?.palette?.background?.paper || '#212332', // Paper background for search field
        borderRadius: '4px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme?.palette?.divider || '#2a2f3e', // Divider color for border
          },
          '&:hover fieldset': {
            borderColor: theme?.palette?.primary?.main || '#696cff', // Primary color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: theme?.palette?.primary?.main || '#696cff', // Primary color when focused
          },
        },
        '& .MuiInputBase-input': {
          color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color for input
        },
      },
      emailList: {
        flex: 1,
        overflow: 'auto',
        backgroundColor: theme?.palette?.background?.paper || '#212332', // Paper background for email list
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      },
      enhancedTableToolbar: {
        backgroundColor: theme?.palette?.action?.disabledBackground || '#2a2f3e', // Disabled background for toolbar
        padding: '8px 16px',
      },
      emailCheckbox: {
        color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color for checkbox
        '&.Mui-checked': {
          color: theme?.palette?.primary?.main || '#696cff', // Primary color when checked
        },
      },
      emailItem: {
        '&:hover': {
          backgroundColor: theme?.palette?.action?.hover || '#2a2f3e', // Hover effect using theme
        },
        '&.Mui-selected': {
          backgroundColor: theme?.palette?.action?.selected || '#2a2f3e', // Selected state background
        },
      },
      emailStarIcon: {
        color: options.starred
          ? theme?.palette?.warning?.main || '#ffab00'
          : theme?.palette?.text?.secondary || '#a1a5b7', // Warning color for starred, secondary otherwise
        fontSize: '20px',
      },
      emailAvatar: {
        width: '32px',
        height: '32px',
        fontSize: '14px',
        backgroundColor: theme?.palette?.primary?.main || '#696cff', // Primary color for avatar background
      },
      emailSender: {
        fontSize: '14px',
        fontWeight: 500,
        color: theme?.palette?.text?.primary || '#fff', // Primary text color for sender
      },
      emailSubject: {
        fontSize: '14px',
        fontWeight: 500,
        color: theme?.palette?.text?.primary || '#fff', // Primary text color for subject
      },
      emailSnippet: {
        fontSize: '12px',
        color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color for snippet
      },
      emailLabels: {
        display: 'flex',
        gap: '4px',
      },
      emailLabelDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: options.color || theme?.palette?.action?.disabled || '#ccc', // Use the label color or fallback
      },
      emailActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      },
      emailTime: {
        fontSize: '12px',
        color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color for time
      },
      actionIcon: {
        color: theme?.palette?.text?.secondary || '#a1a5b7', // Secondary text color for action icons
        fontSize: '20px',
        '&:hover': {
          color: theme?.palette?.primary?.main || '#696cff', // Primary color on hover
        },
      },
    };
  
    return styles[key] || {};
  };
  
  export default getEmailPageStyle;