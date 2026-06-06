import { Suspense } from 'react'
import FeaturedCarouesel from '../components/features/FeaturedCarouesel'
import FeaturedEvents from '../components/features/FeaturedEvents'
import NearbyEvents from '../components/features/NearbyEvents'
import PopularEvents from '../components/features/PopularEvents'
import CarousalEventsSkeleton from '../components/skeleton/CarousalEventsSkeleton'
import EventsSkeleton from '../components/skeleton/EventsSkeleton'

export default async function Page() {
  return (
    <>
      <Suspense fallback={<CarousalEventsSkeleton />}>
        <FeaturedCarouesel />
      </Suspense>
      <Suspense fallback={<EventsSkeleton />}>
        <NearbyEvents />
      </Suspense>
      <Suspense fallback={<EventsSkeleton />}>
        <FeaturedEvents />
      </Suspense>
      <Suspense fallback={<EventsSkeleton />}>
        <PopularEvents />
      </Suspense>
    </>
  )
}
