import Image from 'next/image'
import CTAButton from './CTAButton'

export default function Hero() {
  return (
    <section className="relative overflow-hidden md:h-[80vh] flex items-center">
      {/* Background gradients */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="max-lg:text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Create and launch your
            <span className="px-2 bg-linear-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              Event in seconds
            </span>
          </h1>

          <p className="mt-6 text-white/60 lg:max-w-md">
            Whether you are hosting or attending, every event memorable. Join our community today.
          </p>

          <CTAButton />
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="relative min-h-[480px] w-70 md:w-85">
            <Image
              src="/hero.png"
              alt="Event App Preview"
              width={400}
              height={800}
              className="relative z-10"
              priority
            />

            {/* Glow behind phone */}
            <div className="absolute inset-0 rounded-full bg-red-500/40 blur-[120px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
