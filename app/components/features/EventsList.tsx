'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import EventCard from '../event/EventCard'
import FeaturedCaroueselCard from '../event/FeaturedCaroueselCard'

interface EventsListProps {
  preloadedEvents:
    | Preloaded<typeof api.events.getEventsByLocation>
    | Preloaded<typeof api.events.getFeaturedEvents>
    | Preloaded<typeof api.events.getPopularEvents>
  title: string
  slider: boolean
}

const EventsList = ({ title, preloadedEvents, slider }: EventsListProps) => {
  const events = usePreloadedQuery(preloadedEvents)

  if (!events) return null

  if (slider) {
    return <FeaturedCaroueselCard events={events} />
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold my-8">⭐ {title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  )
}

export default EventsList
