import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Box, Button, Divider, Drawer, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { apiFetch } from '../../api/client';
import { COUNTRY_OPTIONS, PLAN_OPTIONS, ROLE_OPTIONS, STATUS_OPTIONS } from '../../components/common';

const EMPTY = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  contact: '',
  company: '',
  country: 'USA',
  role: 'Subscriber',
  plan: 'Basic',
  status: 'active',
};

// Slide-in panel for "Add User" on the user list page.
const UserFormDrawer = ({ open, onClose, onSaved }) => {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setError('');
    }
  }, [open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const created = await apiFetch('/api/users', { method: 'POST', body: form });
      onSaved(created);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 400 } } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2.5 }}>
        <Typography variant="h6">Add User</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2.5, display: 'grid', gap: 2.5 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required />
        <TextField label="Username" name="username" value={form.username} onChange={handleChange} required />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange}
          helperText="At least 8 characters" required />
        <TextField label="Company" name="company" value={form.company} onChange={handleChange} />
        <TextField select label="Country" name="country" value={form.country} onChange={handleChange}>
          {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField label="Contact" name="contact" value={form.contact} onChange={handleChange} placeholder="+1 (555) 123-4567" />
        <TextField select label="Select Role" name="role" value={form.role} onChange={handleChange}>
          {ROLE_OPTIONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </TextField>
        <TextField select label="Select Plan" name="plan" value={form.plan} onChange={handleChange}>
          {PLAN_OPTIONS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
        </TextField>
        <TextField select label="Status" name="status" value={form.status} onChange={handleChange}>
          {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>{s}</MenuItem>)}
        </TextField>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" disabled={busy}>
            {busy ? 'Saving…' : 'Submit'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

UserFormDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default UserFormDrawer;
