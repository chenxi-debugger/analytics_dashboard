import React from 'react';
import { Box, Typography, Paper, Stack, Grid, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, Receipt, MeetingRoom, Group } from '@mui/icons-material';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';

const ActivityTimelineCard = ({ theme }) => {
  const [salesAnchorEl, setSalesAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setSalesAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setSalesAnchorEl(null);
  };

  const activities = [
    {
      title: '12 Invoices have been paid',
      description: '12 min ago',
      color: '#4CAF50',
      attachment: 'Invoices.pdf'
    },
    {
      title: 'Client Meeting',
      subtitle: 'Project meeting with john @10:15am',
      description: '45 min ago',
      color: '#FF9800',
      client: 'Steven Nash',
      avatar_color: '#E0E0E0'
    },
    {
      title: 'Create a new project for client',
      description: '2 days ago',
      color: '#2196F3',
      avatars: ['#FF5722', '#9C27B0', '#FF9800', '#4CAF50']
    }
  ];

  const getActivityIcon = (activityTitle) => {
    switch (activityTitle) {
      case '12 Invoices have been paid':
        return <Receipt />;
      case 'Client Meeting':
        return <MeetingRoom />;
      case 'Create a new project for client':
        return <Group />;
      default:
        return null;
    }
  };

  // 图片数组
  const avatarImages = ['/9.png', '/5.png', '/6.png', '/7.png', '/8.png'];

  return (
    <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('activityCard', theme)}>
        <Stack spacing={1}>
          <Box sx={getAnalyticsStyle('activityHeader', theme)}>
            <Typography variant="h6" sx={getAnalyticsStyle('activityTypographyH6', theme)}>
              Activity Timeline
            </Typography>
            <IconButton aria-label="More options" onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <Menu
                anchorEl={salesAnchorEl}
                open={Boolean(salesAnchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Refresh</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Update</MenuItem>
              </Menu>
            </Box>
          </Box>
          <Stack spacing={1.5} sx={getAnalyticsStyle('activityList', theme)}>
            {activities.map((activity, index) => (
              <Box key={index} sx={getAnalyticsStyle('activityItem', theme)}>
                <Avatar
                  sx={[getAnalyticsStyle('activityIcon', theme), { bgcolor: activity.color }]}
                  src={index === 0 ? '/1.png' : index === 1 ? '/2.png' : '/3.png'}
                >
                  {getActivityIcon(activity.title)}
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={getAnalyticsStyle('activityItemTypographyBody2', theme)}>
                    {activity.title}
                  </Typography>
                  <Typography variant="caption" sx={getAnalyticsStyle('activityItemTypographyCaption', theme)}>
                    {activity.subtitle || activity.description}
                  </Typography>
                  {activity.attachment && (
                    <Typography variant="caption" sx={getAnalyticsStyle('activityAttachment', theme)}>
                      {activity.attachment}
                    </Typography>
                  )}
                  {activity.client && (
                    <Box sx={getAnalyticsStyle('activityClient', theme)}>
                      <Avatar
                        sx={[getAnalyticsStyle('activityAvatar', theme), { bgcolor: activity.avatar_color }]}
                        src={'/2.png'}
                      />
                      <Box>
                        <Typography variant="body2" sx={getAnalyticsStyle('activityClientTypographyBody2', theme)}>
                          {activity.client}
                        </Typography>
                        <Typography variant="caption" sx={getAnalyticsStyle('activityClientTypographyCaption', theme)}>
                          CEO of ThemeSelection
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {activity.avatars && (
                    <Box sx={getAnalyticsStyle('activityAvatars', theme)}>
                      {activity.avatars.map((color, idx) => (
                        <Avatar
                          key={idx}
                          sx={[getAnalyticsStyle('activityAvatar', theme), { bgcolor: color }]}
                          src={avatarImages[idx % avatarImages.length]}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
                <Typography variant="caption" sx={getAnalyticsStyle('activityItemTypographyCaption', theme)}>
                  {activity.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default ActivityTimelineCard;