import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Rating,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  ExpandMore,
  FavoriteBorder,
  MoreVert,
  Refresh,
  ShareOutlined,
  TrendingUp,
  TrendingDown,
  PeopleOutline,
  ShoppingCartOutlined,
  AttachMoney,
  VisibilityOutlined,
  EmojiEventsOutlined,
  WorkspacePremiumOutlined,
  Close,
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { useLocation } from 'react-router-dom';
import { PageHeader } from '../../components/common';
import { useAuth } from '../../auth/AuthContext';

const Tile = ({ color, children, size = 42 }) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: size, height: size, borderRadius: 1.5, display: 'grid', placeItems: 'center', flexShrink: 0,
      bgcolor: alpha(theme.palette[color].main, 0.14), color: theme.palette[color].main }}>
      {children}
    </Box>
  );
};
Tile.propTypes = { color: PropTypes.string, children: PropTypes.node, size: PropTypes.number };

// ---------- Basic ----------
function BasicCards() {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={{ height: '100%' }}>
          <Box sx={{ height: 160, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.info.main})` }} />
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Card with a cover</Typography>
            <Typography variant="body2" color="text.secondary">A cover area on top, then a title and a short description. Useful for articles or products.</Typography>
          </CardContent>
          <CardActions><Button size="small">Read More</Button></CardActions>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={{ height: '100%' }}>
          <CardHeader title="Card with header" subheader="Subtitle text" action={<IconButton><MoreVert /></IconButton>} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">Header with an action menu, content below and buttons at the bottom.</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">Action</Button>
            <Button size="small">Cancel</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={{ height: '100%', textAlign: 'center' }}>
          <CardContent>
            <Avatar sx={{ width: 72, height: 72, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: 28 }}>IB</Avatar>
            <Typography variant="h6">Profile card</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Centered content with an avatar</Typography>
            <Rating value={4} readOnly />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <IconButton><FavoriteBorder /></IconButton>
            <IconButton><ShareOutlined /></IconButton>
          </CardActions>
        </Card>
      </Grid>
      {['primary', 'success', 'warning', 'error', 'info', 'secondary'].map((c) => (
        <Grid key={c} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: `${c}.main`, color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#fff', textTransform: 'capitalize' }}>{c} card</Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>A solid colored card using the theme’s {c} color.</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

// ---------- Advanced ----------
function AdvancedCards() {
  const [anchor, setAnchor] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const tasks = [
    { name: 'Design review', pct: 80, color: 'primary' },
    { name: 'API integration', pct: 55, color: 'success' },
    { name: 'QA testing', pct: 30, color: 'warning' },
  ];
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Card sx={{ height: '100%' }}>
          <CardHeader title="Project progress" action={
            <>
              <IconButton onClick={(e) => setAnchor(e.currentTarget)}><MoreVert /></IconButton>
              <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
                {['Refresh', 'Share', 'Archive'].map((o) => <MenuItem key={o} onClick={() => setAnchor(null)}>{o}</MenuItem>)}
              </Menu>
            </>
          } />
          <CardContent>
            {tasks.map((t) => (
              <Box key={t.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{t.name}</Typography><Typography variant="body2">{t.pct}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={t.pct} color={t.color} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Card sx={{ height: '100%' }}>
          <CardHeader title="Team members" subheader="5 people" />
          <List dense>
            {['Ava Chen', 'Liam Patel', 'Mia Garcia', 'Noah Kim'].map((n, i) => (
              <ListItem key={n} secondaryAction={<Chip size="small" label={['Lead', 'Dev', 'Design', 'QA'][i]} sx={{ borderRadius: 1 }} />}>
                <ListItemAvatar><Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>{n.split(' ').map((x) => x[0]).join('')}</Avatar></ListItemAvatar>
                <ListItemText primary={n} secondary={`${n.split(' ')[0].toLowerCase()}@example.com`} />
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <Card sx={{ height: '100%' }}>
          <CardHeader title="Collapsible card" action={
            <IconButton onClick={() => setExpanded((e) => !e)} sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
              <ExpandMore />
            </IconButton>
          } />
          <CardContent>
            <Typography variant="body2" color="text.secondary">Click the arrow to show more details. Cards can expand to reveal extra content without leaving the page.</Typography>
            <Collapse in={expanded}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">Hidden content: release notes, extra metrics, or a longer description.</Typography>
            </Collapse>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

// ---------- Statistics ----------
function StatisticsCards() {
  const theme = useTheme();
  const stats = [
    { title: 'Revenue', value: '$42.3k', change: 12.4, icon: AttachMoney, color: 'success' },
    { title: 'Orders', value: '1,286', change: 8.1, icon: ShoppingCartOutlined, color: 'primary' },
    { title: 'Visitors', value: '28.9k', change: -3.2, icon: VisibilityOutlined, color: 'info' },
    { title: 'Customers', value: '9,412', change: 5.6, icon: PeopleOutline, color: 'warning' },
  ];
  const spark = (data, color) => ({
    grid: { left: 0, right: 0, top: 5, bottom: 0 },
    xAxis: { type: 'category', show: false, data: data.map((_, i) => i) },
    yAxis: { type: 'value', show: false },
    series: [{ type: 'line', data, smooth: true, showSymbol: false, lineStyle: { color, width: 2 }, areaStyle: { color: alpha(color, 0.15) } }],
  });
  return (
    <Grid container spacing={3}>
      {stats.map((s) => {
        const Icon = s.icon;
        const up = s.change >= 0;
        return (
          <Grid key={s.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Tile color={s.color}><Icon /></Tile>
                  <Chip size="small" icon={up ? <TrendingUp /> : <TrendingDown />} label={`${up ? '+' : ''}${s.change}%`}
                    color={up ? 'success' : 'error'} variant="outlined" sx={{ borderRadius: 1 }} />
                </Box>
                <Typography variant="body2" color="text.secondary">{s.title}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{s.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
      {stats.map((s, i) => (
        <Grid key={`${s.title}-spark`} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card>
            <CardContent sx={{ pb: '8px !important' }}>
              <Typography variant="body2" color="text.secondary">{s.title} this week</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{s.value}</Typography>
              <ReactECharts style={{ height: 70 }} option={spark([5, 9, 7, 12, 10, 14, 11 + i * 2].map((v) => v * (i + 1)), theme.palette[s.color].main)} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

// ---------- Widgets ----------
function WidgetCards() {
  const theme = useTheme();
  const donut = {
    tooltip: { trigger: 'item' },
    series: [{ type: 'pie', radius: ['55%', '80%'], label: { show: false },
      data: [
        { value: 48, name: 'Desktop', itemStyle: { color: theme.palette.primary.main } },
        { value: 37, name: 'Mobile', itemStyle: { color: theme.palette.success.main } },
        { value: 15, name: 'Tablet', itemStyle: { color: theme.palette.warning.main } },
      ] }],
  };
  const bars = {
    grid: { left: 30, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [40, 65, 52, 80, 72, 30, 45], itemStyle: { color: theme.palette.primary.main, borderRadius: [4, 4, 0, 0] }, barWidth: '45%' }],
  };
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={{ height: '100%' }}>
          <CardHeader title="Traffic by device" />
          <CardContent><ReactECharts style={{ height: 220 }} option={donut} /></CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card sx={{ height: '100%' }}>
          <CardHeader title="Weekly sessions" action={<IconButton><Refresh /></IconButton>} />
          <CardContent><ReactECharts style={{ height: 220 }} option={bars} /></CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader title="Top countries" />
          <CardContent>
            {[['USA', 38], ['India', 21], ['Germany', 14], ['Brazil', 11], ['Japan', 9]].map(([c, v]) => (
              <Box key={c} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2">{c}</Typography><Typography variant="body2">{v}%</Typography></Box>
                <LinearProgress variant="determinate" value={v * 2} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader title="Recent activity" />
          <CardContent>
            {['New user registered', 'Invoice #4987 paid', 'Role “Editor” updated', 'Weekly report exported'].map((a, i) => (
              <Box key={a} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                <Box sx={{ width: 10, height: 10, mt: 0.7, borderRadius: '50%', bgcolor: ['primary.main', 'success.main', 'warning.main', 'info.main'][i] }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{a}</Typography>
                  <Typography variant="caption" color="text.secondary">{(i + 1) * 12} min ago</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

// ---------- Gamification ----------
function GamificationCards() {
  const theme = useTheme();
  const { user } = useAuth();
  const name = user ? user.fullName.split(' ')[0] : 'there';
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="primary.main">Congratulations {name}! 🎉</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ my: 1.5 }}>You closed 72% more tasks this week. Check your new badge in your profile.</Typography>
              <Button variant="outlined" size="small">View Badges</Button>
            </Box>
            <Tile color="primary" size={96}><EmojiEventsOutlined sx={{ fontSize: 56 }} /></Tile>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Card sx={{ height: '100%', background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`, color: '#fff' }}>
          <CardContent>
            <WorkspacePremiumOutlined sx={{ fontSize: 40 }} />
            <Typography variant="h6" sx={{ color: '#fff', mt: 1 }}>Top performer</Typography>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>2,480 pts</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Rank #1 in your team this month</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title="Leaderboard" />
          <CardContent>
            {[['Ava Chen', 2480], ['Liam Patel', 2210], ['Mia Garcia', 1985], ['Noah Kim', 1720]].map(([n, pts], i) => (
              <Box key={n} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography sx={{ width: 24, fontWeight: 700, color: i === 0 ? 'warning.main' : 'text.secondary' }}>#{i + 1}</Typography>
                <Avatar sx={{ width: 34, height: 34, fontSize: 13 }}>{n.split(' ').map((x) => x[0]).join('')}</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{n}</Typography>
                  <LinearProgress variant="determinate" value={(pts / 2480) * 100} sx={{ height: 6, borderRadius: 3, mt: 0.5 }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{pts}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

// ---------- Actions ----------
function ActionCards() {
  const [hidden, setHidden] = useState([]);
  const [collapsed, setCollapsed] = useState([]);
  const [refreshing, setRefreshing] = useState(null);
  const cards = ['Collapsible', 'Refresh content', 'Removable', 'All actions'];

  const toggle = (list, setList, i) => setList(list.includes(i) ? list.filter((x) => x !== i) : [...list, i]);
  const refresh = (i) => {
    setRefreshing(i);
    setTimeout(() => setRefreshing(null), 1200);
  };

  return (
    <Box>
      {hidden.length > 0 && <Button sx={{ mb: 2 }} onClick={() => setHidden([])}>Restore removed cards</Button>}
      <Grid container spacing={3}>
        {cards.map((title, i) => hidden.includes(i) ? null : (
          <Grid key={title} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardHeader
                title={title}
                action={
                  <Box>
                    {(i === 0 || i === 3) && (
                      <IconButton onClick={() => toggle(collapsed, setCollapsed, i)}
                        sx={{ transform: collapsed.includes(i) ? 'rotate(180deg)' : 'none', transition: '0.2s' }}><ExpandMore /></IconButton>
                    )}
                    {(i === 1 || i === 3) && <IconButton onClick={() => refresh(i)}><Refresh /></IconButton>}
                    {(i === 2 || i === 3) && <IconButton onClick={() => setHidden([...hidden, i])}><Close /></IconButton>}
                  </Box>
                }
              />
              {refreshing === i && <LinearProgress />}
              <Collapse in={!collapsed.includes(i)}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Use the buttons in the header to collapse, refresh or remove this card. These patterns are common on dashboards with many widgets.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const VARIANTS = {
  basic: { title: 'Basic Cards', subtitle: 'Simple cards with covers, headers, avatars and colors.', Component: BasicCards },
  advanced: { title: 'Advanced Cards', subtitle: 'Cards with menus, lists and collapsible content.', Component: AdvancedCards },
  statistics: { title: 'Statistics Cards', subtitle: 'KPI cards with trends and mini charts.', Component: StatisticsCards },
  widgets: { title: 'Widget Cards', subtitle: 'Chart and list widgets for dashboards.', Component: WidgetCards },
  gamification: { title: 'Gamification Cards', subtitle: 'Achievements, points and leaderboards.', Component: GamificationCards },
  actions: { title: 'Card Actions', subtitle: 'Collapse, refresh and remove cards.', Component: ActionCards },
};

// /ui/cards/:variant
const CardsPage = () => {
  const { pathname } = useLocation();
  const key = pathname.split('/').pop();
  const { title, subtitle, Component } = VARIANTS[key] || VARIANTS.basic;
  return (
    <Box>
      <PageHeader title={title} subtitle={subtitle} />
      <Component />
    </Box>
  );
};

export default CardsPage;
