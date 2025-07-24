import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, Avatar, Grid } from '@mui/material';
import getAnalyticsStyle from '../../styles/analyticsPageStyle';

const BrowserCard = ({ theme }) => {
  const [statsTab, setStatsTab] = useState('browser');

  // 硬编码数据，更新为每 tab 6 组数据
  const statsData = {
    browser: {
      stats: [
        { rank: '1', browser: 'Chrome', value: '68.2k', percentage: '68%', color: '#4CAF50', icon: '/chrome.png' },
        { rank: '2', browser: 'Safari', value: '15.4k', percentage: '15%', color: '#FF9800', icon: '/safari.png' },
        { rank: '3', browser: 'Firefox', value: '8.9k', percentage: '9%', color: '#2196F3', icon: '/firefox.png' },
        { rank: '4', browser: 'Edge', value: '4.5k', percentage: '5%', color: '#9C27B0', icon: '/edge.png' },
        { rank: '5', browser: 'Opera', value: '2.1k', percentage: '2%', color: '#FF5722', icon: '/opera.png' },
        { rank: '6', browser: 'Brave', value: '1.2k', percentage: '1%', color: '#3F51B5', icon: '/brave.png' }
      ]
    },
    operating_system: {
      stats: [
        { rank: '1', system: 'Windows', value: '45.6k', percentage: '46%', color: '#4CAF50', icon: '/windows.png' },
        { rank: '2', system: 'macOS', value: '25.3k', percentage: '25%', color: '#FF9800', icon: '/macos.png' },
        { rank: '3', system: 'Linux', value: '12.8k', percentage: '13%', color: '#2196F3', icon: '/linux.png' },
        { rank: '4', system: 'iOS', value: '8.9k', percentage: '9%', color: '#9C27B0', icon: '/ios.png' },
        { rank: '5', system: 'Android', value: '6.4k', percentage: '6%', color: '#FF5722', icon: '/android.png' },
        { rank: '6', system: 'Chrome OS', value: '1.0k', percentage: '1%', color: '#3F51B5', icon: '/chromeos.png' }
      ]
    },
    country: {
      stats: [
        { rank: '1', country: 'USA', value: '30.5k', percentage: '31%', color: '#4CAF50', icon: '/usa.png' },
        { rank: '2', country: 'UK', value: '18.9k', percentage: '19%', color: '#FF9800', icon: '/uk.png' },
        { rank: '3', country: 'Germany', value: '15.2k', percentage: '15%', color: '#2196F3', icon: '/germany.png' },
        { rank: '4', country: 'France', value: '12.3k', percentage: '12%', color: '#9C27B0', icon: '/france.png' },
        { rank: '5', country: 'Canada', value: '10.1k', percentage: '10%', color: '#FF5722', icon: '/canada.png' },
        { rank: '6', country: 'Australia', value: '3.0k', percentage: '3%', color: '#3F51B5', icon: '/australia.png' }
      ]
    }
  };

  return (
    <Grid size={{ xs: 12, md: 12, lg: 6 }} sx={{ display: 'flex' }}>
      <Paper sx={getAnalyticsStyle('browserCard', theme)}>
        <Stack spacing={1}>
          {/* Tabs */}
          <Box sx={getAnalyticsStyle('browserTabs', theme)}>
            {['Browser', 'Operating System', 'Country'].map((tab, index) => (
              <Typography
                key={index}
                variant="button"
                sx={
                  statsTab === tab.toLowerCase().replace(' ', '_')
                    ? [getAnalyticsStyle('browserTabTypographyButton', theme), getAnalyticsStyle('browserActiveTab', theme)]
                    : getAnalyticsStyle('browserTabTypographyButton', theme)
                }
                onClick={() => setStatsTab(tab.toLowerCase().replace(' ', '_'))}
              >
                {tab}
              </Typography>
            ))}
          </Box>
          {/* Horizontal Line */}
          <hr style={{ border: '1px solid #e0e0e0', margin: '0 -20px' }} />
          {/* Table */}
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              {/* Title Row */}
              <thead>
                <tr>
                  <th style={{ width: '10%', padding: '8px', textAlign: 'left', fontWeight: 600 }}>
                    <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                      No.
                    </Typography>
                  </th>
                  <th style={{ width: '30%', padding: '8px', textAlign: 'left', fontWeight: 600 }}>
                    <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                      Browser
                    </Typography>
                  </th>
                  <th style={{ width: '20%', padding: '8px', textAlign: 'left', fontWeight: 600 }}>
                    <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                      Visits
                    </Typography>
                  </th>
                  <th style={{ width: '40%', padding: '8px', textAlign: 'left', fontWeight: 600 }}>
                    <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                      Data in Percentage
                    </Typography>
                  </th>
                </tr>
              </thead>
              {/* Data Rows */}
              <tbody>
                {statsData[statsTab] && statsData[statsTab].stats ? (
                  statsData[statsTab].stats.map((stat, index) => (
                    <tr key={index}>
                      <td style={{ width: '10%', padding: '8px', verticalAlign: 'middle' }}>
                        <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                          {stat.rank}
                        </Typography>
                      </td>
                      <td style={{ width: '30%', padding: '8px', verticalAlign: 'middle' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {statsTab === 'browser' && (
                            <Avatar
                              sx={[getAnalyticsStyle('browserIcon', theme), { bgcolor: 'transparent' }]}
                              src={stat.icon}
                            />
                          )}
                          {statsTab === 'operating_system' && (
                            <Avatar
                              sx={[getAnalyticsStyle('browserIcon', theme), { bgcolor: 'transparent' }]}
                              src={stat.icon}
                            />
                          )}
                          {statsTab === 'country' && (
                            <Avatar
                              sx={[getAnalyticsStyle('browserIcon', theme), { bgcolor: 'transparent' }]}
                              src={stat.icon}
                            />
                          )}
                          <Typography
                            variant="body2"
                            sx={[getAnalyticsStyle('browserItemTypographyBody2', theme), { color: theme.palette.text.primary, fontWeight: 600, textAlign: 'left' }]}
                          >
                            {stat[statsTab === 'browser' ? 'browser' : statsTab === 'operating_system' ? 'system' : 'country']}
                          </Typography>
                        </Box>
                      </td>
                      <td style={{ width: '20%', padding: '8px', verticalAlign: 'middle' }}>
                        <Typography variant="body2" sx={getAnalyticsStyle('browserItemTypographyBody2', theme)}>
                          {stat.value}
                        </Typography>
                      </td>
                      <td style={{ width: '40%', padding: '8px', verticalAlign: 'middle' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={getAnalyticsStyle('browserProgress', theme, { flex: '1', mr: 1 })}>
                            <Box sx={[getAnalyticsStyle('browserProgressBar', theme), { width: stat.percentage, bgcolor: stat.color }]} />
                          </Box>
                          <Typography variant="body2" sx={[getAnalyticsStyle('browserItemTypographyBody2', theme), { fontWeight: 600, textAlign: 'left' }]}>
                            {stat.percentage}
                          </Typography>
                        </Box>
                      </td>
                    </tr>
                  ))
                ) : null}
              </tbody>
            </table>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
};


export default BrowserCard;