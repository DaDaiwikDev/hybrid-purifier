import { useState, useEffect, useRef } from 'react'
import { useStore } from '../../store' // Notice the double dot ../../
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Loader2, X } from 'lucide-react'

const SUGGESTIONS = ["Warangal, IN", "Hyderabad, IN", "Delhi, IN", "Mumbai, IN", "Bangalore, IN", "New York, US", "London, UK", "Tokyo, JP"];

export default function SearchBar() {
  const { city, fetchLiveAir, loading } = useStore()
  const [query, setQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [filtered, setFiltered] = useState([])
  const searchRef = useRef(null)

  const handleInput = (e) => {
    const val = e.target.value
    setQuery(val)
    if (val.length > 0) {
      setFiltered(SUGGESTIONS.filter(c => c.toLowerCase().includes(val.toLowerCase())))
      setShowDropdown(true)
    } else setShowDropdown(false)
  }

  const selectCity = (val) => { setQuery(val); setShowDropdown(false); fetchLiveAir(val); }
  
  useEffect(() => { 
    function clickOut(e) { if (searchRef.current && !searchRef.current.contains(e.target)) setShowDropdown(false); } 
    document.addEventListener("mousedown", clickOut); return () => document.removeEventListener("mousedown", clickOut); 
  }, []);

  return (
    <div className="relative pointer-events-auto z-50" ref={searchRef}>
      <div className="flex items-center bg-black/60 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2.5 w-72 hover:border-white/40 transition-all shadow-2xl">
        <Search size={16} className="text-white/50 mr-3" />
        <input 
          type="text" placeholder="Search City..." 
          className="bg-transparent border-none outline-none text-sm text-white w-full font-mono uppercase"
          value={query} onChange={handleInput} onKeyDown={(e) => e.key === 'Enter' && selectCity(query)}
        />
        {loading ? <Loader2 size={14} className="animate-spin text-blue-400" /> : query && <button onClick={() => {setQuery(""); setShowDropdown(false)}}><X size={12} className="text-white/50"/></button>}
      </div>
      <AnimatePresence>
        {showDropdown && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full mt-2 right-0 w-72 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl py-2">
            {filtered.map((item, i) => (
              <button key={i} onClick={() => selectCity(item)} className="w-full text-left px-5 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white flex items-center gap-3 border-b border-white/5 last:border-0">
                <MapPin size={12} className="text-blue-500" /> {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}