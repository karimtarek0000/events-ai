import { Button } from '@/components/ui/button'
import { Show, SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LoadingBarAuth from './LoadingBarAuth'
import UserMenu from './UserMenu'

export default async function Header() {
  const { userId } = await auth()

  return (
    <nav className="border-b p-3 border-white/10 bg-black/80 backdrop-blur-md">
      <LoadingBarAuth />

      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/">
          <Image loading="eager" alt="image" width={90} height={90} src="/logo.png" />
        </Link>

        {/* Search + Filters (desktop only) */}
        <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 h-10">
          <Search className="w-4 h-4 text-white/60" />

          <input
            placeholder="Search events..."
            className="bg-transparent flex-1 text-sm text-white placeholder:text-white/40 outline-none"
          />

          <div className="flex items-center gap-2 text-sm text-white/70">
            <button className="hover:text-white">State</button>
            <span>/</span>
            <button className="hover:text-white">City</button>
          </div>
        </div>

        {/* Right links */}
        <nav className="flex min-w-61.75 items-center gap-4 text-sm text-white/80">
          <Link href="/pricing" className="hidden sm:block hover:text-white">
            Pricing
          </Link>
          <Link href="/explore" className="hidden sm:block hover:text-white">
            Explore
          </Link>
          <div className="min-w-20.75">
            {userId && (
              <Link href="/create-event" className="hidden sm:block hover:text-white">
                Create Event
              </Link>
            )}
          </div>
          <Show when="signed-out">
            <SignInButton>
              <Button
                variant="outline"
                className="bg-transparent text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
              >
                Signin
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className=" rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </Button>
            </SignUpButton>
          </Show>

          <UserMenu />
        </nav>
      </div>
    </nav>
  )
}
