'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useDeleteEvents } from '@/hooks/deleteEvents'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { Trash } from 'lucide-react'
import NotFound from '../notFound/NotFound'
import DeleteEventCheckbox from './DeleteEventCheckbox'
import EventCard from './EventCard'

export interface EventListMyEventProps {
  preloadedEvents: Preloaded<typeof api.events.getMyEvents>
}

const EventListMyEvent = ({ preloadedEvents }: EventListMyEventProps) => {
  const events = usePreloadedQuery(preloadedEvents)
  const deleteEvents = useMutation(api.events.deleteEvents)
  const { ids, selectAll, handleChangeChecked, handleSelectAll, handleDeleteEvents } =
    useDeleteEvents(events, deleteEvents)

  return (
    <>
      {!!events.length && (
        <div className="flex justify-between w-full my-10">
          <Button onClick={handleDeleteEvents} variant="destructive" disabled={!ids.length}>
            <Trash className=" text-white" />
          </Button>
          <Button onClick={handleSelectAll}>{selectAll ? 'Unselect all' : 'Select all'}</Button>
        </div>
      )}

      <NotFound records={events}>
        <section className="space-y-6 w-full h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events?.map(event => (
              <DeleteEventCheckbox
                key={event._id}
                eventId={event._id}
                checked={ids.includes(event._id)}
                changeChecked={handleChangeChecked}
              >
                <EventCard event={event} isShow={{ tags: true, description: true, edit: true }} />
              </DeleteEventCheckbox>
            ))}
          </div>
        </section>
      </NotFound>
    </>
  )
}

export default EventListMyEvent
