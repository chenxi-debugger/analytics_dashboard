import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
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
import { Close, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';
import { ConfirmDialog, PageHeader, ReadOnlyNotice } from '../../components/common';

const ROLE_CHIP_COLOR = { Administrator: 'primary', Manager: 'warning', Editor: 'info', Support: 'success', Subscriber: 'error' };

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString(undefined, { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });

function PermissionDialog({ open, item, roleNames, onClose, onSaved }) {
  const [name, setName] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [isCore, setIsCore] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError('');
    setName(item ? item.name : '');
    setAssignedTo(item ? item.assignedTo : []);
    setIsCore(item ? item.isCore : false);
  }, [open, item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const body = { name, assignedTo, isCore };
      const saved = item
        ? await apiFetch(`/api/permissions/${item.id}`, { method: 'PUT', body })
        : await apiFetch('/api/permissions', { method: 'POST', body });
      onSaved(saved, Boolean(item));
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="h5" component="span" sx={{ fontWeight: 600, display: 'block' }}>
          {item ? 'Edit Permission' : 'Add New Permission'}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="span">
          {item ? 'Edit the permission and the roles it is assigned to.' : 'Permissions you may use and assign to your roles.'}
        </Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 3, sm: 6 }, pb: 4 }}>
        {item && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Warning: by editing the permission name you might break the system’s permission functionality.
          </Alert>
        )}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.5, mt: 1 }}>
          <TextField label="Permission Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField
            select
            label="Assigned To"
            SelectProps={{ multiple: true, renderValue: (v) => v.join(', ') }}
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            {roleNames.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </TextField>
          <FormControlLabel control={<Checkbox checked={isCore} onChange={(e) => setIsCore(e.target.checked)} />} label="Set as core permission (cannot be deleted)" />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button type="submit" variant="contained" disabled={busy || !name.trim()}>
              {item ? 'Update' : 'Create Permission'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
PermissionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  item: PropTypes.object,
  roleNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

const PermissionsPage = () => {
  const { isAdmin, isLoggedIn } = useAuth();
  const [items, setItems] = useState([]);
  const [roleNames, setRoleNames] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState({ open: false, item: null });
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [perms, roles] = await Promise.all([apiFetch('/api/permissions'), apiFetch('/api/roles')]);
      setItems(perms.items);
      setRoleNames(roles.items.map((r) => r.name));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const pageRows = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDelete = async () => {
    setBusy(true);
    try {
      await apiFetch(`/api/permissions/${toDelete.id}`, { method: 'DELETE' });
      setToast(`“${toDelete.name}” deleted`);
      load();
    } catch (err) {
      setToast(err.message);
    } finally {
      setBusy(false);
      setToDelete(null);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Permissions List"
        subtitle="Each permission is assigned to one or more roles. Users get a permission through their role."
      />
      {!isAdmin && <ReadOnlyNotice isLoggedIn={isLoggedIn} />}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Card>
        <Box sx={{ p: 2.5, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-end' }}>
          <TextField size="small" placeholder="Search Permission" value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} />
          <Button variant="contained" onClick={() => setDialog({ open: true, item: null })} disabled={!isAdmin}>
            Add Permission
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                {['Name', 'Assigned To', 'Created Date', 'Actions'].map((h) => (
                  <TableCell key={h} sx={{ textTransform: 'uppercase', fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 6 }}><CircularProgress size={28} /></TableCell></TableRow>
              ) : pageRows.length === 0 ? (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 6, color: 'text.secondary' }}>No permissions found.</TableCell></TableRow>
              ) : (
                pageRows.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {p.name}
                      {p.isCore && <Chip label="Core" size="small" sx={{ ml: 1, borderRadius: 1 }} />}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {p.assignedTo.map((r) => (
                          <Chip key={r} label={r} size="small" variant="outlined" color={ROLE_CHIP_COLOR[r] || 'default'}
                            sx={{ borderRadius: 1, textTransform: 'uppercase', fontSize: 11 }} />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{formatDateTime(p.createdAt)}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <span>
                          <IconButton size="small" onClick={() => setDialog({ open: true, item: p })} disabled={!isAdmin}>
                            <EditOutlined fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title={p.isCore ? 'Core permissions cannot be deleted' : 'Delete'}>
                        <span>
                          <IconButton size="small" color="error" onClick={() => setToDelete(p)} disabled={!isAdmin || p.isCore}>
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
          count={filtered.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[10, 25]}
        />
      </Card>

      <PermissionDialog
        open={dialog.open}
        item={dialog.item}
        roleNames={roleNames}
        onClose={() => setDialog({ open: false, item: null })}
        onSaved={(saved, isEdit) => { setToast(`“${saved.name}” ${isEdit ? 'updated' : 'created'}`); load(); }}
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete permission?"
        message={toDelete ? `Delete “${toDelete.name}”?` : ''}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
        busy={busy}
      />
      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Box>
  );
};

export default PermissionsPage;
