import type React from "react"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LiveChatPreview: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hello! How can I help you today?", isBot: true },
  ])
  const [inputValue, setInputValue] = useState("")

  const addMessage = useCallback((text: string, isBot: boolean) => {
    setMessages((prev) => [...prev, { text, isBot }])
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addMessage(inputValue, false)
      setInputValue("")
      setTimeout(() => {
        addMessage("Thank you for your message. How can I assist you today?", true)
      }, 1000)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-2 ${message.isBot ? "text-left" : "text-right"}`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.isBot ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
                }`}
              >
                {message.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l-md p-2"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default LiveChatPreview

