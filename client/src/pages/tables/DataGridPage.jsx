import React, { useEffect, useState } from 'react';
import { Alert, Box, Card, IconButton, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { VisibilityOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { PageHeader, RoleLabel, StatusChip, UserAvatar } from '../../components/common';

// Column definitions: the grid gives sorting, filtering, column hiding,
// export and pagination for free — we only describe the data.
const buildColumns = (navigate) => [
  {
    field: 'fullName',
    headerName: 'User',
    flex: 1.4,
    minWidth: 220,
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, height: '100%' }}>
        <UserAvatar name={row.fullName} color={row.avatarColor} size={30} />
        <Box sx={{ lineHeight: 1.2, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>{row.fullName}</Typography>
          <Typography variant="caption" color="text.secondary" noWrap>{row.email}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    minWidth: 150,
    type: 'singleSelect',
    valueOptions: ['Administrator', 'Manager', 'Editor', 'Support', 'Subscriber'],
    renderCell: ({ value }) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}><RoleLabel role={value} /></Box>,
  },
  { field: 'plan', headerName: 'Plan', width: 120, type: 'singleSelect', valueOptions: ['Basic', 'Team', 'Company', 'Enterprise'] },
  { field: 'country', headerName: 'Country', width: 120 },
  {
    field: 'createdAt',
    headerName: 'Joined',
    width: 130,
    type: 'date',
    valueGetter: (value) => (value ? new Date(value) : null),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    type: 'singleSelect',
    valueOptions: ['active', 'pending', 'inactive'],
    renderCell: ({ value }) => <StatusChip status={value} />,
  },
  {
    field: 'actions',
    headerName: '',
    width: 70,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => (
      <Tooltip title="View user">
        <IconButton size="small" onClick={() => navigate(`/apps/user/view?id=${row.id}`)} aria-label={`view ${row.fullName}`}>
          <VisibilityOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];

const DataGridPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selection, setSelection] = useState({ type: 'include', ids: new Set() });

  useEffect(() => {
    apiFetch('/api/users?limit=100')
      .then((data) => setRows(data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const selectedCount = selection.type === 'include' ? selection.ids.size : rows.length - selection.ids.size;

  return (
    <Box>
      <PageHeader
        title="MUI DataGrid"
        subtitle="The same users as the Table page, shown with @mui/x-data-grid: quick search, column filters, sorting, column hiding and CSV export are built in."
      />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Card>
        <Box sx={{ height: 640, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={buildColumns(navigate)}
            loading={loading}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={selection}
            onRowSelectionModelChange={setSelection}
            showToolbar
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: { sortModel: [{ field: 'createdAt', sort: 'desc' }] },
            }}
            sx={{ border: 0 }}
          />
        </Box>
      </Card>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {selectedCount} row{selectedCount === 1 ? '' : 's'} selected
      </Typography>
    </Box>
  );
};

export default DataGridPage;
