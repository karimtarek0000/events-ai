import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce } from './debounce'

export const useSearch = (goTo: string) => {
  const clearBTN = useRef<HTMLButtonElement>(null)
  const searchParams = useSearchParams()
  const querySearch = searchParams.get('search') as string
  const [search, setSearch] = useState(querySearch || '')
  const router = useRouter()

  const sendQuery = useCallback(
    (value: string) => {
      if (value) {
        router.push(`${goTo}?search=${value}`)
      }
    },
    [router, goTo],
  )

  const searchHandler = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    sendQuery(e.target.value)
    clearBTN.current?.click()
  }, 1500)

  useEffect(() => {
    sendQuery(querySearch)
  }, [querySearch, sendQuery])

  return {
    search,
    clearBTN,
    setSearch,
    searchHandler,
  }
}
