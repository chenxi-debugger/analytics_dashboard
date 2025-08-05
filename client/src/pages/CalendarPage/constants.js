// constants.js
export const rawEventsMap = {
  prev: [
    { id: 101, day: 2, title: 'Marketing Standup', color: '#e0e7ff', category: 'Business', allDay: true },
    { id: 102, day: 4, hour: 10, minute: 0, durationMins: 120, title: 'Code Review', color: '#d4f8e8', category: 'Business' },
    { id: 103, day: 6, title: 'Family Picnic', color: '#ffecd1', category: ['Family', 'Personal'], allDay: true },
    { id: 104, day: 8, hour: 8, minute: 0, durationMins: 90, title: 'Client Meeting', color: '#e0e7ff', category: ['Business', 'Personal'] },
    { id: 105, day: 10, title: 'Gym Time', color: '#ffdad6', category: 'Personal', allDay: true },
    { id: 106, day: 14, hour: 8, minute: 30, durationMins: 60, title: 'UX Workshop', color: '#e0e7ff', category: 'Business' },
    { id: 107, day: 16, hour: 9, minute: 0, durationMins: 120, title: 'Morning Sync', color: '#d4f8e8', category: ['Business', 'Personal'] },
    { id: 108, day: 20, title: 'Doctor Appointment', color: '#ffdad6', category: 'Personal', allDay: true },
    { id: 109, day: 25, hour: 10, minute: 0, durationMins: 120, title: 'Brainstorm Session', color: '#e0e7ff', category: 'Business' },
    { id: 110, day: 28, endDay: 30, title: 'Team Offsite', color: '#ffecd1', category: 'Family', allDay: true },
  ],
  current: [
    { id: 201, day: 1, hour: 9, minute: 30, durationMins: 60, title: 'Design Review', color: '#e0e7ff', category: 'Business' },
    { id: 202, day: 3, hour: 10, minute: 0, durationMins: 90, title: '1-on-1 Check-in', color: '#e0e7ff', category: 'Business' },
    { id: 203, day: 5, title: 'Yoga Class', color: '#ffdad6', category: 'Personal', allDay: true },
    { id: 204, day: 8, title: 'Mom’s Birthday', color: '#ffecd1', category: ['Family', 'Personal'], allDay: true },
    { id: 205, day: 10, hour: 9, minute: 0, durationMins: 120, title: 'Project Kickoff', color: '#e0e7ff', category: 'Business' },
    { id: 206, day: 12, hour: 10, minute: 30, durationMins: 120, title: 'Evening Jog', color: '#ffdad6', category: ['Family', 'Personal'] },
    { id: 207, day: 15, title: 'Anniversary Dinner', color: '#ffecd1', category: 'Holiday', allDay: true },
    { id: 208, day: 18, title: 'Family Dinner', color: '#ffecd1', category: ['Family', 'Personal'], allDay: true },
    { id: 209, day: 20, hour: 8, minute: 0, durationMins: 180, title: 'Weekly Sync', color: '#d4f8e8', category: ['Business', 'Personal'] },
    { id: 210, day: 22, endDay: 24, title: 'Trip to Lake', color: '#d4f8e8', category: 'Family', allDay: true },
  ],
  next: [
    { id: 301, day: 1, title: 'Rent Due', color: '#ffdad6', category: ['Family', 'Personal'], allDay: true },
    { id: 302, day: 2, hour: 10, minute: 0, durationMins: 120, title: 'Sprint Planning', color: '#e0e7ff', category: 'Business' },
    { id: 303, day: 4, title: 'Grocery Run', color: '#ffdad6', category: 'Personal', allDay: true },
    { id: 304, day: 6, hour: 9, minute: 0, durationMins: 120, title: 'Team Check-In', color: '#d4f8e8', category: ['Business', 'Personal'] },
    { id: 305, day: 9, title: 'Parent-Teacher Meeting', color: '#ffecd1', category: 'Family', allDay: true },
    { id: 306, day: 12, hour: 10, minute: 0, durationMins: 120, title: 'Demo Day', color: '#e0e7ff', category: 'Business' },
    { id: 307, day: 15, title: 'Spa Day', color: '#ffdad6', category: ['Family', 'Personal'], allDay: true },
    { id: 308, day: 18, hour: 8, minute: 0, durationMins: 160, title: 'Mentorship Session', color: '#e0e7ff', category:  ['Business', 'Personal']},
    { id: 309, day: 20, title: 'Family BBQ', color: '#ffecd1', category: ['Family', 'Personal'], allDay: true },
    { id: 310, day: 23, endDay: 25, title: 'Work Retreat', color: '#d4f8e8', category: 'Business', allDay: true },
  ]
};