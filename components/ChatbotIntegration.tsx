"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./Button"
import { useSpring, animated } from "@react-spring/web"
import type React from "react"
import { Check, X, Loader, Code, Mail, Share2 } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import ChatbotModel from "./ChatbotModel"
import LiveChatPreview from "./LiveChatPreview"

interface ChatbotIntegrationProps {
  onPrev: () => void
}

const ChatbotIntegration: React.FC<ChatbotIntegrationProps> = ({ onPrev }) => {
  const [integrationStatus, setIntegrationStatus] = useState<"pending" | "success" | "failure">("pending")
  const [isIntegrating, setIsIntegrating] = useState(false)
  const [showIntegrationOptions, setShowIntegrationOptions] = useState(false)

  const handleTestChatbot = () => {
    window.open("https://example.com", "_blank")
  }

  const handleIntegrate = () => {
    setShowIntegrationOptions(true)
  }

  const handleCopyPasteIntegration = () => {
    setIsIntegrating(true)
    // Simulate integration process
    setTimeout(() => {
      setIsIntegrating(false)
      setIntegrationStatus("success")
    }, 2000)
  }

  const handleMailInstructions = () => {
    console.log("Mailing integration instructions to developer")
    // Implement mailing logic here
  }

  const handleTestIntegration = () => {
    setIsIntegrating(true)
    // Simulate integration check
    setTimeout(() => {
      setIsIntegrating(false)
      setIntegrationStatus(Math.random() > 0.5 ? "success" : "failure")
    }, 2000)
  }

  const confettiProps = useSpring({
    from: { opacity: 0, transform: "scale(0)" },
    to: {
      opacity: integrationStatus === "success" ? 1 : 0,
      transform: integrationStatus === "success" ? "scale(1)" : "scale(0)",
    },
    config: { tension: 300, friction: 10 },
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg text-black"
    >
      <div className="space-y-4">
        <Button onClick={handleTestChatbot} className="w-full">
          Test Chatbot
        </Button>
        <Button onClick={handleIntegrate} className="w-full" disabled={isIntegrating}>
          {isIntegrating ? "Integrating..." : "Integrate on your website"}
        </Button>
        <Button onClick={handleTestIntegration} className="w-full" disabled={isIntegrating}>
          {isIntegrating ? "Testing..." : "Test Integration"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="aspect-square">
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <OrbitControls />
            <ChatbotModel />
          </Canvas>
        </div>
        <LiveChatPreview />
      </div>
      <AnimatePresence mode="wait">
        {showIntegrationOptions && (
          <motion.div
            key="integration-options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-center">Choose Integration Method</h3>
            <Button onClick={handleCopyPasteIntegration} className="w-full flex items-center justify-center">
              <Code className="mr-2" size={18} />
              Copy-Paste Integration Code
            </Button>
            <Button onClick={handleMailInstructions} className="w-full flex items-center justify-center">
              <Mail className="mr-2" size={18} />
              Mail Instructions to Developer
            </Button>
          </motion.div>
        )}
        {integrationStatus === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-white/90 backdrop-blur-md rounded-md text-center relative overflow-hidden"
          >
            <animated.div style={confettiProps} className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-black rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `scale(${Math.random()})`,
                    opacity: Math.random(),
                  }}
                />
              ))}
            </animated.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center justify-center mb-4"
            >
              <Check className="text-green-500" size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold text-black mb-4">Integration Successful!</h3>
            <div className="space-y-4">
              <Button className="w-full">Explore Admin Panel</Button>
              <Button className="w-full">Start talking to your chatbot</Button>
              <div className="flex justify-center space-x-4">
                <Button className="px-4 py-2 flex items-center">
                  <Share2 className="mr-2" size={18} />
                  Share on Twitter
                </Button>
                <Button className="px-4 py-2 flex items-center">
                  <Share2 className="mr-2" size={18} />
                  Share on LinkedIn
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        {integrationStatus === "failure" && (
          <motion.div
            key="failure"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-red-100 backdrop-blur-md rounded-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center justify-center mb-4"
            >
              <X className="text-red-500" size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold text-black mb-4">Integration Not Detected</h3>
            <p className="text-gray-700 mb-4">
              Please make sure you've correctly integrated the chatbot on your website and try again.
            </p>
            <Button onClick={handleTestIntegration} className="bg-black text-white hover:bg-gray-800">
              Retry Integration
            </Button>
          </motion.div>
        )}
        {integrationStatus === "pending" && isIntegrating && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-gray-100 backdrop-blur-md rounded-md text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex items-center justify-center mb-4"
            >
              <Loader className="text-black" size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold text-black mb-4">Processing...</h3>
            <p className="text-gray-700">Please wait while we complete the integration.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-between">
        <Button onClick={onPrev}>Previous</Button>
      </div>
    </motion.div>
  )
}

export default ChatbotIntegration

