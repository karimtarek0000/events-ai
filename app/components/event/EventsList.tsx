'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import NotFound from '../notFound/NotFound'
import EventCard from './EventCard'
import FeaturedCaroueselCard from './FeaturedCaroueselCard'

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
      <section className="event-list-wrapper">
        {events?.map((event, i) => (
          <EventCard
            key={event._id}
            event={event}
            isShow={{ tags: true, description: true }}
            isPriority={i < 3}
          />
        ))}
      </section>
    </NotFound>
  )
}

export default EventsList
