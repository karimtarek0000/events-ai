'use client'

import { revalidateEvent } from '@/actions/event.actions'
import { isEqual } from 'lodash-es'
import { useMemo } from 'react'
import {
  api,
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
  errorMessageHandle,
  EventFormValues,
  eventSchema,
  FormInput,
  FormOutput,
  FormProvider,
  LocationSection,
  toast,
  useForm,
  useMutation,
  useRouter,
  useSearchParams,
  useTransition,
  zodResolver,
} from '.'

const initialValues = {
  category: '',
  ticketType: 'free',
  startDate: '',
  endDate: '',
  locationType: '',
}

export default function EventForm({ plan }: { plan: string }) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const raw = searchParams.get('edit_event')
  const event = useMemo(() => (raw ? JSON.parse(decodeURIComponent(raw)) : null), [raw])

  const createEvent = useMutation(api.events.createAndUpdate)

  const [isPending, startTransition] = useTransition()

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(eventSchema),
    shouldUnregister: true,
    mode: 'onChange',
    values: event ?? initialValues,
  })
  const currentValues = form.watch()

  const isDirty = !isEqual(
    currentValues,
    Object.fromEntries(Object.keys(currentValues).map(key => [key, event?.[key]])),
  )

  const onSubmit = async (data: EventFormValues) => {
    startTransition(async () => {
      try {
        await createEvent({
          ...data,
          eventId: event?._id ?? undefined,
          category: data.category ?? '',
          startDate: data.startDate.getTime(),
          endDate: data.endDate.getTime(),
          tags: data.tags || [],
          ticketPrice: data.ticketType === 'paid' ? data.ticketPrice : undefined,
          venue: data.venue || undefined,
          address: data.address || undefined,
          state: data.state || undefined,
          themeColor: data.themeColor,
        })

        router.push('/events')
        toast.success(
          `${event?._id ? 'Has been edit an event successfully' : 'Has been created a new event successfully, Check your email'} `,
        )
        if (event?._id) {
          revalidateEvent(event._id)
        }
      } catch (err) {
        const errorMessage = errorMessageHandle(err)
        toast.error(errorMessage)
      }
    })
  }

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
