'use client'

import { Show, UserButton } from '@clerk/nextjs'
import { Calendar } from 'lucide-react'

const UserMenu = () => {
  return (
    <Show when="signed-in">
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="My Events"
            labelIcon={<Calendar size="1rem" />}
            href="/my-events"
          />
        </UserButton.MenuItems>
      </UserButton>
    </Show>
  )
}

export default UserMenu
