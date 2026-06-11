'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import {
  RegisterFormValues,
  RegisterInput,
  RegisterOutput,
  registerSchema,
} from '@/validations/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { ConvexError } from 'convex/values'
import { redirect } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

interface RegisterFormProps {
  eventId: Id<'events'>
  preloadedEvents: Preloaded<typeof api.events.getEvent>
}

const RegisterForm = ({ eventId, preloadedEvents }: RegisterFormProps) => {
  const { capacity, registrationCount } = usePreloadedQuery(preloadedEvents)
  const remainCountForRegister = capacity - registrationCount

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const registerEvent = useMutation(api.register.registerForEvent)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {},
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null)

    startTransition(async () => {
      try {
        await registerEvent({ eventId, ...data })
        redirect('/')
      } catch (err) {
        const errorMessage =
          err instanceof ConvexError
            ? (err.data as string)
            : err instanceof Error
              ? err.message
              : 'Failed to create event'

        setError(errorMessage)
      }
    })
  }

  return (
    <>
      <h2 className="text-2xl my-5 text-center">Register in this event</h2>

      {error && (
        <div className="bg-destructive/10 text-center text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      )}

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
          max={remainCountForRegister}
          {...register('registerCount', { valueAsNumber: true })}
        />
        {errors.registerCount && (
          <p className="text-sm text-destructive">{errors.registerCount.message}</p>
        )}

        <Button type="submit" className="capitalize mt-5" disabled={isPending}>
          {isPending ? 'register event...' : 'register event'}
        </Button>
      </form>
    </>
  )
}

export default RegisterForm
