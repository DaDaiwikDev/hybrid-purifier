import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { useStore } from '../../store'

export default function SearchBar() {
  const [term, setTerm] = useState('')
  const { fetchLiveAir, loading } = useStore()

  const handleSearch = (e) => {
    e.preventDefault()
    if (term.trim()) fetchLiveAir(term)
  }

  return (
    <form onSubmit={handleSearch} className="pointer-events-auto relative group">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="ENTER CITY COORDINATES..."
        className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-sm font-mono rounded-full py-3 pl-12 pr-6 w-64 focus:w-80 transition-all outline-none focus:border-white/30 focus:bg-black/60 shadow-xl"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
        {loading ? <Loader2 size={16} className="animate-spin"/> : <Search size={16}/>}
      </div>
    </form>
  )
}