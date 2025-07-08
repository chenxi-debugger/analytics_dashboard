import { css } from '@emotion/react';

export const appBarStyles = (theme) => ({
  zIndex: 1200,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

export const toolbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 0,
  minHeight: '56px',
};

export const searchStyles = {
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  maxWidth: '700px',
};

export const searchBoxStyles = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  p: '8px 16px',
  width: '100%',
  cursor: 'pointer',
  boxShadow: 'none',
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
});

export const searchIconStyles = (theme) => ({
  mr: '8px',
  color: theme.palette.text.secondary,
});

export const searchPopupStyles = {
  p: '16px',
  width: '600px',
  maxHeight: '400px',
};

export const searchPopupHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: '16px',
};

export const popupSectionStyles = {
  mt: '16px',
  mb: '8px',
};

export const actionsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  '& .MuiIconButton-root:hover': {
    backgroundColor: 'action.hover',
  },
};

export const shortcutMenuStyles = {
  p: '8px 16px',
};

export const notificationMenuStyles = {
  p: '8px 16px',
};

export const dividerStyles = {
  my: '8px',
};

export const readAllStyles = {
  color: 'primary.main',
};

export const avatarStyles = {
  width: '36px',
  height: '36px',
};

export const userMenuStyles = {
  p: '8px 16px',
  '& .MuiMenuItem-root:hover': {
    backgroundColor: 'action.hover',
  },
};

export const userInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  mb: '8px',
};



export const typographyTitleStyles = (theme) => ({
  color: theme.palette.primary.main, // Use primary color for branding
  fontWeight: 'bold',
});

export const boxContentStyles = {
  overflowY: 'auto',
};

export const typographyCategoryStyles = (theme) => ({
  pl: 2,
  mt: 2,
  mb: 1,
  display: 'block',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
});

export const getListItemButtonStyles = (theme) => (isActive) => ({
  py: 1,
  ...(isActive && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  }),
});

export const getListItemIconStyles = (theme) => (isActive) => ({
  color: isActive ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  minWidth: 36,
});

export const getNestedListItemButtonStyles = (theme) => (isActive) => ({
  pl: 4,
  py: 0.5,
  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  ...(isActive && {
    fontWeight: 600,
  }),
  '&:hover': {
    color: theme.palette.primary.main,
  },
});