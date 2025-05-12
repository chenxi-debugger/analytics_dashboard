const getChatpageStyle = (key, props = {}) => {
  const { theme } = props;
  const styles = {
    mainContainer: {
      display: 'flex',
      height: '100%',
      backgroundColor: theme?.palette?.background?.default || '#f5f5f9',
    },
    sidebar: {
      width: '360px',
      borderRight: `1px solid ${theme?.palette?.divider || '#e0e0e0'}`,
      backgroundColor: theme?.palette?.background?.paper || '#fff',
      display: 'flex',
      flexDirection: 'column',
    },
    searchBarContainer: {
      p: 2,
      display: 'flex',
      alignItems: 'center',
    },
    searchField: {
      flexGrow: 1,
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        backgroundColor: theme?.palette?.background?.default || '#f5f5f9',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme?.palette?.divider || '#e0e0e0',
      },
      '& .MuiInputBase-input': {
        color: theme?.palette?.text?.secondary || '#6e6b7b',
      },
    },
    sectionTitle: {
      px: 2,
      py: 1,
      color: theme?.palette?.text?.secondary || '#5e5873',
      fontWeight: 500,
      textTransform: 'uppercase',
      fontSize: '0.75rem',
    },
    chatItem: {
      py: 1,
      px: 2,
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme?.palette?.action?.hover || '#f5f5f9',
        cursor: 'pointer',
      },
      '&.Mui-selected': {
        backgroundColor: theme?.palette?.action?.selected || '#e0e7ff',
      },
    },
    contactItem: {
      py: 1,
      px: 2,
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme?.palette?.action?.hover || '#f5f5f9',
        cursor: 'pointer',
      },
      '&.Mui-selected': {
        backgroundColor: theme?.palette?.action?.selected || '#e0e7ff',
      },
    },
    avatar: {
      width: 40,
      height: 40,
      mr: 2,
    },
    contactAvatar: {
      width: 40,
      height: 40,
      mr: 2,
      backgroundColor: props.color || theme?.palette?.action?.disabled || '#e0e0e0',
      color: theme?.palette?.text?.primary || '#fff',
      fontSize: '0.875rem',
    },
    chatName: {
      fontWeight: 500,
      color: theme?.palette?.text?.primary || '#5e5873',
    },
    chatSnippet: {
      color: theme?.palette?.text?.secondary || '#b9b9c3',
      fontSize: '0.875rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    chatTime: {
      color: theme?.palette?.text?.secondary || '#b9b9c3',
      fontSize: '0.75rem',
    },
    unreadBadge: {
      '& .MuiBadge-badge': {
        backgroundColor: theme?.palette?.error?.main || '#ea5455', // Style the badge itself
        color: theme?.palette?.error?.contrastText || '#fff',
        marginTop: '13px',
        marginRight: '20px',
        width: 20,
        height: 20,
        borderRadius: '50%',
        fontSize: '0.75rem',
      },
    },
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    startButton: {
      borderRadius: '20px',
      textTransform: 'none',
      fontWeight: 500,
      px: 3,
      py: 1,
      backgroundColor: theme?.palette?.background?.paper || '#fff',
      color: theme?.palette?.text?.primary || '#5e5873',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        backgroundColor: theme?.palette?.action?.hover || '#f5f5f9',
      },
    },
    chatHeader: {
      p: 2,
      borderBottom: `1px solid ${theme?.palette?.divider || '#e0e0e0'}`,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme?.palette?.background?.paper || '#fff',
    },
    chatHeaderAvatar: {
      width: 40,
      height: 40,
      mr: 2,
    },
    chatHeaderName: {
      fontWeight: 500,
      color: theme?.palette?.text?.primary || '#5e5873',
    },
    chatHeaderStatus: {
      color: theme?.palette?.text?.secondary || '#b9b9c3',
      fontSize: '0.875rem',
    },
    messageContainer: {
      flexGrow: 1,
      p: 2,
      pb: 8, // Added padding-bottom to prevent overlap with footer
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      backgroundColor: theme?.palette?.background?.default || '#f5f5f9',
    },
    message: {
      maxWidth: '60%',
      p: 1.5,
      borderRadius: '15px',
      backgroundColor: props.isSent
        ? theme?.palette?.primary?.main || '#635ee7'
        : theme?.palette?.background?.paper || '#f5f5f9',
      color: props.isSent
        ? theme?.palette?.primary?.contrastText || '#fff'
        : theme?.palette?.text?.primary || '#5e5873',
      alignSelf: props.isSent ? 'flex-end' : 'flex-start',
    },
    messageTime: {
      fontSize: '0.75rem',
      color: theme?.palette?.text?.secondary || '#b9b9c3',
      mt: 0.5,
      alignSelf: props.isSent ? 'flex-end' : 'flex-start',
    },
    inputContainer: {
      p: 2,
      borderTop: `1px solid ${theme?.palette?.divider || '#e0e0e0'}`,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme?.palette?.background?.paper || '#fff',
      gap: 1,
      marginBottom: 2,
    },
    messageInput: {
      flexGrow: 1,
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        backgroundColor: theme?.palette?.background?.default || '#f5f5f9',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme?.palette?.divider || '#e0e0e0',
      },
      '& .MuiInputBase-input': {
        color: theme?.palette?.text?.primary || '#5e5873',
      },
    },
    sendButton: {
      borderRadius: '20px',
      textTransform: 'uppercase',
      fontWeight: 500,
      px: 3,
      py: 1,
      backgroundColor: theme?.palette?.primary?.main || '#635ee7',
      color: theme?.palette?.primary?.contrastText || '#fff',
      '&:hover': {
        backgroundColor: theme?.palette?.primary?.dark || '#544ed5',
      },
    },
    userAvatar: {
      width: 60,
      height: 60,
      mr: 2,
    },
    drawerTitle: {
      fontWeight: 500,
      color: theme?.palette?.text?.primary || '#5e5873',
      mt: 2,
      mb: 1,
    },
    drawerText: {
      color: theme?.palette?.text?.secondary || '#b9b9c3',
      fontSize: '0.875rem',
    },
    statusSelect: {
      mt: 1,
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
      },
      '& .MuiInputLabel-root': {
        color: theme?.palette?.text?.secondary || '#5e5873',
      },
      '& .MuiSelect-select': {
        color: theme?.palette?.text?.primary || '#5e5873',
      },
    },
    settingsToggle: {
      color: theme?.palette?.text?.primary || '#5e5873',
    },
    logoutButton: {
      mt: 2,
      textTransform: 'uppercase',
      backgroundColor: theme?.palette?.primary?.main || '#635ee7',
      color: theme?.palette?.primary?.contrastText || '#fff',
      '&:hover': {
        backgroundColor: theme?.palette?.primary?.dark || '#544ed5',
      },
    },
  };
  return styles[key] || {};
};

export default getChatpageStyle;