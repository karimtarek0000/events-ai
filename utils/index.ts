import { ConvexError } from 'convex/values'

export const errorMessageHandle = (err: unknown) => {
  return err instanceof ConvexError
    ? (err.data as string)
    : err instanceof Error
      ? err.message
      : 'Failed to create event'
}
