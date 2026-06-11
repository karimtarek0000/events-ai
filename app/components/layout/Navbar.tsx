import { Button } from '@/components/ui/button'
import { Show, SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import SearchBar from '../SearchInput'
import LoadingBarAuth from './LoadingBarAuth'
import UserMenu from './UserMenu'

export default async function Header() {
  const { userId } = await auth()

  return (
    <nav className="border-b p-3 mb-5 sticky overflow-hidden z-50 inset-0 border-white/10 bg-black/80 backdrop-blur-md">
      <LoadingBarAuth />

      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/">
          <Image loading="eager" alt="image" width={90} height={90} src="/logo.png" />
        </Link>

        {/* Search + Filters (desktop only) */}
        <SearchBar />

        {/* Right links */}
        <nav className="flex min-w-61.75 items-center gap-4 text-sm text-white/80">
          <Link href="/pricing" className="hidden sm:block hover:text-white">
            Pricing
          </Link>
          <Link href="/events" className="hidden sm:block hover:text-white">
            Events
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
