import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Preloaded } from 'convex/react'

export type TicketType = 'free' | 'paid'

export interface Event {
  _id: Id<'events'>
  title: string
  city: string
  country: string
  ticketPrice?: number | undefined
  description: string
  locationType?: string
  category: string
  startDate: number
  endDate: number
  registrationCount: number
  coverImage?: string
  capacity?: number
  ticketType: TicketType
  tags?: string[]
  venue?: string
  address?: string
}

export interface EventCardProps {
  event: Event
  pointerEvent?: boolean
  isShow?: {
    tags?: boolean
    description?: boolean
    price?: boolean
    physical?: boolean
    edit?: boolean
    date?: boolean
  }
  isEdit?: boolean
}

export interface EventsListProps {
  preloadedEvents: Preloaded<typeof api.events.getEvent>
}
