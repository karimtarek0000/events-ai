import {
  CarousalEventsSkeleton,
  ErrorBoundry,
  EventsSkeleton,
  FeaturedCarouesel,
  FeaturedEvents,
  Metadata,
  NearbyEvents,
  PopularEvents,
  Suspense,
} from './'

export const metadata: Metadata = {
  title: 'Explore Events',
  description: 'Discover events happening around you, curated just for you by EventRAI',
  keywords: [
    'event',
    'discovery',
    'recommendations',
    'management',
    'event management',
    'event discovery',
  ],
}

export default async function Page() {
  return (
    <>
      <h1 className="text-3xl text-center mb-10">Explore all new events</h1>

      <ErrorBoundry>
        <Suspense fallback={<CarousalEventsSkeleton />}>
          <FeaturedCarouesel />
        </Suspense>
      </ErrorBoundry>

      <ErrorBoundry>
        <Suspense fallback={<EventsSkeleton />}>
          <NearbyEvents />
        </Suspense>
      </ErrorBoundry>

      <ErrorBoundry>
        <Suspense fallback={<EventsSkeleton />}>
          <FeaturedEvents />
        </Suspense>
      </ErrorBoundry>

      <ErrorBoundry>
        <Suspense fallback={<EventsSkeleton />}>
          <PopularEvents />
        </Suspense>
      </ErrorBoundry>
    </>
  )
}
