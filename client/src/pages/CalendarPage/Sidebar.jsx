// Sidebar.jsx
import React from 'react';
import { Box, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const Sidebar = ({ theme, selectedDate, today, handlePrevMonth, handleNextMonth, activeFilters, setActiveFilters }) => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const dates = Array(daysInMonth).fill(0).map((_, i) => i + 1);

  const allCategories = ['Personal', 'Business', 'Family', 'Holiday', 'ETC'];

  const handleCheckboxChange = (category) => {
    if (category === 'View All') {
      setActiveFilters(activeFilters.length === allCategories.length ? [] : allCategories);
    } else {
      if (activeFilters.includes(category)) {
        setActiveFilters(activeFilters.filter((item) => item !== category));
      } else {
        const newFilters = [...activeFilters, category];
        setActiveFilters(newFilters);
      }
    }
  };

  const isViewAllChecked = allCategories.every((cat) => activeFilters.includes(cat));

  return (
    <Box>
      <Button sx={getCalendarPageStyle('addEventButton', { theme })}>+ ADD EVENT</Button>

      {/* Mini Calendar */}
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
                  selected: false,
                  isCurrentDate,
                  theme,
                })}
              >
                {date}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Category Filters */}
      <Box sx={getCalendarPageStyle('filterSection', { theme })}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Filters</Typography>
        <FormControlLabel
          control={<Checkbox checked={isViewAllChecked} onChange={() => handleCheckboxChange('View All')} />}
          label="View All"
        />
        {allCategories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={activeFilters.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
            }
            label={category}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
