import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout, { BRAND } from './AuthLayout';
import { useAuth } from '../../auth/AuthContext';

const DEMO = { email: 'admin@demo.com', password: 'Admin@123' };

const LoginPage = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // After logging in, go back to the page that sent us here (or the dashboard).
  const redirectTo = (location.state && location.state.from) || '/';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const doLogin = async (email, password) => {
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin(form.email, form.password);
  };

  const handleDemoLogin = () => {
    setForm(DEMO);
    doLogin(DEMO.email, DEMO.password);
  };


  // Already signed in? Skip this page.
  if (isLoggedIn && !busy) return <Navigate to={redirectTo} replace />;
  return (
    <AuthLayout title={`Welcome to ${BRAND} 👋`} subtitle="Please sign in to your account to start exploring the dashboard.">
      {/* One click for recruiters / visitors: sign in with the shared demo account */}
      <Alert severity="info" sx={{ mb: 3 }} icon={false}>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          Just looking around? Use the demo admin account:
          <br />
          <b>{DEMO.email}</b> / <b>{DEMO.password}</b>
        </Typography>
        <Button fullWidth variant="contained" color="info" onClick={handleDemoLogin} disabled={busy}>
          {busy ? 'Signing in…' : 'Log in as Demo Admin'}
        </Button>
      </Alert>

      <Divider sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary">
          or sign in with your account
        </Typography>
      </Divider>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Email or Username"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="username"
          autoFocus
          sx={{ mb: 2.5 }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" aria-label="toggle password visibility">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1.5 }}>
          <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Remember me" />
          <Link component={RouterLink} to="/auth/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>
        <Button fullWidth type="submit" variant="contained" size="large" disabled={busy || !form.email || !form.password}>
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        New on our platform?{' '}
        <Link component={RouterLink} to="/auth/register">
          Create an account
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export default LoginPage;
