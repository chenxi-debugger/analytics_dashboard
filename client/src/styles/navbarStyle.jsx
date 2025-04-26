import { css } from '@emotion/react';

export const navbarContainerStyles = {
  position: 'relative',
  width: '100%',
  
  backgroundColor: 'rgb(245, 245, 249)',
  color: 'rgba(50, 71, 92, 0.87)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mx: '20px',
  my: '15px',
};

export const navbarStyles = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backgroundColor: 'white',
  color: 'rgba(50, 71, 92, 0.87)',
  px: '20px',
  py: '10px',
  width: '100%',
  border: '1px solid rgba(50, 71, 92, 0.12)',
  borderRadius: '8px',
  boxShadow: '0 2px 10px 0 rgba(50, 71, 92, 0.1)',
  marginRight: '42px',
};

export const navbarToolbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 0,
  minHeight: '56px',
};

export const navbarSearchStyles = {
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  maxWidth: '700px',
};

export const navbarSearchBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  p: '8px 16px',
  width: '100%',
  cursor: 'pointer',
  boxShadow: 'none',
};

export const navbarSearchIconStyles = {
  mr: '8px',
};

export const navbarSearchPopupStyles = {
  p: '16px',
  width: '600px',
  maxHeight: '400px',
};

export const navbarSearchPopupHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  mb: '16px',
};

export const navbarPopupSectionStyles = {
  mt: '16px',
  mb: '8px',
};

export const navbarActionsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  '& .MuiIconButton-root:hover': {
    backgroundColor: 'action.hover',
  },
};

export const navbarShortcutMenuStyles = {
  p: '8px 16px',
};

export const navbarNotificationMenuStyles = {
  p: '8px 16px',
};

export const navbarDividerStyles = {
  my: '8px',
};

export const navbarReadAllStyles = {
  color: 'primary.main',
};

export const navbarAvatarStyles = {
  width: '36px',
  height: '36px',
};

export const navbarUserMenuStyles = {
  p: '8px 16px',
  '& .MuiMenuItem-root:hover': {
    backgroundColor: 'action.hover',
  },
};

export const navbarUserInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  mb: '8px',
};