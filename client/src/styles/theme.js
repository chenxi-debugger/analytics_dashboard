import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: 'rgb(90, 87, 255)' },       // #5A57FF
          secondary: { main: 'rgb(107, 114, 128)' },   // #6b7280
          background: {
            default: 'rgb(249, 250, 251)',             // #f9fafb
            paper: 'rgb(255, 255, 255)',               // #ffffff
          },
          text: {
            primary: 'rgb(74, 74, 74)',                // #4A4A4A
            secondary: 'rgb(107, 114, 128)',           // #6b7280
          },
        }
      : {
          primary: { main: 'rgb(139, 92, 246)' },      // #8b5cf6
          secondary: { main: 'rgb(107, 114, 128)' },   // #6b7280
          background: {
            default: 'rgb(18, 18, 18)',                // #121212
            paper: 'rgb(30, 30, 47)',                  // #1e1e2f
          },
          text: {
            primary: 'rgb(229, 231, 235)',             // #e5e7eb
            secondary: 'rgb(156, 163, 175)',           // #9ca3af
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
