import { getUserPlan } from '@/utils/index.server'
import CreateEventForm from '../components/event/CreateEventForm'
import ExceedLimit, { type Plans } from '../components/ExceedLimit'

export default async function Page() {
  const plan = await getUserPlan()

  return (
    <ExceedLimit plan={plan.name as Plans}>
      <CreateEventForm />
    </ExceedLimit>
  )
}
