'use client'

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useSearchParams } from 'next/navigation'
import EventCard from '../event/EventCard'
import EventsSkeleton from '../skeleton/EventsSkeleton'

export const EventsListSearch = () => {
  const searchParams = useSearchParams()
  const location = searchParams.get('search') ?? ''

  const events = useQuery(api.events.getEventsByLocation, { location })

  if (events === undefined) return <EventsSkeleton showHeader={false} />
  if (events === null) throw new Error('Failed to load events')
  if (events.length === 0) return <p className="text-center">No events found.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(event => (
        <EventCard key={event._id} event={event} isShow={{ description: true, date: true }} />
      ))}
    </div>
  )
}
