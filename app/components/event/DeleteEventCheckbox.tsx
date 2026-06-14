'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Id } from '@/convex/_generated/dataModel'
import { memo, PropsWithChildren } from 'react'

interface DeleteEventProps extends PropsWithChildren {
  eventId: Id<'events'>
  checked: boolean
  changeChecked: (eventId: Id<'events'>) => void
}

const DeleteEventsCheckbox = ({ eventId, changeChecked, checked, children }: DeleteEventProps) => {
  return (
    <div className="space-y-2 mb-6">
      <Checkbox
        checked={checked}
        className="border-white"
        onCheckedChange={() => changeChecked(eventId)}
      />
      <>{children}</>
    </div>
  )
}

export default memo(DeleteEventsCheckbox)
