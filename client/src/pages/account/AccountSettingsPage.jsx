import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import {
  BookmarkBorderOutlined,
  LinkOutlined,
  LockOutlined,
  NotificationsNoneOutlined,
  PersonOutline,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountTab from './AccountTab';
import SecurityTab from './SecurityTab';
import BillingTab from './BillingTab';
import NotificationsTab from './NotificationsTab';
import ConnectionsTab from './ConnectionsTab';

// Each tab has its own URL so the sidebar links (Account, Security, …) open the right tab.
const TABS = [
  { path: '/pages/account', label: 'Account', icon: <PersonOutline fontSize="small" />, Component: AccountTab },
  { path: '/pages/security', label: 'Security', icon: <LockOutlined fontSize="small" />, Component: SecurityTab },
  { path: '/pages/billing-plans', label: 'Billing & Plans', icon: <BookmarkBorderOutlined fontSize="small" />, Component: BillingTab },
  { path: '/pages/notifications', label: 'Notifications', icon: <NotificationsNoneOutlined fontSize="small" />, Component: NotificationsTab },
  { path: '/pages/connections', label: 'Connections', icon: <LinkOutlined fontSize="small" />, Component: ConnectionsTab },
];

const AccountSettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // "/pages/account-settings" (the parent menu item) shows the first tab.
  const index = Math.max(0, TABS.findIndex((t) => t.path === location.pathname));
  const { Component } = TABS[index];

  return (
    <Box>
      <Tabs
        value={index}
        onChange={(_, i) => navigate(TABS[i].path)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, '& .MuiTab-root': { minHeight: 42, borderRadius: 1.5, mr: 1 }, '& .Mui-selected': { bgcolor: 'primary.main', color: '#fff !important' }, '& .MuiTabs-indicator': { display: 'none' } }}
      >
        {TABS.map((t) => (
          <Tab key={t.path} icon={t.icon} iconPosition="start" label={t.label} />
        ))}
      </Tabs>
      <Component />
    </Box>
  );
};

export default AccountSettingsPage;
