"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  onNavClick: (id: string) => void
}

export default function Header({ onNavClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: "Register", href: "steps" },
    { name: "Setup", href: "steps" },
    { name: "Integration", href: "steps" },
    { name: "Features", href: "features" },
  ]

  const handleNavClick = (href: string) => {
    onNavClick(href)
    setIsOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md h-14 flex items-center px-6 lg:px-12"
    >
      <nav className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }} 
          className="text-2xl font-bold text-black"
        >
          BeyondChats
        </motion.div>

        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <motion.a
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="text-gray-800 hover:text-black transition-colors text-sm uppercase tracking-wider cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <motion.button
          className="md:hidden p-2 text-black"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/80 backdrop-blur-md px-6 lg:px-12"
        >
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-800 hover:text-black transition-colors text-sm uppercase tracking-wider cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
