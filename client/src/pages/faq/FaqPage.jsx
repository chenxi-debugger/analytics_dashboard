import React, { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  CreditCardOutlined,
  ExpandMore,
  LockOutlined,
  ManageAccountsOutlined,
  InsightsOutlined,
  Search,
  MailOutline,
} from '@mui/icons-material';

// FAQ content written for this dashboard.
const CATEGORIES = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    subtitle: 'The basics of the dashboard',
    icon: InsightsOutlined,
    items: [
      { q: 'What is InsightBoard?', a: 'InsightBoard is a full-stack admin dashboard built with React, Material UI, Express and MongoDB. It shows analytics, CRM and eCommerce dashboards and includes user, role and permission management.' },
      { q: 'How do I log in to the demo?', a: 'On the login page, click “Log in as Demo Admin”. You can also register your own account; new accounts start with the Subscriber role.' },
      { q: 'Where does the data come from?', a: 'Dashboard and user data are stored in MongoDB Atlas and served by an Express API. The frontend fetches everything over REST.' },
    ],
  },
  {
    id: 'account',
    title: 'My Account',
    subtitle: 'Profile and personal settings',
    icon: ManageAccountsOutlined,
    items: [
      { q: 'How do I update my profile?', a: 'Open Pages → Account Settings → Account, edit your details and click Save Changes. Your changes are saved to the database immediately.' },
      { q: 'Can I change my password?', a: 'Yes, in Account Settings → Security. You need your current password. The shared demo account’s password is locked.' },
      { q: 'Can I delete my account?', a: 'Yes, at the bottom of Account Settings → Account. This permanently removes your user record.' },
    ],
  },
  {
    id: 'roles',
    title: 'Roles & Permissions',
    subtitle: 'Who can do what',
    icon: LockOutlined,
    items: [
      { q: 'What roles are available?', a: 'Administrator, Manager, Editor, Support and Subscriber. Administrators can also create custom roles on the Roles page.' },
      { q: 'Who can add or delete users?', a: 'Administrators and Managers. Only Administrators can manage roles and permissions, or change other Administrators.' },
      { q: 'Are permissions checked on the server?', a: 'Yes. Every change goes through the API, which verifies your login token and role before saving anything. Hiding buttons in the UI is only for convenience.' },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    subtitle: 'Plans and payments',
    icon: CreditCardOutlined,
    items: [
      { q: 'What plans are there?', a: 'Basic (free), Team, Company and Enterprise. See the Pricing page for a full comparison.' },
      { q: 'Will I be charged if I upgrade?', a: 'No. This is a portfolio demo — changing plans only updates the plan saved on your account.' },
      { q: 'How do I cancel?', a: 'In Account Settings → Billing & Plans click “Cancel Subscription”. You will be moved to the free Basic plan.' },
    ],
  },
];

const FaqPage = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(CATEGORIES[0].id);

  // While searching, show matches from every category; otherwise show the selected one.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES.filter((c) => c.id === active);
    return CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)),
    })).filter((c) => c.items.length);
  }, [query, active]);

  return (
    <Box>
      <Card sx={{ mb: 4, background: `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.info.main, 0.1)})` }}>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600, mb: 1 }}>Hello, how can we help?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>or choose a category to quickly find the help you need</Typography>
          <TextField
            placeholder="Search a question…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: '100%', maxWidth: 520, bgcolor: 'background.paper', borderRadius: 1 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
          />
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <List disablePadding>
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const selected = !query && active === c.id;
              return (
                <ListItemButton key={c.id} selected={selected} onClick={() => { setActive(c.id); setQuery(''); }}
                  sx={{ borderRadius: 1.5, mb: 1, '&.Mui-selected': { bgcolor: 'primary.main', color: '#fff', '& .MuiListItemIcon-root': { color: '#fff' } } }}>
                  <ListItemIcon sx={{ minWidth: 36 }}><Icon fontSize="small" /></ListItemIcon>
                  <ListItemText primary={c.title} />
                </ListItemButton>
              );
            })}
          </List>
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          {results.length === 0 && (
            <Typography color="text.secondary">No questions match “{query}”.</Typography>
          )}
          {results.map((c) => {
            const Icon = c.icon;
            return (
              <Box key={c.id} sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 1.5, display: 'grid', placeItems: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                    <Icon />
                  </Box>
                  <Box>
                    <Typography variant="h6">{c.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{c.subtitle}</Typography>
                  </Box>
                </Box>
                {c.items.map((item) => (
                  <Accordion key={item.q} disableGutters sx={{ mb: 1, '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography sx={{ fontWeight: 500 }}>{item.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">{item.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            );
          })}
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>You still have a question?</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>If you can’t find your question here, get in touch.</Typography>
        <Card sx={{ display: 'inline-flex', px: 4, py: 3, alignItems: 'center', gap: 2 }}>
          <MailOutline color="primary" />
          <Typography variant="body1" component="a" href="mailto:chenxi.debugger@gmail.com" sx={{ color: 'text.primary', textDecoration: 'none' }}>
            chenxi.debugger@gmail.com
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default FaqPage;
