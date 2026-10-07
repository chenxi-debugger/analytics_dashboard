import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { KeyboardArrowDown, KeyboardArrowUp, Search } from '@mui/icons-material';
import { apiFetch } from '../../api/client';
import { PageHeader, RoleLabel, StatusChip, UserAvatar } from '../../components/common';

const COLUMNS = [
  { id: 'fullName', label: 'User' },
  { id: 'role', label: 'Role' },
  { id: 'plan', label: 'Plan' },
  { id: 'country', label: 'Country' },
  { id: 'status', label: 'Status' },
];

// Generic comparator so any column can be sorted.
const compare = (a, b, key) => String(a[key] ?? '').localeCompare(String(b[key] ?? ''), undefined, { numeric: true });

// Sorting, selection, search and pagination all done on the client with plain MUI Table.
// (Compare with the DataGrid page, where the grid does this for us.)
const BasicTablePage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderBy, setOrderBy] = useState('fullName');
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    apiFetch('/api/users?limit=100')
      .then((data) => setRows(data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? rows.filter((r) => `${r.fullName} ${r.email} ${r.role}`.toLowerCase().includes(q)) : rows;
    return [...list].sort((a, b) => (order === 'asc' ? 1 : -1) * compare(a, b, orderBy));
  }, [rows, query, order, orderBy]);

  const visible = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const pageIds = visible.map((r) => r.id);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.includes(id));
  const someOnPageSelected = pageIds.some((id) => selected.includes(id));

  const sortBy = (id) => {
    setOrder(orderBy === id && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(id);
  };
  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const togglePage = () =>
    setSelected((s) => (allOnPageSelected ? s.filter((id) => !pageIds.includes(id)) : [...new Set([...s, ...pageIds])]));

  return (
    <Box>
      <PageHeader title="Table" subtitle="A plain MUI Table with sorting, selection, search, expandable rows and pagination — data comes from /api/users." />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Card>
        <Toolbar
          sx={{
            gap: 2,
            flexWrap: 'wrap',
            py: 1,
            ...(selected.length > 0 && { bgcolor: (t) => alpha(t.palette.primary.main, 0.08) }),
          }}
        >
          <Typography sx={{ flexGrow: 1 }} variant={selected.length ? 'subtitle1' : 'h6'} color={selected.length ? 'primary' : 'inherit'}>
            {selected.length ? `${selected.length} selected` : 'Users'}
          </Typography>
          <TextField
            size="small"
            placeholder="Search name, email, role"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }}
          />
        </Toolbar>
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 760 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={someOnPageSelected && !allOnPageSelected}
                    checked={allOnPageSelected}
                    onChange={togglePage}
                    inputProps={{ 'aria-label': 'select all on this page' }}
                  />
                </TableCell>
                <TableCell padding="checkbox" />
                {COLUMNS.map((c) => (
                  <TableCell key={c.id} sortDirection={orderBy === c.id ? order : false}>
                    <TableSortLabel active={orderBy === c.id} direction={orderBy === c.id ? order : 'asc'} onClick={() => sortBy(c.id)}>
                      {c.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && [...Array(5)].map((_, i) => (
                <TableRow key={i}><TableCell colSpan={COLUMNS.length + 2}><Skeleton /></TableCell></TableRow>
              ))}
              {!loading && visible.length === 0 && (
                <TableRow><TableCell colSpan={COLUMNS.length + 2} align="center">No users match “{query}”.</TableCell></TableRow>
              )}
              {visible.map((r) => {
                const isSelected = selected.includes(r.id);
                const open = expanded === r.id;
                return (
                  <React.Fragment key={r.id}>
                    <TableRow hover selected={isSelected} sx={{ '& > td': { borderBottom: open ? 'none' : undefined } }}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} onChange={() => toggle(r.id)} inputProps={{ 'aria-label': `select ${r.fullName}` }} />
                      </TableCell>
                      <TableCell padding="checkbox">
                        <IconButton size="small" onClick={() => setExpanded(open ? null : r.id)} aria-label="expand row">
                          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <UserAvatar name={r.fullName} color={r.avatarColor} size={dense ? 28 : 34} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{r.fullName}</Typography>
                            <Typography variant="caption" color="text.secondary">{r.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell><RoleLabel role={r.role} /></TableCell>
                      <TableCell>{r.plan}</TableCell>
                      <TableCell>{r.country}</TableCell>
                      <TableCell><StatusChip status={r.status} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={COLUMNS.length + 2} sx={{ py: 0 }}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ py: 2, pl: 13, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {[['Username', `@${r.username}`], ['Company', r.company], ['Contact', r.contact], ['Billing', r.billing], ['Language', r.language],
                              ['Joined', r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—']].map(([k, v]) => (
                              <Box key={k}>
                                <Typography variant="caption" color="text.secondary">{k}</Typography>
                                <Typography variant="body2">{v || '—'}</Typography>
                              </Box>
                            ))}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', py: '0 !important' }}>
          <FormControlLabel control={<Switch checked={dense} onChange={(e) => setDense(e.target.checked)} />} label="Dense padding" />
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default BasicTablePage;
