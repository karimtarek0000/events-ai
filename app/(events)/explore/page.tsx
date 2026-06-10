import { Suspense } from 'react'

import { Metadata } from 'next'
import ErrorBoundry from '../../components/error/ErrorBoundry'
import FeaturedCarouesel from '../../components/features/FeaturedCarouesel'
import FeaturedEvents from '../../components/features/FeaturedEvents'
import NearbyEvents from '../../components/features/NearbyEvents'
import PopularEvents from '../../components/features/PopularEvents'
import CarousalEventsSkeleton from '../../components/skeleton/CarousalEventsSkeleton'
import EventsSkeleton from '../../components/skeleton/EventsSkeleton'

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
      <h1 className="text-3xl text-center my-10">Explore all new events</h1>

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
