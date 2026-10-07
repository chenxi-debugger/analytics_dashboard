import React, { useEffect, useState } from 'react';
import {
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  CalendarMonthOutlined,
  CheckOutlined,
  FlagOutlined,
  LanguageOutlined,
  MailOutline,
  PhoneOutlined,
  PersonOutline,
  PlaceOutlined,
  StarOutline,
  WorkOutline,
  GroupOutlined,
  ViewKanbanOutlined,
  LinkOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { UserAvatar, getInitials } from '../../components/common';

// Example teams and projects (static content for the profile showcase).
const TEAMS = [
  { name: 'Data Platform', desc: 'Pipelines, warehouses and the APIs that feed every dashboard.', color: 'primary', tags: ['Node.js', 'MongoDB'] },
  { name: 'Frontend Guild', desc: 'Design system, charts and accessibility across the product.', color: 'info', tags: ['React', 'MUI'] },
  { name: 'ML Research', desc: 'Forecasting models and anomaly detection for the analytics pages.', color: 'success', tags: ['Python', 'LightGBM'] },
  { name: 'Customer Success', desc: 'Onboarding, support tickets and product feedback.', color: 'warning', tags: ['Support'] },
];

const PROJECTS = [
  { name: 'Revenue Dashboard v2', client: 'Northwind', progress: 78, tasks: '214/280', due: 'Dec 2026', color: 'primary' },
  { name: 'Churn Prediction Model', client: 'Lumen Labs', progress: 52, tasks: '64/120', due: 'Jan 2027', color: 'success' },
  { name: 'Role-based Access Rollout', client: 'Internal', progress: 91, tasks: '41/45', due: 'Nov 2026', color: 'info' },
  { name: 'Mobile Reporting App', client: 'Brightline', progress: 27, tasks: '19/70', due: 'Mar 2027', color: 'warning' },
];

const formatJoined = (iso) => (iso ? new Date(iso).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : '');

function IconRow({ icon: Icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Icon fontSize="small" color="action" />
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{label}:</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ textTransform: label === 'Status' ? 'capitalize' : 'none' }}>
        {value || '–'}
      </Typography>
    </Box>
  );
}

const UserProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState(0);
  const [people, setPeople] = useState([]);
  const [stats, setStats] = useState(null);

  // Real data: colleagues and team numbers come from the users API.
  useEffect(() => {
    apiFetch('/api/users?limit=8&status=active').then((d) => setPeople(d.items)).catch(() => setPeople([]));
    apiFetch('/api/users/stats').then(setStats).catch(() => setStats(null));
  }, []);

  if (!user) return null;
  const colleagues = people.filter((p) => p.id !== user.id).slice(0, 6);

  return (
    <Box>
      {/* Header with a gradient banner */}
      <Card sx={{ mb: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            height: 180,
            background: `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.85)}, ${alpha(theme.palette.info.main, 0.6)} 55%, ${alpha(theme.palette.success.main, 0.45)})`,
          }}
        />
        <CardContent sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 3, mt: -7 }}>
          <Box sx={{ borderRadius: 2, border: `5px solid ${theme.palette.background.paper}`, bgcolor: 'background.paper' }}>
            <UserAvatar name={user.fullName} color={user.avatarColor} size={110} />
          </Box>
          <Box sx={{ flexGrow: 1, pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>{user.fullName}</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mt: 1, color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><WorkOutline fontSize="small" /><Typography variant="body2">{user.role}</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><PlaceOutlined fontSize="small" /><Typography variant="body2">{user.country || 'Remote'}</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><CalendarMonthOutlined fontSize="small" /><Typography variant="body2">Joined {formatJoined(user.createdAt)}</Typography></Box>
            </Box>
          </Box>
          <Button variant="contained" startIcon={<CheckOutlined />} onClick={() => navigate('/pages/account')} sx={{ mb: 1 }}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab icon={<PersonOutline fontSize="small" />} iconPosition="start" label="Profile" />
        <Tab icon={<GroupOutlined fontSize="small" />} iconPosition="start" label="Teams" />
        <Tab icon={<ViewKanbanOutlined fontSize="small" />} iconPosition="start" label="Projects" />
        <Tab icon={<LinkOutlined fontSize="small" />} iconPosition="start" label="Connections" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>About</Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <IconRow icon={PersonOutline} label="Full Name" value={user.fullName} />
                  <IconRow icon={CheckOutlined} label="Status" value={user.status} />
                  <IconRow icon={StarOutline} label="Role" value={user.role} />
                  <IconRow icon={FlagOutlined} label="Country" value={user.country} />
                  <IconRow icon={LanguageOutlined} label="Language" value={user.language} />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>Contacts</Typography>
                <Box sx={{ mt: 2 }}>
                  <IconRow icon={PhoneOutlined} label="Contact" value={user.contact} />
                  <IconRow icon={MailOutline} label="Email" value={user.email} />
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>Overview</Typography>
                <Box sx={{ mt: 2 }}>
                  <IconRow icon={GroupOutlined} label="Users in workspace" value={stats ? stats.total : '…'} />
                  <IconRow icon={CheckOutlined} label="Active users" value={stats ? stats.active : '…'} />
                  <IconRow icon={ViewKanbanOutlined} label="Plan" value={user.plan} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Projects</Typography>
                {PROJECTS.map((p) => (
                  <Box key={p.name} sx={{ mb: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{p.progress}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={p.progress} color={p.color} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Connections</Typography>
                {colleagues.slice(0, 4).map((p) => (
                  <Box key={p.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <UserAvatar name={p.fullName} color={p.avatarColor} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.fullName}</Typography>
                      <Typography variant="caption" color="text.secondary">{p.role} · {p.company}</Typography>
                    </Box>
                    <Button size="small" variant="outlined" onClick={() => navigate(`/apps/user/view?id=${p.id}`)}>View</Button>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={3}>
          {TEAMS.map((t, i) => (
            <Grid key={t.name} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 1.5, display: 'grid', placeItems: 'center', fontWeight: 700,
                      bgcolor: alpha(theme.palette[t.color].main, 0.14), color: theme.palette[t.color].main }}>
                      {getInitials(t.name)}
                    </Box>
                    <Typography variant="h6">{t.name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{t.desc}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 12 } }}>
                      {people.slice(i, i + 4).map((p) => <UserAvatar key={p.id} name={p.fullName} color={p.avatarColor} size={30} />)}
                    </AvatarGroup>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {t.tags.map((tag) => <Chip key={tag} label={tag} size="small" color={t.color} variant="outlined" sx={{ borderRadius: 1 }} />)}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 2 && (
        <Grid container spacing={3}>
          {PROJECTS.map((p, i) => (
            <Grid key={p.name} size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6">{p.name}</Typography>
                    <Chip label={`Due ${p.due}`} size="small" sx={{ borderRadius: 1 }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Client: {p.client}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Tasks: {p.tasks}</Typography>
                    <Typography variant="body2">{p.progress}% completed</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={p.progress} color={p.color} sx={{ height: 8, borderRadius: 4, mb: 2 }} />
                  <AvatarGroup max={5} sx={{ justifyContent: 'flex-end', '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 12 } }}>
                    {people.slice(i + 1, i + 5).map((m) => <UserAvatar key={m.id} name={m.fullName} color={m.avatarColor} size={30} />)}
                  </AvatarGroup>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 3 && (
        <Grid container spacing={3}>
          {colleagues.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <UserAvatar name={p.fullName} color={p.avatarColor} size={80} />
                  </Box>
                  <Typography variant="h6">{p.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{p.role} · {p.company}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
                    <Box><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{p.plan}</Typography><Typography variant="caption" color="text.secondary">Plan</Typography></Box>
                    <Box><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{p.country}</Typography><Typography variant="caption" color="text.secondary">Country</Typography></Box>
                  </Box>
                  <Button variant="contained" size="small" onClick={() => navigate(`/apps/user/view?id=${p.id}`)}>View Profile</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserProfilePage;
