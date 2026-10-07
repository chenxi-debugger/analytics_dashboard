import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Switch, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { CloudOutlined, ChatOutlined, CodeOutlined, CalendarMonthOutlined, StorageOutlined, AlternateEmailOutlined } from '@mui/icons-material';

const APPS = [
  { name: 'Google Drive', desc: 'Export reports to your Drive', icon: CloudOutlined, color: 'success', connected: true },
  { name: 'Slack', desc: 'Post alerts to a Slack channel', icon: ChatOutlined, color: 'secondary', connected: false },
  { name: 'GitHub', desc: 'Link releases to dashboard events', icon: CodeOutlined, color: 'info', connected: true },
  { name: 'Calendar', desc: 'Sync calendar events', icon: CalendarMonthOutlined, color: 'warning', connected: false },
  { name: 'MongoDB Atlas', desc: 'Data source for this dashboard', icon: StorageOutlined, color: 'success', connected: true },
];

const SOCIAL = [
  { name: 'Email', handle: 'Primary contact', connected: true },
  { name: 'LinkedIn', handle: 'Not connected', connected: false },
  { name: 'X (Twitter)', handle: 'Not connected', connected: false },
];

// "Connections" tab: third-party integrations. Toggles are local only (demo).
const ConnectionsTab = () => {
  const theme = useTheme();
  const [apps, setApps] = useState(APPS);
  const [social, setSocial] = useState(SOCIAL);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6">Connected Accounts</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Display content from your connected accounts on your site</Typography>
            {apps.map((app, i) => {
              const Icon = app.icon;
              return (
                <Box key={app.name}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 1.5, display: 'grid', placeItems: 'center',
                      bgcolor: alpha(theme.palette[app.color].main, 0.14), color: theme.palette[app.color].main }}>
                      <Icon />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{app.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{app.desc}</Typography>
                    </Box>
                    <Switch checked={app.connected}
                      onChange={() => setApps((list) => list.map((a, j) => (j === i ? { ...a, connected: !a.connected } : a)))} />
                  </Box>
                  {i < apps.length - 1 && <Divider />}
                </Box>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6">Social Accounts</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Display content from social accounts on your site</Typography>
            {social.map((s, i) => (
              <Box key={s.name}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 1.5, display: 'grid', placeItems: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                    <AlternateEmailOutlined />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{s.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{s.connected ? 'Connected' : s.handle}</Typography>
                  </Box>
                  <Button size="small" variant="outlined" color={s.connected ? 'error' : 'secondary'}
                    onClick={() => setSocial((list) => list.map((x, j) => (j === i ? { ...x, connected: !x.connected } : x)))}>
                    {s.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </Box>
                {i < social.length - 1 && <Divider />}
              </Box>
            ))}
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
              Demo only: these switches are not saved.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ConnectionsTab;
