import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EventFormValues } from '@/validations/events.schema'
import { useFormContext } from 'react-hook-form'

export function CustomizationSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EventFormValues>()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Customization (Optional)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL *</Label>
          <Input
            id="coverImage"
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register('coverImage')}
          />
          {errors.coverImage && (
            <p className="text-sm text-destructive">{errors.coverImage.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="themeColor">Theme Color (Hex)</Label>
          <Input id="themeColor" placeholder="#3b82f6" {...register('themeColor')} />
          {errors.themeColor && (
            <p className="text-sm text-destructive">{errors.themeColor.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
