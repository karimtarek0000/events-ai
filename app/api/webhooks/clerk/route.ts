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

    const PLAN_ORDER: Record<string, number> = {
      free_user: 0,
      free: 0,
      starter: 1,
      pro: 2,
      max: 3,
    }

    const items = data?.items ?? []

    // الـ upcoming هو الـ plan الجديد عند الـ upgrade
    const upcomingItem = items
      .filter((item: any) => item?.status === 'upcoming')
      .sort(
        (a: any, b: any) => (PLAN_ORDER[b?.plan?.slug] ?? 0) - (PLAN_ORDER[a?.plan?.slug] ?? 0),
      )[0]

    // fallback للـ active لو مفيش upcoming
    const activeItem = items
      .filter((item: any) => item?.status === 'active')
      .sort(
        (a: any, b: any) => (PLAN_ORDER[b?.plan?.slug] ?? 0) - (PLAN_ORDER[a?.plan?.slug] ?? 0),
      )[0]

    const selectedItem = upcomingItem ?? activeItem

    const rawSlug = selectedItem?.plan?.slug ?? 'free_user'
    const plan = (rawSlug === 'free_user' ? 'free' : rawSlug) as Plans

    try {
      await fetchMutation(api.users.changeUserPlan, { clerkId, plan })
    } catch (err) {
      console.error('Mutation error:', err)
      return new Response('Failed to save plan', { status: 500 })
    }
  }

  return new Response('OK', { status: 200 })
}
