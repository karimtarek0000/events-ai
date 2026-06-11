'use client'

import { EventsListProps } from '@/types/event.type'
import { usePreloadedQuery } from 'convex/react'
import EventCard from '../event/EventCard'

const EventsDetails = ({ preloadedEvents }: EventsListProps) => {
  const event = usePreloadedQuery(preloadedEvents)

  return <EventCard event={event} pointerEvent showDescription />
}

export default EventsDetails
