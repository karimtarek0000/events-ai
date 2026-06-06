function EventCardSkeleton() {
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

function ExploreEventsSkeleton() {
  return (
    <div className="relative">
      {/* Main card — full width */}
      <div className="relative w-full rounded-2xl overflow-hidden">
        {/* Image */}
        <div className="w-full h-[420px] bg-[#2c2c2e] animate-pulse" />

        {/* Overlay content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          {/* Title */}
          <div className="h-7 w-3/4 rounded-md bg-[#3a3a3c] animate-pulse" />

          {/* Location */}
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-[#3a3a3c] shrink-0 animate-pulse" />
            <div className="h-4 w-36 rounded-md bg-[#3a3a3c] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Left arrow — overlaid outside left edge */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 size-10 rounded-full bg-[#2c2c2e] animate-pulse" />

      {/* Right arrow — overlaid outside right edge */}
      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 size-10 rounded-full bg-[#2c2c2e] animate-pulse" />
    </div>
  )
}

export default function NearbyEventsSkeleton() {
  return (
    <div className="min-h-screen p-6 space-y-10">
      {/* ── Explore Events ── */}
      <div>
        <div className="h-7 w-48 rounded-lg bg-[#2c2c2e] animate-pulse mb-6" />
        <ExploreEventsSkeleton />
      </div>

      {/* ── Nearby Events ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="size-6 rounded-md bg-[#2c2c2e] animate-pulse" />
          <div className="h-7 w-40 rounded-lg bg-[#2c2c2e] animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      </div>
    </div>
  )
}
