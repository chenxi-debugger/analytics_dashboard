import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout, { BRAND } from './AuthLayout';
import { useAuth } from '../../auth/AuthContext';

const DEMO = { email: 'admin@demo.com', password: 'Admin@123' };

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // After logging in, go back to the page that sent us here (or the dashboard).
  const redirectTo = (location.state && location.state.from) || '/';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title={`Welcome to ${BRAND} 👋`} subtitle="Please sign in to your account to manage users, roles and permissions.">
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Demo admin: <b>{DEMO.email}</b> / <b>{DEMO.password}</b>
        </Typography>
        <Link component="button" type="button" variant="body2" onClick={() => setForm(DEMO)}>
          Fill in demo account
        </Link>
      </Alert>

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
