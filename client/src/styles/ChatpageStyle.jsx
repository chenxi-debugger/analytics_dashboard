const getChatpageStyle = (key, props = {}) => {
    const styles = {
      mainContainer: {
        display: 'flex',
        height: '100%',
        backgroundColor: '#f5f5f9',
      },
      sidebar: {
        width: '360px',
        borderRight: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
      },
      searchBarContainer: {
        p: 2,
      },
      searchField: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px',
          backgroundColor: '#f5f5f9',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#e0e0e0',
        },
      },
      sectionTitle: {
        px: 2,
        py: 1,
        color: '#5e5873',
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
          backgroundColor: '#f5f5f9',
          cursor: 'pointer',
        },
        '&.Mui-selected': {
          backgroundColor: '#e0e7ff',
        },
      },
      contactItem: {
        py: 1,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: '#f5f5f9',
          cursor: 'pointer',
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
        backgroundColor: props.color || '#e0e0e0',
        color: '#fff',
        fontSize: '0.875rem',
      },
      chatName: {
        fontWeight: 500,
        color: '#5e5873',
      },
      chatSnippet: {
        color: '#b9b9c3',
        fontSize: '0.875rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      chatTime: {
        color: '#b9b9c3',
        fontSize: '0.75rem',
      },
      unreadBadge: {
        backgroundColor: '#ea5455',
        color: '#fff',
        borderRadius: '50%',
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        ml: 'auto',
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
      },
      chatHeader: {
        p: 2,
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      chatHeaderAvatar: {
        width: 40,
        height: 40,
        mr: 2,
      },
      chatHeaderName: {
        fontWeight: 500,
        color: '#5e5873',
      },
      chatHeaderStatus: {
        color: '#b9b9c3',
        fontSize: '0.875rem',
      },
      messageContainer: {
        flexGrow: 1,
        p: 2,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      },
      message: {
        maxWidth: '60%',
        p: 1.5,
        borderRadius: '15px',
        backgroundColor: props.isSent ? '#635ee7' : '#f5f5f9',
        color: props.isSent ? '#fff' : '#5e5873',
        alignSelf: props.isSent ? 'flex-end' : 'flex-start',
      },
      messageTime: {
        fontSize: '0.75rem',
        color: '#b9b9c3',
        mt: 0.5,
        alignSelf: props.isSent ? 'flex-end' : 'flex-start',
      },
      inputContainer: {
        p: 2,
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 1,
      },
      messageInput: {
        flexGrow: 1,
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px',
          backgroundColor: '#f5f5f9',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#e0e0e0',
        },
      },
      sendButton: {
        borderRadius: '20px',
        textTransform: 'none',
        fontWeight: 500,
        px: 3,
        py: 1,
      },
    };
    return styles[key] || {};
  };
  
  export default getChatpageStyle;