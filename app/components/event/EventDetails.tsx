'use client'

import { EventsListProps } from '@/types/event.type'
import { usePreloadedQuery } from 'convex/react'
import EventCard from '../event/EventCard'

const EventsDetails = ({ preloadedEvents }: EventsListProps) => {
  const event = usePreloadedQuery(preloadedEvents)

  return (
    <EventCard
      event={event}
      pointerEvent
      isShow={{ tags: true, description: true, physical: true, date: true }}
    />
  )
}

export default EventsDetails
