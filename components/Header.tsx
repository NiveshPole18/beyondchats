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
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="flex justify-between items-center h-16">
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
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/80 backdrop-blur-md"
          >
            <div className="py-2">
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block py-2 px-4 text-gray-800 hover:text-black hover:bg-gray-100 transition-colors text-sm uppercase tracking-wider cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

