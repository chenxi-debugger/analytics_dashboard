import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import getCrmStyle from '../../styles/crmPageStyle';

const members = [
  {
    name: 'Nathan Wagner',
    title: 'iOS Developer',
    project: 'ZIPCAR',
    projectColor: '#b9a9fb',
    progress: 87,
    total: 135,
    progressColor: '#8378f9',
    avatar: '/14.png',
  },
  {
    name: 'Emma Bowen',
    title: 'UI/UX Designer',
    project: 'BITBANK',
    projectColor: '#ffb4b4',
    progress: 340,
    total: 420,
    progressColor: '#f2484b',
    avatar: '/13.png',
  },
  {
    name: 'Adrian McGuire',
    title: 'React developer',
    project: 'PAYERS',
    projectColor: '#fbd78b',
    progress: 50,
    total: 82,
    progressColor: '#f5a623',
    avatar: '/12.png',
  },
  {
    name: 'Alma Gonzalez',
    title: 'Product Manager',
    project: 'BRANDI',
    projectColor: '#a6e6f7',
    progress: 98,
    total: 260,
    progressColor: '#00c9db',
    avatar: '/11.png',
  },
  {
    name: 'Travis Collins',
    title: 'VueJS developer',
    project: 'AVIATO',
    projectColor: '#dcdce4',
    progress: 12,
    total: 25,
    progressColor: '#adb5bd',
    avatar: '/10.png',
  },
];

const TeamMembersCard = ({ theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Paper
      sx={{
        ...getCrmStyle('salesCountriesCard', theme),
        p: 3,
        borderRadius: '10px',
        width: '100%',
        flexGrow: 1,
        height: '100%', // 添加这一行
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '24px', color: 'grey' }}>
          Team Members
        </Typography>
        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Box>

      {/* Table Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: theme.palette.text.secondary,
          fontSize: '13px',
          fontWeight: 600,
          px: 1,
          py: 1,
        }}
      >
        <Box sx={{ flex: 2 }}>NAME</Box>
        <Box sx={{ flex: 1 }}>PROJECT</Box>
        <Box sx={{ flex: 1 }}>TASKS</Box>
        <Box sx={{ flex: 1 }}>PROGRESS</Box>
      </Box>

      {/* Members */}
      {members.map((m, i) => {
        const percent = Math.round((m.progress / m.total) * 100);
        const option = {
          series: [
            {
              type: 'pie',
              radius: ['70%', '90%'],
              avoidLabelOverlap: true,
              silent: true,
              label: { show: false },
              labelLine: { show: false },
              data: [
                { value: percent, itemStyle: { color: m.progressColor } },
                { value: 100 - percent, itemStyle: { color: '#eee' } },
              ],
            },
          ],
        };

        return (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1,
              py: 1,
              borderBottom: i !== members.length - 1 ? '1px solid #f0f0f0' : 'none',
            }}
          >
            {/* Name */}
            <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              {m.avatar ? (
                <Avatar src={m.avatar} />
              ) : (
                <Avatar>{m.name.split(' ')[0][0] + m.name.split(' ')[1][0]}</Avatar>
              )}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {m.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {m.title}
                </Typography>
              </Box>
            </Box>

            {/* Project */}
            <Box sx={{ flex: 1 }}>
              <Chip
                label={m.project}
                sx={{
                  bgcolor: m.projectColor,
                  color: '#333',
                  fontWeight: 600,
                  fontSize: '11px',
                  height: 24,
                  borderRadius: '6px',
                }}
              />
            </Box>

            {/* Tasks */}
            <Typography variant="body2" sx={{ flex: 1 }}>
              {m.progress}/{m.total}
            </Typography>

            {/* Progress Chart */}
            <Box sx={{ flex: 1 }}>
              <ReactECharts
                option={option}
                style={{ width: 48, height: 48 }}
                opts={{ renderer: 'svg' }}
              />
            </Box>
          </Box>
        );
      })}

      {/* Menu */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu}>Refresh</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Share</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Update</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default TeamMembersCard;
