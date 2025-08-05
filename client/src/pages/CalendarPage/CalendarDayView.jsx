// CalendarDayView.jsx
import React from 'react';
import { Box } from '@mui/material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const CalendarDayView = ({ events, selectedDate, theme }) => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i % 12 === 0 ? 12 : i % 12}${i < 12 ? 'am' : 'pm'}`);

  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <Box sx={getCalendarPageStyle('dayView', { theme })}>
      <Box />
      <Box sx={getCalendarPageStyle('weekDayHeader', { theme })}>
        {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
      </Box>

      {hours.map((hour, index) => (
        <React.Fragment key={hour}>
          <Box sx={getCalendarPageStyle('timeLabel', { theme })}>{hour}</Box>
          <Box sx={getCalendarPageStyle('timeSlot', { theme })}>
            {dayEvents.map(event => {
              if (event.allDay) return null;
              const startHour = event.date.getHours();
              const endHour = event.end.getHours();
              const startMinutes = event.date.getMinutes();
              const endMinutes = event.end.getMinutes();
              const top = (startHour + startMinutes / 60 - 6) * 60;
              const height = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * 60;

              if (startHour <= index + 6 && endHour >= index + 6) {
                return (
                  <Box
                    key={event.id}
                    sx={getCalendarPageStyle('weekEvent', {
                      color: event.color,
                      top: `${top}px`,
                      height: `${height}px`,
                      theme,
                    })}
                  >
                    {event.title}
                  </Box>
                );
              }
              return null;
            })}
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default CalendarDayView;
