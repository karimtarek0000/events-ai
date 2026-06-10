'use client'

import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { PropsWithChildren } from 'react'
import { api } from '../../convex/_generated/api'

export type Plans = 'free' | 'starter' | 'pro' | 'max'
const PLANS_Limits = {
  free: 1,
  starter: 3,
  pro: 10,
  max: -Infinity,
} as const

interface ExceedLimitProps extends PropsWithChildren {
  plan: Plans
}

const ExceedLimit = ({ plan, children }: ExceedLimitProps) => {
  const eventsCount = useQuery(api.events.getMyEventsCount) || 0

  if (eventsCount === undefined) return

  const exceededLimit = eventsCount >= PLANS_Limits[plan]

  return exceededLimit ? (
    <p className="text-center">Exceeded the limit of create a new event</p>
  ) : (
    children
  )
}

export default ExceedLimit
