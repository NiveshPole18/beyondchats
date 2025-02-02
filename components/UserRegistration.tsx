"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./Button"
import { Check, AlertCircle, Mail, Lock, User, ChromeIcon as Google } from "lucide-react"
import type React from "react"
import Typewriter from "typewriter-effect"

interface UserRegistrationProps {
  onNext: () => void
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const onSubmit = (data: any) => {
    console.log(data)
    setIsVerifying(true)
  }

  const handleVerification = () => {
    console.log("Verification code:", verificationCode)
    onNext()
  }

  const handleGoogleSignIn = () => {
    console.log("Sign up with Google")
    // Implement Google Sign-In logic here
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4 bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
    >
      <div className="text-xl sm:text-2xl font-bold text-center mb-4">
        <Typewriter
          options={{
            strings: ["Welcome to BeyondChats", "Create your account", "Start chatting in minutes"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <AnimatePresence mode="wait">
        {!isVerifying ? (
          <motion.form
            key="registration-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  placeholder="Enter your name"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle size={16} className="mr-1" />
                  {errors.name.message as string}
                </motion.p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle size={16} className="mr-1" />
                  {errors.email.message as string}
                </motion.p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle size={16} className="mr-1" />
                  {errors.password.message as string}
                </motion.p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <motion.button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  },
                }}
              >
                Sign Up
              </motion.button>
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="bg-white text-black hover:bg-gray-100 flex items-center justify-center"
              >
                <Google className="mr-2" size={18} />
                Sign Up with Google
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="verification-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <p className="text-center text-black">Please enter the verification code sent to your email.</p>
            <div className="relative">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                placeholder="Enter verification code"
              />
              <motion.div
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: verificationCode.length === 6 ? 1 : 0 }}
              >
                <Check className="h-5 w-5 text-green-500" />
              </motion.div>
            </div>
            <Button onClick={handleVerification} disabled={verificationCode.length !== 6}>
              Verify
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default UserRegistration

