'use client'

import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/debounce'
import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

const SearchBar = () => {
  const searchParams = useSearchParams()
  const querySearch = searchParams.get('search') as string
  const [search, setSearch] = useState(querySearch || '')
  const router = useRouter()

  const sendQuery = useCallback(
    (value: string) => {
      if (value) {
        router.push(`/search-events?search=${value}`)
      }
    },
    [router],
  )

  const searchHandler = useDebounce(
    (e: ChangeEvent<HTMLInputElement>) => sendQuery(e.target.value),
    1500,
  )

  useEffect(() => {
    sendQuery(querySearch)
  }, [querySearch, sendQuery])

  return (
    <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 h-10">
      <Search className="w-4 h-4 text-white/60" />

      <input
        value={search}
        onChange={e => {
          searchHandler(e)
          setSearch(e.target.value)
        }}
        placeholder="Search events by state or city..."
        className="bg-transparent flex-1 text-sm text-white placeholder:text-white/40 outline-none"
      />

      {search && (
        <Button
          onClick={() => setSearch('')}
          className="bg-transparent hover:bg-transparent text-white"
        >
          <X />
        </Button>
      )}
    </div>
  )
}

export default SearchBar
