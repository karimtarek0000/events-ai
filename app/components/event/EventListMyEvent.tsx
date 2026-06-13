'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import { Trash } from 'lucide-react'
import { useCallback, useState } from 'react'
import NotFound from '../notFound/NotFound'
import DeleteEvent from './DeleteEvent'
import EventCard from './EventCard'

interface EventListMyEventProps {
  preloadedEvents: Preloaded<typeof api.events.getMyEvents>
}

const EventListMyEvent = ({ preloadedEvents }: EventListMyEventProps) => {
  const events = usePreloadedQuery(preloadedEvents)
  const [selectAll, setSelectAll] = useState(false)
  const allEventsIds = events.map(e => e._id)
  const [ids, setIds] = useState<string[]>([])

  const handleChangeChecked = useCallback(
    (eventId: Id<'events'>) => {
      if (ids.includes(eventId)) {
        setIds(prev => prev.filter(id => id !== eventId))
      } else {
        setIds(prev => [...prev, eventId])
      }
    },
    [ids],
  )

  const handleSelectAll = () => {
    setSelectAll(prev => !prev)

    if (!selectAll) {
      setIds(allEventsIds)
    } else {
      setIds([])
    }
  }

  return (
    <>
      <div className="flex justify-between w-full my-10">
        <Button onClick={handleSelectAll} variant="destructive" disabled={!ids.length}>
          <Trash className=" text-white" />
        </Button>
        <Button onClick={handleSelectAll}>{selectAll ? 'Unselect all' : 'Select all'}</Button>
      </div>
      <NotFound records={events}>
        <section className="space-y-6 w-full h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events?.map(event => (
              <DeleteEvent
                key={event._id}
                eventId={event._id}
                checked={ids.includes(event._id)}
                changeChecked={handleChangeChecked}
              >
                <EventCard event={event} />
              </DeleteEvent>
            ))}
          </div>
        </section>
      </NotFound>
    </>
  )
}

export default EventListMyEvent
