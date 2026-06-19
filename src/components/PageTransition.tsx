import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

export const PageTransition = ({ children }: PropsWithChildren) => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.28 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
