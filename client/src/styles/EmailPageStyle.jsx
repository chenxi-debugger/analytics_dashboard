const getEmailPageStyle = (className, props = {}) => {
    switch (className) {
      case 'mainContainer':
        return {
          display: 'flex',
          height: '100vh',
          bgcolor: '#f5f5f9',
        };
  
      case 'sidebar':
        return {
          width: 260,
          bgcolor: '#fff',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
        };
  
      case 'navItem':
        return {
          px: 2,
          py: 1,
          bgcolor: props.selected ? 'rgba(115, 103, 240, 0.08)' : 'transparent',
          color: props.selected ? '#7367f0' : '#6e6b7b',
          '&:hover': {
            bgcolor: 'rgba(115, 103, 240, 0.08)',
          },
        };
  
      case 'navIcon':
        return {
          color: props.selected ? '#7367f0' : '#6e6b7b',
          minWidth: '40px',
        };
  
      case 'navText':
        return {
          fontSize: '14px',
          fontWeight: props.selected ? 600 : 500,
        };
  
      case 'tabCount':
        return {
          bgcolor: '#e0e0e0',
          borderRadius: '12px',
          px: 1,
          py: 0.25,
        };
  
      case 'labelsSection':
        return {
          p: 2,
        };
  
      case 'labelsTitle':
        return {
          fontSize: '12px',
          fontWeight: 600,
          color: '#6e6b7b',
          textTransform: 'uppercase',
          mb: 1,
        };
  
      case 'labelItem':
        return {
          px: 2,
          py: 0.5,
        };
  
      case 'labelDot':
        return {
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          bgcolor: props.color,
          mr: 1,
        };
  
      case 'labelText':
        return {
          fontSize: '14px',
          color: '#6e6b7b',
        };
  
      case 'content':
        return {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        };
  
      case 'header':
        return {
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        };
  
      case 'composeButton':
        return {
          bgcolor: '#7367f0',
          color: '#fff',
          textTransform: 'capitalize',
          fontSize: '14px',
          fontWeight: 600,
          px: 3,
          py: 1,
          '&:hover': {
            bgcolor: '#5a54c7',
          },
        };
  
      case 'searchField':
        return {
          flex: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            bgcolor: '#fff',
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#b0b0b0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7367f0',
            },
          },
          '& .MuiInputBase-input': {
            py: 1,
            fontSize: '14px',
            color: '#6e6b7b',
          },
        };
  
      case 'tabsContainer':
        return {
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          px: 2,
          py: 1,
        };
  
      case 'tabsActions':
        return {
          display: 'flex',
          gap: 1,
        };
  
      case 'emailList':
        return {
          flex: 1,
          overflowY: 'auto',
          bgcolor: '#fff',
        };
  
      case 'emailItem':
        return {
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          gap: 1,
          '&:hover': {
            bgcolor: '#f5f5f9',
          },
        };
  
      case 'emailCheckbox':
        return {
          p: 0,
          mr: 1,
        };
  
      case 'emailStarIcon':
        return {
          fontSize: '16px',
          color: props.starred ? '#ffca28' : '#e0e0e0',
        };
  
      case 'emailAvatar':
        return {
          width: '36px',
          height: '36px',
          bgcolor: '#e0e0e0',
          fontSize: '14px',
          mr: 1,
        };
  
      case 'emailContent':
        return {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        };
  
      case 'emailHeader':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        };
  
      case 'emailSender':
        return {
          fontSize: '14px',
          fontWeight: 600,
          color: '#1a1a1a',
        };
  
      case 'emailActions':
        return {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        };
  
      case 'emailTime':
        return {
          fontSize: '12px',
          color: '#6e6b7b',
        };
  
      case 'actionIcon':
        return {
          fontSize: '16px',
          color: '#6e6b7b',
        };
  
      case 'emailSubject':
        return {
          fontSize: '14px',
          fontWeight: 500,
          color: '#1a1a1a',
        };
  
      case 'emailSnippet':
        return {
          fontSize: '12px',
          color: '#6e6b7b',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        };
  
      case 'emailLabels':
        return {
          display: 'flex',
          gap: 0.5,
        };
  
      case 'emailLabelDot':
        return {
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          bgcolor: props.color,
        };
  
      default:
        return {};
    }
  };
  
  export default getEmailPageStyle;