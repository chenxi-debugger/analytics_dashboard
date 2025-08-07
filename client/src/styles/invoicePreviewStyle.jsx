const getInvoicePreviewStyle = (key) => {
    switch (key) {
      case 'page':
        return {
          p: 4,
          backgroundColor: '#f4f5fa',
        };
      case 'paper':
        return {
          p: 4,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
        };
      case 'header':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          mb: 4,
        };
      case 'logo':
        return {
          fontWeight: 700,
          fontSize: '1.25rem',
          mb: 1,
        };
      case 'address':
        return {
          color: 'gray',
          fontSize: '0.875rem',
        };
      case 'invoiceInfo':
        return {
          textAlign: 'right',
          '& h6': {
            mb: 1,
          },
          '& span': {
            color: '#7367f0',
          },
        };
      case 'billSection':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          mb: 4,
          mt: 2,
          gap: 3,
        };
      case 'footer':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          mt: 4,
          mb: 3,
        };
      case 'note':
        return {
          fontSize: '0.85rem',
          color: '#6e6b7b',
        };
      case 'actionPanel':
        return {
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: 'fit-content',
          position: 'sticky',
          top: 32,
        };
      case 'primaryButton':
        return {
          bgcolor: '#7367f0',
          color: '#fff',
          '&:hover': {
            bgcolor: '#5e50ee',
          },
        };
      case 'paymentButton':
        return {
          bgcolor: '#7367f0',
          color: '#fff',
          mt: 2,
          '&:hover': {
            bgcolor: '#5e50ee',
          },
        };
      default:
        return {};
    }
  };
  
  export default getInvoicePreviewStyle;
  