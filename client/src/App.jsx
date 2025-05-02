import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Sidebar from './components/Sidebar';
import AnalyticsPage from './pages/AnalyticsPage';
import CrmPage from './pages/CrmPage';
import EcommercePage from './pages/EcommercePage';
import Footer from './components/Footer';
import EmailPage from './pages/EmailPage';
import ChatPage from './pages/ChatPage';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  InputBase,
  Popover,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Tooltip,
  Paper,
  ClickAwayListener,
  Grid,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  Translate,
  Brightness4,
  Brightness7,
  Apps,
  Notifications,
  Close,
} from '@mui/icons-material';
import { ColorModeContext } from './theme/themeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  appBarStyles,
  toolbarStyles,
  searchStyles,
  searchBoxStyles,
  searchIconStyles,
  searchPopupStyles,
  searchPopupHeaderStyles,
  popupSectionStyles,
  actionsStyles,
  shortcutMenuStyles,
  notificationMenuStyles,
  dividerStyles,
  readAllStyles,
  avatarStyles,
  userMenuStyles,
  userInfoStyles,
} from './styles/dashboardStyles';

const queryClient = new QueryClient();

const App = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [open, setOpen] = useState(false);
  const [isBaseMini, setIsBaseMini] = useState(isLargeScreen);
  const [isHovering, setIsHovering] = useState(false);
  const [searchAnchor, setSearchAnchor] = useState(null); // Added missing state
  const [langAnchor, setLangAnchor] = useState(null); // Added missing state
  const [shortcutAnchor, setShortcutAnchor] = useState(null); // Added missing state
  const [notifAnchor, setNotifAnchor] = useState(null); // Added missing state
  const [userAnchor, setUserAnchor] = useState(null); // Added missing state

  const isMini = isBaseMini && !isHovering;

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => setter(null);

  const isOpen = (anchor) => Boolean(anchor);

  const handleDrawerToggle = () => {
    if (!isLargeScreen) {
      setOpen(!open);
    }
  };

  const handleMiniToggle = () => {
    setIsBaseMini(!isBaseMini);
  };

  const handleMouseEnter = () => {
    if (isLargeScreen && isBaseMini) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen && isBaseMini) {
      setIsHovering(false);
    }
  };

  const drawerWidth = isLargeScreen && isMini ? 80 : 280;

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          {/* AppBar */}
          <AppBar
            position="fixed"
            sx={{
              ...appBarStyles,
              width: { lg: `calc(100% - ${drawerWidth}px)` },
              ml: { lg: `${drawerWidth}px` },
            }}
          >
            <Toolbar sx={toolbarStyles}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { lg: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: '#5a57ff', fontWeight: 'bold', mr: 3, display: { xs: 'none', sm: 'block' } }}
              >
                🌀 sneat
              </Typography>

              <ClickAwayListener onClickAway={handleClose(setSearchAnchor)}>
                <Box sx={searchStyles}>
                  <Paper onClick={handleOpen(setSearchAnchor)} sx={searchBoxStyles}>
                    <Search sx={searchIconStyles} />
                    <InputBase
                      placeholder="Search (Ctrl+/)"
                      fullWidth
                      readOnly
                      sx={{ cursor: 'pointer' }}
                    />
                  </Paper>
                  <Popover
                    open={isOpen(searchAnchor)}
                    anchorEl={searchAnchor}
                    onClose={handleClose(setSearchAnchor)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  >
                    <Box sx={searchPopupStyles}>
                      <Box sx={searchPopupHeaderStyles}>
                        <Typography variant="h6">Search Menu</Typography>
                        <IconButton onClick={handleClose(setSearchAnchor)}>
                          <Close />
                        </IconButton>
                      </Box>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" sx={popupSectionStyles}>
                            POPULAR SEARCHES
                          </Typography>
                          {['Analytics', 'CRM', 'eCommerce', 'User List'].map((item) => (
                            <MenuItem key={item}>{item}</MenuItem>
                          ))}
                          <Typography variant="subtitle2" sx={popupSectionStyles}>
                            USER INTERFACE
                          </Typography>
                          {['Typography', 'Tabs', 'Buttons', 'Advanced Cards'].map((item) => (
                            <MenuItem key={item}>{item}</MenuItem>
                          ))}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" sx={popupSectionStyles}>
                            APPS & PAGES
                          </Typography>
                          {['Calendar', 'Invoice List', 'Pricing', 'Account Settings'].map((item) => (
                            <MenuItem key={item}>{item}</MenuItem>
                          ))}
                          <Typography variant="subtitle2" sx={popupSectionStyles}>
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

              <Box sx={actionsStyles}>
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
                  <Box sx={shortcutMenuStyles}>
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
                  <Box sx={notificationMenuStyles}>
                    <Typography variant="subtitle2">Notifications</Typography>
                    <Divider sx={dividerStyles} />
                    {['New user registered', 'Message received', 'Order received'].map((msg, i) => (
                      <MenuItem key={i}>{msg}</MenuItem>
                    ))}
                    <Divider sx={dividerStyles} />
                    <MenuItem sx={readAllStyles}>READ ALL NOTIFICATIONS</MenuItem>
                  </Box>
                </Menu>

                <Tooltip title="User menu">
                  <IconButton onClick={handleOpen(setUserAnchor)}>
                    <Avatar src="/user.png" sx={avatarStyles} />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={userAnchor} open={isOpen(userAnchor)} onClose={handleClose(setUserAnchor)}>
                  <Box sx={userMenuStyles}>
                    <Box sx={userInfoStyles}>
                      <Avatar src="/user.png" sx={avatarStyles} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2">John Doe</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Admin
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={dividerStyles} />
                    {['Profile', 'Inbox', 'Chat', 'Settings', 'Pricing', 'FAQ'].map((opt) => (
                      <MenuItem key={opt}>{opt}</MenuItem>
                    ))}
                    <Divider sx={dividerStyles} />
                    <MenuItem>Sign Out</MenuItem>
                  </Box>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Sidebar */}
          <Sidebar
            open={open}
            onToggle={setOpen}
            isMini={isMini}
            onToggleMini={handleMiniToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 8,
              width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` },
              backgroundColor: '#f5f5f9',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Routes>
              <Route path="/" element={<AnalyticsPage />} />
              <Route path="/dashboards/crm" element={<CrmPage />} />
              <Route path="/dashboards/ecommerce" element={<EcommercePage />} />
              <Route path="/apps/email" element={<EmailPage />} />
              <Route path="/apps/email/:tab" element={<EmailPage />} />
              <Route path="/apps/email/label/:labelName" element={<EmailPage />} />
              <Route path="/apps/chat" element={<ChatPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Footer */}
            <Box
              sx={{
                mt: 'auto',
                position: 'sticky',
                bottom: 0,
                zIndex: 1000,
                backgroundColor: '#f5f5f9',
              }}
            >
              <Footer />
            </Box>
          </Box>
        </Box>
      </Router>
    </QueryClientProvider>
  );
};

export default App;