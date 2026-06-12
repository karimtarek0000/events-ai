'use client'

import { Badge } from '@/components/ui/badge'
import { Plans } from '@/config'
import {
  api,
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
  useTransition,
  zodResolver,
} from './'

export default function CreateEventForm({ plan }: { plan: string }) {
  const router = useRouter()
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
        toast.success('Create a new event successfuly')
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
          <CardTitle className="flex justify-between">
            <span>Create New Event</span>
            <Badge className="capitalize font-bold text-[1rem] p-2">{plan}</Badge>
          </CardTitle>
          <CardDescription>Fill in the details below to create your event</CardDescription>
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
