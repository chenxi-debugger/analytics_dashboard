import React from 'react';
import { Box, Typography, Paper, Stack, Grid, Avatar, IconButton } from '@mui/material'; // 添加 IconButton
import { MoreVert, Receipt, MeetingRoom, Group } from '@mui/icons-material';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';

const ActivityTimelineCard = ({ data, theme }) => {
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

  return (
    <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('activityCard', theme)}>
        <Stack spacing={1}>
          <Box sx={getAnalyticsStyle('activityHeader', theme)}>
            <Typography variant="h6" sx={getAnalyticsStyle('activityTypographyH6', theme)}>
              {data.activity_timeline_card.title}
            </Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
          <Stack spacing={1.5} sx={getAnalyticsStyle('activityList', theme)}>
            {data.activity_timeline_card?.activities?.map((activity, index) => (
              <Box key={index} sx={getAnalyticsStyle('activityItem', theme)}>
                <Avatar sx={[getAnalyticsStyle('activityIcon', theme), { bgcolor: activity.color }]}>
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
                      <Avatar sx={[getAnalyticsStyle('activityAvatar', theme), { bgcolor: activity.avatar_color }]} />
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
                      {data.activity_timeline_card.activities[2].avatars.map((color, idx) => (
                        <Avatar
                          key={idx}
                          sx={[getAnalyticsStyle('activityAvatar', theme), { bgcolor: color }]}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
                <Typography variant="caption" sx={getAnalyticsStyle('activityItemTypographyCaption', theme)}>
                  {activity.description}
                </Typography>
              </Box>
            )) || <Typography>No activities available</Typography>}
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default ActivityTimelineCard;