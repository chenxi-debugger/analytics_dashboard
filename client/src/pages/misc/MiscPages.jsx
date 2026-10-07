import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardActionArea, CardContent, Grid, TextField, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  BlockOutlined,
  BuildOutlined,
  ErrorOutline,
  HourglassTopOutlined,
  SearchOffOutlined,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// The full-screen status pages (no sidebar). Each key becomes /misc/<key>.
export const MISC_SCREENS = {
  'coming-soon': {
    title: 'We are launching soon 🚀',
    text: 'Our website is opening soon. Please register to get notified when it’s ready!',
    icon: HourglassTopOutlined,
    color: 'primary',
    subscribe: true,
  },
  'under-maintenance': {
    title: 'Under Maintenance! 🚧',
    text: 'Sorry for the inconvenience but we’re performing some maintenance at the moment.',
    icon: BuildOutlined,
    color: 'warning',
  },
  '404': { code: '404', title: 'Page Not Found ⚠️', text: 'We couldn’t find the page you are looking for.', icon: SearchOffOutlined, color: 'info' },
  '401': { code: '401', title: 'You are not authorized! 🔐', text: 'You don’t have permission to access this page. Go home!', icon: BlockOutlined, color: 'error' },
  '500': { code: '500', title: 'Internal Server Error 👨🏻‍💻', text: 'Oops, something went wrong!', icon: ErrorOutline, color: 'secondary' },
};

// Full-screen page used by /misc/:kind
export function MiscScreen({ kind }) {
  const theme = useTheme();
  const screen = MISC_SCREENS[kind] || MISC_SCREENS['404'];
  const Icon = screen.icon;
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2, textAlign: 'center', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 520 }}>
        {screen.code ? (
          <Typography sx={{ fontSize: { xs: 90, md: 128 }, fontWeight: 700, lineHeight: 1, color: alpha(theme.palette[screen.color].main, 0.9) }}>
            {screen.code}
          </Typography>
        ) : (
          <Box sx={{ width: 96, height: 96, borderRadius: '50%', mx: 'auto', display: 'grid', placeItems: 'center',
            bgcolor: alpha(theme.palette[screen.color].main, 0.14), color: theme.palette[screen.color].main }}>
            <Icon sx={{ fontSize: 48 }} />
          </Box>
        )}
        <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>{screen.title}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>{screen.text}</Typography>
        {screen.subscribe && (
          <Box component="form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}
            sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 3 }}>
            <TextField size="small" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={done} />
            <Button type="submit" variant="contained" disabled={!email || done}>{done ? 'Thanks!' : 'Notify'}</Button>
          </Box>
        )}
        <Button component={RouterLink} to="/" variant="contained">Back to Home</Button>
      </Box>
    </Box>
  );
}
MiscScreen.propTypes = { kind: PropTypes.string.isRequired };

// Sidebar "Miscellaneous": an index of the status pages.
export function MiscIndexPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>Miscellaneous Pages</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Full-screen status pages. Click a card to open it.</Typography>
      <Grid container spacing={3}>
        {Object.entries(MISC_SCREENS).map(([key, s]) => {
          const Icon = s.icon;
          return (
            <Grid key={key} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => navigate(`/misc/${key}`)} sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 2, display: 'grid', placeItems: 'center', flexShrink: 0,
                      bgcolor: alpha(theme.palette[s.color].main, 0.14), color: theme.palette[s.color].main }}>
                      <Icon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{s.code ? `${s.code} – ` : ''}{s.title.replace(/[^\w\s!'’-]/g, '').trim()}</Typography>
                      <Typography variant="body2" color="text.secondary">{s.text}</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
