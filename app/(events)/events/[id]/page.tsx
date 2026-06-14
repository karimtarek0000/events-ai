import EventDetails from '@/app/components/event/EventDetails'
import RegisterForm from '@/app/components/event/RegisterForm'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'

interface PageProps {
  params: Promise<{ id: Id<'events'> }>
}

const getCachedEvent = (id: string) =>
  unstable_cache(
    async () => {
      return fetchQuery(api.events.getEvent, { eventId: id as Id<'events'> })
    },
    [`event-detail-${id}`],
    { revalidate: false, tags: [`event-${id}`] },
  )

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const event = await getCachedEvent(id)()

  if (!event) return { title: 'Event Not Found' }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.coverImage
        ? [
            {
              url: event.coverImage,
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ]
        : [],
    },
  }
}

export async function generateStaticParams() {
  const events = await fetchQuery(api.events.getEvents)

  return events.slice(0, 2).map(event => ({ id: event._id }))
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const event = await getCachedEvent(id)()

  return (
    <section className="lg:w-[40vw] mx-auto flex flex-col gap-y-5">
      <EventDetails event={event} />
      <RegisterForm eventId={id} />
    </section>
  )
}
