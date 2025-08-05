// CalendarPage.jsx
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Tabs, Tab, IconButton, useMediaQuery, Drawer, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import getCalendarPageStyle from '../styles/getCalendarPageStyle';
import Sidebar from './CalendarPage/Sidebar';
import CalendarHeader from './CalendarPage/CalendarHeader';
import CalendarMonthView from './CalendarPage/CalendarMonthView';
import CalendarWeekView from './CalendarPage/CalendarWeekView';
import CalendarDayView from './CalendarPage/CalendarDayView';
import CalendarListView from './CalendarPage/CalendarListView';
import { useCalendarEvents } from './CalendarPage/useCalendarEvents';
import { rawEventsMap } from './CalendarPage/constants';

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
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [view, setView] = useState('month');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // ✅ 默认启用所有分类
  const [activeFilters, setActiveFilters] = useState(['Personal', 'Business', 'Family', 'Holiday', 'ETC']);

  const events = useCalendarEvents(selectedDate, rawEventsMap);

  const handleDrawerClose = () => { setIsClosing(true); setMobileOpen(false); };
  const handleDrawerTransitionEnd = () => { setIsClosing(false); };
  const handleDrawerToggle = () => { if (!isClosing) setMobileOpen(!mobileOpen); };
  const handlePrevMonth = () => { setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)); };
  const handleNextMonth = () => { setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)); };
  const handleNavigate = (direction) => {
    const newDate = new Date(selectedDate);
    if (view === 'month' || view === 'list') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  return (
    <ErrorBoundary>
      <Box sx={getCalendarPageStyle('mainContainer', { theme })}>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{ keepMounted: true, container: document.querySelector('main') }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': getCalendarPageStyle('drawerPaper', { theme }),
              zIndex: 1100,
            }}
          >
            <Sidebar
              theme={theme}
              selectedDate={selectedDate}
              today={today}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </Drawer>
        </Box>

        <Box sx={getCalendarPageStyle('sidebarContainer', { theme })}>
          <Sidebar
            theme={theme}
            selectedDate={selectedDate}
            today={today}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        </Box>

        <Box sx={getCalendarPageStyle('content', { theme })}>
          <CalendarHeader
            theme={theme}
            isMobile={isMobile}
            selectedDate={selectedDate}
            handleDrawerToggle={handleDrawerToggle}
            handleNavigate={handleNavigate}
            view={view}
            setView={setView}
          />

          {view === 'month' && (
            <CalendarMonthView
              events={events}
              selectedDate={selectedDate}
              today={today}
              theme={theme}
              activeFilters={activeFilters}
            />
          )}
          {view === 'week' && (
            <CalendarWeekView
              events={events}
              selectedDate={selectedDate}
              theme={theme}
              activeFilters={activeFilters}
            />
          )}

          {view === 'day' && <CalendarDayView events={events} selectedDate={selectedDate} theme={theme} />}
          {view === 'list' && <CalendarListView events={events} selectedDate={selectedDate} theme={theme} />}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default CalendarPage;
