import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from './TextReveal'
import { ArrowDown } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  
  // Parallax: Text moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden z-10 pt-20">
      
      <motion.div style={{ y, opacity }} className="text-center max-w-7xl mx-auto flex flex-col items-center gap-6">
        
        {/* 1. BADGE - Clean, minimal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">Gen 2.0 Online</span>
        </motion.div>

        {/* 2. MAIN HEADLINE - Massive, Kinetic, Staggered */}
        <div className="flex flex-col items-center">
          <TextReveal className="text-6xl md:text-[9rem] font-bold tracking-tighter text-white mix-blend-difference" delay={0.1}>
            BREATHE
          </TextReveal>
          <TextReveal className="text-6xl md:text-[9rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40" delay={0.2}>
            INTELLIGENCE
          </TextReveal>
        </div>

        {/* 3. SUBHEAD - Readable, High Contrast */}
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-xl text-white/70 max-w-xl text-center font-light leading-relaxed mt-4"
        >
          The world's first bio-hybrid architecture. <br className="hidden md:block"/>
          <span className="text-white font-medium">99.97% Purification. Zero Compromise.</span>
        </motion.p>

        {/* 4. BUTTONS - No overlap */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 mt-8"
        >
          <Link to="/simulation" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform">
            <span className="relative z-10">Launch Lab</span>
            <div className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>
          <button className="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            Read Specs
          </button>
        </motion.div>

      </motion.div>

      {/* 5. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown className="animate-bounce w-4 h-4" />
      </motion.div>

    </section>
  )
}