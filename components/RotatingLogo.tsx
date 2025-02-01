"use client"

import type React from "react"
import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import { Canvas } from "@react-three/fiber"
import type { Mesh } from "three"
import { useGradientTexture } from "./CubeTexture"

const LogoCube: React.FC = () => {
  const mesh = useRef<Mesh>(null)
  const texture = useGradientTexture()

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2
      mesh.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial map={texture || undefined} metalness={0.5} roughness={0.5} envMapIntensity={1} />
    </mesh>
  )
}

const FallbackComponent: React.FC = () => (
  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">Loading...</div>
)

const RotatingLogo: React.FC = () => {
  return (
    <div className="w-48 h-48 mx-auto mb-8">
      <Suspense fallback={<FallbackComponent />}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <LogoCube />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default RotatingLogo

