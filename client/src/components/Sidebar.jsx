import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Toolbar,
  Box,
  Divider,
  Badge,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  Email,
  Chat,
  CalendarMonth,
  ReceiptLong,
  People,
  Lock,
  Pages,
  AutoAwesome,
  TextFields,
  Inventory,
  ViewList,
  CreditCard,
  BarChart,
  TableView,
  Apps,
  Settings,
  Tune,
  ArrowCircleRightRounded as ArrowCircleRightRoundedIcon,
  ArrowCircleLeftRounded as ArrowCircleLeftRoundedIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  drawerStyles,
  miniDrawerStyles,
  typographyTitleStyles,
  boxContentStyles,
  typographyCategoryStyles,
  getListItemButtonStyles,
  getListItemIconStyles,
  getNestedListItemButtonStyles,
} from '../styles/dashboardStyles';

const SidebarItem = ({ sideBarIcon, sideBarText, sideBarBadge = null, sideBarNestedItems = null, isActive = false, onClick = null, isMini = false }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (sideBarNestedItems) {
      setOpen(!open);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClick}
          sx={getListItemButtonStyles(isActive)}
        >
          <ListItemIcon sx={getListItemIconStyles(isActive)}>{sideBarIcon}</ListItemIcon>
          {!isMini && <ListItemText primary={sideBarText} />}
          {!isMini && sideBarBadge && <Badge color="secondary" badgeContent={sideBarBadge} />}
          {!isMini && sideBarNestedItems && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {sideBarNestedItems && !isMini && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {sideBarNestedItems.map((nested, index) => (
              <ListItemButton
                key={index}
                onClick={() => navigate(nested.path)}
                sx={getNestedListItemButtonStyles(nested.isActive)}
              >
                <ListItemText primary={nested.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

SidebarItem.propTypes = {
  sideBarIcon: PropTypes.element.isRequired,
  sideBarText: PropTypes.string.isRequired,
  sideBarBadge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sideBarNestedItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ),
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  isMini: PropTypes.bool,
};

const Sidebar = ({ open, onToggle, isMini, onToggleMini, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const drawerWidth = isLargeScreen && isMini ? 80 : 280;

  const dashboardItems = [
    { text: 'Analytics', path: '/', isActive: location.pathname === '/' },
    { text: 'CRM', path: '/dashboards/crm', isActive: location.pathname === '/dashboards/crm' },
    { text: 'eCommerce', path: '/dashboards/ecommerce', isActive: location.pathname === '/dashboards/ecommerce' },
  ];

  const pagesItems = [
    { text: 'User Profile', path: '/pages/user-profile', isActive: location.pathname === '/pages/user-profile' },
    { text: 'Account Settings', path: '/pages/account-settings', isActive: location.pathname === '/pages/account-settings' },
    { text: 'Account', path: '/pages/account', isActive: location.pathname === '/pages/account' },
    { text: 'Security', path: '/pages/security', isActive: location.pathname === '/pages/security' },
    { text: 'Billing & Plans', path: '/pages/billing-plans', isActive: location.pathname === '/pages/billing-plans' },
    { text: 'Notifications', path: '/pages/notifications', isActive: location.pathname === '/pages/notifications' },
    { text: 'Connections', path: '/pages/connections', isActive: location.pathname === '/pages/connections' },
    { text: 'FAQ', path: '/pages/faq', isActive: location.pathname === '/pages/faq' },
    { text: 'Help Center', path: '/pages/help-center', isActive: location.pathname === '/pages/help-center' },
    { text: 'Pricing', path: '/pages/pricing', isActive: location.pathname === '/pages/pricing' },
    { text: 'Miscellaneous', path: '/pages/miscellaneous', isActive: location.pathname === '/pages/miscellaneous' },
  ];

  const invoiceItems = [
    { text: 'List', path: '/apps/invoice/list', isActive: location.pathname === '/apps/invoice/list' },
    { text: 'Preview', path: '/apps/invoice/preview', isActive: location.pathname === '/apps/invoice/preview' },
    { text: 'Edit', path: '/apps/invoice/edit', isActive: location.pathname === '/apps/invoice/edit' },
    { text: 'Add', path: '/apps/invoice/add', isActive: location.pathname === '/apps/invoice/add' },
  ];

  const handleDrawerToggle = () => {
    onToggle(!open);
  };

  return (
        <Drawer
            variant={isLargeScreen ? "persistent" : "temporary"}
            open={isLargeScreen ? true : open}
            onClose={handleDrawerToggle}
            css={isMini && isLargeScreen ? miniDrawerStyles : drawerStyles}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                transition: 'width .4s ease',
              },
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >

      <Toolbar sx={{ display: 'flex', justifyContent: isMini ? 'center' : 'space-between', alignItems: 'center' }}>
        {!isMini && (
          <Typography variant="h6" sx={typographyTitleStyles}>
            🌀 sneat
          </Typography>
        )}
        {isLargeScreen && (
          <IconButton
            onClick={onToggleMini}
            sx={{
              color: 'blue',
              backgroundColor: 'lightblue',
              '&:hover': {
                backgroundColor: 'lightgrey',
              },
            }}
          >
            {isMini ? <ArrowCircleRightRoundedIcon /> : <ArrowCircleLeftRoundedIcon />}
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <Box sx={boxContentStyles}>
        <List>
          {!isMini && (
            <Typography variant="caption" sx={typographyCategoryStyles}>
              DASHBOARDS
            </Typography>
          )}
          <SidebarItem
            sideBarIcon={<Dashboard />}
            sideBarText="Dashboards"
            sideBarBadge="New"
            sideBarNestedItems={dashboardItems}
            isMini={isMini}
          />

          {!isMini && (
            <Typography variant="caption" sx={typographyCategoryStyles}>
              APPS & PAGES
            </Typography>
          )}
          <SidebarItem
            sideBarIcon={<Email />}
            sideBarText="Email"
            onClick={() => navigate('/apps/email')}
            isActive={location.pathname.startsWith('/apps/email')}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Chat />}
            sideBarText="Chat"
            onClick={() => navigate('/apps/chat')}
            isActive={location.pathname === '/apps/chat'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<CalendarMonth />}
            sideBarText="Calendar"
            onClick={() => navigate('/apps/calendar')}
            isActive={location.pathname === '/apps/calendar'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<ReceiptLong />}
            sideBarText="Invoice"
            sideBarNestedItems={invoiceItems}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<People />}
            sideBarText="User"
            sideBarNestedItems={[
              { text: 'List', path: '/apps/user/list', isActive: location.pathname === '/apps/user/list' },
              { text: 'View', path: '/apps/user/view', isActive: location.pathname === '/apps/user/view' },
              { text: 'Edit', path: '/apps/user/edit', isActive: location.pathname === '/apps/user/edit' },
            ]}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Lock />}
            sideBarText="Roles & Permissions"
            sideBarNestedItems={[
              { text: 'Roles', path: '/apps/roles', isActive: location.pathname === '/apps/roles' },
              { text: 'Permissions', path: '/apps/permissions', isActive: location.pathname === '/apps/permissions' },
            ]}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Pages />}
            sideBarText="Pages"
            sideBarNestedItems={pagesItems}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Lock />}
            sideBarText="Auth Pages"
            sideBarNestedItems={[
              { text: 'Login', path: '/auth/login', isActive: location.pathname === '/auth/login' },
              { text: 'Register', path: '/auth/register', isActive: location.pathname === '/auth/register' },
              { text: 'Forgot Password', path: '/auth/forgot-password', isActive: location.pathname === '/auth/forgot-password' },
            ]}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<AutoAwesome />}
            sideBarText="Wizard Examples"
            onClick={() => navigate('/wizard-examples')}
            isActive={location.pathname === '/wizard-examples'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Apps />}
            sideBarText="Dialog Examples"
            onClick={() => navigate('/dialog-examples')}
            isActive={location.pathname === '/dialog-examples'}
            isMini={isMini}
          />

          {!isMini && (
            <Typography variant="caption" sx={typographyCategoryStyles}>
              USER INTERFACE
            </Typography>
          )}
          <SidebarItem
            sideBarIcon={<TextFields />}
            sideBarText="Typography"
            onClick={() => navigate('/ui/typography')}
            isActive={location.pathname === '/ui/typography'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Inventory />}
            sideBarText="Icons"
            onClick={() => navigate('/ui/icons')}
            isActive={location.pathname === '/ui/icons'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Inventory />}
            sideBarText="Icons Test"
            onClick={() => navigate('/ui/icons-test')}
            isActive={location.pathname === '/ui/icons-test'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Lock />}
            sideBarText="Cards"
            sideBarNestedItems={[
              { text: 'Basic', path: '/ui/cards/basic', isActive: location.pathname === '/ui/cards/basic' },
              { text: 'Advanced', path: '/ui/cards/advanced', isActive: location.pathname === '/ui/cards/advanced' },
              { text: 'Statistics', path: '/ui/cards/statistics', isActive: location.pathname === '/ui/cards/statistics' },
              { text: 'Widgets', path: '/ui/cards/widgets', isActive: location.pathname === '/ui/cards/widgets' },
              { text: 'Gamification', path: '/ui/cards/gamification', isActive: location.pathname === '/ui/cards/gamification' },
              { text: 'Actions', path: '/ui/cards/actions', isActive: location.pathname === '/ui/cards/actions' },
            ]}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Apps />}
            sideBarText="Components"
            sideBarBadge={19}
            onClick={() => navigate('/ui/components')}
            isActive={location.pathname === '/ui/components'}
            isMini={isMini}
          />

          {!isMini && (
            <Typography variant="caption" sx={typographyCategoryStyles}>
              FORMS & TABLES
            </Typography>
          )}
          <SidebarItem
            sideBarIcon={<CreditCard />}
            sideBarText="Form Elements"
            onClick={() => navigate('/forms/elements')}
            isActive={location.pathname === '/forms/elements'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<ViewList />}
            sideBarText="Form Layouts"
            onClick={() => navigate('/forms/layouts')}
            isActive={location.pathname === '/forms/layouts'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Tune />}
            sideBarText="Form Validation"
            onClick={() => navigate('/forms/validation')}
            isActive={location.pathname === '/forms/validation'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<AutoAwesome />}
            sideBarText="Form Wizard"
            onClick={() => navigate('/forms/wizard')}
            isActive={location.pathname === '/forms/wizard'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<TableView />}
            sideBarText="Table"
            onClick={() => navigate('/tables/table')}
            isActive={location.pathname === '/tables/table'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Apps />}
            sideBarText="Mui DataGrid"
            onClick={() => navigate('/tables/mui-datagrid')}
            isActive={location.pathname === '/tables/mui-datagrid'}
            isMini={isMini}
          />

          {!isMini && (
            <Typography variant="caption" sx={typographyCategoryStyles}>
              CHARTS & MISC
            </Typography>
          )}
          <SidebarItem
            sideBarIcon={<BarChart />}
            sideBarText="Charts"
            onClick={() => navigate('/charts')}
            isActive={location.pathname === '/charts'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Lock />}
            sideBarText="Access Control"
            onClick={() => navigate('/misc/access-control')}
            isActive={location.pathname === '/misc/access-control'}
            isMini={isMini}
          />
          <SidebarItem
            sideBarIcon={<Settings />}
            sideBarText="Others"
            onClick={() => navigate('/misc/others')}
            isActive={location.pathname === '/misc/others'}
            isMini={isMini}
          />
        </List>
      </Box>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  isMini: PropTypes.bool.isRequired,
  onToggleMini: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default Sidebar;