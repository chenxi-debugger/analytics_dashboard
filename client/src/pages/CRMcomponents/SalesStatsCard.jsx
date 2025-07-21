import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../../styles/crmPageStyle';

const SalesStatsCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const chartOption = {
    series: [
      {
        type: 'pie',
        radius: ['75%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 75,
            name: 'Conversion Ratio',
            itemStyle: {
              color: '#63e355', // bright green
            },
          },
          {
            value: 25,
            name: 'Total requirements',
            itemStyle: {
              color: '#f0f0f0',
            },
          },
        ],
      },
    ],
  };

  return (
    <Paper
    sx={{
      ...getCrmStyle('salesStatsCard', theme),
      p: 3,
      borderRadius: '10px',
      width: '100%',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}
  >
    {/* Header at top */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '25px', color:'grey' }}>
        Sales Stats
        </Typography>
        <IconButton aria-label="More options" onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Box>


      {/* Chart and Centered Text */}
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ReactECharts
          option={chartOption}
          style={{ height: 230, width: 230 }}
        />
        <Box sx={{ position: 'absolute', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color:'grey' }}>
            75%
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Sales
          </Typography>
        </Box>
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 15, height: 15, bgcolor: '#63e355', borderRadius: '50%' }} />
          <Typography sx={{ fontWeight: 500, fontSize: '15px', color:'grey' }}>Conversion Ratio</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 15, height: 15, bgcolor: '#e0e0e0', borderRadius: '50%' }} />
          <Typography sx={{ fontWeight: 500, fontSize: '15px', color:'grey' }}>Total requirements</Typography>
        </Box>
      </Box>

      {/* Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Last 28 Days</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Last Month</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Last Year</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default SalesStatsCard;
