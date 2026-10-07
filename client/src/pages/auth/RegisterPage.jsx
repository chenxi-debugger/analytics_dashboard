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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../auth/AuthContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Client-side checks so the user gets instant feedback (the server checks again).
function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Please enter your name';
  if (!/^[a-zA-Z0-9._-]{3,}$/.test(form.username)) errors.username = 'At least 3 letters, numbers, . _ or -';
  if (!EMAIL_RE.test(form.email)) errors.email = 'Please enter a valid email';
  if (form.password.length < 8) errors.password = 'At least 8 characters';
  if (!form.agree) errors.agree = 'Please accept the terms';
  return errors;
}

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '', agree: false });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const errors = validate(form);
  const showError = (field) => touched[field] && errors[field];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ fullName: true, username: true, email: true, password: true, agree: true });
    if (Object.keys(errors).length) return;
    setError('');
    setBusy(true);
    try {
      const { agree, ...payload } = form;
      await register(payload);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Adventure starts here 🚀" subtitle="Create an account to explore the dashboard. New accounts start with the Subscriber role.">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'grid', gap: 2.5 }}>
        <TextField label="Full name" name="fullName" value={form.fullName} onChange={handleChange} onBlur={handleBlur}
          error={Boolean(showError('fullName'))} helperText={showError('fullName')} autoFocus />
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} onBlur={handleBlur}
          error={Boolean(showError('username'))} helperText={showError('username')} autoComplete="username" />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
          error={Boolean(showError('email'))} helperText={showError('email')} autoComplete="email" />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(showError('password'))}
          helperText={showError('password') || 'At least 8 characters'}
          autoComplete="new-password"
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
        <Box>
          <FormControlLabel
            control={<Checkbox name="agree" checked={form.agree} onChange={handleChange} size="small" />}
            label={<Typography variant="body2">I agree to the privacy policy & terms</Typography>}
          />
          {showError('agree') && (
            <Typography variant="caption" color="error" display="block">
              {errors.agree}
            </Typography>
          )}
        </Box>
        <Button type="submit" variant="contained" size="large" disabled={busy}>
          {busy ? 'Creating account…' : 'Sign up'}
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/auth/login">
          Sign in instead
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export default RegisterPage;
