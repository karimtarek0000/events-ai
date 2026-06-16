'use client'

import { api } from '@/convex/_generated/api'
import { useDeleteEvents } from '@/hooks/deleteEvents'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import NotFound from '../notFound/NotFound'
import DeleteEventCheckbox from './DeleteEventCheckbox'
import EventCard from './EventCard'
import MyEventsToolBar from './MyEventsToolBar'

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
      <MyEventsToolBar
        showComp={!!events.length}
        selectAll={selectAll}
        handleDeleteEvents={handleDeleteEvents}
        handleSelectAll={handleSelectAll}
        isDisabled={!ids.length}
      />

      <NotFound records={events}>
        <section className="event-list-wrapper">
          {events?.map((event, i) => (
            <DeleteEventCheckbox
              key={event._id}
              eventId={event._id}
              checked={ids.includes(event._id)}
              changeChecked={handleChangeChecked}
            >
              <EventCard
                event={event}
                isShow={{ tags: true, description: true, edit: true }}
                isPriority={i < 3}
              />
            </DeleteEventCheckbox>
          ))}
        </section>
      </NotFound>
    </>
  )
}

export default EventListMyEvent
