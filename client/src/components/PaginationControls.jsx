import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const PaginationControls = ({
  count,         // 总条目数量
  page,          // 当前页码（从 0 开始）
  rowsPerPage,   // 每页条数
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const start = page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, count);

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Rows per page:
      </Typography>
      <TextField
        select
        size="small"
        value={rowsPerPage}
        onChange={(e) => {
          onRowsPerPageChange(parseInt(e.target.value, 10));
        }}
        sx={{ width: 70 }}
      >
        {[10, 25, 50].map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>

      <Typography variant="body2" color="textSecondary">
        {`${start}–${end} of ${count}`}
      </Typography>

      <IconButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default PaginationControls;
