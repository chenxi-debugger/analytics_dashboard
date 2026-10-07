import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { PageHeader, COUNTRY_OPTIONS } from '../../components/common';

const EMPTY = {
  fullName: '',
  email: '',
  password: '',
  confirm: '',
  age: '',
  website: '',
  country: '',
  bio: '',
  terms: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]+$/i;

// Pure function: form values in, { field: errorMessage } out.
// Keeping it pure makes it trivial to unit test and to reuse on the server.
function validate(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = 'Full name is required.';
  else if (v.fullName.trim().length < 3) e.fullName = 'At least 3 characters.';

  if (!v.email.trim()) e.email = 'Email is required.';
  else if (!EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address.';

  if (!v.password) e.password = 'Password is required.';
  else if (v.password.length < 8) e.password = 'At least 8 characters.';
  else if (!/[A-Z]/.test(v.password) || !/[0-9]/.test(v.password)) e.password = 'Include an uppercase letter and a number.';

  if (!v.confirm) e.confirm = 'Please confirm your password.';
  else if (v.confirm !== v.password) e.confirm = 'Passwords do not match.';

  if (v.age === '') e.age = 'Age is required.';
  else if (!Number.isInteger(Number(v.age)) || Number(v.age) < 18 || Number(v.age) > 120) e.age = 'Must be a whole number between 18 and 120.';

  if (v.website && !URL_RE.test(v.website)) e.website = 'URL must start with http:// or https://';
  if (!v.country) e.country = 'Select a country.';
  if (v.bio.length > 200) e.bio = 'Maximum 200 characters.';
  if (!v.terms) e.terms = 'You must accept the terms.';
  return e;
}

// 0–4 score used for the strength bar.
const passwordScore = (p) =>
  [p.length >= 8, /[A-Z]/.test(p), /[0-9]/.test(p), /[^A-Za-z0-9]/.test(p)].filter(Boolean).length;
const STRENGTH = [
  { label: 'Too weak', color: 'error' },
  { label: 'Weak', color: 'error' },
  { label: 'Fair', color: 'warning' },
  { label: 'Good', color: 'info' },
  { label: 'Strong', color: 'success' },
];

// Validation written by hand (no form library): errors are derived from the values on
// every render, but only shown for fields the user has "touched" or after a submit attempt.
const FormValidationPage = () => {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const show = (field) => (submitted || touched[field]) && errors[field];
  const score = passwordScore(values.password);

  const change = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    setSuccess(false);
  };
  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const field = (name) => ({
    name,
    value: values[name],
    onChange: change(name),
    onBlur: blur(name),
    error: Boolean(show(name)),
    helperText: show(name) || ' ',
    fullWidth: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length === 0) setSuccess(true);
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSubmitted(false);
    setSuccess(false);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <Box>
      <PageHeader
        title="Form Validation"
        subtitle="Hand-written validation: errors appear when you leave a field or press Submit, and update as you type."
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              {success && <Alert severity="success" sx={{ mb: 2 }}>All fields are valid — the form would be sent to the server now.</Alert>}
              {submitted && errorCount > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>Please fix {errorCount} field{errorCount > 1 ? 's' : ''} below.</Alert>
              )}
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}><TextField label="Full Name *" {...field('fullName')} /></Grid>
                  <Grid size={{ xs: 12, md: 6 }}><TextField label="Email *" type="email" {...field('email')} /></Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Password *" type="password" autoComplete="new-password" {...field('password')} />
                    {values.password && (
                      <Box sx={{ mt: -1.5, mb: 1 }}>
                        <LinearProgress variant="determinate" value={(score / 4) * 100} color={STRENGTH[score].color} sx={{ height: 6, borderRadius: 3 }} />
                        <Typography variant="caption" color={`${STRENGTH[score].color}.main`}>{STRENGTH[score].label}</Typography>
                      </Box>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}><TextField label="Confirm Password *" type="password" autoComplete="new-password" {...field('confirm')} /></Grid>
                  <Grid size={{ xs: 12, md: 4 }}><TextField label="Age *" type="number" {...field('age')} /></Grid>
                  <Grid size={{ xs: 12, md: 4 }}><TextField label="Website" placeholder="https://" {...field('website')} /></Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField select label="Country *" {...field('country')}>
                      {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Bio"
                      multiline
                      minRows={3}
                      {...field('bio')}
                      helperText={show('bio') || `${values.bio.length}/200`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={values.terms} onChange={change('terms')} onBlur={blur('terms')} />}
                      label="I agree to the privacy policy & terms *"
                    />
                    {show('terms') && <FormHelperText error>{errors.terms}</FormHelperText>}
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button type="submit" variant="contained">Submit</Button>
                  <Button variant="outlined" color="secondary" onClick={reset}>Reset</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Rules</Typography>
              {[
                'Full name: required, ≥ 3 characters',
                'Email: required, valid format',
                'Password: ≥ 8 chars, 1 uppercase, 1 number',
                'Confirm: must match password',
                'Age: whole number 18–120',
                'Website: optional, http(s) URL',
                'Country: required',
                'Bio: ≤ 200 characters',
                'Terms: must be checked',
              ].map((r) => <Typography key={r} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>• {r}</Typography>)}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Live state</Typography>
              <Typography variant="body2" color="text.secondary">Valid: {errorCount === 0 ? 'yes' : `no (${errorCount} errors)`}</Typography>
              <Typography variant="body2" color="text.secondary">Touched: {Object.keys(touched).join(', ') || '—'}</Typography>
              <Typography variant="body2" color="text.secondary">Submit attempted: {submitted ? 'yes' : 'no'}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormValidationPage;
