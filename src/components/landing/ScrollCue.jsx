import { motion } from 'framer-motion';

export default function ScrollCue() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none z-20"
    >
      <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white"
          animate={{ top: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}