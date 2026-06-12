import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import EventsList from '../event/EventsList'

export default async function NearbyEvents() {
  const events = await preloadQuery(api.events.getEventsByLocation, { limit: 4 })

  return (
    <>
      <h2 className="text-2xl font-bold my-8">⭐ Nearby Events</h2>
      <EventsList preloadedEvents={events} />
    </>
  )
}
