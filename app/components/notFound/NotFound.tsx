import { PropsWithChildren } from 'react'

interface NotFoundProps<T extends { length: number }> extends PropsWithChildren {
  records: T
}

export default function NotFound<T extends { length: number }>({
  records,
  children,
}: NotFoundProps<T>) {
  return records?.length ? children : <p className="text-center">No any event exist yet</p>
}
