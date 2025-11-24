import { motion } from 'framer-motion';
import { useStore } from '../../store';
import { useEffect, useState } from 'react';
import { Activity, Wifi, Server, Database } from 'lucide-react';

export default function StatTicker() {
  const { aqi, pm25, city } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Configuration for the 3 colored blinking dots
  const statusItems = [
    { 
      id: 1,
      label: "CORE SYSTEM", 
      value: "ONLINE", 
      color: "text-white", 
      icon: <Server size={14} />,
      dotColor: "bg-white" 
    },
    { 
      id: 2,
      label: "UPLINK", 
      value: "STABLE", 
      color: "text-blue-400", 
      icon: <Wifi size={14} />,
      dotColor: "bg-blue-500" 
    },
    { 
      id: 3,
      label: "BIO-ACTIVE", 
      value: "OPTIMAL", 
      color: "text-emerald-400", 
      icon: <Activity size={14} />,
      dotColor: "bg-emerald-500" 
    },
    { 
      id: 4,
      label: "TARGET", 
      value: city || "SCANNING...", 
      color: "text-white/80", 
      icon: <Database size={14} />,
      dotColor: "bg-white/50"
    },
    { 
      id: 5,
      label: "LIVE AQI", 
      value: aqi, 
      color: aqi > 100 ? "text-yellow-500" : "text-emerald-500", 
      icon: null,
      dotColor: aqi > 100 ? "bg-yellow-500" : "bg-emerald-500"
    }
  ];

  // Duplicate for infinite loop
  const tickerContent = [...statusItems, ...statusItems, ...statusItems, ...statusItems];

  return (
    <div className="w-full border-y border-white/10 bg-black/80 backdrop-blur-md h-14 overflow-hidden flex items-center select-none z-20 relative group">
      
      {/* Sidebar Label */}
      <div className="absolute left-0 top-0 bottom-0 bg-black/90 px-4 flex items-center z-10 border-r border-white/10">
        <span className="flex h-2 w-2 relative mr-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
        <span className="text-[10px] font-mono font-bold tracking-widest text-white">LIVE FEED</span>
      </div>

      {/* Scrolling Content - Pauses on Hover */}
      <motion.div 
        className="flex gap-16 whitespace-nowrap pl-32 group-hover:[animation-play-state:paused]"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {tickerContent.map((item, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 font-mono text-xs tracking-wider cursor-pointer hover:bg-white/5 px-4 py-2 rounded-lg transition-colors"
          >
            {/* Blinking Dot */}
            <span className={`w-2 h-2 rounded-full ${item.dotColor} animate-pulse shadow-[0_0_8px_currentColor]`} />
            
            <div className="flex flex-col leading-none gap-1">
              <span className="text-white/40 text-[9px] font-bold uppercase">{item.label}</span>
              <span className={`font-bold ${item.color} flex items-center gap-2`}>
                {item.value} {item.icon}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}