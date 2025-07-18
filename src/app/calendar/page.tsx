'use client'

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