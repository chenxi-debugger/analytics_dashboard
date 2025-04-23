import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#5A57FF' },
          secondary: { main: '#6b7280' },
          background: {
            default: '#f9fafb',
            paper: '#fff',
          },
          text: {
            primary: '#111827',
            secondary: '#6b7280',
          },
        }
      : {
          primary: { main: '#8b5cf6' },
          secondary: { main: '#6b7280' },
          background: {
            default: '#121212',
            paper: '#1e1e2f',
          },
          text: {
            primary: '#e5e7eb',
            secondary: '#9ca3af',
          },
        }),
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
