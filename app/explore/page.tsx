import FeaturedCarouesel from '../components/features/FeaturedCarouesel'
import FeaturedEvents from '../components/features/FeaturedEvents'
import NearbyEvents from '../components/features/NearbyEvents'
import PopularEvents from '../components/features/PopularEvents'

export default async function Page() {
  return (
    <>
      <FeaturedCarouesel />
      <FeaturedEvents />
      <NearbyEvents />
      <PopularEvents />
    </>
  )
}
