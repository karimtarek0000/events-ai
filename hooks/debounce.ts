import { useCallback, useEffect, useRef } from 'react'

export function useDebounce<T extends (...args: Parameters<T>) => void>(fn: T, delay = 1000) {
  const timer = useRef<NodeJS.Timeout | null>(null)
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        fnRef.current(...args)
      }, delay)
    },
    [delay],
  )
}
