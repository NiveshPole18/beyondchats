import type React from "react"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

const ChatbotModel: React.FC = () => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4CAF50" />
    </mesh>
  )
}

export default ChatbotModel

