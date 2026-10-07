import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import {
  Close,
  ContentCopy,
  Group,
  Home,
  Lock,
  Person,
  Redeem,
  Smartphone,
  Sms,
  Upgrade,
  Widgets,
} from '@mui/icons-material';
import { PageHeader, UserAvatar, COUNTRY_OPTIONS } from '../../components/common';
import { useAuth } from '../../auth/AuthContext';
import { apiFetch } from '../../api/client';
import { PLANS } from '../../data/plans';

// Dialog with a title row and a close (X) button.
function BaseDialog({ open, onClose, title, subtitle, children, actions, maxWidth = 'sm' }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="h5" component="span" sx={{ display: 'block', fontWeight: 600 }}>{title}</Typography>
        {subtitle && <Typography variant="body2" color="text.secondary" component="span">{subtitle}</Typography>}
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }} aria-label="close"><Close /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 3, sm: 6 } }}>{children}</DialogContent>
      {actions && <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>{actions}</DialogActions>}
    </Dialog>
  );
}
BaseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.node,
  maxWidth: PropTypes.string,
};

// ---------- 1. Edit user info (really saves to /api/auth/me) ----------
function EditUserDialog({ open, onClose, notify }) {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ fullName: '', contact: '', company: '', country: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open && user) {
      setForm({ fullName: user.fullName || '', contact: user.contact || '', company: user.company || '', country: user.country || '' });
      setError('');
    }
  }, [open, user]);

  const save = async () => {
    if (!form.fullName.trim()) return setError('Full name is required.');
    setBusy(true);
    try {
      const data = await apiFetch('/api/auth/me', { method: 'PUT', body: form });
      setUser(data.user);
      notify('Your profile was updated');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
    return undefined;
  };

  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }), fullWidth: true });
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Edit User Information"
      subtitle="Changes are saved to your real account."
      actions={<><Button variant="contained" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Submit'}</Button><Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button></>}
    >
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12 }}><TextField label="Full Name" {...f('fullName')} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><TextField label="Contact" {...f('contact')} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><TextField label="Company" {...f('company')} /></Grid>
        <Grid size={{ xs: 12 }}>
          <TextField select label="Country" {...f('country')}>
            {COUNTRY_OPTIONS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </Grid>
      </Grid>
    </BaseDialog>
  );
}
EditUserDialog.propTypes = { open: PropTypes.bool, onClose: PropTypes.func, notify: PropTypes.func };

