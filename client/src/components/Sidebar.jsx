import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
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
import '../styles/sidebar.css'; // Ensure the correct relative path

const SidebarItem = ({ sideBarIcon, sideBarText, sideBarBadge, sideBarNestedItems }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (sideBarNestedItems) setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
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
              <ListItemButton key={index}>
                <ListItemText primary={nested} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

// Define PropTypes for SidebarItem
SidebarItem.propTypes = {
  sideBarIcon: PropTypes.element.isRequired, // Must be a React element
  sideBarText: PropTypes.string.isRequired, // Must be a string
  sideBarBadge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional string or number
  sideBarNestedItems: PropTypes.arrayOf(PropTypes.string), // Optional array of strings
};

// Define defaultProps for SidebarItem
SidebarItem.defaultProps = {
  sideBarBadge: null, // Default to null if not provided
  sideBarNestedItems: null, // Default to null if not provided
};

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      className="sidebar-drawer"
    >
      <Toolbar>
        <Typography variant="h6" className="sidebar-title">
          🌀 sneat
        </Typography>
      </Toolbar>
      <Divider />
      <Box className="sidebar-content">
        <List>
          <SidebarItem sideBarIcon={<Dashboard />} sideBarText="Dashboards" sideBarBadge="New" />
          <Typography variant="caption" className="sidebar-category">
            APPS & PAGES
          </Typography>
          <SidebarItem sideBarIcon={<Email />} sideBarText="Email" />
          <SidebarItem sideBarIcon={<Chat />} sideBarText="Chat" />
          <SidebarItem sideBarIcon={<CalendarMonth />} sideBarText="Calendar" />
          <SidebarItem sideBarIcon={<ReceiptLong />} sideBarText="Invoice" sideBarNestedItems={['List', 'Preview', 'Edit', 'Add']} />
          <SidebarItem sideBarIcon={<People />} sideBarText="User" sideBarNestedItems={['List', 'View', 'Edit']} />
          <SidebarItem sideBarIcon={<Lock />} sideBarText="Roles & Permissions" sideBarNestedItems={['Roles', 'Permissions']} />
          <SidebarItem sideBarIcon={<Pages />} sideBarText="Pages" sideBarNestedItems={['Profile', 'Settings', 'Pricing', 'FAQ']} />
          <SidebarItem sideBarIcon={<Lock />} sideBarText="Auth Pages" sideBarNestedItems={['Login', 'Register', 'Forgot Password']} />
          <SidebarItem sideBarIcon={<AutoAwesome />} sideBarText="Wizard Examples" />
          <SidebarItem sideBarIcon={<Apps />} sideBarText="Dialog Examples" />

          <Typography variant="caption" className="sidebar-category">
            USER INTERFACE
          </Typography>
          <SidebarItem sideBarIcon={<TextFields />} sideBarText="Typography" />
          <SidebarItem sideBarIcon={<Inventory />} sideBarText="Icons" />
          <SidebarItem sideBarIcon={<Inventory />} sideBarText="Icons Test" />
          <SidebarItem
            sideBarIcon={<Lock />}
            sideBarText="Cards"
            sideBarNestedItems={[
              'Basic',
              'Advanced',
              'Statistics',
              'Widgets',
              'Gamification',
              'Actions',
            ]}
          />
          <SidebarItem sideBarIcon={<Apps />} sideBarText="Components" sideBarBadge={12} />

          <Typography variant="caption" className="sidebar-category">
            FORMS & TABLES
          </Typography>
          <SidebarItem sideBarIcon={<CreditCard />} sideBarText="Form Elements" />
          <SidebarItem sideBarIcon={<ViewList />} sideBarText="Form Layouts" />
          <SidebarItem sideBarIcon={<Tune />} sideBarText="Form Validation" />
          <SidebarItem sideBarIcon={<AutoAwesome />} sideBarText="Form Wizard" />
          <SidebarItem sideBarIcon={<TableView />} sideBarText="Table" />
          <SidebarItem sideBarIcon={<Apps />} sideBarText="Mui DataGrid" />

          <Typography variant="caption" className="sidebar-category">
            CHARTS & MISC
          </Typography>
          <SidebarItem sideBarIcon={<BarChart />} sideBarText="Charts" />
          <SidebarItem sideBarIcon={<Lock />} sideBarText="Access Control" />
          <SidebarItem sideBarIcon={<Settings />} sideBarText="Others" />
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
