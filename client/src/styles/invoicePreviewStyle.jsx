const getInvoicePreviewStyle = (key) => {
    switch (key) {
      case 'page':
        return {
          p: 1,
        //   backgroundColor: '#f4f5fa',
        };
      case 'paper':
        return {
          p: 4,
          bgcolor: 'white',
          borderRadius: 1,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
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
          fontSize: '2rem',
          mb: 1,
        };
      case 'address':
        return {
          color: 'gray',
          fontSize: '1rem',
        };
      case 'invoiceInfo':
        return {
          textAlign: 'right',
          '& h5': {
            m: 2,
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
          mt: 4,
          gap: 4,
        };
      case 'footer':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          mt: 10,
          mb: 10,
          fontSize: '1rem',
        };
      case 'note':
        return {
          fontSize: '1rem',
          color: '#6e6b7b',
        };
      case 'actionPanel':
        return {
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
          flexGrow: 1,
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
  