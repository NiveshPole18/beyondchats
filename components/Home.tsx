"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./Header"
import Button from "./Button"
import { MessageSquare, Building2, Laptop } from "lucide-react"
import UserRegistration from "./UserRegistration"
import OrganizationSetup from "./OrganizationSetup"
import ChatbotIntegration from "./ChatbotIntegration"
import React from "react"
import ParticleBackground from "./ParticleBackground"
import RotatingLogo from "./RotatingLogo"

const steps = [
  {
    id: "register",
    title: "User Registration",
    description: "Create your account and verify your email to get started with BeyondChats",
    icon: MessageSquare,
    component: UserRegistration,
  },
  {
    id: "setup",
    title: "Organization Setup",
    description: "Configure your company profile and customize your chatbot experience",
    icon: Building2,
    component: OrganizationSetup,
  },
  {
    id: "integration",
    title: "Chatbot Integration",
    description: "Seamlessly integrate the chatbot into your website with our simple setup process",
    icon: Laptop,
    component: ChatbotIntegration,
  },
]

function AnimatedSection({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-12 md:py-20 bg-white/80 backdrop-blur-sm rounded-lg my-4 md:my-8"
      id={id}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen  bg-gradient">
      <ParticleBackground />
      <Header onNavClick={scrollToSection} />

      <main className="pt-20 px-4 md:px-8 lg:px-16">
        <AnimatedSection id="hero">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-3xl mx-auto">
                <RotatingLogo />
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black text-shadow-contrast"
                >
                  Beyond
                  <span className="block text-gray-800">Chats</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-700 text-shadow-contrast"
                >
                  Set up your intelligent chatbot in minutes with our streamlined workflow
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full"
                >
                  <Button onClick={() => scrollToSection("steps")} className="w-full sm:w-auto moving-button">
                    Start Setup
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto moving-button">
                    Watch Demo
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="steps">
          <div className="container mx-auto">
            <div className="flex justify-center mb-8">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full mx-2 cursor-pointer ${
                    index === currentStep ? "bg-black" : "bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
              >
                <div className="space-y-6 order-1 lg:order-1">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-black text-center lg:text-left mb-4 px-4"
                  >
                    {steps[currentStep].title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-lg md:text-xl text-gray-700 text-center lg:text-left mb-8 px-4"
                  >
                    {steps[currentStep].description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="bg-white/90 p-6 rounded-lg backdrop-blur-md shadow-lg"
                  >
                    {React.createElement(steps[currentStep].component, { onNext: nextStep, onPrev: prevStep })}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative order-2 lg:order-2"
                >
                  <div className="aspect-square relative bg-gradient-to-br from-gray-200 to-white rounded-2xl p-12 flex items-center justify-center backdrop-blur-sm">
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="text-black"
                    >
                      {React.createElement(steps[currentStep].icon, { size: 120 })}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>

        <AnimatedSection id="features">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                "Real-time Chat Analytics",
                "Custom Bot Training",
                "Multi-language Support",
                "Easy Integration",
                "Advanced AI Responses",
                "24/7 Customer Support",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 bg-white/90 backdrop-blur-sm rounded-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">{feature}</h3>
                  <p className="text-gray-700">Enhance your customer experience with our advanced chatbot features</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  )
}

