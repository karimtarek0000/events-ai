import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import EventsList from './EventsList'

export default async function NearbyEvents() {
  const events = await preloadQuery(api.events.getEventsByLocation, { limit: 4 })

  return <EventsList preloadedEvents={events} title="Nearby Events" />
}
