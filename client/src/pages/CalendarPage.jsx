// CalendarPage.jsx
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Drawer,
  Tabs,
  Tab,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import getCalendarPageStyle from '../styles/getCalendarPageStyle';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography color="error">Something went wrong.</Typography>;
    }
    return this.props.children;
  }
}

const CalendarPage = () => {
  const theme = useTheme();
  const today = new Date(2025, 4, 12); // May 12, 2025 (current date as per context)
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Breakpoint for mobile view (xs and sm)

  // State for the selected month, view, and drawer
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 1)); // Start with May 2025
  const [view, setView] = useState('month'); // Default view: Month
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Hardcoded events as per the image (for May 2025)
  const events = [
    { id: 1, date: new Date(2025, 4, 12, 9, 32), end: new Date(2025, 4, 12, 12, 0), title: 'Design Review', color: '#e0e7ff', category: 'Business' },
    { id: 2, date: new Date(2025, 4, 13, 12, 0), end: new Date(2025, 4, 13, 13, 30), title: 'Design Review', color: '#e0e7ff', category: 'Business' },
    { id: 3, date: new Date(2025, 4, 18), end: new Date(2025, 4, 18), title: 'Dart Game?', color: '#ffecd1', category: 'Family', allDay: true },
    { id: 4, date: new Date(2025, 4, 18), end: new Date(2025, 4, 18), title: 'Dinner', color: '#ffecd1', category: 'Family', allDay: true },
    { id: 5, date: new Date(2025, 4, 18), end: new Date(2025, 4, 18), title: 'Meditation', color: '#ffecd1', category: 'Family', allDay: true },
    { id: 6, date: new Date(2025, 4, 18), end: new Date(2025, 4, 18), title: 'Product Review', color: '#ffecd1', category: 'Family', allDay: true },
    { id: 7, date: new Date(2025, 4, 20), end: new Date(2025, 4, 20), title: "Doctor's Appointment", color: '#ffdad6', category: 'Personal', allDay: true },
    { id: 8, date: new Date(2025, 4, 21), end: new Date(2025, 4, 21), title: 'Meeting With Client', color: '#e0e7ff', category: 'Business', allDay: true },
    { id: 9, date: new Date(2025, 4, 22), end: new Date(2025, 4, 24), title: 'Family Trip', color: '#d4f8e8', category: 'Family', allDay: true },
    { id: 10, date: new Date(2025, 4, 10), end: new Date(2025, 4, 10), title: '7:17P DESIGN REVIEW', color: '#e0e7ff', category: 'Business', allDay: true },
  ];

  // Drawer toggle handlers
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Navigation functions
  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  // Mini calendar logic
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const dates = Array(daysInMonth).fill(0).map((_, i) => i + 1);

  // Main calendar logic (for the selected month)
  const mainFirstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const mainDaysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const calendarDays = Array(35).fill(null).map((_, i) => {
    const day = i - mainFirstDayOfMonth + 1;
    return day > 0 && day <= mainDaysInMonth ? day : null;
  });

  // Week view logic
  const getWeekDates = () => {
    const startOfWeek = new Date(selectedDate);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Start of the week (Sunday)
    return Array(7).fill(0).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  // Day view logic
  const hours = Array.from({ length: 24 }, (_, i) => `${i % 12 === 0 ? 12 : i % 12}${i < 12 ? 'am' : 'pm'}`);

  // List view logic
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === selectedDate.getMonth() &&
           eventDate.getFullYear() === selectedDate.getFullYear();
  });

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const dateStr = event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(event);
    return acc;
  }, {});

  const SidebarContent = (
    <>
      {/* Add Event Button */}
      <Button sx={getCalendarPageStyle('addEventButton', { theme })}>
        + ADD EVENT
      </Button>

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
          {daysOfWeek.map((day) => (
            <Typography key={day}>{day}</Typography>
          ))}
          {Array(firstDayOfMonth).fill(null).map((_, i) => (
            <Box key={`empty-${i}`} />
          ))}
          {dates.map((date) => {
            const isCurrentDate =
              date === today.getDate() &&
              selectedDate.getMonth() === today.getMonth() &&
              selectedDate.getFullYear() === today.getFullYear();
            return (
              <Box
                key={date}
                sx={getCalendarPageStyle('miniCalendarDate', {
                  selected: date === 12 && selectedDate.getMonth() === 4 && selectedDate.getFullYear() === 2025,
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

      {/* Filter Section */}
      <Box sx={getCalendarPageStyle('filterSection', { theme })}>
        <Typography sx={getCalendarPageStyle('filterTitle', { theme })}>
          FILTER
        </Typography>
        {[
          { label: 'View All', category: 'All', checked: true },
          { label: 'Personal', category: 'Personal', checked: true },
          { label: 'Business', category: 'Business', checked: true },
          { label: 'Family', category: 'Family', checked: true },
          { label: 'Holiday', category: 'Holiday', checked: true },
          { label: 'ETC', category: 'ETC', checked: true },
        ].map((filter) => (
          <FormControlLabel
            key={filter.category}
            control={
              <Checkbox
                checked={filter.checked}
                sx={getCalendarPageStyle('filterCheckbox', { theme })}
              />
            }
            label={<Typography variant="caption">{filter.label}</Typography>}
          />
        ))}
      </Box>
    </>
  );

  const renderView = () => {
    switch (view) {
      case 'month':
        return (
          <Box sx={getCalendarPageStyle('calendarGrid', { theme })}>
            {daysOfWeek.map((day) => (
              <Box key={day} sx={getCalendarPageStyle('calendarDayHeader', { theme })}>
                {day}
              </Box>
            ))}
            {calendarDays.map((day, index) => {
              const isCurrentDate = day === today.getDate() &&
                selectedDate.getMonth() === today.getMonth() &&
                selectedDate.getFullYear() === today.getFullYear();
              return (
                <Box
                  key={index}
                  sx={getCalendarPageStyle('calendarDay', { disabled: !day, isCurrentDate, theme })}
                >
                  {day && (
                    <>
                      <Typography variant="caption">{day}</Typography>
                      {filteredEvents
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
                            {day === event.date.getDate() && idx === 2 && filteredEvents.filter(e => e.date.getDate() === day).length > 3 && (
                              <Typography variant="caption" color="text.secondary">
                                + {filteredEvents.filter(e => e.date.getDate() === day).length - 3} more
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
      case 'week':
        return (
          <Box sx={getCalendarPageStyle('weekView', { theme })}>
            <Box />
            {weekDates.map((date, index) => (
              <Box key={index} sx={getCalendarPageStyle('weekDayHeader', { theme })}>
                {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </Box>
            ))}
            {hours.map((hour, index) => (
              <React.Fragment key={hour}>
                <Box sx={getCalendarPageStyle('timeLabel', { theme })}>
                  {hour}
                </Box>
                {weekDates.map((date, colIndex) => {
                  const dayEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.getDate() === date.getDate() &&
                           eventDate.getMonth() === date.getMonth() &&
                           eventDate.getFullYear() === date.getFullYear();
                  });
                  return (
                    <Box key={colIndex} sx={getCalendarPageStyle('timeSlot', { theme })}>
                      {dayEvents.map(event => {
                        if (event.allDay) return null;
                        const startHour = event.date.getHours();
                        const endHour = event.end.getHours();
                        const startMinutes = event.date.getMinutes();
                        const endMinutes = event.end.getMinutes();
                        const top = (startHour + startMinutes / 60 - 6) * 60; // Start from 6am
                        const height = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * 60;
                        if (startHour <= index + 6 && endHour >= index + 6) {
                          return (
                            <Box
                              key={event.id}
                              sx={getCalendarPageStyle('weekEvent', { color: event.color, top: `${top}px`, height: `${height}px`, theme })}
                            >
                              {event.title}
                            </Box>
                          );
                        }
                        return null;
                      })}
                    </Box>
                  );
                })}
              </React.Fragment>
            ))}
          </Box>
        );
      case 'day':
        const selectedDay = selectedDate;
        const dayEvents = filteredEvents.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getDate() === selectedDay.getDate() &&
                 eventDate.getMonth() === selectedDay.getMonth() &&
                 eventDate.getFullYear() === selectedDay.getFullYear();
        });
        return (
          <Box sx={getCalendarPageStyle('dayView', { theme })}>
            <Box />
            <Box sx={getCalendarPageStyle('weekDayHeader', { theme })}>
              {selectedDay.toLocaleDateString('en-US', { weekday: 'long' })}
            </Box>
            {hours.map((hour, index) => (
              <React.Fragment key={hour}>
                <Box sx={getCalendarPageStyle('timeLabel', { theme })}>
                  {hour}
                </Box>
                <Box sx={getCalendarPageStyle('timeSlot', { theme })}>
                  {dayEvents.map(event => {
                    if (event.allDay) return null;
                    const startHour = event.date.getHours();
                    const endHour = event.end.getHours();
                    const startMinutes = event.date.getMinutes();
                    const endMinutes = event.end.getMinutes();
                    const top = (startHour + startMinutes / 60 - 6) * 60; // Start from 6am
                    const height = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * 60;
                    if (startHour <= index + 6 && endHour >= index + 6) {
                      return (
                        <Box
                          key={event.id}
                          sx={getCalendarPageStyle('weekEvent', { color: event.color, top: `${top}px`, height: `${height}px`, theme })}
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
      case 'list':
        return (
          <Box sx={getCalendarPageStyle('listView', { theme })}>
            {Object.keys(groupedEvents).map(date => (
              <Box key={date} sx={getCalendarPageStyle('listEvent', { theme })}>
                <Typography sx={getCalendarPageStyle('listEventDate', { theme })}>
                  {date}
                </Typography>
                {groupedEvents[date].map(event => (
                  <Box key={event.id} sx={getCalendarPageStyle('listEventItem', { color: event.color, theme })}>
                    {event.allDay ? 'all-day' : `${event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - ${event.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`} • {event.title}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <Box sx={getCalendarPageStyle('mainContainer', { theme })}>
        {/* Drawer for Sidebar Content on Small and Medium Screens */}
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
              container: document.querySelector('main'), // Scope within the main content area
            }}
            sx={{
              display: { xs: 'block', md: 'none' }, // Temporary drawer on small and medium screens
              '& .MuiDrawer-paper': getCalendarPageStyle('drawerPaper', { theme }),
              zIndex: 1100, // Ensure it appears above the main content but below the Headerbar
            }}
          >
            {SidebarContent}
          </Drawer>
        </Box>

        {/* Mini Calendar and Filter Section */}
        <Box sx={getCalendarPageStyle('sidebarContainer', { theme })}>
          {SidebarContent}
        </Box>

        {/* Main Calendar Content */}
        <Box sx={getCalendarPageStyle('content', { theme })}>
          {/* Calendar Header */}
          <Box sx={getCalendarPageStyle('calendarHeader', { theme })}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isMobile && (
                <IconButton onClick={handleDrawerToggle}>
                  <MenuIcon sx={{ color: theme?.palette?.text?.secondary || '#a1a5b7' }} />
                </IconButton>
              )}
              <Button onClick={handlePrevMonth}>{'<'}</Button>
              <Typography variant="h6">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </Typography>
              <Button onClick={handleNextMonth}>{'>'}</Button>
            </Box>
            <Tabs
              value={view}
              onChange={(e, newValue) => setView(newValue)}
              sx={{ '& .MuiTab-root': { color: theme?.palette?.text?.secondary || '#a1a5b7' } }}
            >
              <Tab label="Month" value="month" />
              <Tab label="Week" value="week" />
              <Tab label="Day" value="day" />
              <Tab label="List" value="list" />
            </Tabs>
          </Box>

          {/* Render the selected view */}
          {renderView()}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default CalendarPage;