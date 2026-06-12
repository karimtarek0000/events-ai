'use client'

import { PLAN_LIMITS, Plans } from '@/config'
import { useQuery } from 'convex/react'
import { PropsWithChildren } from 'react'
import { api } from '../../convex/_generated/api'

interface ExceedLimitProps extends PropsWithChildren {
  plan: Plans
}

const ExceedLimit = ({ plan, children }: ExceedLimitProps) => {
  const eventsCount = useQuery(api.users.getEventsCreatedCount)

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
