import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Preloaded } from 'convex/react'

export interface Event {
  _id: Id<'events'>
  title: string
  city: string
  country: string
  description: string
  startDate: number
  registrationCount: number
  coverImage?: string
  capacity?: number
}

export interface EventCardProps {
  event: Event
  pointerEvent?: boolean
  showDescription?: boolean
}

export interface EventsListProps {
  preloadedEvents: Preloaded<typeof api.events.getEvent>
}
