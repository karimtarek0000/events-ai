import { ConvexError } from 'convex/values'

export const errorMessageHandle = (err: unknown) => {
  return err instanceof ConvexError
    ? (err.data as string)
    : err instanceof Error
      ? err.message
      : 'Failed to create event'
}

// For modal
const setFN = new Set<(status: boolean) => void>()

export const confirmModal = {
  toggleModal: (status: boolean = true) => {
    setFN.forEach(fn => fn(status))
  },
  fnForConfirm: () => {},
  subscribe(fn: (status: boolean) => void) {
    setFN.add(fn)
    return () => setFN.delete(fn)
  },
}
