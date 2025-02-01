import { useEffect, useMemo } from "react"
import * as THREE from "three"

export function createGradientTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext("2d")

  if (context) {
    // Create gradient
    const gradient = context.createLinearGradient(0, 0, 256, 256)
    gradient.addColorStop(0, "#000000")
    gradient.addColorStop(1, "#404040")

    // Fill with gradient
    context.fillStyle = gradient
    context.fillRect(0, 0, 256, 256)

    // Add some pattern
    context.strokeStyle = "#505050"
    context.lineWidth = 2
    for (let i = 0; i < 8; i++) {
      context.beginPath()
      context.moveTo(32 * i, 0)
      context.lineTo(32 * i, 256)
      context.stroke()

      context.beginPath()
      context.moveTo(0, 32 * i)
      context.lineTo(256, 32 * i)
      context.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function useGradientTexture() {
  const texture = useMemo(() => {
    if (typeof window !== "undefined") {
      return createGradientTexture()
    }
    return null
  }, [])

  useEffect(() => {
    return () => {
      if (texture) {
        texture.dispose()
      }
    }
  }, [texture])

  return texture
}

