import { auth, clerkClient } from '@clerk/nextjs/server'
import CreateEventForm from '../components/event/CreateEventForm'
import ExceedLimit, { type Plans } from '../components/ExceedLimit'

export async function getUserPlan() {
  const { userId } = await auth.protect()
  const client = await clerkClient()

  try {
    // Fetch the active subscription details from Clerk
    const subscription = await client.billing.getUserBillingSubscription(userId)
    // Safely check if a subscription and active items exist
    const activeItem = subscription?.subscriptionItems?.[0]
    if (!activeItem) {
      return { planId: null, slug: null, name: 'Free/No Plan' }
    }
    // Extract details from the nested plan object
    return {
      // planId: activeItem.planId, // e.g., 'cplan_3EpXjfa...'
      // slug: activeItem.plan?.slug || null, // e.g., 'pro-plan'
      name: activeItem.plan?.name.toLowerCase(), // e.g., 'Pro Plan'
      // status: subscription.status, // e.g., 'active'
    }
  } catch {
    return { name: 'Free/No Plan' }
  }
}

export default async function Page() {
  const plan = await getUserPlan()

  return (
    <ExceedLimit plan={plan.name as Plans}>
      <CreateEventForm />
    </ExceedLimit>
  )
}
