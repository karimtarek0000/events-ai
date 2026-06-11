import EventDetails from '@/app/components/event/EventDetails'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery, preloadQuery } from 'convex/nextjs'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: Id<'events'> }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const event = await fetchQuery(api.events.getEvent, { eventId: id })

  if (!event) return { title: 'Event Not Found' }

  return {
    title: event.title,
    description: event.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const event = await preloadQuery(api.events.getEvent, { eventId: id })

  return (
    <section className="lg:w-[40vw] mx-auto flex flex-col gap-y-5">
      <EventDetails preloadedEvents={event} />
    </section>
  )
}
