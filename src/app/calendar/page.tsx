

/*
import CalendarApp from '@/components/calendar/Calendar'
import { useState } from 'react'
import { createEventAction } from './actions'


export default function Page() {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		const formData = new FormData(e.currentTarget)
		try {
			await createEventAction(formData)
			alert('Event created!')
		} catch (err) {
			console.error(err)
			alert('Failed to create event')
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name="title" placeholder="Title" required/>
			<input name="start" type="datetime-local" required/>
			<input name="end" type="datetime-local" required/>
			<button type="submit" disabled={loading}>
				{loading ? 'Creating...' : 'Create Event'}
			</button>
		</form>
	)
}
*/
'use client'

import SchedulerWithResources from '@/components/calendar/ResourceSchedule'
import CreateEventForm from '@/components/calendar/CreateEventForm'
import { useState } from 'react'
import Overview from '@/components/calendar/overview'

/*
export default function CalendarPage() {
	const [refreshKey, setRefreshKey] = useState(0)

	return (
		<div>
			<CreateEventForm onCreated={() => setRefreshKey((k) => k + 1)} />
			<SchedulerWithResources key={refreshKey} />
		</div>
	)
}
*/


export default function CalendarPage() {
	return (
		<Overview />
	)
}
