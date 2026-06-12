import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Preloaded } from 'convex/react'

export type TicketType = 'free' | 'paid'

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
  ticketType: TicketType
  tags?: string[]
}

export interface EventCardProps {
  event: Event
  pointerEvent?: boolean
  isShow?: boolean
}

export interface EventsListProps {
  preloadedEvents: Preloaded<typeof api.events.getEvent>
}
