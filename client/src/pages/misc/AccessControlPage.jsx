import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { CheckCircle, Cancel, Lock, LockOpen } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { PageHeader, RoleLabel, UserAvatar } from '../../components/common';

// What each role may do on the API. This mirrors requireRole(...) in the Express routes —
// the server is the real gatekeeper; the UI only hides buttons to be friendly.
const SERVER_RULES = [
  { action: 'View users, roles & permissions', roles: ['Administrator', 'Manager', 'Editor', 'Support', 'Subscriber'] },
  { action: 'Create / edit / delete users', roles: ['Administrator', 'Manager'] },
  { action: 'Create another Administrator', roles: ['Administrator'] },
  { action: 'Create / edit / delete roles', roles: ['Administrator'] },
  { action: 'Create / edit / delete permissions', roles: ['Administrator'] },
  { action: 'Edit own profile & notification settings', roles: ['Administrator', 'Manager', 'Editor', 'Support', 'Subscriber'] },
];
const ROLES = ['Administrator', 'Manager', 'Editor', 'Support', 'Subscriber'];

const Yes = () => <CheckCircle color="success" fontSize="small" titleAccess="allowed" />;
const No = () => <Cancel color="disabled" fontSize="small" titleAccess="not allowed" />;

// <Can> renders its children only when the check passes — a tiny RBAC helper.
function Can({ allowed, children, fallback = null }) {
  return allowed ? children : fallback;
}
Can.propTypes = { allowed: PropTypes.bool, children: PropTypes.node, fallback: PropTypes.node };

// A button that is disabled (with a reason) when the user lacks the right.
function GuardedButton({ allowed, label, to, reason }) {
  const btn = (
    <span>
      <Button
        variant={allowed ? 'contained' : 'outlined'}
        startIcon={allowed ? <LockOpen /> : <Lock />}
        disabled={!allowed}
        component={allowed && to ? RouterLink : 'button'}
        to={allowed ? to : undefined}
        fullWidth
      >
        {label}
      </Button>
    </span>
  );
  return allowed ? btn : <Tooltip title={reason}>{btn}</Tooltip>;
}
GuardedButton.propTypes = { allowed: PropTypes.bool, label: PropTypes.string, to: PropTypes.string, reason: PropTypes.string };

const AccessControlPage = () => {
  const { user, permissions, isAdmin, canManageUsers } = useAuth();
  const role = user ? user.role : 'Subscriber';

  return (
    <Box>
      <PageHeader
        title="Access Control"
        subtitle="Role-based access control (RBAC) in this app: what your role can see and do, and how the UI and API enforce it."
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>You are signed in as</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <UserAvatar name={user?.fullName} color={user?.avatarColor} size={52} />
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{user?.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                </Box>
              </Box>
              <RoleLabel role={role} />
              <Alert severity="info" sx={{ mt: 2 }}>
                Want to see a different view? Register a new account (it gets the Subscriber role) or have an
                Administrator change your role on the Users page.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Try it</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                These buttons are enabled or locked based on your role. Even if someone re-enabled them in DevTools,
                the API would answer 403 Forbidden.
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <GuardedButton allowed label="View user list" to="/apps/user/list" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <GuardedButton allowed={canManageUsers} label="Add / edit users" to="/apps/user/list" reason="Needs Administrator or Manager" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <GuardedButton allowed={isAdmin} label="Edit roles" to="/apps/roles" reason="Needs Administrator" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <GuardedButton allowed={isAdmin} label="Manage permissions" to="/apps/permissions" reason="Needs Administrator" />
                </Grid>
              </Grid>
              <Can
                allowed={isAdmin}
                fallback={<Alert severity="warning" sx={{ mt: 2 }}>This admin-only note is hidden from your role.</Alert>}
              >
                <Alert severity="success" sx={{ mt: 2 }}>Admin-only content: you can see this because you are an Administrator.</Alert>
              </Can>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Your module permissions</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Loaded from your role ({role}) when you signed in — edit them on the Roles page.
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Module</TableCell>
                      <TableCell align="center">Read</TableCell>
                      <TableCell align="center">Write</TableCell>
                      <TableCell align="center">Create</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permissions.length === 0 && (
                      <TableRow><TableCell colSpan={4} align="center">No module permissions on this role.</TableCell></TableRow>
                    )}
                    {permissions.map((m) => (
                      <TableRow key={m.module} hover>
                        <TableCell>{m.module}</TableCell>
                        <TableCell align="center">{m.read ? <Yes /> : <No />}</TableCell>
                        <TableCell align="center">{m.write ? <Yes /> : <No />}</TableCell>
                        <TableCell align="center">{m.create ? <Yes /> : <No />}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">What the API allows per role</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enforced by the requireAuth + requireRole middleware on the server. Your column is highlighted.
              </Typography>
              <TableContainer>
                <Table size="small" sx={{ minWidth: 560 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      {ROLES.map((r) => (
                        <TableCell key={r} align="center" sx={{ fontSize: 12, fontWeight: r === role ? 700 : 500, color: r === role ? 'primary.main' : undefined }}>
                          {r === 'Administrator' ? 'Admin' : r}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {SERVER_RULES.map((rule) => (
                      <TableRow key={rule.action} hover>
                        <TableCell>{rule.action}</TableCell>
                        {ROLES.map((r) => (
                          <TableCell key={r} align="center" sx={{ bgcolor: r === role ? 'action.hover' : undefined }}>
                            {rule.roles.includes(r) ? <Yes /> : <No />}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccessControlPage;
