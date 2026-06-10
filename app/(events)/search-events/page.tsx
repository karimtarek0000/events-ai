import ErrorBoundry from '@/app/components/error/ErrorBoundry'
import { EventsListSearch } from '@/app/components/search/EventsListSearch'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Events',
}

export default function Page() {
  return (
    <>
      <h1 className="text-3xl text-center my-10">Search list</h1>

      <ErrorBoundry>
        <EventsListSearch />
      </ErrorBoundry>
    </>
  )
}
