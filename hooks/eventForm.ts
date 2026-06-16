'use client'

import { revalidateEvent } from '@/actions/event.actions'
import {
  api,
  errorMessageHandle,
  EventFormValues,
  eventSchema,
  FormInput,
  FormOutput,
  toast,
  useForm,
  useMutation,
  useRouter,
  useSearchParams,
  useTransition,
  zodResolver,
} from '@/app/components/event'
import { isEqual } from 'lodash-es'
import { useMemo } from 'react'

const initialValues = {
  category: '',
  ticketType: 'free',
  startDate: '',
  endDate: '',
  locationType: '',
}

export const useEventForm = () => {
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

  return {
    event,
    form,
    isDirty,
    isPending,
    onSubmit,
  }
}
