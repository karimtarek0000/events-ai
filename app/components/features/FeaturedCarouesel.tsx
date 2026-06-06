import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import EventsList from './EventsList'

export default async function FeaturedCarouesel() {
  const events = await preloadQuery(api.events.getFeaturedEvents, { limit: 4 })

  return <EventsList preloadedEvents={events} title="Featured Events" slider />
}
