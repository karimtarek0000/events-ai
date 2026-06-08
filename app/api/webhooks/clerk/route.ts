import { WebhookEvent } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { fetchMutation } from 'convex/nextjs'
import { NextRequest } from 'next/server'
import { Plans } from '../../../../config'
import { api } from '../../../../convex/_generated/api'

export async function POST(req: NextRequest) {
  let evt: WebhookEvent
  try {
    evt = (await verifyWebhook(req)) as WebhookEvent
  } catch {
    return new Response('Unauthorized', { status: 401 })
  }

  if (evt.type === 'subscription.updated') {
    const data = evt.data as any

    const clerkId = data?.payer?.user_id
    const rawName = data?.items?.[data.items.length - 1]?.plan?.slug ?? ''
    const plan = rawName.replace(/[-\s]*plan$/i, '') as Plans

    try {
      await fetchMutation(api.users.changeUserPlan, { clerkId, plan })
    } catch (err) {
      console.error('Mutation error:', err)
      return new Response('Failed to save plan', { status: 500 })
    }
  }

  return new Response('OK', { status: 200 })
}
