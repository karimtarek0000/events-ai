import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar, ChevronDownIcon } from 'lucide-react'
import { format } from 'path'

const FieldDate = () => {
  return (
    <Field>
      <FieldLabel htmlFor="start-date-picker">Start Date</FieldLabel>
      <Popover open={startOpen} onOpenChange={setStartOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="start-date-picker"
            className="w-32 justify-between font-normal"
          >
            {formData.startDate ? format(new Date(formData.startDate), 'PPP') : 'Pick a date'}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={formData.startDate ? new Date(formData.startDate) : undefined}
            defaultMonth={formData.startDate ? new Date(formData.startDate) : undefined}
            captionLayout="dropdown"
            onSelect={date => {
              handleDateChange(date, false)
              setStartOpen(false)
            }}
            disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

export default FieldDate
