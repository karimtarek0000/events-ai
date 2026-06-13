import { Plans } from '@/config'
import { getUserPlan } from '@/utils/index.server'
import ExceedLimit from '../../components/ExceedLimit'
import EventForm from '../../components/event/EventForm'

export default async function Page() {
  const plan = await getUserPlan()

  return (
    <ExceedLimit plan={plan.name as Plans}>
      <EventForm plan={plan.name!} />
    </ExceedLimit>
  )
}
