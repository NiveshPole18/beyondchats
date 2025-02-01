"use client"

import { motion, AnimatePresence } from "framer-motion"
import type React from "react"

interface PageTransitionProps {
  children: React.ReactNode
  id: string
}

export default function PageTransition({ children, id }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

