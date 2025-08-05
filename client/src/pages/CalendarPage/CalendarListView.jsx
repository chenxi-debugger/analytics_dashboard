// CalendarListView.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const CalendarListView = ({ events, selectedDate, theme, activeFilters = [] }) => {
  const matchesFilter = (event) => {
    if (!Array.isArray(activeFilters) || activeFilters.length === 0) return false;
    if (Array.isArray(event.category)) {
      return event.category.some(cat => activeFilters.includes(cat));
    }
    return activeFilters.includes(event.category);
  };

  const filteredEvents = events.filter(event => {
    const date = new Date(event.date);
    return (
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear() &&
      matchesFilter(event)
    );
  });

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const dateStr = event.date.toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(event);
    return acc;
  }, {});

  return (
    <Box sx={getCalendarPageStyle('listView', { theme })}>
      {Object.keys(groupedEvents).map(date => (
        <Box key={date} sx={getCalendarPageStyle('listEvent', { theme })}>
          <Typography sx={getCalendarPageStyle('listEventDate', { theme })}>{date}</Typography>
          {groupedEvents[date].map(event => (
            <Box
              key={event.id}
              sx={getCalendarPageStyle('listEventItem', { color: event.color, theme })}
            >
              {event.allDay
                ? 'all-day'
                : `${event.date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })} - ${event.end.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}`}
              {' • ' + event.title}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default CalendarListView;
