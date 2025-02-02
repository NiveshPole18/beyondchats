"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./Button"
import { useSpring, animated } from "@react-spring/web"
import type React from "react"
import { Check, X, Loader, Code, Mail, Share2, Send } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import MovingLogo from "./MovingLogo"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ChatbotIntegrationProps {
  onPrev: () => void
}

const ChatbotIntegration: React.FC<ChatbotIntegrationProps> = ({ onPrev }) => {
  const [integrationStatus, setIntegrationStatus] = useState<"pending" | "success" | "failure">("pending")
  const [isIntegrating, setIsIntegrating] = useState(false)
  const [showIntegrationOptions, setShowIntegrationOptions] = useState(false)
  const [message, setMessage] = useState("")

  const handleTestChatbot = () => {
    window.open("https://example.com", "_blank")
  }

  const handleIntegrate = () => {
    setShowIntegrationOptions(true)
  }

  const handleCopyPasteIntegration = () => {
    setIsIntegrating(true)
    setTimeout(() => {
      setIsIntegrating(false)
      setIntegrationStatus("success")
    }, 2000)
  }

  const handleMailInstructions = () => {
    console.log("Mailing integration instructions to developer")
  }

  const handleTestIntegration = () => {
    setIsIntegrating(true)
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
    <div className="space-y-8">
      <div className="grid gap-4">
        <Button onClick={handleTestChatbot} className="w-full bg-black text-white hover:bg-gray-800">
          TEST CHATBOT
        </Button>
        <Button
          onClick={handleIntegrate}
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={isIntegrating}
        >
          INTEGRATE ON YOUR WEBSITE
        </Button>
        <Button
          onClick={handleTestIntegration}
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={isIntegrating}
        >
          TEST INTEGRATION
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 bg-white/90 backdrop-blur-md">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <MovingLogo />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex flex-col h-[400px]">
              <div className="flex-grow space-y-4 overflow-y-auto mb-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hello! How can I help you today?</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AnimatePresence mode="wait">
        {showIntegrationOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-center">Choose Integration Method</h3>
            <div className="grid gap-4">
              <Button onClick={handleCopyPasteIntegration} className="w-full bg-black text-white hover:bg-gray-800">
                <Code className="mr-2" size={18} />
                Copy-Paste Integration Code
              </Button>
              <Button onClick={handleMailInstructions} className="w-full bg-black text-white hover:bg-gray-800">
                <Mail className="mr-2" size={18} />
                Mail Instructions to Developer
              </Button>
            </div>
          </motion.div>
        )}

        {integrationStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-white/90 backdrop-blur-md rounded-lg text-center"
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
              <Button className="w-full bg-black text-white hover:bg-gray-800">Explore Admin Panel</Button>
              <Button className="w-full bg-black text-white hover:bg-gray-800">Start talking to your chatbot</Button>
              <div className="flex gap-4">
                <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                  <Share2 className="mr-2" size={18} />
                  Share on Twitter
                </Button>
                <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                  <Share2 className="mr-2" size={18} />
                  Share on LinkedIn
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {integrationStatus === "failure" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-red-50 rounded-lg text-center"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-gray-50 rounded-lg text-center"
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
        <Button onClick={onPrev} className="bg-black text-white hover:bg-gray-800">
          Previous
        </Button>
      </div>
    </div>
  )
}

export default ChatbotIntegration

