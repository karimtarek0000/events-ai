import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import EventsList from '../event/EventsList'

export default async function PopularEvents() {
  const events = await preloadQuery(api.events.getPopularEvents, { limit: 4 })

  return (
    <>
      <h2 className="heading-section">Popular Events</h2>
      <EventsList preloadedEvents={events} />
    </>
  )
}
