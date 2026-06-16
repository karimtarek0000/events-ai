import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    tokenIdentifier: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    hasCompletedOnboarding: v.boolean(),
    location: v.optional(
      v.object({
        city: v.string(),
        state: v.optional(v.string()),
        country: v.string(),
      }),
    ),
    interests: v.optional(v.array(v.string())),
    eventsCreatedCount: v.number(),
    plan: v.optional(
      v.union(v.literal('free'), v.literal('starter'), v.literal('pro'), v.literal('max')),
    ),
  })
    .index('token', ['tokenIdentifier'])
    .index('by_clerk_id', ['clerkId']),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    slug: v.string(),

    // Organizer
    organizerId: v.id('users'),
    organizerName: v.string(),

    // Event details
    category: v.string(),
    tags: v.array(v.string()),

    // Date & Time
    startDate: v.number(),
    endDate: v.number(),
    timezone: v.string(),

    // Location
    locationType: v.union(v.literal('physical'), v.literal('online')),
    venue: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.string(),
    state: v.optional(v.string()), // Added state field
    country: v.string(),

    // Capacity & Ticketing
    capacity: v.number(),
    ticketType: v.union(v.literal('free'), v.literal('paid')),
    ticketPrice: v.optional(v.number()), // Paid at event offline
    registrationCount: v.number(),

    // Customization
    coverImage: v.optional(v.string()),
    themeColor: v.optional(v.string()),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_organizer', ['organizerId'])
    .index('by_category', ['category'])
    .index('by_start_date', ['startDate'])
    .index('by_slug', ['slug'])
    .searchIndex('search_title', { searchField: 'title' }),

  registrations: defineTable({
    eventId: v.id('events'),
    attendeeName: v.string(),
    attendeeEmail: v.string(),
    registerCount: v.number(),
    totalAmount: v.optional(v.number()),
  })
    .index('by_event', ['eventId'])
    .index('by_event_and_email', ['eventId', 'attendeeEmail']),
})
