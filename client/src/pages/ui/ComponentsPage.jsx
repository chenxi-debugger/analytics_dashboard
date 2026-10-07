import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Rating,
  Skeleton,
  Snackbar,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { ExpandMore, Mail, Notifications, Inbox, Drafts, Send, Delete, Add } from '@mui/icons-material';
import { PageHeader } from '../../components/common';

function Section({ title, children }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
}
Section.propTypes = { title: PropTypes.string.isRequired, children: PropTypes.node };

const COLORS = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];

// A gallery of the Material UI components used throughout the app.
const ComponentsPage = () => {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState(3.5);
  const [dialog, setDialog] = useState(false);
  const [toast, setToast] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [chips, setChips] = useState(['React', 'Node.js', 'MongoDB', 'MUI']);

  return (
    <Box>
      <PageHeader title="Components" subtitle="A gallery of the Material UI building blocks used in this dashboard. Everything here is interactive." />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Section title="Buttons">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
              {COLORS.map((c) => <Button key={c} variant="contained" color={c}>{c}</Button>)}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
              {COLORS.slice(0, 4).map((c) => <Button key={c} variant="outlined" color={c}>{c}</Button>)}
              <Button startIcon={<Add />}>With icon</Button>
            </Box>
            <ButtonGroup variant="outlined"><Button>Left</Button><Button>Middle</Button><Button>Right</Button></ButtonGroup>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Section title="Alerts">
            <Alert severity="success" sx={{ mb: 1 }}><AlertTitle>Success</AlertTitle>Your changes were saved.</Alert>
            <Alert severity="info" sx={{ mb: 1 }}>This is an info alert.</Alert>
            <Alert severity="warning" variant="outlined" sx={{ mb: 1 }}>This is an outlined warning.</Alert>
            <Alert severity="error" variant="filled">This is a filled error alert.</Alert>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Section title="Avatars & Badges">
            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
              {COLORS.slice(0, 4).map((c, i) => <Avatar key={c} sx={{ bgcolor: `${c}.main` }}>{'ABCD'[i]}</Avatar>)}
            </Box>
            <AvatarGroup max={4} sx={{ justifyContent: 'flex-start', mb: 2 }}>
              {['AC', 'LP', 'MG', 'NK', 'EN'].map((x) => <Avatar key={x}>{x}</Avatar>)}
            </AvatarGroup>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Badge badgeContent={4} color="primary"><Mail /></Badge>
              <Badge badgeContent={99} color="error"><Notifications /></Badge>
              <Badge variant="dot" color="success"><Inbox /></Badge>
            </Box>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Section title="Chips">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {chips.map((c) => <Chip key={c} label={c} onDelete={() => setChips(chips.filter((x) => x !== c))} color="primary" variant="outlined" />)}
              {chips.length < 4 && <Chip label="Reset" onClick={() => setChips(['React', 'Node.js', 'MongoDB', 'MUI'])} />}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {COLORS.map((c) => <Chip key={c} label={c} color={c} size="small" />)}
            </Box>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
          <Section title="Progress">
            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
              <CircularProgress />
              <CircularProgress color="success" variant="determinate" value={70} />
              <CircularProgress color="warning" variant="determinate" value={35} />
            </Box>
            <LinearProgress sx={{ mb: 2 }} />
            <LinearProgress variant="determinate" value={60} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Tabs">
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
              <Tab label="Overview" /><Tab label="Details" /><Tab label="Settings" />
            </Tabs>
            <Typography variant="body2" color="text.secondary">Content of tab {tab + 1}. Tabs organize related content without leaving the page.</Typography>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Accordion">
            {['What is an accordion?', 'When should I use it?'].map((q) => (
              <Accordion key={q} disableGutters>
                <AccordionSummary expandIcon={<ExpandMore />}><Typography>{q}</Typography></AccordionSummary>
                <AccordionDetails><Typography variant="body2" color="text.secondary">Accordions show and hide sections of related content.</Typography></AccordionDetails>
              </Accordion>
            ))}
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Section title="List & Menu">
            <List dense disablePadding>
              {[[Inbox, 'Inbox'], [Drafts, 'Drafts'], [Send, 'Sent'], [Delete, 'Trash']].map(([Icon, label]) => (
                <ListItemButton key={label} sx={{ borderRadius: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}><Icon fontSize="small" /></ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
            <Button sx={{ mt: 1 }} onClick={(e) => setAnchor(e.currentTarget)}>Open menu</Button>
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
              {['Profile', 'Settings', 'Logout'].map((o) => <MenuItem key={o} onClick={() => setAnchor(null)}>{o}</MenuItem>)}
            </Menu>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Section title="Dialog, Snackbar & Tooltip">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Button variant="contained" onClick={() => setDialog(true)}>Open dialog</Button>
              <Button variant="outlined" onClick={() => setToast(true)}>Show snackbar</Button>
              <Tooltip title="Hello from a tooltip!"><Button>Hover me</Button></Tooltip>
            </Box>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
          <Section title="Pagination, Rating & Breadcrumbs">
            <Pagination count={8} page={page} onChange={(_, p) => setPage(p)} color="primary" sx={{ mb: 2 }} />
            <Rating value={rating} precision={0.5} onChange={(_, v) => setRating(v)} sx={{ mb: 2 }} />
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="#">Home</Link>
              <Link underline="hover" color="inherit" href="#">UI</Link>
              <Typography color="text.primary">Components</Typography>
            </Breadcrumbs>
          </Section>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Section title="Skeleton (loading placeholders)">
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Skeleton variant="circular" width={48} height={48} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton width="40%" />
                <Skeleton width="80%" />
                <Skeleton variant="rounded" height={60} />
              </Box>
            </Box>
          </Section>
        </Grid>
      </Grid>

      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogTitle>Use location service?</DialogTitle>
        <DialogContent><DialogContentText>This is a standard confirmation dialog with two actions.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Disagree</Button>
          <Button variant="contained" onClick={() => setDialog(false)}>Agree</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={toast} autoHideDuration={2500} onClose={() => setToast(false)} message="This is a snackbar message" />
    </Box>
  );
};

export default ComponentsPage;
