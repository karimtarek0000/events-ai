'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery } from 'convex/react'
import { format } from 'date-fns'
import { ChevronDownIcon, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateEventForm() {
  const { user, isLoaded } = useUser()
  const plan = user?.publicMetadata?.plan ?? 'free'
  const isPro = plan === 'pro' || plan === 'starter'

  const eventsCount = useQuery(api.events.getMyEventsCount)
  const reachedLimit = !isPro && (eventsCount ?? 0) >= 1

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createEvent = useMutation(api.events.create)
  const [error, setError] = useState<string | null>(null)
  const [startOpen, setStartOpen] = useState(false)
  const [endOpen, setEndOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    startDate: '',
    endDate: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locationType: 'physical' as 'physical' | 'online',
    venue: '',
    address: '',
    city: '',
    state: '',
    country: '',
    capacity: '',
    ticketType: 'free' as 'free' | 'paid',
    ticketPrice: '',
    coverImage: '',
    themeColor: '',
  })

  if (!isLoaded) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Date | undefined, isEndDate: boolean) => {
    if (!date) return
    const fieldName = isEndDate ? 'endDate' : 'startDate'
    setFormData(prev => ({
      ...prev,
      [fieldName]: date.toISOString().slice(0, 16),
    }))
  }

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      //   if (reachedLimit) {
      //     throw new Error('Free plan allows creating only 1 event. Upgrade to Pro.')
      //   }
      // Parse tags from comma-separated string
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      // Convert dates to timestamps
      const startDate = new Date(formData.startDate).getTime()
      const endDate = new Date(formData.endDate).getTime()

      // Validate dates
      if (startDate >= endDate) {
        throw new Error('End date must be after start date')
      }

      if (startDate < Date.now()) {
        throw new Error('Start date must be in the future')
      }

      await createEvent({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: tags,
        startDate: startDate,
        endDate: endDate,
        timezone: formData.timezone,
        locationType: formData.locationType,
        venue: formData.venue || undefined,
        address: formData.address || undefined,
        city: formData.city,
        state: formData.state || undefined,
        country: formData.country,
        capacity: parseInt(formData.capacity) || 0,
        ticketType: formData.ticketType,
        ticketPrice:
          formData.ticketType === 'paid' && formData.ticketPrice
            ? parseFloat(formData.ticketPrice)
            : undefined,
        coverImage: formData.coverImage || undefined,
        themeColor: formData.themeColor || undefined,
      })

      // Redirect to home page after successful creation
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>Fill in the details below to create your event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md">{error}</div>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your event"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={value => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="tech, networking, AI"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <hr />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Date & Time</h3>
              <FieldGroup className="flex flex-row justify-between w-full">
                <FieldGroup className="max-w-xs flex-row">
                  <Field>
                    <FieldLabel htmlFor="start-date-picker">Start Date</FieldLabel>
                    <Popover open={startOpen} onOpenChange={setStartOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="start-date-picker"
                          className="w-32 justify-between font-normal"
                        >
                          {formData.startDate
                            ? format(new Date(formData.startDate), 'PPP')
                            : 'Pick a date'}
                          <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.startDate ? new Date(formData.startDate) : undefined}
                          defaultMonth={
                            formData.startDate ? new Date(formData.startDate) : undefined
                          }
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

                  <Field className="w-32">
                    <FieldLabel htmlFor="start-time-picker">Start Time</FieldLabel>
                    <Input
                      type="time"
                      id="start-time-picker"
                      step="1"
                      value={formData.startDate ? formData.startDate.slice(11) : ''}
                      onChange={handleChange}
                      className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      required
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup className="max-w-xs flex-row">
                  <Field>
                    <FieldLabel htmlFor="end-date-picker">End Date</FieldLabel>
                    <Popover open={endOpen} onOpenChange={setEndOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="end-date-picker"
                          className="w-32 justify-between font-normal"
                        >
                          {formData.endDate
                            ? format(new Date(formData.endDate), 'PPP')
                            : 'Pick a date'}
                          <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.endDate ? new Date(formData.endDate) : undefined}
                          defaultMonth={formData.endDate ? new Date(formData.endDate) : undefined}
                          captionLayout="dropdown"
                          onSelect={date => {
                            handleDateChange(date, true)
                            setEndOpen(false)
                          }}
                          disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>

                  <Field className="w-32">
                    <FieldLabel htmlFor="end-time-picker">End Time</FieldLabel>
                    <Input
                      type="time"
                      id="end-time-picker"
                      step="1"
                      value={formData.endDate ? formData.endDate.slice(11) : ''}
                      onChange={handleChange}
                      className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      required
                    />
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location</h3>

              <div className="space-y-2">
                <Label htmlFor="locationType">Location Type *</Label>
                <Select
                  value={formData.locationType}
                  onValueChange={value =>
                    handleSelectChange('locationType', value as 'physical' | 'online')
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.locationType === 'physical' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue Name</Label>
                    <Input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="Enter venue name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter full address"
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>

            {/* Capacity & Ticketing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Capacity & Ticketing</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    type="number"
                    id="capacity"
                    name="capacity"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Enter capacity"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticketType">Ticket Type *</Label>
                  <Select
                    value={formData.ticketType}
                    onValueChange={value =>
                      handleSelectChange('ticketType', value as 'free' | 'paid')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.ticketType === 'paid' && (
                <div className="space-y-2">
                  <Label htmlFor="ticketPrice">Ticket Price</Label>
                  <Input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    min="0"
                    step="0.01"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    placeholder="Enter price"
                  />
                </div>
              )}
            </div>

            {/* Customization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customization (Optional)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input
                    type="url"
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="themeColor">Theme Color (Hex)</Label>
                  <Input
                    type="text"
                    id="themeColor"
                    name="themeColor"
                    value={formData.themeColor}
                    onChange={handleChange}
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              {/* <Button type="submit" disabled={isSubmitting} className="flex-1">
                {reachedLimit
                  ? 'Upgrade to create more events'
                  : isSubmitting
                    ? 'Creating Event...'
                    : 'Create Event'}
              </Button> */}
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Creating Event...' : 'Create Event'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
