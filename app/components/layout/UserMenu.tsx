'use client'

import { Show, UserButton } from '@clerk/nextjs'
import { Calendar, TicketCheck } from 'lucide-react'

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
          <UserButton.Link
            label="My Tickets"
            labelIcon={<TicketCheck size="1rem" />}
            href="/my-tickets"
          />
        </UserButton.MenuItems>
      </UserButton>
    </Show>
  )
}

export default UserMenu
