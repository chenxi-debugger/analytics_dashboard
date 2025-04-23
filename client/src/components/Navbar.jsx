import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Popover,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Typography,
  Divider,
  Tooltip,
  Paper,
  ClickAwayListener,
  Grid,
  Badge,
} from '@mui/material';
import {
  Search,
  Translate,
  Brightness4,
  Brightness7,
  Apps,
  Notifications,
  Close,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../theme/themeContext';
import './navbar.css';

const NavBar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [searchAnchor, setSearchAnchor] = useState(null);
  const [langAnchor, setLangAnchor] = useState(null);
  const [shortcutAnchor, setShortcutAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => setter(null);

  const isOpen = (anchor) => Boolean(anchor);

  return (
    <AppBar position="sticky" elevation={0} className="navbar">
      <Toolbar className="navbar-toolbar">
        <ClickAwayListener onClickAway={handleClose(setSearchAnchor)}>
          <Box className="navbar-search">
            <Paper
              onClick={handleOpen(setSearchAnchor)}
              className="navbar-search-box"
            >
              <Search className="navbar-search-icon" />
              <InputBase placeholder="Search (Ctrl+/)" fullWidth disabled />
            </Paper>
            <Popover
              open={isOpen(searchAnchor)}
              anchorEl={searchAnchor}
              onClose={handleClose(setSearchAnchor)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <Box className="navbar-search-popup">
                <Box className="navbar-search-popup-header">
                  <Typography variant="h6">Search Menu</Typography>
                  <IconButton onClick={handleClose(setSearchAnchor)}>
                    <Close />
                  </IconButton>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" className="navbar-popup-section">
                      POPULAR SEARCHES
                    </Typography>
                    {['Analytics', 'CRM', 'eCommerce', 'User List'].map((item) => (
                      <MenuItem key={item}>{item}</MenuItem>
                    ))}
                    <Typography variant="subtitle2" className="navbar-popup-section">
                      USER INTERFACE
                    </Typography>
                    {['Typography', 'Tabs', 'Buttons', 'Advanced Cards'].map((item) => (
                      <MenuItem key={item}>{item}</MenuItem>
                    ))}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" className="navbar-popup-section">
                      APPS & PAGES
                    </Typography>
                    {['Calendar', 'Invoice List', 'Pricing', 'Account Settings'].map((item) => (
                      <MenuItem key={item}>{item}</MenuItem>
                    ))}
                    <Typography variant="subtitle2" className="navbar-popup-section">
                      FORMS & TABLES
                    </Typography>
                    {['Select', 'Autocomplete', 'Table', 'Date Pickers'].map((item) => (
                      <MenuItem key={item}>{item}</MenuItem>
                    ))}
                  </Grid>
                </Grid>
              </Box>
            </Popover>
          </Box>
        </ClickAwayListener>

        <Box className="navbar-actions">
          <Tooltip title="Language">
            <IconButton onClick={handleOpen(setLangAnchor)}>
              <Translate />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={langAnchor} open={isOpen(langAnchor)} onClose={handleClose(setLangAnchor)}>
            {['English', 'French', 'Arabic'].map((lang) => (
              <MenuItem key={lang}>{lang}</MenuItem>
            ))}
          </Menu>

          <Tooltip title="Toggle theme">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Shortcuts">
            <IconButton onClick={handleOpen(setShortcutAnchor)}>
              <Apps />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={shortcutAnchor} open={isOpen(shortcutAnchor)} onClose={handleClose(setShortcutAnchor)}>
            <Box className="navbar-shortcut-menu">
              <Typography variant="subtitle2">Shortcuts</Typography>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {['Calendar', 'Invoice App', 'Users', 'Role Management', 'Dashboard', 'Settings'].map((label) => (
                  <Grid item xs={6} key={label}>
                    <MenuItem>{label}</MenuItem>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Menu>

          <Tooltip title="Notifications">
            <IconButton onClick={handleOpen(setNotifAnchor)}>
              <Badge color="error" variant="dot">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu anchorEl={notifAnchor} open={isOpen(notifAnchor)} onClose={handleClose(setNotifAnchor)}>
            <Box className="navbar-notification-menu">
              <Typography variant="subtitle2">Notifications</Typography>
              <Divider className="navbar-divider" />
              {['New user registered', 'Message received', 'Order received'].map((msg, i) => (
                <MenuItem key={i}>{msg}</MenuItem>
              ))}
              <Divider className="navbar-divider" />
              <MenuItem className="navbar-readall">READ ALL NOTIFICATIONS</MenuItem>
            </Box>
          </Menu>

          <Tooltip title="User menu">
            <IconButton onClick={handleOpen(setUserAnchor)}>
              <Avatar src="/user.png" className="navbar-avatar" />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={userAnchor} open={isOpen(userAnchor)} onClose={handleClose(setUserAnchor)}>
            <Box className="navbar-user-menu">
              <Box className="navbar-user-info">
                <Avatar src="/user.png" className="navbar-avatar" />
                <Box>
                  <Typography variant="subtitle2">John Doe</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Admin
                  </Typography>
                </Box>
              </Box>
              <Divider className="navbar-divider" />
              {['Profile', 'Inbox', 'Chat', 'Settings', 'Pricing', 'FAQ'].map((opt) => (
                <MenuItem key={opt}>{opt}</MenuItem>
              ))}
              <Divider className="navbar-divider" />
              <MenuItem>Sign Out</MenuItem>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
