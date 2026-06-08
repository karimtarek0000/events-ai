import { ConvexError, v } from 'convex/values'
import { internalMutation, mutation, query } from './_generated/server'

export const store = mutation({
  args: {},
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Called storeUser without authentication present')
    }

    // Check if we've already stored this identity before.
    // Note: If you don't want to define an index right away, you can use
    // ctx.db.query("users")
    //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    //  .unique();
    const user = await ctx.db
      .query('users')
      .withIndex('token', q => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name })
      }
      return user._id
    }

    // If it's a new identity, create a new `User`.
    return await ctx.db.insert('users', {
      clerkId: identity.subject,
      name: identity.name ?? 'Anonymous',
      tokenIdentifier: identity.tokenIdentifier,
      imageUrl: identity.pictureUrl ?? '',
      email: identity.email ?? '',
      hasCompletedOnboarding: false,
      freeEventsCreated: 1,
    })
  },
})

export const changeUserPlan = mutation({
  args: {
    clerkId: v.string(),
    plan: v.union(v.literal('free'), v.literal('starter'), v.literal('pro'), v.literal('max')),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', q => q.eq('clerkId', args.clerkId))
      .unique()

    if (!user) throw new ConvexError('User not found')

    if (user.plan !== args.plan) {
      await ctx.db.patch(user._id, { plan: args.plan })
    }
  },
})

export const getCurrentUser = query({
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Called storeUser without authentication present')
    }

    await ctx.db
      .query('users')
      .withIndex('token', q => q.eq('tokenIdentifier', identity.tokenIdentifier))
      .unique()
  },
})
