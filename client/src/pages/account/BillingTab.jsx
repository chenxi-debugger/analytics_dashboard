import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  MenuItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { BILLING_OPTIONS } from '../../components/common';
import { PLANS, planByName } from '../../data/plans';

// "Billing & Plans" tab: current plan, change plan, billing method and a billing history.
const BillingTab = () => {
  const theme = useTheme();
  const { user, setUser } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  if (!user) return null;
  const plan = planByName(user.plan);
  const dayOfCycle = (Math.floor((Date.now() - new Date(user.createdAt)) / 86400000) % 30) + 1;

  const save = async (changes, message) => {
    setError('');
    try {
      const data = await apiFetch('/api/auth/me', { method: 'PUT', body: changes });
      setUser(data.user);
      setToast(message);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // The last 6 monthly invoices for the current plan (generated from the plan price).
  const history = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return { id: `INV-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`, date: d, amount: plan.monthly };
  });

  return (
    <>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Current Plan</Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Your current plan is {plan.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{plan.subtitle}</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Active until {new Date(Date.now() + (30 - dayOfCycle) * 86400000).toLocaleDateString()}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>We will send you a notification upon subscription expiration.</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>${plan.monthly} per month</Typography>
                {plan.popular && <Chip label="Popular" color="primary" size="small" sx={{ borderRadius: 1 }} />}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>This is a demo — changing your plan does not charge anything.</Alert>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Days</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{dayOfCycle} of 30 Days</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(dayOfCycle / 30) * 100} sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="caption" color="text.secondary">{30 - dayOfCycle} days remaining until your plan renews</Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="contained" onClick={() => { setSelected(user.plan); setDialogOpen(true); }}>Change Plan</Button>
            <Button variant="outlined" color="error" disabled={user.plan === 'Basic'}
              onClick={() => save({ plan: 'Basic' }, 'Subscription cancelled — you are on the free Basic plan')}>
              Cancel Subscription
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Payment Method</Typography>
          <Grid container spacing={2.5} alignItems="center">
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField select fullWidth label="Billing method" value={user.billing}
                onChange={(e) => save({ billing: e.target.value }, 'Billing method updated')}>
                {BILLING_OPTIONS.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Card details are never collected in this demo. Pick a method above and it is saved to your account.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Billing History</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['Invoice', 'Date', 'Plan', 'Amount', 'Status'].map((h) => (
                    <TableCell key={h} sx={{ textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>#{row.id}</TableCell>
                    <TableCell>{row.date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</TableCell>
                    <TableCell>{plan.name}</TableCell>
                    <TableCell>${row.amount}</TableCell>
                    <TableCell>
                      <Chip size="small" label={row.amount === 0 ? 'Free' : 'Paid'} color={row.amount === 0 ? 'default' : 'success'} variant="outlined" sx={{ borderRadius: 1 }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
          <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>Upgrade Plan</Typography>
          <Typography variant="body2" color="text.secondary" display="block">Choose the best plan for you.</Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 4 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {PLANS.map((p) => (
              <Grid key={p.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  onClick={() => setSelected(p.name)}
                  sx={{
                    cursor: 'pointer',
                    p: 2.5,
                    borderRadius: 2,
                    textAlign: 'center',
                    border: `2px solid ${selected === p.name ? theme.palette.primary.main : theme.palette.divider}`,
                    bgcolor: selected === p.name ? alpha(theme.palette.primary.main, 0.06) : 'transparent',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{p.name}</Typography>
                  <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600, my: 1 }}>${p.monthly}</Typography>
                  <Typography variant="caption" color="text.secondary">per month</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button variant="contained" disabled={selected === user.plan}
              onClick={async () => { if (await save({ plan: selected }, `Plan changed to ${selected}`)) setDialogOpen(false); }}>
              Confirm
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </>
  );
};

export default BillingTab;