// ---------- 2. Share project ----------
const MEMBERS = [
  { name: 'Lester Palmer', email: 'lester@example.com', access: 'Owner', color: 'primary' },
  { name: 'Mattie Blair', email: 'mattie@example.com', access: 'Can edit', color: 'success' },
  { name: 'Marcus Gray', email: 'marcus@example.com', access: 'Can view', color: 'warning' },
];
function ShareDialog({ open, onClose, notify }) {
  const [members, setMembers] = useState(MEMBERS);
  const [email, setEmail] = useState('');
  const add = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setMembers([...members, { name: email.split('@')[0], email, access: 'Can view', color: 'info' }]);
    setEmail('');
  };
  return (
    <BaseDialog open={open} onClose={onClose} title="Share Project" subtitle="Invite people to collaborate (demo).">
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField fullWidth size="small" placeholder="Add member by email" value={email} onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()} />
        <Button variant="contained" onClick={add}>Invite</Button>
      </Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>{members.length} Members</Typography>
      {members.map((m, i) => (
        <Box key={m.email} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
          <UserAvatar name={m.name} color={m.color} />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>{m.name}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>{m.email}</Typography>
          </Box>
          <TextField select size="small" value={m.access} disabled={m.access === 'Owner'} sx={{ width: 130 }}
            onChange={(e) => setMembers(members.map((x, j) => (j === i ? { ...x, access: e.target.value } : x)))}>
            {['Owner', 'Can edit', 'Can view'].map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
          </TextField>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="body2"><Group fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />Anyone with the link can view</Typography>
        <Button startIcon={<ContentCopy />} onClick={() => { navigator.clipboard?.writeText(window.location.href).catch(() => {}); notify('Link copied'); }}>
          Copy link
        </Button>
      </Box>
    </BaseDialog>
  );
}
ShareDialog.propTypes = EditUserDialog.propTypes;

// ---------- 3. Two-factor auth (2 steps) ----------
function TwoFactorDialog({ open, onClose, notify }) {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState('app');
  const [code, setCode] = useState('');
  const close = () => { setStep(0); setCode(''); onClose(); };
  return (
    <BaseDialog open={open} onClose={close} title="Two-Factor Authentication" subtitle={step === 0 ? 'Choose how you want to receive codes.' : 'Enter the 6-digit code (any 6 digits work in this demo).'}
      actions={step === 0
        ? <Button variant="contained" onClick={() => setStep(1)}>Continue</Button>
        : <><Button variant="outlined" color="secondary" onClick={() => setStep(0)}>Back</Button>
          <Button variant="contained" disabled={!/^\d{6}$/.test(code)} onClick={() => { notify('Two-factor authentication enabled (demo)'); close(); }}>Verify</Button></>}
    >
      {step === 0 ? (
        <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}>
          {[['app', Smartphone, 'Authenticator App', 'Get codes from an app like Google Authenticator.'],
            ['sms', Sms, 'SMS', 'We will text a code to your phone.']].map(([v, Icon, t, d]) => (
            <Card key={v} variant="outlined" sx={{ mb: 2, borderColor: method === v ? 'primary.main' : 'divider' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, '&:last-child': { pb: 2 } }}>
                <Icon color="primary" sx={{ fontSize: 36 }} />
                <Box sx={{ flexGrow: 1 }}><Typography sx={{ fontWeight: 600 }}>{t}</Typography><Typography variant="body2" color="text.secondary">{d}</Typography></Box>
                <FormControlLabel value={v} control={<Radio />} label="" sx={{ mr: 0 }} />
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      ) : (
        <TextField fullWidth label="Verification code" value={code} autoComplete="one-time-code"
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Lock fontSize="small" /></InputAdornment> } }}
          helperText={method === 'app' ? 'Open your authenticator app' : 'Check your phone'} sx={{ mt: 1 }} />
      )}
    </BaseDialog>
  );
}
TwoFactorDialog.propTypes = EditUserDialog.propTypes;

// ---------- 4. Upgrade plan ----------
function UpgradeDialog({ open, onClose, notify }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState('Company');
  useEffect(() => { if (open && user) setPlan(user.plan || 'Basic'); }, [open, user]);
  const current = PLANS.find((p) => p.name === plan);
  return (
    <BaseDialog open={open} onClose={onClose} title="Upgrade Plan" subtitle="Pick the plan that fits your team."
      actions={<Button variant="contained" onClick={() => { notify(`Plan change to ${plan} requested — finish it in Billing & Plans`); onClose(); }}>Upgrade</Button>}>
      <TextField select fullWidth label="Choose a plan" value={plan} onChange={(e) => setPlan(e.target.value)} sx={{ mt: 1, mb: 2 }}>
        {PLANS.map((p) => <MenuItem key={p.name} value={p.name}>{p.name} — ${p.monthly}/month</MenuItem>)}
      </TextField>
      {current && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {current.features.map((f) => <Chip key={f} label={f} size="small" color="primary" variant="outlined" />)}
        </Box>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Your current plan: <b>{user?.plan || 'Basic'}</b></Typography>
    </BaseDialog>
  );
}
UpgradeDialog.propTypes = EditUserDialog.propTypes;

// ---------- 5. Add new address ----------
function AddressDialog({ open, onClose, notify }) {
  const [type, setType] = useState('home');
  return (
    <BaseDialog open={open} onClose={onClose} title="Add New Address" subtitle="Add an address for billing or shipping (demo)."
      actions={<><Button variant="contained" onClick={() => { notify('Address added (demo)'); onClose(); }}>Submit</Button><Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button></>}>
      <RadioGroup row value={type} onChange={(e) => setType(e.target.value)} sx={{ mb: 2, justifyContent: 'center' }}>
        <FormControlLabel value="home" control={<Radio />} label={<><Home fontSize="small" sx={{ verticalAlign: 'middle' }} /> Home</>} />
        <FormControlLabel value="office" control={<Radio />} label={<><Widgets fontSize="small" sx={{ verticalAlign: 'middle' }} /> Office</>} />
      </RadioGroup>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="First Name" /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Last Name" /></Grid>
        <Grid size={{ xs: 12 }}><TextField fullWidth label="Address Line" /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="City" /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Zip Code" /></Grid>
      </Grid>
    </BaseDialog>
  );
}
AddressDialog.propTypes = EditUserDialog.propTypes;

// ---------- 6. Refer & earn ----------
function ReferDialog({ open, onClose, notify }) {
  const link = `${window.location.origin}/auth/register?ref=insightboard`;
  return (
    <BaseDialog open={open} onClose={onClose} title="Refer & Earn" subtitle="Invite a friend and you both get a free month.">
      <Grid container spacing={2} sx={{ textAlign: 'center', mb: 3 }}>
        {[['Invite your friends', Person], ['They register', Redeem], ['You both get rewarded', Upgrade]].map(([t, Icon]) => (
          <Grid key={t} size={{ xs: 12, sm: 4 }}>
            <Avatar sx={{ mx: 'auto', mb: 1, bgcolor: 'primary.main', width: 56, height: 56 }}><Icon /></Avatar>
            <Typography variant="body2">{t}</Typography>
          </Grid>
        ))}
      </Grid>
      <TextField fullWidth label="Your referral link" value={link} sx={{ mb: 3 }}
        slotProps={{ input: { readOnly: true, endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="copy" onClick={() => { navigator.clipboard?.writeText(link).catch(() => {}); notify('Referral link copied'); }}><ContentCopy /></IconButton>
          </InputAdornment>
        ) } }} />
    </BaseDialog>
  );
}
ReferDialog.propTypes = EditUserDialog.propTypes;

// ---------- 7. Create app (stepper inside a dialog) ----------
const APP_STEPS = ['Details', 'Framework', 'Database', 'Submit'];
function CreateAppDialog({ open, onClose, notify }) {
  const [step, setStep] = useState(0);
  const [app, setApp] = useState({ name: '', category: 'CRM', framework: 'React', database: 'MongoDB' });
  const close = () => { setStep(0); setApp({ name: '', category: 'CRM', framework: 'React', database: 'MongoDB' }); onClose(); };
  const options = [null, ['React', 'Vue', 'Angular', 'Svelte'], ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase']];
  const key = [null, 'framework', 'database'][step];
  return (
    <BaseDialog open={open} onClose={close} title="Create App" subtitle="Provide data with this form to create your app." maxWidth="md"
      actions={<>
        <Button variant="outlined" color="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Previous</Button>
        {step < 3
          ? <Button variant="contained" disabled={step === 0 && !app.name.trim()} onClick={() => setStep(step + 1)}>Next</Button>
          : <Button variant="contained" color="success" onClick={() => { notify(`App "${app.name}" created (demo)`); close(); }}>Submit</Button>}
      </>}>
      <Stepper activeStep={step} alternativeLabel sx={{ my: 2 }}>
        {APP_STEPS.map((s) => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}
      </Stepper>
      {step === 0 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Application Name" value={app.name} onChange={(e) => setApp({ ...app, name: e.target.value })} />
          <TextField select label="Category" value={app.category} onChange={(e) => setApp({ ...app, category: e.target.value })}>
            {['CRM', 'eCommerce', 'Online Learning', 'Analytics'].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
        </Box>
      )}
      {(step === 1 || step === 2) && (
        <RadioGroup value={app[key]} onChange={(e) => setApp({ ...app, [key]: e.target.value })}>
          {options[step].map((o) => <FormControlLabel key={o} value={o} control={<Radio />} label={o} />)}
        </RadioGroup>
      )}
      {step === 3 && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6">Ready to go 🚀</Typography>
          <Typography color="text.secondary">{app.name} · {app.category} · {app.framework} + {app.database}</Typography>
        </Box>
      )}
    </BaseDialog>
  );
}
CreateAppDialog.propTypes = EditUserDialog.propTypes;

const EXAMPLES = [
  { key: 'edit', title: 'Edit User', text: 'Update your own profile. This one really saves.', icon: Person, color: 'primary', Comp: EditUserDialog },
  { key: 'share', title: 'Share Project', text: 'Invite members and set their access level.', icon: Group, color: 'info', Comp: ShareDialog },
  { key: '2fa', title: 'Two Factor Auth', text: 'A two-step dialog to enable 2FA.', icon: Lock, color: 'success', Comp: TwoFactorDialog },
  { key: 'upgrade', title: 'Upgrade Plan', text: 'Compare and pick a subscription plan.', icon: Upgrade, color: 'warning', Comp: UpgradeDialog },
  { key: 'address', title: 'Add New Address', text: 'A form inside a dialog.', icon: Home, color: 'secondary', Comp: AddressDialog },
  { key: 'refer', title: 'Refer & Earn', text: 'Share a referral link with one click.', icon: Redeem, color: 'error', Comp: ReferDialog },
  { key: 'app', title: 'Create App', text: 'A whole wizard inside a dialog.', icon: Widgets, color: 'primary', Comp: CreateAppDialog },
];

const DialogExamplesPage = () => {
  const [openKey, setOpenKey] = useState(null);
  const [toast, setToast] = useState('');
  return (
    <Box>
      <PageHeader title="Dialog Examples" subtitle="Common modal patterns. Click Show on any card to open it." />
      <Grid container spacing={3}>
        {EXAMPLES.map(({ key, title, text, icon: Icon, color }) => (
          <Grid key={key} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Avatar sx={{ mx: 'auto', mb: 2, width: 56, height: 56, bgcolor: `${color}.main` }}><Icon /></Avatar>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>{text}</Typography>
                <Button variant="contained" color={color} onClick={() => setOpenKey(key)}>Show</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {EXAMPLES.map(({ key, Comp }) => (
        <Comp key={key} open={openKey === key} onClose={() => setOpenKey(null)} notify={setToast} />
      ))}
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Box>
  );
};

export default DialogExamplesPage;
