import { motion } from "framer-motion";
export default function TextReveal({ children, className, delay = 0 }) {
  const text = String(children);
  const chars = text.split("");
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span initial="hidden" animate="visible" transition={{ staggerChildren: 0.03, delayChildren: delay }}>
        {chars.map((char, index) => (
          <motion.span key={index} variants={{ hidden: { y: "100%" }, visible: { y: 0 } }} className="inline-block whitespace-pre">
            {char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}