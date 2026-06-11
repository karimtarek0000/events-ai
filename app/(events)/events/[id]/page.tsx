import ErrorBoundry from '@/app/components/error/ErrorBoundry'
import EventDetails from '@/app/components/event/EventDetails'
import EventsSkeleton from '@/app/components/skeleton/EventsSkeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery, preloadQuery } from 'convex/nextjs'
import type { Metadata } from 'next'
import { Suspense } from 'react'

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
    <ErrorBoundry>
      <Suspense fallback={<EventsSkeleton />}>
        <EventDetails preloadedEvents={event} />
      </Suspense>
    </ErrorBoundry>
  )
}
