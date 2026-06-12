'use client'

import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Event } from '@/types/event.type'
import Image from 'next/image'

function FeaturedCaroueselCard({ events }: { events: Event[] }) {
  return (
    <section className="space-y-6 w-full ">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {events.map((event, i) => (
            <CarouselItem key={event._id} className="basis-full">
              <Card className="overflow-hidden p-0">
                {/* IMAGE */}
                <div className="relative h-105 w-full">
                  <Image
                    src={event.coverImage || '/placeholder-event.jpg'}
                    alt={event.title}
                    fill
                    className="object-cover"
                    loading={i == 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* TEXT */}
                  <div className="absolute bottom-0 p-6 text-white space-y-2">
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                    <p className="text-sm opacity-90">
                      📍 {event.city}, {event.country}
                    </p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-sm:hidden" />
        <CarouselNext className="max-sm:hidden" />
      </Carousel>
    </section>
  )
}

export default FeaturedCaroueselCard
