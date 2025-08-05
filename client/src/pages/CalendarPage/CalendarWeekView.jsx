// CalendarWeekView.jsx
import React from 'react';
import { Box } from '@mui/material';
import getCalendarPageStyle from '../../styles/getCalendarPageStyle';

const CalendarWeekView = ({ events, selectedDate, theme }) => {
  const hours = Array.from({ length: 24 - 8 }, (_, i) => `${(i + 8) % 12 === 0 ? 12 : (i + 8) % 12}${i + 8 < 12 ? 'am' : 'pm'}`);

  const getWeekDates = () => {
    const start = new Date(selectedDate);
    const day = start.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diff);
    return Array(7).fill(0).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates();

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
          <Box sx={getCalendarPageStyle('timeLabel', { theme })}>{hour}</Box>
          {weekDates.map((date, colIndex) => {
            const dayEvents = events.filter(event => {
              const eventDate = new Date(event.date);
              return (
                eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()
              );
            });

            return (
              <Box
                key={colIndex}
                sx={{
                  ...getCalendarPageStyle('timeSlot', { theme }),
                  position: 'relative'
                }}
              >
                {dayEvents.map(event => {
                if (event.allDay && index === 0) {  // 修改：添加 && index === 0，只在第一个小时槽渲染全天事件
                  return (
                    <Box
                      key={event.id}
                      sx={{
                        ...getCalendarPageStyle('weekEvent', {
                          color: event.color,
                          top: 0,  // 修改：从顶部开始
                          height: 1070,  // 修改：设置足够高度覆盖整个日（16小时 * 60px/小时 = 960px，根据你的实际槽高调整）
                          theme,
                        }),
                        position: 'absolute',  // 修改：使用 absolute 定位来拉伸覆盖父级槽
                        width: '100%',  // 修改：全宽覆盖列
                        zIndex: 1,  // 可选：确保在其他事件上方
                        fontSize: '18px',
                        padding: '200px 6px',
                        lineHeight: 1.2,
                        // whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {event.title}
                    </Box>
                  );
                }

                  const startHour = event.date.getHours();
                  const endHour = event.end.getHours();
                  const startMinutes = event.date.getMinutes();
                  const endMinutes = event.end.getMinutes();

                  const startTotal = startHour + startMinutes / 60;
                  const endTotal = endHour + endMinutes / 60;

                  const top = (startTotal - 8) * 60; // Start from 8am
                  const height = (endTotal - startTotal) * 60;

                  if (index === Math.floor(startTotal) - 8) {
                    return (
                      <Box
                        key={event.id}
                        sx={{
                          ...getCalendarPageStyle('weekEvent', {
                            color: event.color,
                            top: `${top}px`,
                            height: `${height}px`,
                            theme,
                          }),
                          padding: '4px 8px',
                          fontSize: '14px',
                          lineHeight: 1.3,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <div style={{ fontSize: '10px', opacity: 0.7 }}>
                          {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} -{' '}
                          {event.end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div>{event.title}</div>
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
};

export default CalendarWeekView;
