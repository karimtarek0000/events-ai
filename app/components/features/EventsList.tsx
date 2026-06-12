'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import EventCard from '../event/EventCard'
import FeaturedCaroueselCard from '../event/FeaturedCaroueselCard'
import NotFound from '../notFound/NotFound'

interface EventsListProps {
  preloadedEvents:
    | Preloaded<typeof api.events.getEventsByLocation>
    | Preloaded<typeof api.events.getFeaturedEvents>
    | Preloaded<typeof api.events.getPopularEvents>
    | Preloaded<typeof api.events.getEventsByLocation>
  slider?: boolean
}

const EventsList = ({ preloadedEvents, slider }: EventsListProps) => {
  const events = usePreloadedQuery(preloadedEvents)

  if (slider) {
    return (
      <NotFound records={events}>
        <FeaturedCaroueselCard events={events} />
      </NotFound>
    )
  }

  return (
    <NotFound records={events}>
      <section className="space-y-6 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events?.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>
    </NotFound>
  )
}

export default EventsList
