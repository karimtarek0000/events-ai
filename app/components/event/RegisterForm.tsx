'use client'

import { revalidateEvent } from '@/actions/event.actions'
import {
  api,
  Button,
  errorMessageHandle,
  Id,
  Input,
  Label,
  RegisterFormValues,
  RegisterInput,
  RegisterOutput,
  registerSchema,
  toast,
  useForm,
  useMutation,
  useRouter,
  useTransition,
  zodResolver,
} from './'

const TotalAmount = ({
  registerCount,
  eventMount = 0,
}: {
  registerCount: number
  eventMount: number | undefined
}) => {
  return (
    !!eventMount &&
    !!registerCount && (
      <p className="text-center mt-5">
        Total of amount:
        <span className="font-bold mx-2">
          $
          {(registerCount * eventMount).toLocaleString('en-US', {
            maximumFractionDigits: 2,
          })}
        </span>
        must be paid in the day of event
      </p>
    )
  )
}

const RegisterForm = ({ eventId, eventMount }: { eventId: Id<'events'>; eventMount?: number }) => {
  const [isPending, startTransition] = useTransition()
  const { push } = useRouter()

  const registerEvent = useMutation(api.register.registerForEvent)

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {},
  })

  const registerCount = watch('registerCount') || 0

  const onSubmit = async (data: RegisterFormValues) => {
    startTransition(async () => {
      try {
        await registerEvent({ eventId, ...data })
        push('/events')
        toast.success('Registration done, See you there!')
        revalidateEvent(eventId)
      } catch (err) {
        const errorMessage = errorMessageHandle(err)
        toast.error(errorMessage)
      }
    })
  }

  return (
    <>
      <h2 className="text-2xl my-5 text-center">Register in this event 🚀</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col w-full max-sm:px-5 lg:w-[60%] mx-auto"
      >
        <Label htmlFor="name">Enter attend name *</Label>
        <Input id="name" placeholder="Attend name" {...register('attendeeName')} />
        {errors.attendeeName && (
          <p className="text-sm text-destructive">{errors.attendeeName.message}</p>
        )}

        <Label htmlFor="email">Enter attend email *</Label>
        <Input id="email" placeholder="Attend email" {...register('attendeeEmail')} />
        {errors.attendeeEmail && (
          <p className="text-sm text-destructive">{errors.attendeeEmail.message}</p>
        )}

        <Label htmlFor="registerCount">Enter count of register *</Label>
        <Input
          id="registerCount"
          type="number"
          placeholder="Count of register"
          {...register('registerCount', { valueAsNumber: true })}
        />
        {errors.registerCount && (
          <p className="text-sm text-destructive">{errors.registerCount.message}</p>
        )}

        <TotalAmount eventMount={eventMount} registerCount={registerCount} />

        <Button type="submit" className="capitalize mt-5" disabled={isPending}>
          {isPending ? 'register event...' : 'register event'}
        </Button>
      </form>
    </>
  )
}

export default RegisterForm
