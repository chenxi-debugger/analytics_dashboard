import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Button,
  IconButton,
  TextField,
  MenuItem,
} from '@mui/material';
import { Delete, Visibility, MoreVert } from '@mui/icons-material';
import PaginationControls from '../components/PaginationControls';
import getInvoiceListStyle from '../styles/invoiceListStyle';

const InvoiceList = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user-account`, {
          mode: 'cors',
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const isAllSelected = paginatedData.every((invoice) =>
    selectedIds.includes(invoice.id)
  );

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedData.some((item) => item.id === id))
      );
    } else {
      const newIds = paginatedData.map((invoice) => invoice.id);
      setSelectedIds((prev) => [...new Set([...prev, ...newIds])]);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <Box sx={getInvoiceListStyle('center')}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={getInvoiceListStyle('center')}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={getInvoiceListStyle('root', theme)}>
      {/* Filters */}
      <Box sx={getInvoiceListStyle('filters')}>
        <TextField label="Invoice Status" select fullWidth>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Unpaid">Unpaid</MenuItem>
        </TextField>
        <TextField
          label="Invoice Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Action Row */}
      <Box sx={getInvoiceListStyle('actionRow')}>
        <Button variant="outlined" disabled={!selectedIds.length}>
          {selectedIds.length ? `Delete (${selectedIds.length})` : 'Actions'}
        </Button>
        <TextField placeholder="Search Invoice" size="small" />
        <Button variant="contained">Create Invoice</Button>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox checked={isAllSelected} onChange={toggleSelectAll} />
            </TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Issued Date</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((invoice) => (
            <TableRow
              key={invoice.id}
              hover
              selected={selectedIds.includes(invoice.id)}
              sx={getInvoiceListStyle('row', theme, selectedIds.includes(invoice.id))}
              onClick={() => toggleSelectOne(invoice.id)}
            >
              <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.includes(invoice.id)}
                  onChange={() => toggleSelectOne(invoice.id)}
                />
              </TableCell>
              <TableCell sx={getInvoiceListStyle('invoiceId')}>
                #{invoice.id}
              </TableCell>
              <TableCell>
                <Box sx={getInvoiceListStyle('client')}>
                  <Avatar
                    src={invoice.avatar}
                    sx={getInvoiceListStyle('avatar', theme, invoice.avatarColor)}
                  />
                  <Box ml={1}>
                    <Typography fontWeight={500}>{invoice.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {invoice.companyEmail}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>${invoice.total}</TableCell>
              <TableCell>{invoice.issuedDate}</TableCell>
              <TableCell>
                <Box sx={getInvoiceListStyle('statusBox', invoice.balance)}>
                  {invoice.balance}
                </Box>
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <IconButton>
                  <Delete />
                </IconButton>
                <IconButton>
                  <Visibility />
                </IconButton>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <PaginationControls
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => setPage(newPage)}
        onRowsPerPageChange={(newRows) => {
          setRowsPerPage(newRows);
          setPage(0);
        }}
      />
    </Box>
  );
};

export default InvoiceList;
