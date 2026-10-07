import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Business, Email, Person, Phone } from '@mui/icons-material';
import { PageHeader, COUNTRY_OPTIONS } from '../../components/common';

function Section({ title, children }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
}
Section.propTypes = { title: PropTypes.string.isRequired, children: PropTypes.node };

// A label on the left, input on the right (stacks on small screens).
function HRow({ label, children }) {
  return (
    <Grid container spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>{label}</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 9 }}>{children}</Grid>
    </Grid>
  );
}
HRow.propTypes = { label: PropTypes.string.isRequired, children: PropTypes.node };

const icon = (Icon) => ({ input: { startAdornment: <InputAdornment position="start"><Icon fontSize="small" /></InputAdornment> } });

// Same kind of form arranged four different ways. Submitting just shows what would be sent.
const FormLayoutsPage = () => {
  const [submitted, setSubmitted] = useState('');
  const [tab, setTab] = useState(0);

  const handleSubmit = (name) => (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSubmitted(`${name}: ${JSON.stringify(data)}`);
  };

  return (
    <Box>
      <PageHeader title="Form Layouts" subtitle="Vertical, horizontal, multi-column and tabbed layouts built with the MUI Grid." />
      {submitted && (
        <Alert severity="success" onClose={() => setSubmitted('')} sx={{ mb: 3, wordBreak: 'break-all' }}>
          Submitted (demo only, nothing saved) — {submitted}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Section title="Vertical Form">
            <Box component="form" onSubmit={handleSubmit('Vertical')} sx={{ display: 'grid', gap: 2 }}>
              <TextField name="name" label="Full Name" placeholder="John Doe" />
              <TextField name="email" label="Email" type="email" placeholder="john@example.com" />
              <TextField name="phone" label="Phone" placeholder="+1 202 555 0111" />
              <TextField name="message" label="Message" multiline minRows={3} />
              <Box><Button type="submit" variant="contained">Send</Button></Box>
            </Box>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Section title="Vertical Form with Icons">
            <Box component="form" onSubmit={handleSubmit('Icons')} sx={{ display: 'grid', gap: 2 }}>
              <TextField name="name" label="Full Name" slotProps={icon(Person)} />
              <TextField name="company" label="Company" slotProps={icon(Business)} />
              <TextField name="email" label="Email" slotProps={icon(Email)} />
              <TextField name="phone" label="Phone" slotProps={icon(Phone)} />
              <Box><Button type="submit" variant="contained">Send</Button></Box>
            </Box>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Section title="Horizontal Form">
            <Box component="form" onSubmit={handleSubmit('Horizontal')}>
              <HRow label="Name"><TextField name="name" fullWidth size="small" /></HRow>
              <HRow label="Email"><TextField name="email" fullWidth size="small" /></HRow>
              <HRow label="Password"><TextField name="password" type="password" fullWidth size="small" autoComplete="new-password" /></HRow>
              <HRow label="Country">
                <TextField name="country" select fullWidth size="small" defaultValue="USA">
                  {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </TextField>
              </HRow>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { sm: 'flex-start' }, pl: { sm: '25%' } }}>
                <Button type="submit" variant="contained">Submit</Button>
                <Button type="reset" variant="outlined" color="secondary">Reset</Button>
              </Box>
            </Box>
          </Section>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Section title="Tabbed Form">
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
              <Tab label="Personal Info" />
              <Tab label="Account Details" />
            </Tabs>
            <Box component="form" onSubmit={handleSubmit('Tabbed')}>
              {/* Both tabs stay mounted (just hidden) so their values are submitted together. */}
              <Box sx={{ display: tab === 0 ? 'grid' : 'none', gap: 2 }}>
                <TextField name="firstName" label="First Name" />
                <TextField name="lastName" label="Last Name" />
                <TextField name="birthDate" label="Birth Date" type="date" slotProps={{ inputLabel: { shrink: true } }} />
              </Box>
              <Box sx={{ display: tab === 1 ? 'grid' : 'none', gap: 2 }}>
                <TextField name="username" label="Username" />
                <TextField name="email" label="Email" />
                <TextField name="language" label="Language" select defaultValue="English">
                  {['English', 'Chinese', 'Spanish', 'French'].map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </TextField>
              </Box>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit both tabs</Button>
            </Box>
          </Section>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Section title="Multi-Column Form">
            <Box component="form" onSubmit={handleSubmit('Multi-column')}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>1. Account Details</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}><TextField name="username" label="Username" fullWidth /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField name="email" label="Email" fullWidth /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField name="password" label="Password" type="password" fullWidth autoComplete="new-password" /></Grid>
                <Grid size={{ xs: 12, md: 6 }}><TextField name="confirm" label="Confirm Password" type="password" fullWidth autoComplete="new-password" /></Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>2. Personal Info</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}><TextField name="firstName" label="First Name" fullWidth /></Grid>
                <Grid size={{ xs: 12, md: 4 }}><TextField name="lastName" label="Last Name" fullWidth /></Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField name="country" label="Country" select fullWidth defaultValue="USA">
                    {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button type="submit" variant="contained">Submit</Button>
                <Button type="reset" variant="outlined" color="secondary">Reset</Button>
              </Box>
            </Box>
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormLayoutsPage;
