import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Analytics Dashboard
        </Typography>
      </Toolbar>
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
