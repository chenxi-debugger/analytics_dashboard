import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { apiFetch } from '../../api/client';

const ACTIONS = ['read', 'write', 'create'];

// Add / edit a role and tick which actions it may perform on each module.
const RoleDialog = ({ open, role, modules, readOnly, onClose, onSaved }) => {
  const [name, setName] = useState('');
  const [matrix, setMatrix] = useState([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError('');
    setName(role ? role.name : '');
    setMatrix(
      modules.map((module) => {
        const found = role ? role.permissions.find((p) => p.module === module) : null;
        return { module, read: !!found?.read, write: !!found?.write, create: !!found?.create };
      })
    );
  }, [open, role, modules]);

  const allChecked = matrix.length > 0 && matrix.every((row) => ACTIONS.every((a) => row[a]));
  const isEdit = Boolean(role && role.id); // a duplicated role has no id yet → create
  const isFixed = isEdit && role.name === 'Administrator';
  const locked = readOnly || isFixed;

  const toggle = (index, action) =>
    setMatrix((m) => m.map((row, i) => (i === index ? { ...row, [action]: !row[action] } : row)));
  const toggleAll = () => setMatrix((m) => m.map((row) => ({ ...row, read: !allChecked, write: !allChecked, create: !allChecked })));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const body = { name, permissions: matrix };
      const saved = isEdit
        ? await apiFetch(`/api/roles/${role.id}`, { method: 'PUT', body })
        : await apiFetch('/api/roles', { method: 'POST', body });
      onSaved(saved, isEdit);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="body">
      <DialogTitle sx={{ textAlign: 'center', pt: 5 }}>
        <Typography variant="h5" component="span" sx={{ fontWeight: 600, display: 'block' }}>
          {isEdit ? 'Edit Role' : 'Add New Role'}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="span">
          Set role permissions
        </Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 3, sm: 8 }, pb: 5 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {isFixed && <Alert severity="info" sx={{ mb: 2 }}>The Administrator role always has full access.</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Role Name" value={name} onChange={(e) => setName(e.target.value)}
            disabled={readOnly || isFixed} sx={{ mt: 1, mb: 3 }} required />
          <Typography variant="h6" sx={{ mb: 1 }}>Role Permissions</Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, pl: 0 }}>Administrator Access</TableCell>
                <TableCell colSpan={3} align="right">
                  <FormControlLabel label="Select All" control={<Checkbox checked={allChecked} onChange={toggleAll} disabled={locked} />} />
                </TableCell>
              </TableRow>
              {matrix.map((row, i) => (
                <TableRow key={row.module}>
                  <TableCell sx={{ fontWeight: 500, pl: 0, whiteSpace: 'nowrap' }}>{row.module}</TableCell>
                  {ACTIONS.map((action) => (
                    <TableCell key={action} align="right" sx={{ pr: 0 }}>
                      <FormControlLabel
                        label={action.charAt(0).toUpperCase() + action.slice(1)}
                        control={<Checkbox size="small" checked={row[action]} onChange={() => toggle(i, action)} disabled={locked} />}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button type="submit" variant="contained" disabled={readOnly || busy || !name.trim() || isFixed}>
              {busy ? 'Saving…' : 'Submit'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

RoleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  role: PropTypes.object,
  modules: PropTypes.arrayOf(PropTypes.string).isRequired,
  readOnly: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default RoleDialog;
