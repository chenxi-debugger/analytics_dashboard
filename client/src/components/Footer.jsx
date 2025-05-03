import React from 'react';
import { Typography, Link, useTheme } from '@mui/material';
import StyledFooter from '../styles/footerStyle';

const Footer = () => {
  const theme = useTheme();

  return (
    <StyledFooter variant="container">
      {/* Left Section: Copyright and Made with Love */}
      <StyledFooter variant="left">
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          © {new Date().getFullYear()}, Made with ❤️ by{' '}
          <Link
            href="https://themeselection.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            ThemeSelection
          </Link>
        </Typography>
      </StyledFooter>

      {/* Right Section: Links */}
      <StyledFooter variant="links">
        <Link
          href="#"
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          License
        </Link>
        <Link
          href="#"
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          More Themes
        </Link>
        <Link
          href="#"
          variant="body2"
          sx={{
            color: theme.palette.primary.main, // Changed to match License and More Themes
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Documentation
        </Link>
        <Link
          href="#"
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Support
        </Link>
      </StyledFooter>
    </StyledFooter>
  );
};

export default Footer;