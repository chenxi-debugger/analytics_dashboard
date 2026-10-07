import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { CheckCircleOutline, EventOutlined, LockResetOutlined, PersonOutline, TaskAltOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { RoleLabel, StatusChip, UserAvatar } from '../../components/common';
import useUserFromQuery from './useUserFromQuery';

const PLAN_INFO = {
  Basic: { price: 0, features: ['1 User', '1 GB storage', 'Community support'] },
  Team: { price: 49, features: ['5 Users', 'Up to 20 GB storage', 'Email support'] },
  Company: { price: 99, features: ['10 Users', 'Up to 50 GB storage', 'Priority support'] },
  Enterprise: { price: 199, features: ['Unlimited users', '1 TB storage', 'Dedicated support'] },
};

const formatDate = (iso) => (iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '–');

function DetailRow({ label, children }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 1.25 }}>
      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 110 }}>
        {label}:
      </Typography>
      <Typography variant="body2" color="text.secondary" component="div">
        {children}
      </Typography>
    </Box>
  );
}

// Activity entries are derived from the real user record (no fake data).
function ActivityTimeline({ user }) {
  const theme = useTheme();
  const items = [
    { icon: EventOutlined, color: 'primary', title: 'Account created', detail: `Joined on ${formatDate(user.createdAt)}` },
    { icon: PersonOutline, color: 'info', title: `Role: ${user.role}`, detail: `Plan: ${user.plan} · Billing: ${user.billing}` },
    {
      icon: CheckCircleOutline,
      color: user.status === 'active' ? 'success' : 'warning',
      title: `Status: ${user.status}`,
      detail: user.status === 'active' ? 'This user can sign in.' : 'This user cannot sign in until activated.',
    },
  ];
  return (
    <Box>
      {items.map(({ icon: Icon, color, title, detail }, i) => (
        <Box key={title} sx={{ display: 'flex', gap: 2, pb: i === items.length - 1 ? 0 : 3, position: 'relative' }}>
          {i < items.length - 1 && (
            <Box sx={{ position: 'absolute', left: 15, top: 32, bottom: 0, borderLeft: `1px dashed ${theme.palette.divider}` }} />
          )}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              flexShrink: 0,
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(theme.palette[color].main, 0.14),
              color: theme.palette[color].main,
            }}
          >
            <Icon sx={{ fontSize: 18 }} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {detail}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function SecurityTab({ user, canManageUsers, onDone }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const mismatch = confirm && password !== confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await apiFetch(`/api/users/${user.id}`, { method: 'PUT', body: { password } });
      setPassword('');
      setConfirm('');
      onDone('Password updated');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Change Password
        </Typography>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Minimum 8 characters. {!canManageUsers && 'Only an Administrator or Manager can reset other users’ passwords.'}
        </Alert>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2, gridTemplateColumns: { md: '1fr 1fr' } }}>
          <TextField label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!canManageUsers} />
          <TextField label="Confirm New Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
            error={Boolean(mismatch)} helperText={mismatch ? 'Passwords do not match' : ' '} disabled={!canManageUsers} />
          <Box>
            <Button type="submit" variant="contained" startIcon={<LockResetOutlined />}
              disabled={!canManageUsers || busy || password.length < 8 || password !== confirm}>
              Change Password
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

const UserViewPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { canManageUsers } = useAuth();
  const { user, setUser, loading, error } = useUserFromQuery();
  const [tab, setTab] = useState(0);
  const [toast, setToast] = useState('');

  if (loading) return <Box sx={{ display: 'grid', placeItems: 'center', py: 10 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user) return <Alert severity="info">No users yet.</Alert>;

  const plan = PLAN_INFO[user.plan] || PLAN_INFO.Basic;
  // Day of the current 30-day billing cycle, counted from the sign-up date.
  const daysUsed = (Math.floor((Date.now() - new Date(user.createdAt)) / 86400000) % 30) + 1;

  const toggleSuspend = async () => {
    try {
      const next = user.status === 'inactive' ? 'active' : 'inactive';
      const updated = await apiFetch(`/api/users/${user.id}`, { method: 'PUT', body: { status: next } });
      setUser(updated);
      setToast(next === 'inactive' ? 'User suspended' : 'User re-activated');
    } catch (err) {
      setToast(err.message);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Left column: profile + plan */}
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: 'center', pt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <UserAvatar name={user.fullName} color={user.avatarColor} size={100} />
            </Box>
            <Typography variant="h6">{user.fullName}</Typography>
            <Chip size="small" label={user.role} color="primary" variant="outlined" sx={{ mt: 1, borderRadius: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 3 }}>
              {[
                { icon: TaskAltOutlined, value: user.plan, label: 'Plan' },
                { icon: EventOutlined, value: formatDate(user.createdAt), label: 'Joined' },
              ].map(({ icon: Icon, value, label }) => (
                <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'left' }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 1.5, display: 'grid', placeItems: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.14), color: 'primary.main' }}>
                    <Icon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
                    <Typography variant="caption" color="text.secondary">{label}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 1.5 }}>
              Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <DetailRow label="Username">@{user.username}</DetailRow>
            <DetailRow label="Email">{user.email}</DetailRow>
            <DetailRow label="Status"><StatusChip status={user.status} /></DetailRow>
            <DetailRow label="Role"><RoleLabel role={user.role} /></DetailRow>
            <DetailRow label="Contact">{user.contact || '–'}</DetailRow>
            <DetailRow label="Company">{user.company || '–'}</DetailRow>
            <DetailRow label="Language">{user.language}</DetailRow>
            <DetailRow label="Country">{user.country || '–'}</DetailRow>
          </CardContent>
          <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: 2, pb: 4 }}>
            <Button variant="contained" onClick={() => navigate(`/apps/user/edit?id=${user.id}`)}>
              Edit
            </Button>
            <Button variant="outlined" color={user.status === 'inactive' ? 'success' : 'error'} onClick={toggleSuspend}
              disabled={!canManageUsers || user.isDemoAdmin}>
              {user.status === 'inactive' ? 'Activate' : 'Suspend'}
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ border: `2px solid ${theme.palette.primary.main}` }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Chip label={user.plan} color="primary" size="small" sx={{ borderRadius: 1 }} />
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                ${plan.price}
                <Typography component="span" variant="body2" color="text.secondary"> / month</Typography>
              </Typography>
            </Box>
            {plan.features.map((f) => (
              <Typography key={f} variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'text.secondary' }} /> {f}
              </Typography>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Days</Typography>
              <Typography variant="body2">{daysUsed} of 30 days</Typography>
            </Box>
            <LinearProgress variant="determinate" value={(daysUsed / 30) * 100} sx={{ height: 8, borderRadius: 4 }} />
            <Typography variant="caption" color="text.secondary">{30 - daysUsed} days remaining in this billing cycle</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Right column: tabs */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Overview" />
          <Tab label="Security" />
        </Tabs>
        {tab === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>User Activity Timeline</Typography>
              <ActivityTimeline user={user} />
            </CardContent>
          </Card>
        )}
        {tab === 1 && <SecurityTab user={user} canManageUsers={canManageUsers && !user.isDemoAdmin} onDone={setToast} />}
      </Grid>
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Grid>
  );
};

export default UserViewPage;
