// CalendarDayView.jsx
import React from 'react';
import { Box } from '@mui/material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const CalendarDayView = ({ events, selectedDate, theme, activeFilters = [] }) => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i % 12 === 0 ? 12 : i % 12}${i < 12 ? 'am' : 'pm'}`);

  const matchesFilter = (event) => {
    if (!Array.isArray(activeFilters) || activeFilters.length === 0) return false;
    if (Array.isArray(event.category)) {
      return event.category.some(cat => activeFilters.includes(cat));
    }
    return activeFilters.includes(event.category);
  };

  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      matchesFilter(event)
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
              if (event.allDay && index === 0) {
                return (
                  <Box
                    key={event.id}
                    sx={{
                      ...getCalendarPageStyle('event', {
                        color: event.color,
                        theme,
                      }),
                      position: 'relative',
                      width: '100%',
                      backgroundColor: event.color,
                      color: '#000',
                      fontSize: '13px',
                      padding: '4px 6px',
                      marginBottom: '4px',
                    }}
                  >
                    {event.title}
                  </Box>
                );
              }

              if (!event.allDay) {
                const startHour = event.date.getHours();
                const endHour = event.end.getHours();
                const startMinutes = event.date.getMinutes();
                const endMinutes = event.end.getMinutes();
              
                const top = (startHour + startMinutes / 60 - 6) * 60; // 起始位置从 6am 开始
                const height = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * 60;
              
                if (startHour <= index + 6 && endHour >= index + 6) {
                  return (
                    <Box
                      key={event.id}
                      sx={{
                        ...getCalendarPageStyle('event', {
                          color: event.color,
                          theme,
                        }),
                        position: 'absolute',
                        top: `${top}px`,
                        height: `${height}px`,
                        width: '40%',
                        zIndex: 1,
                        fontSize: '13px',
                        padding: '4px 6px',
                        lineHeight: 1.2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {event.title}
                    </Box>
                  );
                }
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
