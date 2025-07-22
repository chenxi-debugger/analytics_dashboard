import React from 'react';
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';

const Sales2Card = () => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        flexGrow: 1,
        height:'200px',
      }}
    >
      {/* Title */}
      <Typography variant="h5" fontWeight={700} color="text.secondary">
        Sales
      </Typography>

      {/* Value */}
      <Typography variant="h5" fontWeight={700}>
        482k
      </Typography>

      {/* +34% 标签 */}
      <Box
        sx={{
          bgcolor: '#E0F2FE',
          color: '#0288D1',
          px: 2.5,
          py: 0.5,
          display: 'inline-block',
          fontSize: '14px',
          fontWeight: 600,
          borderRadius: '8px',
          width: 'fit-content',
        }}
      >
        +34%
      </Box>

      {/* Sales Target */}
      <Typography
        variant="body2"
        fontWeight={600}
        color="text.secondary"
        mt={0}
      >
        Sales Target
      </Typography>

      {/* 进度条 + 百分比 */}
      <Box display="flex" alignItems="center" gap={1}>
        <LinearProgress
          variant="determinate"
          value={78}
          sx={{
            flex: 1,
            height: 10,
            borderRadius: 5,
            bgcolor: '#E5E7EB',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#03A9F4',
              borderRadius: 5,
            },
          }}
        />
        <Typography variant="body1" fontWeight={600}>78%</Typography>
      </Box>
    </Paper>
  );
};

export default Sales2Card;
