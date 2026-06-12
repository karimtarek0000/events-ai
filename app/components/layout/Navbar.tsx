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

      <div className="container mx-auto mx-auto max-md:*:basis-2/12 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/" className=" shrink-0">
          <Image loading="eager" alt="image" width={90} height={90} src="/logo.png" sizes="100px" />
        </Link>

        {/* Search + Filters (desktop only) */}
        <SearchBar />

        {/* Right links */}
        <div className="flex justify-betwee max-md:order-2 items-center gap-4 text-sm text-white/80">
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/events" className="hover:text-white">
            Events
          </Link>
          {userId && (
            <div className="min-w-20.75">
              <Link href="/create-event" className="hover:text-white">
                Create Event
              </Link>
            </div>
          )}
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
        </div>
      </div>
    </nav>
  )
}
