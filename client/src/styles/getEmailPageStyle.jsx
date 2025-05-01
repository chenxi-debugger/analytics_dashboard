import { Margin } from "@mui/icons-material";

const getEmailPageStyle = (key, options = {}) => {
    const styles = {
      mainContainer: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f8f9fa',
      },
      sidebar: {
        width: '250px',
        borderRight: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        display: 'flex',
        borderRadius: '8px 0 0 0',
        flexDirection: 'column',
      },
      composeButton: {
        backgroundColor: 'rgb(105, 108, 255)',
        color: '#fff',
        textTransform: 'none',
        fontWeight: 500,
        padding: '8px 16px',
        borderRadius: '8px',
        marginLeft: '14px',
        marginTop: '6px',
        width: '190px',
        '&:hover': {
          backgroundColor: '#4a569d',
        },
      },
      navItem: {
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: '#f1f3f4',
        },
        ...(options.selected && {
          backgroundColor: '#e8e8e8',
          fontWeight: 600,
        }),
      },
      navIcon: {
        color: '#666',
        minWidth: '40px',
        ...(options.selected && {
          color: '#5c6bc0',
        }),
      },
      navText: {
        color: '#333',
        fontSize: '14px',
        ...(options.selected && {
          color: '#5c6bc0',
          fontWeight: 600,
        }),
      },
      tabCount: {
        backgroundColor: '#e0e0e0',
        borderRadius: '12px',
        padding: '2px 8px',
        marginLeft: '8px',
      },
      labelsSection: {
        padding: '16px',
      },
      labelsTitle: {
        color: '#666',
        fontSize: '12px',
        fontWeight: 500,
        marginBottom: '8px',
      },
      labelItem: {
        padding: '4px 16px',
        '&:hover': {
          backgroundColor: '#f1f3f4',
        },
        ...(options.selected && {
          backgroundColor: '#e8e8e8',
        }),
      },
      labelDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: options.color || '#ccc',
        marginRight: '8px',
      },
      labelText: {
        color: '#333',
        fontSize: '14px',
        ...(options.selected && {
          color: '#5c6bc0',
          fontWeight: 600,
        }),
      },
      content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
      },
      breadcrumbs: {
        marginBottom: '16px',
      },
      breadcrumbItem: {
        color: options.active ? '#5c6bc0' : '#666',
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
        backgroundColor: '#fff',
        borderRadius: '4px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#e0e0e0',
          },
          '&:hover fieldset': {
            borderColor: '#5c6bc0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#5c6bc0',
          },
        },
      },
      emailList: {
        flex: 1,
        overflow: 'auto',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      },
      enhancedTableToolbar: {
        backgroundColor: '#f1f3f4',
        padding: '8px 16px',
      },
      emailCheckbox: {
        color: '#666',
        '&.Mui-checked': {
          color: '#5c6bc0',
        },
      },
      emailItem: {
        '&:hover': {
          backgroundColor: '#f8f9fa',
        },
        '&.Mui-selected': {
          backgroundColor: '#e8e8e8',
        },
      },
      emailStarIcon: {
        color: options.starred ? '#f4b400' : '#ccc',
        fontSize: '20px',
      },
      emailAvatar: {
        width: '32px',
        height: '32px',
        fontSize: '14px',
        backgroundColor: '#5c6bc0',
      },
      emailSender: {
        fontSize: '14px',
        fontWeight: 500,
        color: '#333',
      },
      emailSubject: {
        fontSize: '14px',
        fontWeight: 500,
        color: '#333',
      },
      emailSnippet: {
        fontSize: '12px',
        color: '#666',
      },
      emailLabels: {
        display: 'flex',
        gap: '4px',
      },
      emailLabelDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: options.color || '#ccc',
      },
      emailActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      },
      emailTime: {
        fontSize: '12px',
        color: '#666',
      },
      actionIcon: {
        color: '#666',
        fontSize: '20px',
        '&:hover': {
          color: '#5c6bc0',
        },
      },
    };
  
    return styles[key] || {};
  };
  
  export default getEmailPageStyle;