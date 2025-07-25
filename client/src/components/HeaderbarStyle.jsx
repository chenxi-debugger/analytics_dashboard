import { alpha } from '@mui/material';

const appBarStyles = (theme) => ({
  backgroundColor: 'rgba(99, 102, 241, 0.05)',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  px:1,
  mb:2,
});

const toolbarStyles = {
  justifyContent: 'space-between',
  minHeight: 64,
};

const searchStyles = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

const searchBoxStyles = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  px: 3,
  py: 1,
  width: '100%',
  boxShadow: 'none',
});

const searchIconStyles = (theme) => ({
  color: theme.palette.text.secondary,
  mr: 1,
});

const searchPopupStyles = {
  height: '600px',
  width: '600px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  position: 'relative',
  outline: 'none',
};

const popupSectionStyles = {
  mb: 2,
};

const actionsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

const shortcutMenuStyles = {
  p: 2,
  width: 300,
};

const notificationMenuStyles = {
  p: 2,
  width: 300,
};

const dividerStyles = {
  my: 1,
};

const readAllStyles = {
  justifyContent: 'center',
  color: 'primary.main',
  fontWeight: 'medium',
};

const avatarStyles = {
  width: 32,
  height: 32,
};

const userMenuStyles = {
  p: 2,
  width: 250,
};

const userInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  mb: 2,
};

export {
  appBarStyles,
  toolbarStyles,
  searchStyles,
  searchBoxStyles,
  searchIconStyles,
  searchPopupStyles,
  popupSectionStyles,
  actionsStyles,
  shortcutMenuStyles,
  notificationMenuStyles,
  dividerStyles,
  readAllStyles,
  avatarStyles,
  userMenuStyles,
  userInfoStyles,
};