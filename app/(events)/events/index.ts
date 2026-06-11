import type { Metadata } from 'next'
import { Suspense } from 'react'
import ErrorBoundry from '../../components/error/ErrorBoundry'
import FeaturedCarouesel from '../../components/features/FeaturedCarouesel'
import FeaturedEvents from '../../components/features/FeaturedEvents'
import NearbyEvents from '../../components/features/NearbyEvents'
import PopularEvents from '../../components/features/PopularEvents'
import CarousalEventsSkeleton from '../../components/skeleton/CarousalEventsSkeleton'
import EventsSkeleton from '../../components/skeleton/EventsSkeleton'

export {
  CarousalEventsSkeleton,
  ErrorBoundry,
  EventsSkeleton,
  FeaturedCarouesel,
  FeaturedEvents,
  NearbyEvents,
  PopularEvents,
  Suspense,
}

export type { Metadata }
