import { motion } from 'framer-motion';
import { useStore } from '../../store';
import { useEffect, useState } from 'react';

/**
 * Scrolling ticker showing live/simulated store data.
 * Enhances the "Technical" feel of the landing page.
 */
export default function StatTicker() {
  // Subscribe to store state
  const { aqi, pm25, city } = useStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const stats = [
    { label: "SYS.STATUS", value: "ONLINE", color: "text-emerald-500" },
    { label: "TARGET", value: city || "SCANNING", color: "text-white" },
    { label: "LIVE AQI", value: aqi, color: aqi > 100 ? "text-yellow-500" : "text-emerald-500" },
    { label: "PM 2.5", value: `${pm25} µg/m³`, color: "text-blue-400" },
    { label: "BIO-CORE", value: "ACTIVE", color: "text-emerald-500" },
    { label: "UPLINK", value: "SECURE", color: "text-white" },
  ];

  // Duplicate for infinite loop
  const tickerContent = [...stats, ...stats, ...stats];

  return (
    <div className="w-full border-y border-white/10 bg-black/80 backdrop-blur-md py-3 overflow-hidden flex select-none z-20 relative">
      <motion.div 
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {tickerContent.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 font-mono text-xs tracking-wider">
            <span className="text-white/40">{stat.label}:</span>
            <span className={`font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}