import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';

const TYPES = [
  { key: 'newForYou', label: 'New for you' },
  { key: 'accountActivity', label: 'Account activity' },
  { key: 'newBrowser', label: 'A new browser used to sign in' },
  { key: 'newUser', label: 'A new user joins your team' },
  { key: 'roleChanged', label: 'Your role or permissions change' },
  { key: 'weeklyReport', label: 'Weekly analytics report' },
];
const CHANNELS = ['email', 'browser', 'app'];

// Defaults when the user has never saved preferences.
const defaults = () =>
  Object.fromEntries(TYPES.map((t, i) => [t.key, { email: true, browser: i < 4, app: i % 2 === 0 }]));

// "Notifications" tab: a grid of checkboxes saved to the user record (notificationPrefs).
const NotificationsTab = () => {
  const { user, setUser } = useAuth();
  const [prefs, setPrefs] = useState(defaults);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (user && user.notificationPrefs && Object.keys(user.notificationPrefs).length) {
      setPrefs({ ...defaults(), ...user.notificationPrefs });
    }
  }, [user]);

  const toggle = (key, channel) =>
    setPrefs((p) => ({ ...p, [key]: { ...p[key], [channel]: !p[key][channel] } }));

  const save = async () => {
    setError('');
    setBusy(true);
    try {
      const data = await apiFetch('/api/auth/me', { method: 'PUT', body: { notificationPrefs: prefs } });
      setUser(data.user);
      setToast('Notification preferences saved');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Notifications</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Choose how you want to be notified. Your choices are saved to your account.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>Type</TableCell>
                {CHANNELS.map((c) => (
                  <TableCell key={c} align="center" sx={{ textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>{c}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {TYPES.map((t) => (
                <TableRow key={t.key} hover>
                  <TableCell>{t.label}</TableCell>
                  {CHANNELS.map((c) => (
                    <TableCell key={c} align="center">
                      <Checkbox checked={Boolean(prefs[t.key] && prefs[t.key][c])} onChange={() => toggle(t.key, c)}
                        inputProps={{ 'aria-label': `${t.label} via ${c}` }} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button variant="contained" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save Changes'}</Button>
          <Button variant="outlined" color="secondary" onClick={() => setPrefs(defaults())}>Reset to defaults</Button>
        </Box>
      </CardContent>
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Card>
  );
};

export default NotificationsTab;
