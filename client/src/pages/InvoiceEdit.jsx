import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  Switch,
  FormControlLabel,
  IconButton,
  Divider,
} from '@mui/material';
import { Add, Delete, Send } from '@mui/icons-material';
import getInvoiceEditStyle from '../styles/invoiceEditStyle';
import InvoiceItemEditor from '../components/InvoiceItemEditor';

const InvoiceEdit = () => {
  return (
    <Grid container spacing={4} sx={getInvoiceEditStyle('page')}>
      {/* LEFT SIDE */}
      <Grid size={{ xs: 12, md: 12, lg: 8 }}>
        <Box sx={getInvoiceEditStyle('paper')}>
          {/* Header */}
          <Box sx={getInvoiceEditStyle('header')}>
            <Box>
              <Typography sx={getInvoiceEditStyle('logo')}>🧾 sneat</Typography>
              <Typography sx={getInvoiceEditStyle('address')}>
                Office 149, 450 South Brand Brooklyn<br />
                San Diego County, CA 91905, USA<br />
                +1 (123) 456 7891, +44 (876) 543 2198
              </Typography>
            </Box>

            <Box sx={getInvoiceEditStyle('invoiceForm')}>
              <Typography fontWeight={600}>Invoice</Typography>
              <TextField size="small" defaultValue="#4987" />
              <TextField size="small" label="Date Issued" type="date" defaultValue="2025-08-13" InputLabelProps={{ shrink: true }} />
              <TextField size="small" label="Date Due" type="date" defaultValue="2025-08-23" InputLabelProps={{ shrink: true }} />
            </Box>
          </Box>

          {/* Billing Info */}
          <Box sx={getInvoiceEditStyle('billing')}>
            <Box>
              <Typography fontWeight={600} mb={1}>Invoice To:</Typography>
              <Select size="small" defaultValue="Jordan Stevenson" fullWidth>
                <MenuItem value="Jordan Stevenson">Jordan Stevenson</MenuItem>
                <MenuItem value="Christina Collier">Christina Collier</MenuItem>
              </Select>
              <Typography mt={1}>Hall-Robbins PLC</Typography>
              <Typography>7777 Mendez Plains</Typography>
              <Typography>(616) 865-4180</Typography>
              <Typography>don85@johnson.com</Typography>
            </Box>

            <Box>
              <Typography fontWeight={600} mb={1}>Bill To:</Typography>
              <Typography>Total Due: <strong>$12,110.55</strong></Typography>
              <Typography>Bank name: American Bank</Typography>
              <Typography>Country: United States</Typography>
              <Typography>IBAN: ETD95476213874685</Typography>
              <Typography>SWIFT code: BR91905</Typography>
            </Box>
          </Box>

          {/* Editable Items */}
          <InvoiceItemEditor onItemsChange={(updatedItems) => console.log(updatedItems)} />

          {/* Summary */}
          <Box sx={getInvoiceEditStyle('summaryBox')}>
            <TextField
              size="small"
              label="Salesperson"
              defaultValue="Tommy Shelby"
              sx={{ maxWidth: 250 }}
            />
            <TextField
            size="small"
            rows={2}
            placeholder="Thanks for your business"
            sx={{ mt: 1, minWidth: 220 }}
            />
            

            <Box>
              <Typography>Subtotal: <strong>$5000.25</strong></Typography>
              <Typography>Discount: <strong>$00.00</strong></Typography>
              <Typography>Tax: <strong>$100.00</strong></Typography>
              <Typography>Total: <strong>$5100.25</strong></Typography>
            </Box>
          </Box>

          {/* Note */}
          <Box mt={2}>
            <Typography variant="subtitle2" fontWeight={600}>Note:</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              defaultValue="It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!"
            />
          </Box>
        </Box>
      </Grid>

      {/* RIGHT PANEL */}
      <Grid size={{ xs: 12, md: 12, lg: 4 }}>
        <Box sx={getInvoiceEditStyle('actionPanel')}>
          <Button variant="contained" fullWidth startIcon={<Send />} sx={getInvoiceEditStyle('primaryButton')}>SEND INVOICE</Button>
          <Button variant="outlined" fullWidth>PREVIEW</Button>
          <Button variant="outlined" fullWidth>SAVE</Button>
          <Button variant="contained" fullWidth sx={getInvoiceEditStyle('greenButton')}>$ ADD PAYMENT</Button>

          <Divider sx={{ my: 2 }} />

          <TextField
            select
            size="small"
            fullWidth
            label="Accept payments via"
            defaultValue="Internet Banking"
            InputLabelProps={{ shrink: true }}
            >
            <MenuItem value="Internet Banking">Internet Banking</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Paypal">Paypal</MenuItem>
            <MenuItem value="UPI Transfer">UPI Transfer</MenuItem>
          </TextField>


          <FormControlLabel control={<Switch defaultChecked />} label="Payment Terms" />
          <FormControlLabel control={<Switch />} label="Client Notes" />
          <FormControlLabel control={<Switch />} label="Payment Stub" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default InvoiceEdit;
