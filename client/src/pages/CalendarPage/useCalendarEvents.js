// CalendarPage/useCalendarEvents.js
import { useMemo } from 'react';

export const useCalendarEvents = (selectedDate, rawEventsMap) => {
  const current = new Date();
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth();

  let selectedKey = null;
  if (selectedYear === currentYear && selectedMonth === currentMonth) {
    selectedKey = 'current';
  } else if (
    selectedYear === currentYear && selectedMonth === currentMonth - 1 ||
    selectedYear === currentYear - 1 && currentMonth === 0 && selectedMonth === 11
  ) {
    selectedKey = 'prev';
  } else if (
    selectedYear === currentYear && selectedMonth === currentMonth + 1 ||
    selectedYear === currentYear + 1 && currentMonth === 11 && selectedMonth === 0
  ) {
    selectedKey = 'next';
  }

  const rawEvents = rawEventsMap[selectedKey] || [];

  const events = useMemo(() => rawEvents.map((e) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const date = new Date(year, month, e.day, e.hour || 0, e.minute || 0);
    const end = e.endDay
      ? new Date(year, month, e.endDay)
      : new Date(date.getTime() + (e.durationMins || 0) * 60 * 1000);
    return { ...e, date, end };
  }), [rawEvents, selectedDate]);

  return events;
};
