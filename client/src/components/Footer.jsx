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
          © {new Date().getFullYear()} InsightBoard · Built by{' '}
          <Link
            href="https://portfolio-chenxi.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Chenxi Zhuang
          </Link>
          {' '}· UI inspired by the Sneat admin template
        </Typography>
      </StyledFooter>

      {/* Right Section: Links */}
      <StyledFooter variant="links">
        <Link
          href="https://github.com/chenxi-debugger/analytics_dashboard"
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          GitHub
        </Link>
        <Link
          href="https://portfolio-chenxi.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Portfolio
        </Link>
        <Link
          href="https://github.com/chenxi-debugger/analytics_dashboard#readme"
          target="_blank"
          rel="noopener noreferrer"
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
          href="mailto:chenxi.debugger@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Contact
        </Link>
      </StyledFooter>
    </StyledFooter>
  );
};

export default Footer;