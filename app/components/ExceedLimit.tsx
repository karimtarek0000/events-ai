'use client'

import { PLAN_LIMITS, Plans } from '@/config'
import { useQuery } from 'convex/react'
import { useSearchParams } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { api } from '../../convex/_generated/api'

interface ExceedLimitProps extends PropsWithChildren {
  plan: Plans
}

const ExceedLimit = ({ plan, children }: ExceedLimitProps) => {
  const eventsCount = useQuery(api.users.getEventsCreatedCount)

  const searchParams = useSearchParams()
  const isEditEvent = searchParams.get('edit_event')

  if (eventsCount === undefined) {
    return <div></div>
  }

  const exceededLimit = eventsCount >= PLAN_LIMITS[plan] && !isEditEvent

  return exceededLimit ? (
    <p className="text-center">Exceeded the limit of create a new event</p>
  ) : (
    children
  )
}

export default ExceedLimit
