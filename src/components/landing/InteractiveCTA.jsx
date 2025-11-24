import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Primary Call-to-Action with magnetic hover effect.
 * @param {string} to - Route to navigate to
 * @param {string} text - Button text
 */
export default function InteractiveCTA({ to = "/simulation", text = "Launch Simulation" }) {
  return (
    <Link to={to}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full overflow-hidden"
      >
        {/* Hover Gradient Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <span className="relative z-10 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          {text}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </motion.button>
    </Link>
  );
}