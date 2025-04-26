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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

const SidebarItem = ({ sideBarIcon, sideBarText, sideBarBadge = null, sideBarNestedItems = null, isActive = false, onClick = null }) => {
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
        <ListItemButton onClick={handleClick} className={isActive ? 'active-item' : ''}>
          <ListItemIcon>{sideBarIcon}</ListItemIcon>
          <ListItemText primary={sideBarText} />
          {sideBarBadge && <Badge color="secondary" badgeContent={sideBarBadge} />}
          {sideBarNestedItems && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {sideBarNestedItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {sideBarNestedItems.map((nested, index) => (
              <ListItemButton
                key={index}
                onClick={() => navigate(nested.path)}
                className={nested.isActive ? 'active-nested-item' : 'sidebar-nested-item'}
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
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dashboardItems = [
    { text: 'Analytics', path: '/dashboards/analytics', isActive: location.pathname === '/dashboards/analytics' },
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

  return (
    <Drawer variant="permanent" className="sidebar-drawer">
      <Toolbar>
        <Typography variant="h6" className="sidebar-title">
          🌀 sneat
        </Typography>
      </Toolbar>
      <Divider />
      <Box className="sidebar-content">
        <List>
          <Typography variant="caption" className="sidebar-category">
            DASHBOARDS
          </Typography>
          <SidebarItem
            sideBarIcon={<Dashboard />}
            sideBarText="Dashboards"
            sideBarBadge="New"
            sideBarNestedItems={dashboardItems}
          />

          <Typography variant="caption" className="sidebar-category">
            APPS & PAGES
          </Typography>
          <SidebarItem sideBarIcon={<Email />} sideBarText="Email" onClick={() => navigate('/apps/email')} />
          <SidebarItem sideBarIcon={<Chat />} sideBarText="Chat" onClick={() => navigate('/apps/chat')} />
          <SidebarItem sideBarIcon={<CalendarMonth />} sideBarText="Calendar" onClick={() => navigate('/apps/calendar')} />
          <SidebarItem
            sideBarIcon={<ReceiptLong />}
            sideBarText="Invoice"
            sideBarNestedItems={[
              { text: 'List', path: '/apps/invoice/list', isActive: location.pathname === '/apps/invoice/list' },
              { text: 'Preview', path: '/apps/invoice/preview', isActive: location.pathname === '/apps/invoice/preview' },
              { text: 'Edit', path: '/apps/invoice/edit', isActive: location.pathname === '/apps/invoice/edit' },
              { text: 'Add', path: '/apps/invoice/add', isActive: location.pathname === '/apps/invoice/add' },
            ]}
          />
          <SidebarItem
            sideBarIcon={<People />}
            sideBarText="User"
            sideBarNestedItems={[
              { text: 'List', path: '/apps/user/list', isActive: location.pathname === '/apps/user/list' },
              { text: 'View', path: '/apps/user/view', isActive: location.pathname === '/apps/user/view' },
              { text: 'Edit', path: '/apps/user/edit', isActive: location.pathname === '/apps/user/edit' },
            ]}
          />
          <SidebarItem
            sideBarIcon={<Lock />}
            sideBarText="Roles & Permissions"
            sideBarNestedItems={[
              { text: 'Roles', path: '/apps/roles', isActive: location.pathname === '/apps/roles' },
              { text: 'Permissions', path: '/apps/permissions', isActive: location.pathname === '/apps/permissions' },
            ]}
          />
          <SidebarItem
            sideBarIcon={<Pages />}
            sideBarText="Pages"
            sideBarNestedItems={pagesItems}
          />
          <SidebarItem
            sideBarIcon={<Lock />}
            sideBarText="Auth Pages"
            sideBarNestedItems={[
              { text: 'Login', path: '/auth/login', isActive: location.pathname === '/auth/login' },
              { text: 'Register', path: '/auth/register', isActive: location.pathname === '/auth/register' },
              { text: 'Forgot Password', path: '/auth/forgot-password', isActive: location.pathname === '/auth/forgot-password' },
            ]}
          />
          <SidebarItem sideBarIcon={<AutoAwesome />} sideBarText="Wizard Examples" onClick={() => navigate('/wizard-examples')} />
          <SidebarItem sideBarIcon={<Apps />} sideBarText="Dialog Examples" onClick={() => navigate('/dialog-examples')} />

          <Typography variant="caption" className="sidebar-category">
            USER INTERFACE
          </Typography>
          <SidebarItem sideBarIcon={<TextFields />} sideBarText="Typography" onClick={() => navigate('/ui/typography')} />
          <SidebarItem sideBarIcon={<Inventory />} sideBarText="Icons" onClick={() => navigate('/ui/icons')} />
          <SidebarItem sideBarIcon={<Inventory />} sideBarText="Icons Test" onClick={() => navigate('/ui/icons-test')} />
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
          />
          <SidebarItem
            sideBarIcon={<Apps />}
            sideBarText="Components"
            sideBarBadge={19}
            onClick={() => navigate('/ui/components')}
          />

          <Typography variant="caption" className="sidebar-category">
            FORMS & TABLES
          </Typography>
          <SidebarItem sideBarIcon={<CreditCard />} sideBarText="Form Elements" onClick={() => navigate('/forms/elements')} />
          <SidebarItem sideBarIcon={<ViewList />} sideBarText="Form Layouts" onClick={() => navigate('/forms/layouts')} />
          <SidebarItem sideBarIcon={<Tune />} sideBarText="Form Validation" onClick={() => navigate('/forms/validation')} />
          <SidebarItem sideBarIcon={<AutoAwesome />} sideBarText="Form Wizard" onClick={() => navigate('/forms/wizard')} />
          <SidebarItem sideBarIcon={<TableView />} sideBarText="Table" onClick={() => navigate('/tables/table')} />
          <SidebarItem sideBarIcon={<Apps />} sideBarText="Mui DataGrid" onClick={() => navigate('/tables/mui-datagrid')} />

          <Typography variant="caption" className="sidebar-category">
            CHARTS & MISC
          </Typography>
          <SidebarItem sideBarIcon={<BarChart />} sideBarText="Charts" onClick={() => navigate('/charts')} />
          <SidebarItem sideBarIcon={<Lock />} sideBarText="Access Control" onClick={() => navigate('/misc/access-control')} />
          <SidebarItem sideBarIcon={<Settings />} sideBarText="Others" onClick={() => navigate('/misc/others')} />
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;