import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { CheckCircle, ExpandMore, RemoveCircleOutline } from '@mui/icons-material';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { ANNUAL_DISCOUNT, PLANS, yearlyPerMonth } from '../../data/plans';

// Which plan includes which feature (for the comparison table).
const COMPARISON = [
  { feature: 'Dashboards', values: ['3', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { feature: 'Team members', values: ['1', '5', '10', 'Unlimited'] },
  { feature: 'Storage', values: ['1 GB', '20 GB', '50 GB', '1 TB'] },
  { feature: 'CSV export', values: [true, true, true, true] },
  { feature: 'Role-based access control', values: [false, false, true, true] },
  { feature: 'Custom roles', values: [false, false, true, true] },
  { feature: 'SSO & audit logs', values: [false, false, false, true] },
  { feature: 'Support', values: ['Community', 'Email', 'Priority', 'Dedicated'] },
];

const PRICING_FAQ = [
  { q: 'Can I change my plan later?', a: 'Yes. You can upgrade or downgrade at any time from Account Settings → Billing & Plans. The change takes effect immediately.' },
  { q: 'Is there a free plan?', a: 'The Basic plan is free forever and includes everything you need to try the dashboard on your own.' },
  { q: 'How does yearly billing work?', a: `Paying yearly saves ${ANNUAL_DISCOUNT * 100}% compared with paying monthly. You are billed once for the full year.` },
  { q: 'Is this a real payment page?', a: 'No — this is a portfolio demo. Choosing a plan only updates the plan saved on your account; no payment is taken.' },
];

const PricingPage = () => {
  const theme = useTheme();
  const { user, setUser } = useAuth();
  const [yearly, setYearly] = useState(true);
  const [busyPlan, setBusyPlan] = useState('');
  const [toast, setToast] = useState('');

  const choosePlan = async (name) => {
    setBusyPlan(name);
    try {
      const data = await apiFetch('/api/auth/me', { method: 'PUT', body: { plan: name } });
      setUser(data.user);
      setToast(`You are now on the ${name} plan`);
    } catch (err) {
      setToast(err.message);
    } finally {
      setBusyPlan('');
    }
  };

  const renderValue = (v) => {
    if (v === true) return <CheckCircle color="primary" fontSize="small" />;
    if (v === false) return <RemoveCircleOutline color="disabled" fontSize="small" />;
    return v;
  };

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>Pricing Plans</Typography>
          <Typography variant="body2" color="text.secondary">
            All plans include the full analytics dashboard. Choose the best plan to fit your needs.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 3 }}>
            <Typography variant="body2">Monthly</Typography>
            <Switch checked={yearly} onChange={(e) => setYearly(e.target.checked)} />
            <Typography variant="body2">Yearly</Typography>
            <Chip size="small" color="primary" variant="outlined" label={`Save ${ANNUAL_DISCOUNT * 100}%`} sx={{ ml: 1, borderRadius: 1 }} />
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {PLANS.map((plan) => {
            const price = yearly ? yearlyPerMonth(plan) : plan.monthly;
            const isCurrent = user && user.plan === plan.name;
            return (
              <Grid key={plan.name} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Box
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 2,
                    position: 'relative',
                    border: `${plan.popular ? 2 : 1}px solid ${plan.popular ? theme.palette.primary.main : theme.palette.divider}`,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {plan.popular && (
                    <Chip label="Popular" size="small" color="primary" sx={{ position: 'absolute', top: 12, right: 12, borderRadius: 1 }} />
                  )}
                  <Box sx={{ width: 56, height: 56, borderRadius: 2, mx: 'auto', mb: 2, display: 'grid', placeItems: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main', fontWeight: 700, fontSize: 22 }}>
                    {plan.name[0]}
                  </Box>
                  <Typography variant="h6" align="center">{plan.name}</Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>{plan.subtitle}</Typography>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography component="span" variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>${price}</Typography>
                    <Typography component="span" variant="body2" color="text.secondary">/month</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ minHeight: 20 }}>
                      {yearly && plan.monthly > 0 ? `$${price * 12} billed yearly` : ''}
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1, mb: 3 }}>
                    {plan.features.map((f) => (
                      <Typography key={f} variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CheckCircle sx={{ fontSize: 16 }} color="primary" /> {f}
                      </Typography>
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    variant={plan.popular ? 'contained' : 'outlined'}
                    color={isCurrent ? 'success' : 'primary'}
                    disabled={isCurrent || Boolean(busyPlan)}
                    onClick={() => choosePlan(plan.name)}
                  >
                    {isCurrent ? 'Your Current Plan' : busyPlan === plan.name ? 'Updating…' : plan.monthly === 0 ? 'Choose Free' : 'Upgrade'}
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 1 }}>Pick a plan that works best for you</Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>Compare every feature side by side</Typography>
        <TableContainer sx={{ mb: 8, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Features</TableCell>
                {PLANS.map((p) => (
                  <TableCell key={p.name} align="center" sx={{ fontWeight: 600 }}>
                    {p.name}
                    <Typography variant="caption" color="text.secondary" display="block">
                      {p.monthly === 0 ? 'Free' : `$${yearly ? yearlyPerMonth(p) : p.monthly}/mo`}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {COMPARISON.map((row) => (
                <TableRow key={row.feature} hover>
                  <TableCell>{row.feature}</TableCell>
                  {row.values.map((v, i) => (
                    <TableCell key={PLANS[i].name} align="center">{renderValue(v)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 3 }}>FAQs</Typography>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {PRICING_FAQ.map((item) => (
            <Accordion key={item.q} disableGutters>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: 500 }}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">{item.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </CardContent>
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Card>
  );
};

export default PricingPage;
