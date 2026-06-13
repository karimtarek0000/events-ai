import EventListMyEvent from '@/app/components/event/EventListMyEvents'
import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Events',
}

export default async function Page() {
  const events = await preloadQuery(api.events.getMyEvents, {})

  return <EventListMyEvent preloadedEvents={events} />
}
