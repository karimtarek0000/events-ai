import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EventFormValues } from '@/validations/events.schema'
import { Controller, useFormContext } from 'react-hook-form'

export function CapacitySection() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<EventFormValues>()
  const ticketType = watch('ticketType')

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Capacity & Ticketing</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity *</Label>
          <Input
            id="capacity"
            type="number"
            min="1"
            placeholder="Enter capacity"
            {...register('capacity', { valueAsNumber: true })}
          />
          {errors.capacity && <p className="text-sm text-destructive">{errors.capacity.message}</p>}
        </div>

        <div className="space-y-2 *:w-full">
          <Label>Ticket Type</Label>
          <Controller
            control={control}
            name="ticketType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {ticketType === 'paid' && (
        <div className="space-y-2">
          <Label htmlFor="ticketPrice">Ticket Price *</Label>
          <Input
            id="ticketPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter price"
            {...register('ticketPrice', { valueAsNumber: true })}
          />
          {errors.ticketPrice && (
            <p className="text-sm text-destructive">{errors.ticketPrice.message}</p>
          )}
        </div>
      )}
    </div>
  )
}
