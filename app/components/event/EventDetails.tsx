import { Doc } from '@/convex/_generated/dataModel'
import EventCard from '../event/EventCard'

interface EventsDetailsProps {
  event: Doc<'events'> | null
}

const EventsDetails = ({ event }: EventsDetailsProps) => {
  if (!event) return null

  return (
    <EventCard
      event={event}
      pointerEvent
      isShow={{ tags: true, description: true, physical: true, date: true }}
      isPriority
    />
  )
}

export default EventsDetails
