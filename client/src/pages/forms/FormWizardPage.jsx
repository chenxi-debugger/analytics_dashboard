import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { PageHeader, COUNTRY_OPTIONS } from '../../components/common';

const STEPS = [
  { label: 'Account Details', hint: 'Set up your login' },
  { label: 'Personal Info', hint: 'Tell us about yourself' },
  { label: 'Social Links', hint: 'Optional profiles' },
  { label: 'Review', hint: 'Check and submit' },
];

const INITIAL = {
  username: '', email: '', password: '',
  firstName: '', lastName: '', country: '', language: 'English',
  github: '', linkedin: '', twitter: '',
};

// Each step validates only its own fields, so "Next" is blocked until that step is OK.
const validators = [
  (v) => {
    const e = {};
    if (!v.username.trim()) e.username = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Valid email required';
    if (v.password.length < 8) e.password = 'At least 8 characters';
    return e;
  },
  (v) => {
    const e = {};
    if (!v.firstName.trim()) e.firstName = 'Required';
    if (!v.lastName.trim()) e.lastName = 'Required';
    if (!v.country) e.country = 'Required';
    return e;
  },
  (v) => {
    const e = {};
    ['github', 'linkedin', 'twitter'].forEach((k) => {
      if (v[k] && !/^https?:\/\//.test(v[k])) e[k] = 'Must start with http(s)://';
    });
    return e;
  },
  () => ({}),
];

const FormWizardPage = () => {
  const [active, setActive] = useState(0);
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [vertical, setVertical] = useState(false);
  const [done, setDone] = useState(false);

  const field = (name, extra = {}) => ({
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    error: Boolean(errors[name]),
    helperText: errors[name] || ' ',
    fullWidth: true,
    ...extra,
  });

  const next = () => {
    const e = validators[active](values);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (active === STEPS.length - 1) setDone(true);
    else setActive((s) => s + 1);
  };
  const back = () => { setErrors({}); setActive((s) => s - 1); };
  const restart = () => { setValues(INITIAL); setErrors({}); setActive(0); setDone(false); };

  const stepBody = (i) => {
    if (i === 0) {
      return (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Username" {...field('username')} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Email" {...field('email')} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Password" type="password" autoComplete="new-password" {...field('password')} /></Grid>
        </Grid>
      );
    }
    if (i === 1) {
      return (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="First Name" {...field('firstName')} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><TextField label="Last Name" {...field('lastName')} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField select label="Country" {...field('country')}>
              {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField select label="Language" {...field('language')}>
              {['English', 'Chinese', 'Spanish', 'French', 'German'].map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>
      );
    }
    if (i === 2) {
      return (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}><TextField label="GitHub" placeholder="https://github.com/…" {...field('github')} /></Grid>
          <Grid size={{ xs: 12, md: 4 }}><TextField label="LinkedIn" placeholder="https://linkedin.com/in/…" {...field('linkedin')} /></Grid>
          <Grid size={{ xs: 12, md: 4 }}><TextField label="Twitter / X" placeholder="https://x.com/…" {...field('twitter')} /></Grid>
        </Grid>
      );
    }
    return (
      <Box>
        {Object.entries(values).map(([k, v]) => (
          <Box key={k} sx={{ display: 'flex', py: 0.5 }}>
            <Typography variant="body2" sx={{ width: 120, fontWeight: 500, textTransform: 'capitalize' }}>{k}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
              {k === 'password' ? '•'.repeat(v.length) : v || '—'}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const actions = (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button variant="outlined" color="secondary" disabled={active === 0} onClick={back}>Previous</Button>
      <Button variant="contained" color={active === STEPS.length - 1 ? 'success' : 'primary'} onClick={next}>
        {active === STEPS.length - 1 ? 'Submit' : 'Next'}
      </Button>
    </Box>
  );

  return (
    <Box>
      <PageHeader title="Form Wizard" subtitle="A long form split into steps. Each step is validated before you can move on." />
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <FormControlLabel control={<Switch checked={vertical} onChange={(e) => setVertical(e.target.checked)} />} label="Vertical layout" />
          </Box>
          {done ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Alert severity="success" sx={{ mb: 3, justifyContent: 'center' }}>
                Account for {values.firstName} {values.lastName} created (demo — nothing was saved).
              </Alert>
              <Button variant="contained" onClick={restart}>Start over</Button>
            </Box>
          ) : vertical ? (
            <Stepper activeStep={active} orientation="vertical">
              {STEPS.map((s, i) => (
                <Step key={s.label}>
                  <StepLabel optional={<Typography variant="caption">{s.hint}</Typography>}>{s.label}</StepLabel>
                  <StepContent>
                    <Box sx={{ pt: 2 }}>{stepBody(i)}</Box>
                    {actions}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          ) : (
            <>
              <Stepper activeStep={active} alternativeLabel>
                {STEPS.map((s) => (
                  <Step key={s.label}>
                    <StepLabel optional={<Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' } }}>{s.hint}</Typography>}>
                      {s.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{STEPS[active].label}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{STEPS[active].hint}</Typography>
              {stepBody(active)}
              {actions}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormWizardPage;
