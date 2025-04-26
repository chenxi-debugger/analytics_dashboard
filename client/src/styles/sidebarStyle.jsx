import { css } from '@emotion/react';

export const drawerStyles = css`
  width: 280px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: 280px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-right: 1px solid #eee;
    color: #6b7280;
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
};

export const getListItemButtonStyles = (isActive) => ({
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
});

export const getNestedListItemButtonStyles = (isActive) => ({
  pl: 4,
  color: isActive ? '#5a57ff' : '#6b7280',
  ...(isActive && {
    fontWeight: 600,
  }),
  '&:hover': {
    color: '#5a57ff',
  },
});