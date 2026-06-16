import { ConvexError, v } from 'convex/values'
import { api } from './_generated/api'
import { action, mutation } from './_generated/server'

export const sendConfirmationEmail = action({
  args: {
    attendeeName: v.string(),
    attendeeEmail: v.string(),
    eventName: v.string(),
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const res = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { email: process.env.MAILERSEND_EMAIL_FROM },
        to: [{ email: args.attendeeEmail }],
        subject: `You're registered for ${args.eventName}!`,
        template_id: 'o65qngk1xejlwr12',
        personalization: [
          {
            email: args.attendeeEmail,
            data: {
              attendeeName: args.attendeeName,
              eventName: args.eventName,
              startDate: new Date(args.startDate).toLocaleDateString(),
              endDate: new Date(args.endDate).toLocaleDateString(),
            },
          },
        ],
      }),
    })

    if (!res.ok) {
      const data = await res.json() // ← only parse JSON on error
      throw new Error(`MailerSend error: ${JSON.stringify(data)}`)
    }
  },
})

export const registerForEvent = mutation({
  args: {
    eventId: v.id('events'),
    attendeeName: v.string(),
    attendeeEmail: v.string(),
    registerCount: v.number(),
    totalAmount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // 1. Check duplicate
    const existing = await ctx.db
      .query('registrations')
      .withIndex('by_event_and_email', q =>
        q.eq('eventId', args.eventId).eq('attendeeEmail', args.attendeeEmail),
      )
      .unique()

    if (existing) throw new ConvexError('This email is already registered for this event.')

    // 2. Get event
    const event = await ctx.db.get(args.eventId)
    if (!event) throw new ConvexError('Event not found.')

    // 3. Insert registration
    await ctx.db.insert('registrations', {
      eventId: args.eventId,
      attendeeName: args.attendeeName,
      attendeeEmail: args.attendeeEmail,
      registerCount: args.registerCount,
      totalAmount: args.totalAmount,
    })

    if (args.registerCount > event.capacity - event.registrationCount) {
      throw new ConvexError('Registration count is grather than remaning of capacity')
    }

    // 4. Increment registrationCount on the event
    await ctx.db.patch(args.eventId, {
      registrationCount: (event.registrationCount ?? 0) + args.registerCount,
    })

    // 5. Schedule confirmation email
    await ctx.scheduler.runAfter(0, api.register.sendConfirmationEmail, {
      attendeeName: args.attendeeName,
      attendeeEmail: args.attendeeEmail,
      eventName: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
    })
  },
})
