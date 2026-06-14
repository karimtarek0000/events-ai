import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import EventsList from '../event/EventsList'

export default async function FeaturedEvents() {
  const events = await preloadQuery(api.events.getFeaturedEvents, { limit: 4 })

  return (
    <>
      <h2 className="heading-section">Featured Events</h2>
      <EventsList preloadedEvents={events} />
    </>
  )
}
