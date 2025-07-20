import React from 'react';
import { Box, Typography, Paper, Stack, Tabs, Tab, Avatar, Grid } from '@mui/material'; // 添加 Grid
import getAnalyticsStyle from '../../styles/analyticsPageStyle';

const BrowserCard = ({ data, theme, statsTab, setStatsTab }) => {
  return (
    <Grid size={{ xs: 6, md: 6, lg: 6 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('browserCard', theme)}>
        <Stack spacing={1}>
          {/* Tabs */}
          <Tabs
            value={statsTab}
            onChange={(event, newValue) => setStatsTab(newValue)}
            sx={getAnalyticsStyle('browserTabs', theme)}
          >
            {data?.browser_stats_card?.tabs?.map((tab, index) => (
              <Tab
                key={index}
                label={tab}
                value={tab.toLowerCase().replace(' ', '_')}
                sx={
                  statsTab === tab.toLowerCase().replace(' ', '_')
                    ? [getAnalyticsStyle('browserTabTypographyButton', theme), getAnalyticsStyle('incomeActiveTab', theme)]
                    : getAnalyticsStyle('browserTabTypographyButton', theme)
                }
              />
            ))}
          </Tabs>
          {/* Stats List */}
          {data?.browser_stats_card?.[statsTab] && data?.browser_stats_card?.[statsTab]?.stats ? (
            <Stack spacing={1.5} sx={getAnalyticsStyle('browserList', theme)}>
              {data.browser_stats_card[statsTab].stats.map((stat, index) => (
                <Box key={index} sx={getAnalyticsStyle('browserItem', theme)}>
                  <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                    {stat.rank}
                  </Typography>
                  <Avatar
                    sx={[getAnalyticsStyle('browserIcon', theme), { bgcolor: 'transparent' }]}
                    src={
                      stat.browser === 'Chrome' ? '/chrome.png' :
                      stat.browser === 'Safari' ? '/safari.png' :
                      stat.browser === 'Firefox' ? '/firefox.png' :
                      stat.browser === 'Edge' ? '/edge.png' :
                      stat.browser === 'Opera' ? '/opera.png' :
                      stat.browser === 'Brave' ? '/brave.png' :
                      null
                    }
                  />
                  <Typography
                    variant="body2"
                    sx={[getAnalyticsStyle('browserItemTypographyBody2', theme), { color: theme.palette.text.primary, fontWeight: 600 }]}
                  >
                    {stat[statsTab === 'browser' ? 'browser' : statsTab === 'operating_system' ? 'system' : 'country']}
                  </Typography>
                  <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                    {stat.value}
                  </Typography>
                  <Box sx={getAnalyticsStyle('browserProgress', theme)}>
                    <Box sx={[getAnalyticsStyle('browserProgressBar', theme), { width: stat.percentage, bgcolor: stat.color }]} />
                  </Box>
                  <Typography variant="body2" sx={[getAnalyticsStyle('browserItemTypographyBody2', theme), { fontWeight: 600 }]}>
                    {stat.percentage}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : null}
        </Stack>
      </Paper>
    </Grid>
  );
};

export default BrowserCard;