import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

interface MyEventsToolBarProps {
  showComp: boolean
  handleDeleteEvents: () => void
  handleSelectAll: () => void
  selectAll: boolean
  isDisabled: boolean
}

const MyEventsToolBar = ({
  showComp,
  handleDeleteEvents,
  handleSelectAll,
  selectAll,
  isDisabled,
}: MyEventsToolBarProps) => {
  return (
    showComp && (
      <div className="flex justify-between w-full my-10">
        <Button onClick={handleDeleteEvents} variant="destructive" disabled={isDisabled}>
          <Trash className=" text-white" />
        </Button>
        <Button onClick={handleSelectAll}>{selectAll ? 'Unselect all' : 'Select all'}</Button>
      </div>
    )
  )
}

export default MyEventsToolBar
