import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { confirmModal, errorMessageHandle } from '@/utils'
import type { ReactMutation } from 'convex/react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export const useDeleteEvents = (
  events: { _id: Id<'events'> }[],
  deleteEvents: ReactMutation<typeof api.events.deleteEvents>,
) => {
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

  const handleDeleteEvents = async () => {
    confirmModal.toggleModal()
    confirmModal.fnForConfirm = async () => {
      try {
        await deleteEvents({ eventIds: ids })
        setIds([])
        confirmModal.toggleModal(false)
        toast.success('Events has been deleted successfully')
      } catch (err) {
        const message = errorMessageHandle(err)
        toast.error(message)
      }
    }
  }

  return { ids, selectAll, handleChangeChecked, handleSelectAll, handleDeleteEvents }
}
