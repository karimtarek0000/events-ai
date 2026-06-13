'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Id } from '@/convex/_generated/dataModel'
import { PropsWithChildren } from 'react'

interface DeleteEventProps extends PropsWithChildren {
  eventId: Id<'events'>
  checked: boolean
  changeChecked: (eventId: Id<'events'>) => void
}

const DeleteEvent = ({ eventId, changeChecked, checked, children }: DeleteEventProps) => {
  return (
    <div className="relative space-y-1">
      <Checkbox
        checked={checked}
        className="border-white"
        onCheckedChange={() => changeChecked(eventId)}
      />
      <div>{children}</div>
    </div>
  )
}

export default DeleteEvent
