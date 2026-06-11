import { z } from 'zod'

export const registerSchema = z.object({
  attendeeName: z.string({ error: 'Title is required' }).min(1, 'Name cannot be empty'),
  attendeeEmail: z.email({ error: 'Email is not valid' }),
  registerCount: z
    .number({ error: 'Capacity is required' })
    .int('Capacity must be a whole number')
    .positive('Capacity must be greater than 0'),
})

export type RegisterInput = z.input<typeof registerSchema>
export type RegisterOutput = z.output<typeof registerSchema>
export type RegisterFormValues = z.output<typeof registerSchema>
export type RegisterFormInput = z.input<typeof registerSchema>
