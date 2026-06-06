import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import EventsList from './EventsList'

export default async function PopularEvents() {
  const events = await preloadQuery(api.events.getPopularEvents, { limit: 4 })

  return <EventsList preloadedEvents={events} title="Popular Events" />
}
