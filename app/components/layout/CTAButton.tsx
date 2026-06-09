'use client'

import { Button } from '@/components/ui/button'
import { useStoreUserEffect } from '@/hooks/userStore'
import Link from 'next/link'

const CTAButton = () => {
  const { isAuthenticated } = useStoreUserEffect()

  return (
    <Button
      asChild
      className="mt-8 capitalize rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
    >
      <Link href={isAuthenticated ? '/create-event' : '/sign-in'}>
        {isAuthenticated ? 'create event' : 'get started'}
      </Link>
    </Button>
  )
}

export default CTAButton
