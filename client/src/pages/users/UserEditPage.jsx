import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, MenuItem, Snackbar, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import {
  BILLING_OPTIONS,
  COUNTRY_OPTIONS,
  PLAN_OPTIONS,
  ROLE_OPTIONS,
  STATUS_OPTIONS,
  ReadOnlyNotice,
  UserAvatar,
} from '../../components/common';
import useUserFromQuery from './useUserFromQuery';

const FIELDS = ['fullName', 'username', 'email', 'contact', 'company', 'country', 'language', 'role', 'plan', 'status', 'billing'];

const UserEditPage = () => {
  const navigate = useNavigate();
  const { canManageUsers, isLoggedIn } = useAuth();
  const { user, setUser, loading, error } = useUserFromQuery();
  const [form, setForm] = useState(null);
  const [saveError, setSaveError] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  // Copy the loaded user into an editable form.
  useEffect(() => {
    if (user) setForm(Object.fromEntries(FIELDS.map((k) => [k, user[k] ?? ''])));
  }, [user]);

  if (loading || (user && !form)) return <Box sx={{ display: 'grid', placeItems: 'center', py: 10 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user) return <Alert severity="info">No users yet.</Alert>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const lockedForDemo = user.isDemoAdmin; // role / status / email of the demo admin are locked on the server too

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError('');
    setBusy(true);
    try {
      // Only send fields that actually changed.
      const changes = Object.fromEntries(FIELDS.filter((k) => form[k] !== (user[k] ?? '')).map((k) => [k, form[k]]));
      if (!Object.keys(changes).length) {
        setToast('Nothing to save');
        return;
      }
      const updated = await apiFetch(`/api/users/${user.id}`, { method: 'PUT', body: changes });
      setUser(updated);
      setToast('Changes saved');
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const disabled = !canManageUsers;

  return (
    <Box>
      {!canManageUsers && <ReadOnlyNotice isLoggedIn={isLoggedIn} who="an Administrator or Manager" />}
      <Card>
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <UserAvatar name={user.fullName} color={user.avatarColor} size={64} />
            <Box>
              <Typography variant="h6">Edit User Information</Typography>
              <Typography variant="body2" color="text.secondary">
                Updating user details will receive a privacy audit.
              </Typography>
            </Box>
          </Box>
          {saveError && <Alert severity="error" sx={{ mb: 3 }}>{saveError}</Alert>}
          {lockedForDemo && <Alert severity="info" sx={{ mb: 3 }}>The demo admin’s email, role and status are locked.</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} disabled={disabled} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Username" name="username" value={form.username} onChange={handleChange} disabled={disabled} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} disabled={disabled || lockedForDemo} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Contact" name="contact" value={form.contact} onChange={handleChange} disabled={disabled} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Company" name="company" value={form.company} onChange={handleChange} disabled={disabled} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Country" name="country" value={form.country} onChange={handleChange} disabled={disabled}>
                  <MenuItem value="">Not set</MenuItem>
                  {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Language" name="language" value={form.language} onChange={handleChange} disabled={disabled}>
                  {['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese'].map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Billing" name="billing" value={form.billing} onChange={handleChange} disabled={disabled}>
                  {BILLING_OPTIONS.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField select fullWidth label="Role" name="role" value={form.role} onChange={handleChange} disabled={disabled || lockedForDemo}>
                  {ROLE_OPTIONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField select fullWidth label="Plan" name="plan" value={form.plan} onChange={handleChange} disabled={disabled}>
                  {PLAN_OPTIONS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField select fullWidth label="Status" name="status" value={form.status} onChange={handleChange} disabled={disabled || lockedForDemo}
                  SelectProps={{ sx: { textTransform: 'capitalize' } }}>
                  {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>{s}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button type="submit" variant="contained" disabled={disabled || busy}>
                {busy ? 'Saving…' : 'Save Changes'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate(`/apps/user/view?id=${user.id}`)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Box>
  );
};

export default UserEditPage;
