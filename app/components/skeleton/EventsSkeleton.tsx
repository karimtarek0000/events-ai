export const EventCardSkeleton = () => {
  return (
    <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="w-full h-52 bg-[#2c2c2e] animate-pulse" />

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 w-2/3 rounded-md bg-[#2c2c2e] animate-pulse" />

        {/* Location */}
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-[#2c2c2e] shrink-0 animate-pulse" />
          <div className="h-4 w-32 rounded-md bg-[#2c2c2e] animate-pulse" />
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-[#2c2c2e] shrink-0 animate-pulse" />
          <div className="h-4 w-24 rounded-md bg-[#2c2c2e] animate-pulse" />
        </div>

        {/* Registered */}
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-[#2c2c2e] shrink-0 animate-pulse" />
          <div className="h-4 w-28 rounded-md bg-[#2c2c2e] animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function EventsSkeleton({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      {showHeader && (
        <div className="flex items-center gap-3 mb-6">
          <div className="size-6 rounded-md bg-[#2c2c2e] animate-pulse" />
          <div className="h-7 w-40 rounded-lg bg-[#2c2c2e] animate-pulse" />
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </div>
  )
}
