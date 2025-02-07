"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { loginUser } from "@/utils/userManagement"
import { trackPageVisit } from "@/utils/userTracking"
import Header from "@/components/Header"
import { NeonMazeBackground } from "@/components/NeonMazeBackground"
import { motion } from "framer-motion"
import type React from "react" // Added import for React

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    document.title = "COVID-19 Analysis - Login"
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginUser(email, password)) {
      trackPageVisit(email, "Logged in")
      localStorage.setItem("currentUser", email)
      router.push("/")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <>
      <Header type="auth" />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <NeonMazeBackground />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
              <p className="text-sm text-gray-300 mt-1">Please sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-700 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Sign in
              </button>

              <p className="text-sm text-center text-gray-300">
                Don't have an account?{" "}
                <Link href="/register" className="text-green-400 hover:text-green-300 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  )
}

