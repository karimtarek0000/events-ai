'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import EventCard from '../event/EventCard'

interface EventsListProps {
  preloadedEvents: Preloaded<typeof api.events.getEvent>
}

const EventsDetails = ({ preloadedEvents }: EventsListProps) => {
  const event = usePreloadedQuery(preloadedEvents)

  return <EventCard event={event} />
}

export default EventsDetails
