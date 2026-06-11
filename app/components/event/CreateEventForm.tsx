'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { errorMessageHandle } from '@/utils'
import { EventFormValues, eventSchema, FormInput, FormOutput } from '@/validations/events.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { ConvexError } from 'convex/values'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BasicInfoSection } from './form-sections/BasicInfoSection'
import { CapacitySection } from './form-sections/CapacitySection'
import { CustomizationSection } from './form-sections/CustomizationSection'
import { DateTimeSection } from './form-sections/DateTimeSection'
import { LocationSection } from './form-sections/LocationSection'

export default function CreateEventForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const createEvent = useMutation(api.events.create)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(eventSchema),
    shouldUnregister: true,
    mode: 'onChange',
    defaultValues: {},
  })

  const onSubmit = async (data: EventFormValues) => {
    startTransition(async () => {
      setError(null)
      try {
        await createEvent({
          ...data,
          category: data.category ?? '',
          startDate: data.startDate.getTime(),
          endDate: data.endDate.getTime(),
          ticketPrice: data.ticketType === 'paid' ? data.ticketPrice : undefined,
          venue: data.venue || undefined,
          address: data.address || undefined,
          state: data.state || undefined,
          themeColor: data.themeColor || undefined,
        })

        router.push('/')
      } catch (err) {
        const errorMessage = errorMessageHandle(err)
        setError(errorMessage)
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-5">
      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>Fill in the details below to create your event</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 text-center text-destructive px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <BasicInfoSection />
              <hr />
              <DateTimeSection />
              <hr />
              <LocationSection />
              <hr />
              <CapacitySection />
              <hr />
              <CustomizationSection />

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending ? 'Creating Event...' : 'Create Event'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/explore')}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
