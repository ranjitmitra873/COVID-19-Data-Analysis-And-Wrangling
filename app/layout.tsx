"use client"

import { Inter } from "next/font/google"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import "./globals.css"
import { trackPageVisit } from "@/utils/userTracking"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    setIsLoggedIn(!!currentUser)
    if (currentUser) {
      trackPageVisit(currentUser, pathname)
    }
  }, [pathname])

  const handleLogout = () => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      trackPageVisit(currentUser, "Logged Out")
    }
    localStorage.removeItem("currentUser")
    setIsLoggedIn(false)
    router.push("/login")
  }

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  )
}

