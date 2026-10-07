import React from 'react';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { PageHeader } from '../../components/common';

const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const TEXT = ['subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'];
const SAMPLE = 'The quick brown fox jumps over the lazy dog';

// Shows every Material UI text style so you can see the type scale of the theme.
const TypographyPage = () => (
  <Box>
    <PageHeader title="Typography" subtitle="All text styles used across the dashboard, taken from the Material UI theme." />
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Headings</Typography>
            {HEADINGS.map((v) => (
              <Box key={v} sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">{v.toUpperCase()}</Typography>
                <Typography variant={v} noWrap>Heading</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Text Elements</Typography>
            {TEXT.map((v) => (
              <Box key={v} sx={{ mb: 1.5 }}>
                <Typography variant="caption" color="text.secondary">{v}</Typography>
                <Typography variant={v} display="block">{SAMPLE}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Colors & Weights</Typography>
            {['primary', 'secondary', 'success', 'error', 'warning', 'info'].map((c) => (
              <Typography key={c} color={`${c}.main`} sx={{ mb: 0.5 }}>{c} — {SAMPLE}</Typography>
            ))}
            <Divider sx={{ my: 2 }} />
            {[300, 400, 500, 600, 700].map((w) => (
              <Typography key={w} sx={{ fontWeight: w, mb: 0.5 }}>Font weight {w}</Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default TypographyPage;
