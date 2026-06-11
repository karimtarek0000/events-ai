import { EventCardSkeleton } from '@/app/components/skeleton/EventsSkeleton'

export default async function Loading() {
  return (
    <div className="lg:w-[40vw] mx-auto">
      <EventCardSkeleton />
    </div>
  )
}
