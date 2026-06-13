import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { EventCardProps, TicketType } from '@/types/event.type'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

const EventCardBadge = ({ ticketType }: { ticketType: TicketType }) => {
  return ticketType === 'paid' && <Badge className="capitalize font-bold">{ticketType}</Badge>
}

const EventCardTags = ({ tags }: { tags: string[] }) => {
  return (
    <CardFooter className="pt-0 mt-auto">
      {tags?.map(tag => (
        <Badge key={tag} variant="secondary" className="capitalize me-2 font-bold">
          {tag}
        </Badge>
      ))}
    </CardFooter>
  )
}

const EventCard = ({ event, isShow = false, pointerEvent = false }: EventCardProps) => {
  return (
    <Card
      className={`${pointerEvent && 'pointer-events-none'} hover:shadow-lg p-0 pb-4 transition flex flex-col h-full`}
    >
      <Link
        href={`/events/${event._id}`}
        className="block relative h-44 w-full bg-muted overflow-hidden rounded-t-xl"
      >
        <Image
          src={event.coverImage || '/placeholder-event.jpg'}
          alt={event.title || ''}
          loading="eager"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <CardHeader className="flex items-center justify-between">
        <Link href={`/events/${event._id}`} className="hover:underline">
          <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
        </Link>
        <EventCardBadge ticketType={event.ticketType} />
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground flex-1">
        {isShow && <p className="mb-5">{event.description}</p>}

        <p>
          📍 {event.city}, {event.country}
        </p>

        <p>🗓 {new Date(event.startDate).toLocaleDateString()}</p>

        <p>
          👥 {event.registrationCount} / {event.capacity || '?'} registered
        </p>
      </CardContent>

      {isShow && <EventCardTags tags={event?.tags as []} />}
    </Card>
  )
}

export default memo(EventCard)
