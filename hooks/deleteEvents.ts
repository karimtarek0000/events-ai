import { Id } from '@/convex/_generated/dataModel'
import { useCallback, useState } from 'react'

export const useDeleteEvents = (events: { _id: Id<'events'> }[]) => {
  const [selectAll, setSelectAll] = useState(false)
  const allEventsIds = events.map(e => e._id)
  const [ids, setIds] = useState<Id<'events'>[]>([])

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

  return { ids, selectAll, handleChangeChecked, handleSelectAll }
}
