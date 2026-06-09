import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import EventsList from './EventsList'

export default async function FeaturedEvents() {
  const events = await preloadQuery(api.events.getFeaturedEvents, { limit: 4 })

  return (
    <>
      <h2 className="text-2xl font-bold my-8">⭐ Featured Events</h2>
      <EventsList preloadedEvents={events} />
    </>
  )
}
