import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from '@mui/material';
import getInvoicePreviewStyle from '../styles/invoicePreviewStyle';

const InvoicePreview = () => {
  return (
    <Grid container spacing={4} sx={getInvoicePreviewStyle('page')}>
      {/* LEFT SIDE */}
      <Grid item xs={12} md={8}>
        <Box sx={getInvoicePreviewStyle('paper')}>
          <Box sx={getInvoicePreviewStyle('header')}>
            <Box>
              <Typography sx={getInvoicePreviewStyle('logo')}>🧾 sneat</Typography>
              <Typography sx={getInvoicePreviewStyle('address')}>
                Office 149, 450 South Brand Brooklyn<br />
                San Diego County, CA 91905, USA<br />
                +1 (123) 456 7891, +44 (876) 543 2198
              </Typography>
            </Box>

            <Box sx={getInvoicePreviewStyle('invoiceInfo')}>
              <Typography variant="h6" fontWeight={600}>Invoice <span>#4987</span></Typography>
              <Typography>Date Issued: <strong>13 Aug 2025</strong></Typography>
              <Typography>Date Due: <strong>23 Aug 2025</strong></Typography>
            </Box>
          </Box>

          <Box sx={getInvoicePreviewStyle('billSection')}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>Invoice To:</Typography>
              <Typography>Jordan Stevenson</Typography>
              <Typography>Hall-Robbins PLC</Typography>
              <Typography>7777 Mendez Plains</Typography>
              <Typography>(616) 865-4180</Typography>
              <Typography>don85@johnson.com</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={600}>Bill To:</Typography>
              <Typography>Total Due: <strong>$12,110.55</strong></Typography>
              <Typography>Bank name: American Bank</Typography>
              <Typography>Country: United States</Typography>
              <Typography>IBAN: ETD95476213874685</Typography>
              <Typography>SWIFT code: BR91905</Typography>
            </Box>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Premium Branding Package</TableCell>
                <TableCell>Branding & Promotion</TableCell>
                <TableCell>48</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$32</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Social Media</TableCell>
                <TableCell>Social media templates</TableCell>
                <TableCell>42</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$28</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Web Design</TableCell>
                <TableCell>Web designing package</TableCell>
                <TableCell>46</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$24</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SEO</TableCell>
                <TableCell>Search engine optimization</TableCell>
                <TableCell>40</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$22</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box sx={getInvoicePreviewStyle('footer')}>
            <Box>
              <Typography>
                <strong>Salesperson:</strong> Tommy Shelby
              </Typography>
              <Typography>Thanks for your business</Typography>
            </Box>

            <Box>
              <Typography>Subtotal: <strong>$154.25</strong></Typography>
              <Typography>Discount: <strong>$00.00</strong></Typography>
              <Typography>Tax: <strong>$50.00</strong></Typography>
              <Typography>Total: <strong>$204.25</strong></Typography>
            </Box>
          </Box>

          <Typography sx={getInvoicePreviewStyle('note')}>
            <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!
          </Typography>
        </Box>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid item xs={12} md={4}>
        <Box sx={getInvoicePreviewStyle('actionPanel')}>
          <Button variant="contained" fullWidth sx={getInvoicePreviewStyle('primaryButton')}>
            🚀 SEND INVOICE
          </Button>
          <Button variant="outlined" fullWidth>DOWNLOAD</Button>
          <Button variant="outlined" fullWidth>PRINT</Button>
          <Button variant="outlined" fullWidth>EDIT INVOICE</Button>
          <Button variant="contained" fullWidth sx={getInvoicePreviewStyle('paymentButton')}>
            💵 ADD PAYMENT
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default InvoicePreview;
