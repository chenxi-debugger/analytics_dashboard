import React, { useState } from 'react';
import { Alert, Box, Button, Link, TextField } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { apiFetch } from '../../api/client';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setBusy(true);
    try {
      const data = await apiFetch('/api/auth/forgot-password', { method: 'POST', body: { email }, auth: false });
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password? 🔒" subtitle="Enter your email and we'll send you instructions to reset your password.">
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message} (This demo has no email service, so no email is actually sent.)
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'grid', gap: 2.5 }}>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus autoComplete="email" />
        <Button type="submit" variant="contained" size="large" disabled={busy || !email}>
          {busy ? 'Sending…' : 'Send reset link'}
        </Button>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Link component={RouterLink} to="/auth/login" sx={{ display: 'flex', alignItems: 'center' }} variant="body2">
          <ChevronLeft fontSize="small" /> Back to login
        </Link>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
