// CalendarMonthView.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const CalendarMonthView = ({ events, selectedDate, today, theme }) => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const calendarDays = Array(35).fill(null).map((_, i) => {
    const day = i - firstDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <Box sx={getCalendarPageStyle('calendarGrid', { theme })}>
      {daysOfWeek.map((day) => (
        <Box key={day} sx={getCalendarPageStyle('calendarDayHeader', { theme })}>
          {day}
        </Box>
      ))}
      {calendarDays.map((day, index) => {
        const isCurrentDate = (
          day === today.getDate() &&
          selectedDate.getMonth() === today.getMonth() &&
          selectedDate.getFullYear() === today.getFullYear()
        );
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
                {events
                  .filter(event => {
                    const eventStart = event.date.getDate();
                    const eventEnd = event.end.getDate();
                    return day >= eventStart && day <= eventEnd;
                  })
                  .map((event, idx) => (
                    <Box
                      key={event.id}
                      sx={getCalendarPageStyle('event', { color: event.color, theme })}
                    >
                      {day === event.date.getDate() ? event.title : ' '}
                      {day === event.date.getDate() && idx === 2 && events.filter(e => e.date.getDate() === day).length > 3 && (
                        <Typography variant="caption" color="text.secondary">
                          + {events.filter(e => e.date.getDate() === day).length - 3} more
                        </Typography>
                      )}
                    </Box>
                  ))}
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default CalendarMonthView;