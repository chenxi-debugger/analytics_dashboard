import { css } from '@emotion/react';

export const appBarStyles = {
  zIndex: 1200,
  backgroundColor: '#ffffff',
  color: '#6b7280',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

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

export const searchBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  p: '8px 16px',
  width: '100%',
  cursor: 'pointer',
  boxShadow: 'none',
  backgroundColor: '#f5f5f9',
  borderRadius: '8px',
};

export const searchIconStyles = {
  mr: '8px',
  color: '#9ca3af',
};

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

export const drawerStyles = css`
  & .MuiDrawer-paper {
    width: 280px;
    box-sizing: border-box;
    background-color: #f8f9ff;
    border-right: 1px solid #e5e7eb;
    color: #6b7280;
    transition: width 0.3s ease;
  }
`;

export const miniDrawerStyles = css`
  & .MuiDrawer-paper {
    width: 80px;
    box-sizing: border-box;
    background-color: #f8f9ff;
    border-right: 1px solid #e5e7eb;
    color: #6b7280;
    overflow-x: hidden;
    transition: width 0.3s ease;
  }
`;

export const typographyTitleStyles = {
  color: '#5a57ff',
  fontWeight: 'bold',
};

export const boxContentStyles = {
  overflowY: 'auto',
};

export const typographyCategoryStyles = {
  pl: 2,
  mt: 2,
  mb: 1,
  display: 'block',
  fontWeight: 600,
  color: '#9ca3af',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
};

export const getListItemButtonStyles = (isActive) => ({
  py: 1,
  ...(isActive && {
    backgroundColor: '#5a57ff',
    color: '#ffffff',
    '& .MuiListItemIcon-root': {
      color: '#ffffff',
    },
  }),
});

export const getListItemIconStyles = (isActive) => ({
  color: isActive ? '#ffffff' : '#9CA3AF',
  minWidth: 36,
});

export const getNestedListItemButtonStyles = (isActive) => ({
  pl: 4,
  py: 0.5,
  color: isActive ? '#5a57ff' : '#6b7280',
  ...(isActive && {
    fontWeight: 600,
  }),
  '&:hover': {
    color: '#5a57ff',
  },
});