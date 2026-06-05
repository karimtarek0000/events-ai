import { z } from 'zod'

const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

export const eventSchema = z
  .object({
    title: z.string({ error: 'Title is required' }).min(1, 'Title cannot be empty'),
    description: z
      .string({ error: 'Description is required' })
      .min(1, 'Description cannot be empty'),
    category: z.string().optional(),
    tags: z.string().transform(val =>
      val
        ?.split(',')
        .map(t => t.trim())
        .filter(Boolean),
    ),
    startDate: z.coerce.date({ error: 'Start date is required' }),
    endDate: z.coerce.date({ error: 'End date is required' }),
    timezone: z.string().default(() => Intl.DateTimeFormat().resolvedOptions().timeZone),
    locationType: z.enum(['physical', 'online'], {
      error: "Location type is required — must be 'physical' or 'online'",
    }),
    venue: z.string().optional(),
    address: z.string().optional(),
    city: z.string({ error: 'City is required' }).min(1, 'City cannot be empty'),
    state: z.string().optional(),
    country: z.string({ error: 'Country is required' }).min(1, 'Country cannot be empty'),
    capacity: z
      .number({ error: 'Capacity is required' })
      .int('Capacity must be a whole number')
      .positive('Capacity must be greater than 0'),
    ticketType: z.enum(['free', 'paid']).default('free'),
    ticketPrice: z.number().positive('Price must be greater than 0').optional(),
    coverImage: z
      .string({ error: 'Cover image is required' })
      .url('Cover image must be a valid URL'),
    themeColor: z
      .string()
      .transform(val => (val === '' ? undefined : val))
      .pipe(
        z.string().regex(HEX_COLOR_REGEX, 'Must be a valid hex color (e.g. #3b82f6)').optional(),
      ),
  })
  .refine(
    data => data.locationType !== 'physical' || (data.venue && data.venue.trim().length > 0),
    { message: 'Venue is required for physical events', path: ['venue'] },
  )
  .refine(
    data => data.locationType !== 'physical' || (data.address && data.address.trim().length > 0),
    { message: 'Address is required for physical events', path: ['address'] },
  )
  .refine(
    data => data.ticketType !== 'paid' || (data.ticketPrice !== undefined && data.ticketPrice > 0),
    { message: 'Ticket price is required for paid events', path: ['ticketPrice'] },
  )

export type FormInput = z.input<typeof eventSchema>
export type FormOutput = z.output<typeof eventSchema>
export type EventFormValues = z.output<typeof eventSchema>
export type EventFormInput = z.input<typeof eventSchema>
