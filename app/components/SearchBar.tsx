'use client'

import { Button } from '@/components/ui/button'
import { useSearch } from '@/hooks/search'
import { Search, X } from 'lucide-react'

const SearchBar = () => {
  const { search, setSearch, searchHandler } = useSearch('/search-events')

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
