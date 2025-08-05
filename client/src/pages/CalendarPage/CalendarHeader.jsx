// CalendarHeader.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const getWeekRangeLabel = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day; // 让周一为一周起始
  start.setDate(start.getDate() + diff);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const sameMonth = start.getMonth() === end.getMonth();
  const optionsStart = { month: 'long', day: 'numeric' };
  const optionsEnd = { month: 'long', day: 'numeric', year: 'numeric' };

  return `${start.toLocaleDateString('en-US', optionsStart)} – ${end.toLocaleDateString('en-US', optionsEnd)}`;
};

const CalendarHeader = ({
  theme,
  isMobile,
  selectedDate,
  handleNavigate,
  handleDrawerToggle,
  view,
  setView,
}) => {
  return (
    <Box sx={getCalendarPageStyle('calendarHeader', { theme })}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon sx={{ color: theme?.palette?.text?.secondary || '#a1a5b7' }} />
          </IconButton>
        )}
        <Button onClick={() => handleNavigate('prev')}>{'<'}</Button>
        <Typography variant="h6">
          {view === 'week'
            ? getWeekRangeLabel(selectedDate)
            : view === 'day'
            ? selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
        </Typography>
        <Button onClick={() => handleNavigate('next')}>{'>'}</Button>
      </Box>

      <Tabs
        value={view}
        onChange={(e, newValue) => setView(newValue)}
        sx={{
          '& .MuiTab-root': {
            color: theme?.palette?.text?.secondary || '#a1a5b7',
          },
        }}
      >
        <Tab label="Month" value="month" />
        <Tab label="Week" value="week" />
        <Tab label="Day" value="day" />
        <Tab label="List" value="list" />
      </Tabs>
    </Box>
  );
};

export default CalendarHeader;
