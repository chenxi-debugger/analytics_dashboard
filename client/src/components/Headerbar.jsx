import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Modal,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Tooltip,
  Paper,
  ClickAwayListener,
  Grid,
  Badge,
  Box,
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
  BarChart,
  People,
  ShoppingCart,
  Group,
  TextFields,
  Tab,
  RadioButtonChecked,
  CreditCard,
  CalendarToday,
  Receipt,
  MonetizationOn,
  Settings,
  CheckBox,
  TableChart,
  Event,
} from '@mui/icons-material';
import {
  appBarStyles,
  toolbarStyles,
  searchStyles,
  searchBoxStyles,
  searchIconStyles,
  actionsStyles,
  shortcutMenuStyles,
  notificationMenuStyles,
  dividerStyles,
  readAllStyles,
  avatarStyles,
  userMenuStyles,
  userInfoStyles,
} from './HeaderbarStyle';
import { ColorModeContext } from '../theme/themeContext';

const Headerbar = ({ drawerWidth, theme, handleDrawerToggle }) => {
  const colorMode = useContext(ColorModeContext);
  const [searchAnchor, setSearchAnchor] = useState(null);
  const [langAnchor, setLangAnchor] = useState(null);
  const [shortcutAnchor, setShortcutAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => {
    setter(null);
    setSearchQuery('');
  };

  const isOpen = (anchor) => Boolean(anchor);

  const searchLinks = {
    Analytics: '/',
    CRM: '/dashboards/crm',
    eCommerce: '/dashboards/ecommerce',
    'User List': '/users',
    Typography: '/ui/typography',
    Tabs: '/ui/tabs',
    Buttons: '/ui/buttons',
    'Advanced Cards': '/ui/advanced-cards',
    Calendar: '/apps/calendar',
    'Invoice List': '/apps/invoice-list',
    Pricing: '/apps/pricing',
    'Account Settings': '/apps/account-settings',
    Select: '/forms/select',
    Autocomplete: '/forms/autocomplete',
    Table: '/tables/table',
    'Date Pickers': '/forms/date-pickers',
  };

  const allItems = [
    { name: 'Analytics', category: 'Popular Searches' },
    { name: 'CRM', category: '' },
    { name: 'eCommerce', category: 'Popular Searches' },
    { name: 'User List', category: 'Popular Searches' },
    { name: 'Typography', category: 'User Interface' },
    { name: 'Tabs', category: 'User Interface' },
    { name: 'Buttons', category: 'User Interface' },
    { name: 'Advanced Cards', category: 'User Interface' },
    { name: 'Calendar', category: 'Apps & Pages' },
    { name: 'Invoice List', category: 'Apps & Pages' },
    { name: 'Pricing', category: 'Apps & Pages' },
    { name: 'Account Settings', category: 'Apps & Pages' },
    { name: 'Select', category: 'Forms & Tables' },
    { name: 'Autocomplete', category: 'Forms & Tables' },
    { name: 'Table', category: 'Forms & Tables' },
    { name: 'Date Pickers', category: 'Forms & Tables' },
  ];

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
  }, {});

  const categories = [
    'Popular Searches',
    'User Interface',
    'Apps & Pages',
    'Forms & Tables',
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        ...appBarStyles(theme),
        width: { lg: `calc(100% - ${drawerWidth}px)` },
        ml: { lg: `${drawerWidth}px` },
        transition: (theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.standard,
          }),
      }}
    >
      <Toolbar sx={toolbarStyles}>
        <ClickAwayListener onClickAway={handleClose(setSearchAnchor)}>
          <Box sx={searchStyles}>
            <Paper sx={searchBoxStyles(theme)}>
              <IconButton onClick={handleOpen(setSearchAnchor)} sx={{ p: 1 }}>
                <Search sx={searchIconStyles(theme)} />
              </IconButton>
              <InputBase
                placeholder="Search (Ctrl+/)"
                fullWidth
                readOnly
                sx={{ cursor: 'pointer' }}
              />
              <Box sx={actionsStyles}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { lg: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
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
                  <IconButton
                    onClick={() => {
                      console.log('Toggling theme from', theme.palette.mode);
                      colorMode.toggleColorMode();
                    }}
                  >
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
            </Paper>
            <Modal
              open={isOpen(searchAnchor)}
              onClose={handleClose(setSearchAnchor)}
              aria-labelledby="search-modal-title"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{
                height: '600px',
                width: '600px',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 3,
                borderRadius: 2,
                position: 'relative',
                outline: 'none',
              }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    pb: 1,
                  }}
                >
                  <Search sx={{ color: 'text.secondary', mr: 1 }} />
                  <InputBase
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    sx={{
                      flexGrow: 1,
                      fontSize: '1rem',
                      color: 'text.primary',
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        bgcolor: 'grey.200',
                        px: 1,
                        py: 1,
                        borderRadius: 1,
                        mr: 1,
                        cursor: 'pointer',
                        fontSize:'20px',
                      }}
                      onClick={handleClose(setSearchAnchor)}
                    >
                      [esc]
                    </Typography>
                    <IconButton onClick={handleClose(setSearchAnchor)}>
                      <Close sx={{ fontSize: 30 }} />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ maxHeight: '400px', overflowY: 'hidden' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {['Popular Searches', 'User Interface'].map((category) => (
                        <Box key={category} sx={{ mb: 6, m:8, fontSize:'20px' }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                              mb: 1,
                              display: 'block',
                              fontSize:'16px',
                            }}
                          >
                            {category}
                          </Typography>
                          {groupedItems[category]?.length > 0 ? (
                            groupedItems[category].map((item) => (
                              <MenuItem
                                key={item}
                                component={Link}
                                to={searchLinks[item]}
                                onClick={handleClose(setSearchAnchor)}
                                sx={{
                                  py: 0.5,
                                  pl: 0,
                                  color: 'text.primary',
                                  '&:hover': { bgcolor: 'grey.100' },
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  {item === 'Analytics' && <BarChart sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'CRM' && <People sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'eCommerce' && <ShoppingCart sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'User List' && <Group sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Typography' && <TextFields sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Tabs' && <Tab sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Buttons' && <RadioButtonChecked sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Advanced Cards' && <CreditCard sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  <Typography variant="body2">{item}</Typography>
                                </Box>
                              </MenuItem>
                            ))
                          ) : (
                            <Typography variant="body2" sx={{ color: 'text.secondary', pl: 2 }}>
                              No results
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Grid>
                    <Grid item xs={6}>
                      {['Apps & Pages', 'Forms & Tables'].map((category) => (
                        <Box key={category} sx={{ mb: -3.5, mt:8 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                              mb: 1,
                              display: 'block',
                              fontSize:'16px',
                            }}
                          >
                            {category}
                          </Typography>
                          {groupedItems[category]?.length > 0 ? (
                            groupedItems[category].map((item) => (
                              <MenuItem
                                key={item}
                                component={Link}
                                to={searchLinks[item]}
                                onClick={handleClose(setSearchAnchor)}
                                sx={{
                                  py: 0.5,
                                  pl: 0,
                                  color: 'text.primary',
                                  '&:hover': { bgcolor: 'grey.100' },
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  {item === 'Calendar' && <CalendarToday sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Invoice List' && <Receipt sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Pricing' && <MonetizationOn sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Account Settings' && <Settings sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Select' && <CheckBox sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Autocomplete' && <Search sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Table' && <TableChart sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  {item === 'Date Pickers' && <Event sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
                                  <Typography variant="body2">{item}</Typography>
                                </Box>
                              </MenuItem>
                            ))
                          ) : (
                            <Typography variant="body2" sx={{ color: 'text.secondary', pl: 2 }}>
                              No results
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Modal>
          </Box>
        </ClickAwayListener>
      </Toolbar>
    </AppBar>
  );
};

export default Headerbar;