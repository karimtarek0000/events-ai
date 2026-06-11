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
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com',
        to: args.attendeeEmail,
        subject: `You're registered for ${args.eventName}!`,
        html: `
          <h2>Hi ${args.attendeeName}!</h2>
          <p>You're confirmed for <strong>${args.eventName}</strong>.</p>
          <p>Start Date: ${args.startDate}</p>
          <p>End Date: ${args.endDate}</p>
          <p>See you there soon!</p>
        `,
      }),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(`Resend error: ${JSON.stringify(error)}`)
    }
  },
})

export const registerForEvent = mutation({
  args: {
    eventId: v.id('events'),
    attendeeName: v.string(),
    attendeeEmail: v.string(),
    capacity: v.number(),
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

    // 2. Get event details for the email
    const event = await ctx.db.get(args.eventId)
    if (!event) throw new ConvexError('Event not found.')

    // 3. Insert registration
    await ctx.db.insert('registrations', {
      eventId: args.eventId,
      attendeeName: args.attendeeName,
      attendeeEmail: args.attendeeEmail,
      capacity: args.capacity,
    })

    // 4. Schedule confirmation email
    await ctx.scheduler.runAfter(0, api.register.sendConfirmationEmail, {
      attendeeName: args.attendeeName,
      attendeeEmail: args.attendeeEmail,
      eventName: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
    })
  },
})
