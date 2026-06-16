'use client'

import { useEventForm } from '@/hooks/eventForm'
import router from 'next/router'
import {
  Badge,
  BasicInfoSection,
  Button,
  CapacitySection,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CustomizationSection,
  DateTimeSection,
  FormProvider,
  LocationSection,
} from '.'

export default function EventForm({ plan }: { plan: string }) {
  const { event, form, isDirty, isPending, onSubmit } = useEventForm()

  return (
    <div className="max-w-4xl mx-auto px-4 py-5">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between capitalize">
            <span>{event?._id ? 'edit event' : 'create new event'}</span>
            <Badge className="capitalize font-bold text-[1rem] p-2">{plan}</Badge>
          </CardTitle>

          <CardDescription>
            {event?._id
              ? 'Edit in the details below'
              : 'Fill in the details below to create your event'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Button
                  type="submit"
                  disabled={isPending || !isDirty}
                  className="flex-1 capitalize"
                >
                  {isPending
                    ? `${event?._id ? 'editing event' : 'creating event'}...`
                    : `${event?._id ? 'edit event' : 'create event'}`}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
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
