import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import InteractiveCTA from './InteractiveCTA';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden z-10">
      <motion.div style={{ y, opacity }} className="text-center max-w-5xl mx-auto">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Series X Gen 2</span>
        </motion.div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
          <span className="block overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
            >
              BREATHE
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white/20"
            >
              FUTURE.
            </motion.span>
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-12 font-light"
        >
          The world's first autonomous bio-hybrid purification architecture.
          Designed for the urban crisis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <InteractiveCTA />
        </motion.div>

      </motion.div>
      
      {/* Scroll Hint */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-white/60">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}