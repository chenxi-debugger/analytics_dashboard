import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { COUNTRY_OPTIONS, UserAvatar } from '../../components/common';

const FIELDS = ['fullName', 'username', 'email', 'contact', 'company', 'country', 'language'];
const LANGUAGES = ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese'];

// "Account" tab: edit my own profile (saved through PUT /api/auth/me).
const AccountTab = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (user) setForm(Object.fromEntries(FIELDS.map((k) => [k, user[k] ?? ''])));
  }, [user]);

  if (!user || !form) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const reset = () => setForm(Object.fromEntries(FIELDS.map((k) => [k, user[k] ?? ''])));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await apiFetch('/api/auth/me', { method: 'PUT', body: form });
      setUser(data.user);
      setToast('Profile saved');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setError('');
    try {
      await apiFetch('/api/auth/me', { method: 'DELETE', body: { confirm: true } });
      logout();
      navigate('/auth/login', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Account Details</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 1 }}>
            <UserAvatar name={form.fullName || user.fullName} color={user.avatarColor} size={96} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user.fullName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.role} · {user.plan} plan
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Your avatar shows your initials and updates when you change your name.
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {user.isDemoAdmin && (
            <Alert severity="info" sx={{ mb: 3 }}>This is the shared demo account, so its email and username are locked.</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Username" name="username" value={form.username} onChange={handleChange} disabled={user.isDemoAdmin} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} disabled={user.isDemoAdmin} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Organization" name="company" value={form.company} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Phone Number" name="contact" value={form.contact} onChange={handleChange} placeholder="+1 (555) 123-4567" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Country" name="country" value={form.country} onChange={handleChange}>
                  <MenuItem value="">Not set</MenuItem>
                  {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField select fullWidth label="Language" name="language" value={form.language} onChange={handleChange}>
                  {LANGUAGES.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button type="submit" variant="contained" disabled={busy}>{busy ? 'Saving…' : 'Save Changes'}</Button>
              <Button variant="outlined" color="secondary" onClick={reset}>Reset</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Delete Account</Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Are you sure you want to delete your account? Once you delete it, there is no going back.
          </Alert>
          <FormControlLabel
            control={<Checkbox checked={confirmDelete} onChange={(e) => setConfirmDelete(e.target.checked)} disabled={user.isDemoAdmin} />}
            label="I confirm my account deletion"
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="error" disabled={!confirmDelete || user.isDemoAdmin} onClick={handleDelete}>
              Deactivate Account
            </Button>
            {user.isDemoAdmin && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>The demo account cannot be deleted.</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </>
  );
};

export default AccountTab;
