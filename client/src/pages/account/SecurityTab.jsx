import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';

// Simple strength rules shown as a checklist while typing.
const RULES = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number or symbol', test: (p) => /[\d\W]/.test(p) },
];

function PasswordField({ label, value, onChange, show, onToggle }) {
  return (
    <TextField
      fullWidth
      label={label}
      type={show ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onToggle} edge="end" aria-label="toggle visibility">
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

// "Security" tab: change my password (PUT /api/auth/password) + session info.
const SecurityTab = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');
  const [twoStep, setTwoStep] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const mismatch = form.confirm && form.confirm !== form.newPassword;
  const allRulesPass = RULES.every((r) => r.test(form.newPassword));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await apiFetch('/api/auth/password', {
        method: 'PUT',
        body: { currentPassword: form.currentPassword, newPassword: form.newPassword },
      });
      setForm({ currentPassword: '', newPassword: '', confirm: '' });
      setToast('Password updated');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  // This browser is the only session we can describe honestly.
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const browser = /Edg/.test(ua) ? 'Edge' : /Chrome/.test(ua) ? 'Chrome' : /Firefox/.test(ua) ? 'Firefox' : /Safari/.test(ua) ? 'Safari' : 'Browser';
  const os = /Mac/.test(ua) ? 'macOS' : /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS' : /Linux/.test(ua) ? 'Linux' : 'Unknown';

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Change Password</Typography>
          {user && user.isDemoAdmin && (
            <Alert severity="info" sx={{ mb: 3 }}>The shared demo account’s password cannot be changed. Register your own account to try this.</Alert>
          )}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <PasswordField label="Current Password" value={form.currentPassword} onChange={set('currentPassword')} show={show} onToggle={() => setShow((s) => !s)} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }} />
              <Grid size={{ xs: 12, sm: 6 }}>
                <PasswordField label="New Password" value={form.newPassword} onChange={set('newPassword')} show={show} onToggle={() => setShow((s) => !s)} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={show ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={set('confirm')}
                  error={Boolean(mismatch)}
                  helperText={mismatch ? 'Passwords do not match' : ' '}
                />
              </Grid>
            </Grid>
            <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>Password Requirements:</Typography>
            {RULES.map((r) => (
              <Typography key={r.label} variant="body2" color={r.test(form.newPassword) ? 'success.main' : 'text.secondary'}>
                {r.test(form.newPassword) ? '✓' : '•'} {r.label}
              </Typography>
            ))}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button type="submit" variant="contained"
                disabled={busy || !form.currentPassword || !allRulesPass || form.newPassword !== form.confirm || (user && user.isDemoAdmin)}>
                {busy ? 'Saving…' : 'Save Changes'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setForm({ currentPassword: '', newPassword: '', confirm: '' })}>Reset</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Two-steps verification</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Two factor authentication is {twoStep ? 'enabled' : 'not enabled yet'}.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Adds an extra layer of security by asking for a code in addition to your password. (Demo only — not stored.)
              </Typography>
            </Box>
            <Switch checked={twoStep} onChange={(e) => setTwoStep(e.target.checked)} />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Current Session</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['Browser', 'Device', 'Signed in as', 'Status'].map((h) => (
                    <TableCell key={h} sx={{ textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{browser} on {os}</TableCell>
                  <TableCell>This device</TableCell>
                  <TableCell>{user ? user.email : ''}</TableCell>
                  <TableCell sx={{ color: 'success.main', fontWeight: 500 }}>Active now</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </>
  );
};

export default SecurityTab;
