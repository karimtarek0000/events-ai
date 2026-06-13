import EventListMyEvent from '@/app/components/event/EventListMyEvent'
import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'

export default async function Page() {
  const events = await preloadQuery(api.events.getMyEvents, {})

  return <EventListMyEvent preloadedEvents={events} />
}
