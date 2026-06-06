import { Suspense } from 'react'

import ErrorBoundry from '../components/error/ErrorBoundry'
import FeaturedCarouesel from '../components/features/FeaturedCarouesel'
import FeaturedEvents from '../components/features/FeaturedEvents'
import NearbyEvents from '../components/features/NearbyEvents'
import PopularEvents from '../components/features/PopularEvents'
import CarousalEventsSkeleton from '../components/skeleton/CarousalEventsSkeleton'
import EventsSkeleton from '../components/skeleton/EventsSkeleton'

export default async function Page() {
  return (
    <>
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
