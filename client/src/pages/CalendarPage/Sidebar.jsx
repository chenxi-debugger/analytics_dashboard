// CalendarPage/Sidebar.jsx
import React from 'react';
import {
  Box, Button, Typography, FormControlLabel, Checkbox
} from '@mui/material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const Sidebar = ({ theme, selectedDate, today, handlePrevMonth, handleNextMonth }) => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const dates = Array(daysInMonth).fill(0).map((_, i) => i + 1);

  return (
    <>
      <Button sx={getCalendarPageStyle('addEventButton', { theme })}>+ ADD EVENT</Button>
      <Box sx={getCalendarPageStyle('miniCalendar', { theme })}>
        <Box sx={getCalendarPageStyle('miniCalendarHeader', { theme })}>
          <Button onClick={handlePrevMonth}>{'<'}</Button>
          <Typography variant="body2">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Typography>
          <Button onClick={handleNextMonth}>{'>'}</Button>
        </Box>
        <Box sx={getCalendarPageStyle('miniCalendarDays', { theme })}>
          {daysOfWeek.map((day) => <Typography key={day}>{day}</Typography>)}
          {Array(firstDayOfMonth).fill(null).map((_, i) => <Box key={`empty-${i}`} />)}
          {dates.map((date) => {
            const isCurrentDate = (
              date === today.getDate() &&
              selectedDate.getMonth() === today.getMonth() &&
              selectedDate.getFullYear() === today.getFullYear()
            );
            return (
              <Box
                key={date}
                sx={getCalendarPageStyle('miniCalendarDate', {
                  selected: false, isCurrentDate, theme,
                })}
              >
                {date}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={getCalendarPageStyle('filterSection', { theme })}>
        <Typography sx={getCalendarPageStyle('filterTitle', { theme })}>FILTER</Typography>
        {['View All', 'Personal', 'Business', 'Family', 'Holiday', 'ETC'].map((label) => (
          <FormControlLabel
            key={label}
            control={<Checkbox checked sx={getCalendarPageStyle('filterCheckbox', { theme })} />}
            label={<Typography variant="caption">{label}</Typography>}
          />
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
