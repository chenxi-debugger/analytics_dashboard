// CalendarMonthView.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const CalendarMonthView = ({ events, selectedDate, today, theme, activeFilters }) => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const calendarDays = Array(35).fill(null).map((_, i) => {
    const day = i - firstDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const matchesFilter = (event) => {
    if (!Array.isArray(activeFilters) || activeFilters.length === 0) return false;
    if (Array.isArray(event.category)) {
      return event.category.some(cat => activeFilters.includes(cat));
    }
    return activeFilters.includes(event.category);
  };

  return (
    <Box sx={getCalendarPageStyle('calendarGrid', { theme })}>
      {daysOfWeek.map((day) => (
        <Box key={day} sx={getCalendarPageStyle('calendarDayHeader', { theme })}>
          {day}
        </Box>
      ))}
      {calendarDays.map((day, index) => {
        const isCurrentDate =
          day === today.getDate() &&
          selectedDate.getMonth() === today.getMonth() &&
          selectedDate.getFullYear() === today.getFullYear();

        const dayEvents = day
          ? events.filter(event => {
              const eventStart = event.date.getDate();
              const eventEnd = event.end.getDate();
              return (
                day >= eventStart &&
                day <= eventEnd &&
                matchesFilter(event)
              );
            })
          : [];

        return (
          <Box
            key={index}
            sx={getCalendarPageStyle('calendarDay', {
              disabled: !day,
              isCurrentDate,
              theme,
            })}
          >
            {day && (
              <>
                <Typography variant="caption">{day}</Typography>
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <Box
                    key={event.id}
                    sx={getCalendarPageStyle('event', { color: event.color, theme })}
                  >
                    {day === event.date.getDate() ? event.title : ' '}
                  </Box>
                ))}
                {dayEvents.length > 3 && (
                  <Typography variant="caption" color="text.secondary">
                    + {dayEvents.length - 3} more
                  </Typography>
                )}
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default CalendarMonthView;
