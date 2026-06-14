'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateEvent(eventId: string) {
  revalidateTag(`event-${eventId}`, '')
}
