const getInvoiceListStyle = (className, themeOrBalance, extra = null) => {
  switch (className) {
    case 'root':
      return {
        p: 3,
        backgroundColor: themeOrBalance.palette.background.default,
        minHeight: '100vh',
      };

    case 'center':
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      };

    case 'filters':
      return {
        display: 'flex',
        gap: 2,
        mb: 3,
      };

    case 'actionRow':
      return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        gap: 2,
      };

    case 'client':
      return {
        display: 'flex',
        alignItems: 'center',
      };

    case 'statusBox':
      const balanceValue = String(themeOrBalance || '');
      let bg = '#e0f7e9', textColor = '#2e7d32'; // 默认绿色
      if (balanceValue.includes('-')) {
        bg = '#fdecea'; textColor = '#d32f2f'; // 红色
      } else if (balanceValue === '$0' || balanceValue === '$0.00') {
        bg = '#f4f4f4'; textColor = '#555'; // 灰色
      }
      return {
        backgroundColor: bg,
        color: textColor,
        fontWeight: 600,
        px: 1.5,
        py: 0.5,
        borderRadius: '6px',
        textAlign: 'center',
        display: 'inline-block',
      };

    case 'paginationRow':
      return {
        mt: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 1.5,
      };

    case 'row':
      const isSelected = extra;
      return {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: themeOrBalance.palette.action.hover,
        },
        ...(isSelected && {
          backgroundColor: themeOrBalance.palette.action.selected,
          '&:hover': {
            backgroundColor: themeOrBalance.palette.action.selectedOpacity,
          },
        }),
      };

    case 'invoiceId':
      return {
        color: '#7575f2',
        fontWeight: 600,
      };

    case 'avatar':
      const theme = themeOrBalance;
      const avatarColor = extra;
      return {
        bgcolor: theme.palette[avatarColor]?.main,
        width: 32,
        height: 32,
      };

    default:
      return {};
  }
};

export default getInvoiceListStyle;
