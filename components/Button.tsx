"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "outline"
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculateOffset = () => {
    const deltaX = mousePosition.x - buttonPosition.x
    const deltaY = mousePosition.y - buttonPosition.y
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxOffset = 5 // Limit the maximum offset to 5 pixels
    const offset = Math.min(distance / 20, maxOffset)
    return {
      x: (deltaX / distance) * offset,
      y: (deltaY / distance) * offset,
    }
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        magnetic-button px-8 py-3 rounded-md text-sm uppercase tracking-wider
        ${
          variant === "outline"
            ? "border-2 border-black bg-transparent text-black hover:bg-black hover:text-white"
            : "bg-black text-white hover:bg-gray-800"
        }
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setButtonPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }}
      style={{
        transform: `translate(${calculateOffset().x}px, ${calculateOffset().y}px)`,
      }}
    >
      {children}
    </motion.button>
  )
}

