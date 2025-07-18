'use client'

import {useState} from 'react'
import styles from './calendar.module.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createEventsServicePlugin} from "@schedule-x/events-service";
import {createViewDay, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";

import '@schedule-x/theme-default/dist/index.css'
import {calendars} from "./calendars.ts";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];


  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-07-18',
        end: '2025-07-18',
      },
    ],
    calendars,
    selectedDate: '2025-07-18',
    plugins: [
      eventsService
    ],
    callbacks: {
    	onRender: () => {
    		eventsService.getAll
    	}
    }
})


  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp