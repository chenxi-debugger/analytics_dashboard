import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ContentCopyOutlined, DeleteOutline, GroupAddOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { ConfirmDialog, PageHeader, ReadOnlyNotice, UserAvatar } from '../../components/common';
import RoleDialog from './RoleDialog';

const RolesPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn } = useAuth();

  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [members, setMembers] = useState({}); // role name -> a few users for the avatar stack
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState({ open: false, role: null });
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/api/roles');
      setRoles(data.items);
      setModules(data.modules);
      // Load up to 4 users per role for the avatar stacks.
      const entries = await Promise.all(
        data.items.map(async (r) => {
          const res = await apiFetch(`/api/users?role=${encodeURIComponent(r.name)}&limit=4`);
          return [r.name, res.items];
        })
      );
      setMembers(Object.fromEntries(entries));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async () => {
    setBusy(true);
    try {
      await apiFetch(`/api/roles/${toDelete.id}`, { method: 'DELETE' });
      setToast(`Role “${toDelete.name}” deleted`);
      load();
    } catch (err) {
      setToast(err.message);
    } finally {
      setBusy(false);
      setToDelete(null);
    }
  };

  // "Duplicate" opens the add dialog pre-filled with an existing role's permissions.
  const duplicate = (role) => setDialog({ open: true, role: { ...role, id: undefined, name: `${role.name} Copy`, duplicate: true } });

  if (loading) return <Box sx={{ display: 'grid', placeItems: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <PageHeader
        title="Roles List"
        subtitle="A role provides access to predefined menus and features so that, depending on the assigned role, a user can access what they need."
      />
      {!isAdmin && <ReadOnlyNotice isLoggedIn={isLoggedIn} />}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid key={role.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total {role.userCount} user{role.userCount === 1 ? '' : 's'}
                  </Typography>
                  <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 12 } }}>
                    {(members[role.name] || []).map((u) => (
                      <Tooltip key={u.id} title={u.fullName}>
                        <span><UserAvatar name={u.fullName} color={u.avatarColor} size={32} /></span>
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </Box>
                <Typography variant="h6">{role.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
                  {role.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Link component="button" variant="body2" onClick={() => setDialog({ open: true, role })}>
                    {isAdmin ? 'Edit Role' : 'View Permissions'}
                  </Link>
                  <Box>
                    <Tooltip title="Show users with this role">
                      <IconButton size="small" onClick={() => navigate('/apps/user/list')}>
                        <GroupAddOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Duplicate">
                      <span>
                        <IconButton size="small" onClick={() => duplicate(role)} disabled={!isAdmin}>
                          <ContentCopyOutlined fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title={role.isSystem ? 'Built-in roles cannot be deleted' : 'Delete'}>
                      <span>
                        <IconButton size="small" color="error" onClick={() => setToDelete(role)} disabled={!isAdmin || role.isSystem}>
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* "Add role" card */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card sx={{ height: '100%', bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', textAlign: 'right' }}>
              <Button variant="contained" onClick={() => setDialog({ open: true, role: null })} disabled={!isAdmin} sx={{ mb: 1 }}>
                Add Role
              </Button>
              <Typography variant="body2" color="text.secondary">Add a role, if it doesn’t exist.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <RoleDialog
        open={dialog.open}
        role={dialog.role}
        modules={modules}
        readOnly={!isAdmin}
        onClose={() => setDialog({ open: false, role: null })}
        onSaved={(saved, isEdit) => {
          setToast(`Role “${saved.name}” ${isEdit ? 'updated' : 'created'}`);
          load();
        }}
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete role?"
        message={toDelete ? `Delete the “${toDelete.name}” role? This only works when no user has it.` : ''}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
        busy={busy}
      />
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Box>
  );
};

export default RolesPage;
