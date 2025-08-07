const getInvoiceAddStyle = (key) => {
    switch (key) {
      case 'page':
        return {
          p: 1,
        };
      case 'paper':
        return {
          p: 4,
          bgcolor: 'white',
          borderRadius: 1,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        };
      case 'header':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          mb: 8,
          gap: 4,
        };
      case 'logo':
        return {
          fontWeight: 700,
          fontSize: '2rem',
          mb: 1,
        };
      case 'address':
        return {
          m: 2,
          color: '#6e6b7b',
          fontSize: '1rem',
        };
      case 'invoiceForm':
        return {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          textAlign: 'left',
          '& .MuiInputBase-root': {
            width: '200px',
          },
        };
      case 'billing':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          gap: 3,
          mb: 4,
        };
      case 'summaryBox':
        return {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          mt: 0,
          mb: 8,
        };
      case 'actionPanel':
        return {
          p: 3,
          bgcolor: 'white',
          borderRadius: 1,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'sticky',
          top: 90,
        };
      case 'primaryButton':
        return {
          bgcolor: '#7367f0',
          color: '#fff',
          '&:hover': {
            bgcolor: '#5e50ee',
          },
        };
      default:
        return {};
    }
  };
  
  export default getInvoiceAddStyle;
  