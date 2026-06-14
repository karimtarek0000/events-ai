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

export function LocationSection() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<EventFormValues>()
  const locationType = watch('locationType')

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Location</h3>

      <div className="space-y-2 *:w-full sm:*:w-[50%]">
        <Label>Location Type *</Label>
        <Controller
          control={control}
          name="locationType"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.locationType && (
          <p className="text-sm text-destructive">{errors.locationType.message}</p>
        )}
      </div>

      {locationType === 'physical' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="venue">Venue Name *</Label>
            <Input id="venue" placeholder="Enter venue name" {...register('venue')} />
            {errors.venue && <p className="text-sm text-destructive">{errors.venue.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input id="address" placeholder="Enter full address" {...register('address')} />
            {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input id="country" placeholder="Enter country" {...register('country')} />
          {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" placeholder="Enter city" {...register('city')} />
          {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input id="state" placeholder="Enter state" {...register('state')} />
          {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
        </div>
      </div>
    </div>
  )
}
