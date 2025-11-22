import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" stroke="white" strokeWidth="2" strokeOpacity="0.2"/>
      <motion.path initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} d="M20 8L20 32" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
      <motion.path initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} d="M20 32C20 32 32 24 32 16C32 11.5817 28.4183 8 24 8C19.5817 8 20 14 20 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <motion.path initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} d="M20 32C20 32 8 24 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 20 14 20 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}