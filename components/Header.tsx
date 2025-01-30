"use client"

import { LogOut, Home, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"

interface HeaderProps {
  type?: "main" | "auth" | "report" | "news-article" | "about" | "contact"
  userEmail?: string
}

export default function Header({ type = "main", userEmail }: HeaderProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const handleLogout = () => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      trackPageVisit(currentUser, "Logged out")
    }
    if (type === "admin") {
      localStorage.removeItem("isAdmin")
      router.push("/admin/login")
    } else {
      localStorage.removeItem("currentUser")
      router.push("/login")
    }
  }

  const navItems = [
    { href: "/", label: "Home", bgColor: "bg-blue-600 hover:bg-blue-700" },
    { href: "/about", label: "About Us", bgColor: "bg-green-600 hover:bg-green-700" },
    { href: "/contact", label: "Contact Us", bgColor: "bg-purple-600 hover:bg-purple-700" },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-40 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nlJxiFcviteYMJnbvU3RQ2lWfbz231.png"
              alt="COVID-19 Tracker"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">COVID-19 Data Analysis</span>
          </Link>

          {(type === "main" ||
            type === "report" ||
            type === "news-article" ||
            type === "about" ||
            type === "contact") && (
            <>
              {isMobile ? (
                <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              ) : (
                <nav className="hidden md:flex items-center space-x-4">
                  {navItems.map((item) => (
                    <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={item.href}
                        className={`px-4 py-2 text-sm font-medium text-white ${item.bgColor} rounded-md transition-colors duration-300 ease-in-out`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  {userEmail && (
                    <motion.button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
        {isMobile && isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-sm font-medium text-white ${item.bgColor} rounded-md transition-colors duration-300 ease-in-out`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {userEmail && (
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

// Placeholder for trackPageVisit function
const trackPageVisit = (user: string, action: string) => {
  console.log(`User ${user} performed action: ${action}`)
  // Add your actual tracking logic here
}

