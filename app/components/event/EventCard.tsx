import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { EventCardProps, TicketType } from '@/types/event.type'
import { formatDateAndTime } from '@/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

const TicketTypeBadge = ({ ticketType }: { ticketType: TicketType }) => {
  return ticketType === 'paid' && <Badge className="capitalize font-bold">{ticketType}</Badge>
}

const OtherBadge = ({ type }: { type: string | undefined }) => {
  return (
    type && (
      <Badge variant="secondary" className="capitalize font-bold">
        {type}
      </Badge>
    )
  )
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

const EventCard = ({ event, isShow, pointerEvent }: EventCardProps) => {
  return (
    <Card
      className={`${pointerEvent && 'pointer-events-none'} relative hover:shadow-lg p-0 pb-4 transition flex flex-col h-full`}
    >
      <div className=" absolute top-2 inset-s-2 z-50">
        <OtherBadge type={event.category} />
      </div>
      <div className=" absolute top-2 inset-e-2 z-50">
        <OtherBadge type={event.locationType} />
      </div>

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
        <TicketTypeBadge ticketType={event.ticketType} />
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground flex flex-col flex-1 justify-center">
        {isShow?.description && <p className="mb-5 min-h-[65px]">{event.description}</p>}

        {isShow?.physical && event.locationType === 'physical' && (
          <div className="capitalize flex flex-col mb-5">
            <span>- venue: name</span>
            <span>- address: name</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p>
            📍 {event.city}, {event.country}
          </p>
          {isShow?.edit && (
            <Button asChild>
              <Link
                href={`/create-event?edit_event=${encodeURIComponent(JSON.stringify(event))}`}
                className="hover:underline"
              >
                Edit
              </Link>
            </Button>
          )}
        </div>

        {isShow?.date && (
          <>
            <div className="flex items-center flex-wrap justify-between mt-5 space-x-1">
              <span>🗓 Start Date: {formatDateAndTime(event?.startDate).date}</span>
              <span>⌛️ Start Time: {formatDateAndTime(event?.startDate).time}</span>
            </div>

            <div className="flex items-center flex-wrap justify-between space-x-1">
              <p>🗓 End Date: {formatDateAndTime(event?.endDate).date}</p>
              <p>⌛️ End Time: {formatDateAndTime(event?.endDate).time}</p>
            </div>
          </>
        )}

        <div className="flex items-center flex-wrap justify-between mt-5 space-x-1">
          <span>
            👥 {event.registrationCount} / {event.capacity || '?'} registered
          </span>
          <span className="font-bold">$ {event?.ticketPrice ?? 0}</span>
        </div>
      </CardContent>

      {isShow?.tags && <EventCardTags tags={event?.tags as []} />}
    </Card>
  )
}

export default memo(EventCard)
