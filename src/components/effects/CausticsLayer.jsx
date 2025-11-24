import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/use-reduced-motion'; // Assuming this hook exists from previous steps

export default function CausticsLayer() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full z-0 mix-blend-overlay opacity-30">
      {/* Light Refraction 1 */}
      <motion.div
        animate={{
          x: ["-25%", "0%"],
          y: ["-10%", "10%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute -inset-[50%] bg-gradient-to-tr from-transparent via-emerald-500/20 to-transparent blur-xl"
      />
      
      {/* Light Refraction 2 (Spectral Shift) */}
      <motion.div
        animate={{
          x: ["0%", "-15%"],
          y: ["5%", "-5%"],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute -inset-[50%] bg-gradient-to-bl from-transparent via-blue-400/10 to-transparent blur-xl"
      />

      {/* Surface Tension Sheen */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100 mix-blend-soft-light" />
    </div>
  );
}