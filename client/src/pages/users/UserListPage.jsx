import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DeleteOutline,
  EditOutlined,
  FileUploadOutlined,
  GroupOutlined,
  PersonAddAlt1Outlined,
  PersonOutline,
  HourglassEmptyOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import {
  ConfirmDialog,
  PLAN_OPTIONS,
  ROLE_OPTIONS,
  STATUS_OPTIONS,
  ReadOnlyNotice,
  RoleLabel,
  StatCard,
  StatusChip,
  UserAvatar,
} from '../../components/common';
import UserFormDrawer from './UserFormDrawer';

// Turns the current page of users into a CSV file the browser downloads.
function exportCsv(rows) {
  const headers = ['Full Name', 'Username', 'Email', 'Role', 'Plan', 'Status', 'Billing', 'Country'];
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((u) => [u.fullName, u.username, u.email, u.role, u.plan, u.status, u.billing, u.country].map(escape).join(','));
  const blob = new Blob([[headers.join(','), ...lines].join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const UserListPage = () => {
  const navigate = useNavigate();
  const { canManageUsers, isLoggedIn } = useAuth();

  const [filters, setFilters] = useState({ role: '', plan: '', status: '' });
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  // Wait 300ms after the user stops typing before searching.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: page + 1, limit: rowsPerPage, q: debouncedSearch });
      Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
      const data = await apiFetch(`/api/users?${params.toString()}`);
      setRows(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, debouncedSearch, filters]);

  const loadStats = useCallback(() => {
    apiFetch('/api/users/stats').then(setStats).catch(() => setStats(null));
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(0);
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await apiFetch(`/api/users/${toDelete.id}`, { method: 'DELETE' });
      setToast(`${toDelete.fullName} was deleted`);
      setToDelete(null);
      loadUsers();
      loadStats();
    } catch (err) {
      setToast(err.message);
      setToDelete(null);
    } finally {
      setBusy(false);
    }
  };

  const statCards = [
    { title: 'Total Users', value: stats ? stats.total : '–', subtitle: 'All accounts', icon: GroupOutlined, color: 'primary' },
    { title: 'Active Users', value: stats ? stats.active : '–', subtitle: 'Can sign in', icon: PersonOutline, color: 'success' },
    { title: 'Pending Users', value: stats ? stats.pending : '–', subtitle: 'Awaiting activation', icon: HourglassEmptyOutlined, color: 'warning' },
    { title: 'Inactive Users', value: stats ? stats.inactive : '–', subtitle: 'Sign-in blocked', icon: PersonAddAlt1Outlined, color: 'error' },
  ];

  return (
    <Box>
      {!canManageUsers && <ReadOnlyNotice isLoggedIn={isLoggedIn} who="an Administrator or Manager" />}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statCards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Search Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField select fullWidth size="small" label="Select Role" name="role" value={filters.role} onChange={handleFilter}>
                <MenuItem value="">All roles</MenuItem>
                {ROLE_OPTIONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField select fullWidth size="small" label="Select Plan" name="plan" value={filters.plan} onChange={handleFilter}>
                <MenuItem value="">All plans</MenuItem>
                {PLAN_OPTIONS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField select fullWidth size="small" label="Select Status" name="status" value={filters.status} onChange={handleFilter}>
                <MenuItem value="">All statuses</MenuItem>
                {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>{s}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ p: 2.5, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="outlined" color="secondary" startIcon={<FileUploadOutlined />} onClick={() => exportCsv(rows)} disabled={!rows.length}>
            Export
          </Button>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Search User"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
            <Tooltip title={canManageUsers ? '' : 'Log in as Administrator or Manager to add users'}>
              <span>
                <Button variant="contained" onClick={() => setDrawerOpen(true)} disabled={!canManageUsers}>
                  Add User
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mx: 2.5, mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                {['User', 'Role', 'Plan', 'Billing', 'Status', 'Actions'].map((h) => (
                  <TableCell key={h} sx={{ textTransform: 'uppercase', fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    No users match these filters.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <UserAvatar name={u.fullName} color={u.avatarColor} />
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                            onClick={() => navigate(`/apps/user/view?id=${u.id}`)}
                          >
                            {u.fullName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {u.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <RoleLabel role={u.role} />
                    </TableCell>
                    <TableCell>{u.plan}</TableCell>
                    <TableCell>{u.billing}</TableCell>
                    <TableCell>
                      <StatusChip status={u.status} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View">
                        <IconButton size="small" onClick={() => navigate(`/apps/user/view?id=${u.id}`)}>
                          <VisibilityOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => navigate(`/apps/user/edit?id=${u.id}`)}>
                          <EditOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={u.isDemoAdmin ? 'The demo admin cannot be deleted' : 'Delete'}>
                        <span>
                          <IconButton size="small" color="error" disabled={!canManageUsers || u.isDemoAdmin} onClick={() => setToDelete(u)}>
                            <DeleteOutline fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Card>

      <UserFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSaved={(u) => {
          setToast(`${u.fullName} was added`);
          setPage(0);
          loadUsers();
          loadStats();
        }}
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete user?"
        message={toDelete ? `This will permanently delete ${toDelete.fullName} (${toDelete.email}).` : ''}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
        busy={busy}
      />
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Box>
  );
};

export default UserListPage;
