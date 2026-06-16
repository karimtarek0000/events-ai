import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Event, EventCardProps, TicketType } from '@/types/event.type'
import { formatDateAndTime } from '@/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

const Decription = ({ show, description }: { show: boolean | undefined; description: string }) => {
  return show && <p className="mb-5 min-h-[65px]">{description}</p>
}

const PhysicalDetails = ({
  show,
  physical,
}: {
  show: boolean | undefined
  physical: { venue: string | undefined; address: string | undefined }
}) => {
  return (
    show && (
      <div className="capitalize flex flex-col mb-5">
        <span>
          <span className="me-5 font-bold">- venue:</span> {physical.venue}
        </span>
        <span>
          <span className="me-2 font-bold">- address:</span> {physical.address}
        </span>
      </div>
    )
  )
}

const DateAndTime = ({
  show,
  date: { startDate, endDate },
}: {
  show: boolean | undefined
  date: { startDate: number; endDate: number }
}) => {
  return (
    show && (
      <>
        <div className="flex items-center flex-wrap justify-between mt-5 space-x-1">
          <span>
            <span className="me-2 font-bold">🗓 Start Date:</span>{' '}
            {formatDateAndTime(startDate).date}
          </span>
          <span>
            <span className="font-bold me-1">⌛️ Start Time:</span>{' '}
            {formatDateAndTime(startDate).time}
          </span>
        </div>

        <div className="flex items-center flex-wrap justify-between space-x-1">
          <p>
            <span className="me-4 font-bold">🗓 End Date:</span> {formatDateAndTime(endDate).date}
          </p>
          <p>
            <span className="font-bold me-3">⌛️ End Time:</span> {formatDateAndTime(endDate).time}
          </p>
        </div>
      </>
    )
  )
}

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

const EventCardTags = ({ show, tags }: { show: boolean | undefined; tags: string[] }) => {
  return (
    show && (
      <CardFooter className="pt-0 mt-auto">
        {tags?.map(tag => (
          <Badge key={tag} variant="secondary" className="capitalize me-2 font-bold">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    )
  )
}

const EditButton = ({ show, event }: { show: boolean | undefined; event: Event }) => {
  return (
    show && (
      <Button asChild>
        <Link
          href={`/create-event?edit_event=${encodeURIComponent(JSON.stringify(event))}`}
          className="hover:underline"
        >
          Edit
        </Link>
      </Button>
    )
  )
}

// Evant Card
const EventCard = ({ event, isShow, pointerEvent }: EventCardProps) => {
  return (
    <Card
      className={`${pointerEvent && 'pointer-events-none'} relative hover:shadow-lg p-0 pb-4 transition flex flex-col`}
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
        <Decription show={isShow?.description} description={event.description} />

        <PhysicalDetails
          show={isShow?.physical && event.locationType === 'physical'}
          physical={{ venue: event.venue, address: event.address }}
        />

        <div className="flex items-center justify-between font-bold">
          <p>
            📍 {event.city}, {event.country}
          </p>

          <EditButton show={isShow?.edit} event={event} />
        </div>

        <DateAndTime
          show={isShow?.date}
          date={{ startDate: event?.startDate, endDate: event?.endDate }}
        />

        <div className="flex items-center flex-wrap justify-between mt-5 space-x-1 font-bold">
          <span>
            👥 {event.registrationCount} / {event.capacity || '?'} registered
          </span>
          <span>$ {event?.ticketPrice ?? 0}</span>
        </div>
      </CardContent>

      <EventCardTags show={isShow?.tags} tags={event?.tags as []} />
    </Card>
  )
}

export default memo(EventCard)
