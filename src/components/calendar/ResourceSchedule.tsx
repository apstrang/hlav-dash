// components/SchedulerWithResources.tsx
'use client'

import * as React from 'react'
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  TimelineViews,
  TimelineMonth,
} from '@syncfusion/ej2-react-schedule'
import { registerLicense } from '@syncfusion/ej2-base'
import { createClient } from '@/lib/supabase/client'
import '@syncfusion/ej2-react-schedule/styles/tailwind.css'
import '@syncfusion/ej2-react-schedule/styles/schedule/tailwind.css'

registerLicense('Ngo9BigBOggjHTQxAR8/V1JEaF5cXmRCeUx0QHxbf1x1ZFdMYFtbRXRPIiBoS35Rc0VkWHdfdHRSR2JVU0d+VEFd') // Replace with your trial or community key

const supabase = createClient()

const SchedulerWithResources = () => {
  const [profiles, setProfiles] = React.useState([])
  const [events, setEvents] = React.useState([])
  const [loading, setLoading] = React.useState([true])

  React.useEffect(() => {
    const fetchData = async () => {
      const [profilesRes, eventsRes] = await Promise.all([
        supabase.from('profiles').select('id, name'),
        supabase.from('events').select('id, title, starts_at, ends_at, owned_by, color'),
      ])

      if (profilesRes.error || eventsRes.error) {
        console.error('Error fetching:', profilesRes.error || eventsRes.error)
        return
      }

      const mappedProfiles = profilesRes.data.map((p) => ({
        Id: p.id,
        Text: p.name || 'Unnamed',
      }))

      const mappedEvents = eventsRes.data.map((e) => ({
        Id: e.id,
        Subject: e.title,
        StartTime: new Date(e.starts_at),
        EndTime: new Date(e.ends_at),
        EmployeeId: e.owned_by,
        Color: e.color,
      }))

      setProfiles(mappedProfiles)
      setEvents(mappedEvents)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <ScheduleComponent
      height='650px'
      selectedDate={new Date()}
      currentView='TimelineWeek'
      eventSettings={{
        dataSource: events,
        fields: {
          color: 'Color',
        },
      }}
      eventRendered={(args) => {
        if (args.data.Color) {
          args.element.style.backgroundColor = args.data.Color
          args.element.style.color = 'black'
          args.element.style.borderLeft = '5px solid blue'
        }
      }}
      group={{
        resources: ['Employees'],
        byGroupID: false,
        allowGroupEdit: true,
      }}
    >
      <ViewsDirective>
        <ViewDirective option='TimelineDay' />
        <ViewDirective option='TimelineWeek' />
        <ViewDirective option='TimelineMonth' />
      </ViewsDirective>
      <ResourcesDirective>
        <ResourceDirective
          field="EmployeeId"
          title="Employees"
          name="Employees"
          allowMultiple={false}
          dataSource={profiles}
          textField="Text"
          idField="Id"
        />
      </ResourcesDirective>
      <Inject services={[TimelineViews, TimelineMonth]} />
    </ScheduleComponent>
  )
}

export default SchedulerWithResources