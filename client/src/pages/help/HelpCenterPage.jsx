import React, { useMemo, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Link,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ChevronRight, Search, RocketLaunchOutlined, PeopleOutline, SecurityOutlined, BarChartOutlined } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

// Help articles written for this dashboard. Each belongs to a category.
const ARTICLES = [
  { slug: 'first-login', category: 'getting-started', title: 'Logging in for the first time',
    body: ['Open the site and you will land on the login page.', 'Click “Log in as Demo Admin” to explore with full permissions, or create your own account with “Create an account”.', 'After signing in you are taken to the page you originally opened.'] },
  { slug: 'navigation', category: 'getting-started', title: 'Finding your way around',
    body: ['The sidebar groups pages into Dashboards, Apps & Pages and UI sections.', 'Use the search box in the header (Ctrl + /) to jump to a page.', 'Collapse the sidebar with the arrow button to get more room for charts.'] },
  { slug: 'add-user', category: 'users', title: 'Adding a new user',
    body: ['Go to Apps → User → List and click “Add User”.', 'Fill in the name, username, email, a password of at least 8 characters, and pick a role and plan.', 'Only Administrators and Managers can add users.'] },
  { slug: 'filter-users', category: 'users', title: 'Searching and filtering users',
    body: ['On the user list, use the Role, Plan and Status filters at the top.', 'Type in “Search User” to match names, usernames and emails.', 'Click Export to download the current page as a CSV file.'] },
  { slug: 'create-role', category: 'roles', title: 'Creating a custom role',
    body: ['Open Roles & Permissions → Roles and click “Add Role”.', 'Give the role a name and tick Read, Write or Create for each module.', 'A custom role can be deleted only when no user has it.'] },
  { slug: 'change-password', category: 'roles', title: 'Changing your password',
    body: ['Open Pages → Account Settings → Security.', 'Enter your current password and the new one twice.', 'The new password needs at least 8 characters, one uppercase letter and one number or symbol.'] },
  { slug: 'reading-charts', category: 'analytics', title: 'Reading the analytics charts',
    body: ['Hover a chart to see exact values.', 'Cards with a percentage show change compared with the previous period.', 'Data is loaded from the API each time the dashboard opens.'] },
  { slug: 'switch-theme', category: 'analytics', title: 'Switching between light and dark mode',
    body: ['Click the theme icon in the header.', 'Your choice is remembered in this browser.'] },
];

const CATEGORIES = [
  { id: 'getting-started', title: 'Getting Started', icon: RocketLaunchOutlined, color: 'primary' },
  { id: 'users', title: 'Managing Users', icon: PeopleOutline, color: 'success' },
  { id: 'roles', title: 'Security & Roles', icon: SecurityOutlined, color: 'warning' },
  { id: 'analytics', title: 'Analytics', icon: BarChartOutlined, color: 'info' },
];

const HelpCenterPage = () => {
  const theme = useTheme();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const slug = params.get('article');
  const article = ARTICLES.find((a) => a.slug === slug);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ARTICLES.filter((a) => a.title.toLowerCase().includes(q) || a.body.join(' ').toLowerCase().includes(q));
  }, [query]);

  const open = (s) => setParams(s ? { article: s } : {});

  // Article view
  if (article) {
    const category = CATEGORIES.find((c) => c.id === article.category);
    const related = ARTICLES.filter((a) => a.category === article.category && a.slug !== article.slug);
    return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Breadcrumbs separator={<ChevronRight fontSize="small" />} sx={{ mb: 2 }}>
                <Link component="button" onClick={() => open(null)}>Help Center</Link>
                <Typography color="text.secondary">{category.title}</Typography>
              </Breadcrumbs>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>{article.title}</Typography>
              {article.body.map((p, i) => (
                <Typography key={p} variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {i + 1}. {p}
                </Typography>
              ))}
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => open(null)}>Back to Help Center</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>More in {category.title}</Typography>
              <List dense>
                {related.map((a) => (
                  <ListItemButton key={a.slug} onClick={() => open(a.slug)} sx={{ borderRadius: 1 }}>
                    <ListItemText primary={a.title} />
                    <ChevronRight fontSize="small" color="action" />
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  // Landing view
  return (
    <Box>
      <Card sx={{ mb: 4, background: `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.success.main, 0.1)})` }}>
        <CardContent sx={{ textAlign: 'center', py: 6, position: 'relative' }}>
          <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600, mb: 1 }}>Hello, how can we help?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Common troubleshooting topics: users, roles, passwords</Typography>
          <TextField
            placeholder="Ask a question…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: '100%', maxWidth: 520, bgcolor: 'background.paper', borderRadius: 1 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
          />
          {query && (
            <Card sx={{ maxWidth: 520, mx: 'auto', mt: 1, textAlign: 'left' }}>
              <List dense>
                {matches.length === 0 && <ListItemText sx={{ px: 2, py: 1 }} secondary="No articles found." />}
                {matches.map((a) => (
                  <ListItemButton key={a.slug} onClick={() => open(a.slug)}>
                    <ListItemText primary={a.title} />
                  </ListItemButton>
                ))}
              </List>
            </Card>
          )}
        </CardContent>
      </Card>

      <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 3 }}>Popular Articles</Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {['first-login', 'add-user', 'create-role'].map((s) => {
          const a = ARTICLES.find((x) => x.slug === s);
          const cat = CATEGORIES.find((c) => c.id === a.category);
          const Icon = cat.icon;
          return (
            <Grid key={s} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: 2, mx: 'auto', mb: 2, display: 'grid', placeItems: 'center',
                    bgcolor: alpha(theme.palette[cat.color].main, 0.14), color: theme.palette[cat.color].main }}>
                    <Icon />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>{a.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{a.body[0]}</Typography>
                  <Button variant="outlined" size="small" onClick={() => open(a.slug)}>Read More</Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 3 }}>Knowledge Base</Typography>
      <Grid container spacing={3}>
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const list = ARTICLES.filter((a) => a.category === c.id);
          return (
            <Grid key={c.id} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: 1.5, display: 'grid', placeItems: 'center',
                      bgcolor: alpha(theme.palette[c.color].main, 0.14), color: theme.palette[c.color].main }}>
                      <Icon fontSize="small" />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{c.title}</Typography>
                  </Box>
                  {list.map((a) => (
                    <Link key={a.slug} component="button" variant="body2" onClick={() => open(a.slug)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, textAlign: 'left' }}>
                      <ChevronRight fontSize="small" /> {a.title}
                    </Link>
                  ))}
                  <Typography variant="caption" color="text.secondary">{list.length} articles</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HelpCenterPage;
