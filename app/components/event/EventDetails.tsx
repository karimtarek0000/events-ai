'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import EventCard from '../event/EventCard'

interface EventsListProps {
  preloadedEvents: Preloaded<typeof api.events.getEvent>
}

const EventsDetails = ({ preloadedEvents }: EventsListProps) => {
  const event = usePreloadedQuery(preloadedEvents)

  return (
    <div className="lg:w-[40vw] mx-auto">
      <EventCard event={event} pointerEvent />
    </div>
  )
}

export default EventsDetails
