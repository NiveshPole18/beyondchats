import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"
import type React from "react"

const Background3D = dynamic(() => import("../components/Background3D"), { ssr: false })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BeyondChats - Chatbot Setup",
  description: "Set up your chatbot with BeyondChats",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <Background3D />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}

