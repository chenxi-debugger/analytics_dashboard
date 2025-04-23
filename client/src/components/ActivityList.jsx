import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const ActivityList = () => {
  const activities = [
    { time: '10:00 AM', description: 'User John Doe signed up' },
    { time: '10:30 AM', description: 'Order #1234 was placed' },
    { time: '11:00 AM', description: 'Payment for Order #1234 was received' },
    { time: '12:00 PM', description: 'User Jane Smith updated her profile' },
  ];

  return (
    <div>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Recent Activities
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={activity.description}
                secondary={activity.time}
              />
            </ListItem>
            {index < activities.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default ActivityList;
