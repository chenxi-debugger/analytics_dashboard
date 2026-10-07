// Shared building blocks for the user / role / permission pages.
import React from 'react';
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
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  AdminPanelSettingsOutlined,
  ManageAccountsOutlined,
  EditOutlined,
  SupportAgentOutlined,
  PersonOutline,
  LockOutlined,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');

// Colored circle with initials (no stock photos needed).
export function UserAvatar({ name, color = 'primary', size = 34 }) {
  const theme = useTheme();
  const main = (theme.palette[color] || theme.palette.primary).main;
  return (
    <Avatar sx={{ width: size, height: size, fontSize: size * 0.4, fontWeight: 600, bgcolor: alpha(main, 0.16), color: main }}>
      {getInitials(name)}
    </Avatar>
  );
}
UserAvatar.propTypes = { name: PropTypes.string, color: PropTypes.string, size: PropTypes.number };

const ROLE_META = {
  Administrator: { icon: AdminPanelSettingsOutlined, color: 'error' },
  Manager: { icon: ManageAccountsOutlined, color: 'info' },
  Editor: { icon: EditOutlined, color: 'warning' },
  Support: { icon: SupportAgentOutlined, color: 'success' },
  Subscriber: { icon: PersonOutline, color: 'primary' },
};

export function RoleLabel({ role }) {
  const theme = useTheme();
  const meta = ROLE_META[role] || { icon: PersonOutline, color: 'secondary' };
  const Icon = meta.icon;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1,
          display: 'grid',
          placeItems: 'center',
          bgcolor: alpha(theme.palette[meta.color].main, 0.14),
          color: theme.palette[meta.color].main,
        }}
      >
        <Icon sx={{ fontSize: 18 }} />
      </Box>
      <Typography variant="body2">{role}</Typography>
    </Box>
  );
}
RoleLabel.propTypes = { role: PropTypes.string };

const STATUS_COLOR = { active: 'success', pending: 'warning', inactive: 'secondary' };

export function StatusChip({ status }) {
  return (
    <Chip
      size="small"
      label={status}
      color={STATUS_COLOR[status] || 'default'}
      variant="outlined"
      sx={{ textTransform: 'capitalize', fontWeight: 500, borderRadius: 1 }}
    />
  );
}
StatusChip.propTypes = { status: PropTypes.string };

// Card with a number, label and an icon in a tinted square (top of list pages).
export function StatCard({ title, value, subtitle, icon: Icon, color = 'primary' }) {
  const theme = useTheme();
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" sx={{ my: 0.5, fontWeight: 600 }}>
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 1.5,
            display: 'grid',
            placeItems: 'center',
            bgcolor: alpha(theme.palette[color].main, 0.14),
            color: theme.palette[color].main,
          }}
        >
          {Icon && <Icon />}
        </Box>
      </CardContent>
    </Card>
  );
}
StatCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  color: PropTypes.string,
};

export function ConfirmDialog({ open, title, message, confirmText = 'Delete', onConfirm, onClose, busy }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={busy}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.node,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  busy: PropTypes.bool,
};

// Shown on management pages when the visitor is not allowed to make changes.
export function ReadOnlyNotice({ isLoggedIn, who = 'an Administrator' }) {
  return (
    <Alert icon={<LockOutlined fontSize="inherit" />} severity="info" sx={{ mb: 3 }}>
      {isLoggedIn ? (
        <>You can browse this page, but only {who} can make changes.</>
      ) : (
        <>
          You are viewing a read-only demo.{' '}
          <RouterLink to="/auth/login">Log in</RouterLink> with the demo admin account to add, edit or delete.
        </>
      )}
    </Alert>
  );
}
ReadOnlyNotice.propTypes = { isLoggedIn: PropTypes.bool, who: PropTypes.string };

export const PageHeader = ({ title, subtitle }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h5" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 720 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);
PageHeader.propTypes = { title: PropTypes.string, subtitle: PropTypes.string };

export const ROLE_OPTIONS = ['Administrator', 'Manager', 'Editor', 'Support', 'Subscriber'];
export const PLAN_OPTIONS = ['Basic', 'Company', 'Enterprise', 'Team'];
export const STATUS_OPTIONS = ['active', 'pending', 'inactive'];
export const COUNTRY_OPTIONS = ['USA', 'Canada', 'Brazil', 'Germany', 'India', 'Japan', 'France', 'UK', 'Australia', 'China'];
export const BILLING_OPTIONS = ['Auto Debit', 'Manual - Cash', 'Manual - Paypal', 'Manual - Credit Card'];
