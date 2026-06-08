import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { PLANS, Plans } from '../config'

// Query
export const getFeaturedEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const events = await ctx.db
      .query('events')
      .withIndex('by_start_date')
      .filter(q => q.gte(q.field('startDate'), now))
      .order('desc')
      .collect()

    return events.slice(0, args.limit ?? 4)
  },
})

export const getEventsByLocation = query({
  args: {
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()

    let events = await ctx.db
      .query('events')
      .withIndex('by_start_date')
      .filter(q => q.gte(q.field('startDate'), now))
      .collect()

    if (args.city) {
      events = events.filter(e => e.city.toLowerCase() === args.city?.toLowerCase())
    }

    if (args.state) {
      events = events.filter(e => e.state?.toLowerCase() === args.state?.toLowerCase())
    }

    return events.slice(0, args.limit ?? 4)
  },
})

export const getPopularEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()

    const events = await ctx.db
      .query('events')
      .withIndex('by_start_date')
      .filter(q => q.gte(q.field('startDate'), now))
      .collect()

    const popular = events
      .sort((a, b) => b.registrationCount - a.registrationCount)
      .slice(0, args.limit ?? 6)

    return popular
  },
})

export const getEventsCategory = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()

    const events = await ctx.db
      .query('events')
      .withIndex('by_category')
      .filter(q => q.gte(q.field('startDate'), now))
      .collect()

    const popular = events.slice(0, args.limit ?? 5)

    return popular
  },
})

export const getMyEventsCount = query({
  args: {},
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return 0

    const user = await ctx.db
      .query('users')
      .withIndex('token', q => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()

    if (!user) return 0

    const events = await ctx.db
      .query('events')
      .withIndex('by_organizer', q => q.eq('organizerId', user._id))
      .collect()

    return events.length
  },
})

export const getMyEvents = query({
  args: {},
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const user = await ctx.db
      .query('users')
      .withIndex('token', q => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()

    if (!user) return []

    return await ctx.db
      .query('events')
      .withIndex('by_organizer', q => q.eq('organizerId', user._id))
      .order('desc') // Newest first
      .collect()
  },
})

export const getEventByLocation = query({
  args: {
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()

    let events = await ctx.db
      .query('events')
      .withIndex('by_start_date')
      .filter(q => q.gte(q.field('startDate'), now))
      .collect()

    if (args.city) {
      events = events.filter(e => e.city.toLowerCase() === args.city?.toLowerCase())
    }

    if (args.state) {
      events = events.filter(e => e.state && e.state.toLowerCase() === args.state?.toLowerCase())
    }

    return events.slice(0, args.limit ?? 4)
  },
})

export const deleteEvent = mutation({
  args: {
    eventId: v.id('events'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError('Unauthenticated')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('token', q => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    const event = await ctx.db.get(args.eventId)
    if (!event) {
      throw new ConvexError('Event not found')
    }

    // Verify ownership
    if (event.organizerId !== user._id) {
      throw new ConvexError('You are not authorized to delete this event')
    }

    // Delete the event
    await ctx.db.delete(args.eventId)

    return { success: true }
  },
})

// Mutations
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    tags: v.array(v.string()),

    startDate: v.number(),
    endDate: v.number(),
    timezone: v.string(),

    locationType: v.union(v.literal('physical'), v.literal('online')),
    venue: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.string(),
    state: v.optional(v.string()),
    country: v.string(),

    capacity: v.number(),
    ticketType: v.union(v.literal('free'), v.literal('paid')),
    ticketPrice: v.optional(v.number()),

    coverImage: v.optional(v.string()),
    themeColor: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    /* ---------- AUTH ---------- */
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError('Unauthenticated')
    }

    /* ---------- USER ---------- */
    const user = await ctx.db
      .query('users')
      .withIndex('token', q => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    /* ---------- PLAN CHECK ---------- */

    const plan = PLANS[user.plan as Plans] ?? 'free'

    if (plan && user.freeEventsCreated > 1) {
      throw new ConvexError('Free plan allows only 1 event')
    }

    if (plan === 'starter' && user.freeEventsCreated > 3) {
      throw new ConvexError('Starter plan allows only 3 event')
    }

    if (plan === 'pro' && user.freeEventsCreated > 10) {
      throw new ConvexError('Pro plan allows only 10 event')
    }

    if ((plan === 'starter' || plan) && args.ticketType === 'paid') {
      throw new ConvexError('Paid events require at least Pro plan')
    }

    if (plan === 'max' && args.themeColor) {
      throw new ConvexError('Custom theme color requires Max plan')
    }

    /* ---------- SLUG ---------- */
    const slug =
      args.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Date.now().toString(36)

    const now = Date.now()

    /* ---------- CREATE EVENT ---------- */
    const eventId = await ctx.db.insert('events', {
      title: args.title,
      description: args.description,
      slug,

      organizerId: user._id,
      organizerName: user.name,

      category: args.category,
      tags: args.tags,

      startDate: args.startDate,
      endDate: args.endDate,
      timezone: args.timezone,

      locationType: args.locationType,
      venue: args.venue,
      address: args.address,
      city: args.city,
      state: args.state,
      country: args.country,

      capacity: args.capacity,
      ticketType: args.ticketType,
      ticketPrice: args.ticketPrice,

      registrationCount: 0,

      coverImage: args.coverImage,
      themeColor: plan === 'max' ? args.themeColor : undefined,

      createdAt: now,
      updatedAt: now,
    })

    /* ---------- UPDATE COUNTER ---------- */
    if (plan !== 'max') {
      await ctx.db.patch(user._id, {
        freeEventsCreated: user.freeEventsCreated + 1,
      })
    }

    return eventId
  },
})
