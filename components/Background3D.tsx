"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sphere, Box, Torus } from "@react-three/drei"
import * as THREE from "three"

function AnimatedShape({ position, shape }: { position: [number, number, number]; shape: string }) {
  const ref = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  const speed = Math.random() * 0.02 + 0.01
  const rotationSpeed = Math.random() * 0.02 + 0.005

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += rotationSpeed
      ref.current.rotation.y += rotationSpeed

      if (shape === "sphere") {
        // Circular motion for spheres
        const time = state.clock.getElapsedTime()
        ref.current.position.x = Math.sin(time * speed) * 5 + position[0]
        ref.current.position.y = Math.cos(time * speed) * 5 + position[1]
      } else {
        // Original floating animation for boxes and tori
        ref.current.position.x = ((ref.current.position.x + viewport.width / 2) % viewport.width) - viewport.width / 2
        ref.current.position.y =
          ((ref.current.position.y + viewport.height / 2) % viewport.height) - viewport.height / 2
      }

      ref.current.position.z = ((ref.current.position.z + 10) % 20) - 10
    }
  })

  const scale = Math.random() * 0.8 + 0.4 // Increased size range
  const color = new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(0.9) // Even brighter colors

  const ShapeComponent = shape === "sphere" ? Sphere : shape === "box" ? Box : Torus

  return (
    <ShapeComponent
      ref={ref}
      args={shape === "torus" ? [0.5, 0.2, 16, 100] : [1, 16, 16]}
      scale={scale}
      position={position}
    >
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.85} />
    </ShapeComponent>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={3} />
        {Array.from({ length: 300 }).map((_, i) => {
          // Further increased number of shapes
          const shape = ["sphere", "box", "torus"][Math.floor(Math.random() * 3)]
          return (
            <AnimatedShape
              key={i}
              position={[Math.random() * 60 - 30, Math.random() * 60 - 30, Math.random() * 20 - 10]}
              shape={shape}
            />
          )
        })}
      </Canvas>
    </div>
  )
}

