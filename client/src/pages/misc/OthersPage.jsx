import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Check,
  ContentCopy,
  Edit,
  FileCopy,
  Inbox,
  KeyboardArrowUp,
  NavigateNext,
  Print,
  SearchOff,
  Share,
  CloudOff,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { PageHeader } from '../../components/common';

function Section({ title, subtitle, children }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{subtitle}</Typography>}
        {children}
      </CardContent>
    </Card>
  );
}
Section.propTypes = { title: PropTypes.string, subtitle: PropTypes.string, children: PropTypes.node };

function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <Box sx={{ textAlign: 'center', py: 3, px: 2, border: 1, borderColor: 'divider', borderStyle: 'dashed', borderRadius: 2, height: '100%' }}>
      <Box sx={{ width: 56, height: 56, borderRadius: '50%', mx: 'auto', mb: 1.5, display: 'grid', placeItems: 'center',
        bgcolor: (t) => alpha(t.palette.primary.main, 0.12), color: 'primary.main' }}>
        <Icon />
      </Box>
      <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: action ? 2 : 0 }}>{text}</Typography>
      {action}
    </Box>
  );
}
EmptyState.propTypes = { icon: PropTypes.elementType, title: PropTypes.string, text: PropTypes.string, action: PropTypes.node };

const TIMELINE = [
  { title: 'Order placed', time: '09:12', color: 'primary', text: 'Invoice #4521 created' },
  { title: 'Payment received', time: '09:15', color: 'success', text: '$249.00 via card' },
  { title: 'Shipped', time: '14:40', color: 'info', text: 'Tracking number sent to customer' },
  { title: 'Delivery delayed', time: 'Next day', color: 'warning', text: 'Weather in the area' },
];

const OthersPage = () => {
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState('npm install @mui/x-data-grid');
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Show the "back to top" button after scrolling down a bit.
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard blocked (http or permissions) — still show feedback in the demo */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const fakeSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const showOverlay = () => {
    setOverlay(true);
    setTimeout(() => setOverlay(false), 1500);
  };

  return (
    <Box>
      <PageHeader title="Others" subtitle="Small UI patterns that don't fit elsewhere: empty states, copy to clipboard, loading buttons, a timeline, breadcrumbs and floating actions." />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Section title="Empty States" subtitle="What to show when there's nothing to show.">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <EmptyState icon={Inbox} title="No messages yet" text="When someone writes to you, it will appear here."
                  action={<Button size="small" variant="contained" component={RouterLink} to="/apps/email">Open Email</Button>} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <EmptyState icon={SearchOff} title="No results" text="Try a different keyword or clear your filters." />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <EmptyState icon={CloudOff} title="You're offline" text="Check your connection, then try again."
                  action={<Button size="small" variant="outlined">Retry</Button>} />
              </Grid>
            </Grid>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Copy to Clipboard" subtitle="Uses the browser Clipboard API with visual feedback.">
            <TextField
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              slotProps={{ input: { endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                    <IconButton onClick={copy} aria-label="copy" color={copied ? 'success' : 'default'}>
                      {copied ? <Check /> : <ContentCopy />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ) } }}
            />
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Loading States" subtitle="Disable the button while a request is in flight to prevent double submits.">
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={fakeSave} disabled={loading}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}>
                {loading ? 'Saving…' : 'Save'}
              </Button>
              <Button variant="outlined" onClick={showOverlay}>Full-screen overlay</Button>
            </Box>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Timeline" subtitle="Built from plain Boxes — no extra package.">
            {TIMELINE.map((t, i) => (
              <Box key={t.title} sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: `${t.color}.main`, mt: 0.75,
                    boxShadow: (th) => `0 0 0 4px ${alpha(th.palette[t.color].main, 0.2)}` }} />
                  {i < TIMELINE.length - 1 && <Box sx={{ flexGrow: 1, width: 2, bgcolor: 'divider', my: 0.5 }} />}
                </Box>
                <Box sx={{ pb: 2.5, flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 500 }}>{t.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{t.time}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">{t.text}</Typography>
                </Box>
              </Box>
            ))}
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Breadcrumbs & Keyboard Hints">
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
              <Link component={RouterLink} to="/" underline="hover" color="inherit">Home</Link>
              <Link component={RouterLink} to="/pages/miscellaneous" underline="hover" color="inherit">Misc</Link>
              <Typography color="text.primary">Others</Typography>
            </Breadcrumbs>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
              Press{' '}
              {['Ctrl', 'K'].map((k, i) => (
                <React.Fragment key={k}>
                  {i > 0 && ' + '}
                  <Paper component="kbd" variant="outlined" sx={{ px: 0.75, py: 0.25, fontFamily: 'monospace', fontSize: 12 }}>{k}</Paper>
                </React.Fragment>
              ))}{' '}
              to search (example styling for keyboard shortcuts).
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Scroll down this page and a “back to top” button appears in the corner.
            </Typography>
          </Section>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Section title="Speed Dial" subtitle="A floating action button that expands into several actions.">
            <Box sx={{ position: 'relative', height: 200 }}>
              <SpeedDial ariaLabel="Quick actions" icon={<SpeedDialIcon openIcon={<Edit />} />} sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                {[[FileCopy, 'Copy'], [Print, 'Print'], [Share, 'Share']].map(([Icon, name]) => (
                  <SpeedDialAction key={name} icon={<Icon />} slotProps={{ tooltip: { title: name } }} />
                ))}
              </SpeedDial>
            </Box>
          </Section>
        </Grid>
      </Grid>

      <Backdrop open={overlay} sx={{ zIndex: (t) => t.zIndex.modal + 1, color: '#fff', flexDirection: 'column', gap: 2 }}>
        <CircularProgress color="inherit" />
        <Typography>Loading…</Typography>
      </Backdrop>
      <Zoom in={showTop}>
        <Fab color="primary" size="small" aria-label="back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{ position: 'fixed', bottom: 80, right: 24, zIndex: 1200 }}>
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default OthersPage;
