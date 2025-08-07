import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import getInvoiceEditStyle from '../styles/invoiceEditStyle'

const defaultItem = () => ({
  id: Date.now(),
  service: 'App Design',
  desc: '',
  cost: 24,
  hours: 1,
});

const InvoiceItemEditor = ({ onItemsChange }) => {
  const [items, setItems] = useState([defaultItem()]);

  const handleAddItem = () => {
    const updated = [...items, defaultItem()];
    setItems(updated);
    onItemsChange?.(updated);
  };

  const handleChange = (id, field, value) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updated);
    onItemsChange?.(updated);
  };

  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    onItemsChange?.(updated);
  };

  return (
    <Box>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 1,
            border: '1px solid #e0e0e0',
            bgcolor: '#f9f9f9',
          }}
        >
          <Grid container spacing={2} alignItems="flex-start">
            {/* Item Column */}
            <Grid size={{ xs: 11, md: 11, lg: 5 }}>
              <Typography fontWeight={600} fontSize="0.875rem" mb={0.5}>
                Item
              </Typography>
              <Select
                size="small"
                fullWidth
                value={item.service}
                onChange={(e) => handleChange(item.id, 'service', e.target.value)}
              >
                <MenuItem value="App Design">App Design</MenuItem>
                <MenuItem value="App Customization">App Customization</MenuItem>
                <MenuItem value="ABC Template">ABC Template</MenuItem>
                <MenuItem value="App Development">App Development</MenuItem>
              </Select>
              <TextField
                size="small"
                fullWidth
                multiline
                rows={2}
                placeholder="Customization & Bug Fixes"
                value={item.desc}
                onChange={(e) => handleChange(item.id, 'desc', e.target.value)}
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* Cost Column */}
            <Grid size={{ xs: 11, md: 11, lg: 2 }}>
              <Typography fontWeight={600} fontSize="0.875rem" mb={0.5}>
                Cost
              </Typography>
              <TextField
                type="number"
                fullWidth
                size="small"
                value={item.cost}
                onChange={(e) => handleChange(item.id, 'cost', e.target.value)}
              />
              <Typography fontSize="0.75rem" mt={1}>
                Discount: 0% 0% 0%
              </Typography>
            </Grid>

            {/* Hours Column */}
            <Grid size={{ xs: 11, md: 11, lg: 2 }}>
              <Typography fontWeight={600} fontSize="0.875rem" mb={0.5}>
                Hours
              </Typography>
              <TextField
                type="number"
                fullWidth
                size="small"
                value={item.hours}
                onChange={(e) => handleChange(item.id, 'hours', e.target.value)}
              />
            </Grid>

            {/* Price Column */}
            <Grid size={{ xs: 11, md: 11, lg: 2 }}>
              <Typography fontWeight={600} fontSize="0.875rem" mb={0.5}>
                Price
              </Typography>
              <Typography mt={1.5}>
                ${parseFloat(item.cost * item.hours).toFixed(2)}
              </Typography>
            </Grid>

            {/* Delete */}
            <Grid size={{ xs: 1, md: 1, lg: 1 }}>
              <Typography fontWeight={600} fontSize="0.875rem" mb={0.5}>
                &nbsp;
              </Typography>
              <IconButton onClick={() => handleDelete(item.id)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

      {/* Add Item */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleAddItem}
        sx={getInvoiceEditStyle('primaryButton')}
        
      >
        Add Item
      </Button>
    </Box>
  );
};

export default InvoiceItemEditor;
