'use client'
import { useQuery } from 'convex/react'
import { PropsWithChildren } from 'react'
import { api } from '../../convex/_generated/api'

export type Plans = 'free' | 'starter' | 'pro' | 'max'

const PLAN_LIMITS: Record<Plans, number> = {
  free: 1,
  starter: 3,
  pro: 10,
  max: Infinity,
}

interface ExceedLimitProps extends PropsWithChildren {
  plan: Plans
}

const ExceedLimit = ({ plan, children }: ExceedLimitProps) => {
  const eventsCount = useQuery(api.events.getMyEventsCount)

  if (eventsCount === undefined) {
    return <div></div>
  }

  const exceededLimit = eventsCount >= PLAN_LIMITS[plan]

  return exceededLimit ? (
    <p className="text-center">Exceeded the limit of create a new event</p>
  ) : (
    children
  )
}

export default ExceedLimit
