"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, LineChart, Clock, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { trackPageVisit } from "@/utils/userTracking"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useMediaQuery } from "react-responsive"
import Header from "@/components/Header"

export default function AboutPage() {
  const router = useRouter()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
    } else {
      trackPageVisit(currentUser, "About Us page")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#0B1221]">
      <Header type="about" />
      <div className="pt-24">
        <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-2">RANJIT MITRA</h1>
            <h2 className="text-lg md:text-xl text-gray-400 mb-6">
              Digital Innovator | Tech Enthusiast | COVID-19 Analytics Expert
            </h2>

            <p className="text-gray-300 mb-12">
              Welcome to my COVID-19 analytics hub. As an individual innovator passionate about technology and public
              health, I've created this platform to transform complex pandemic data into clear, actionable insights for
              Maharashtra and Goa.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <AnimatedElement delay={0.1}>
                <div className="bg-[#1A2333] p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20">
                  <BarChart3 className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Data Clarity</h3>
                  <p className="text-gray-400">
                    Breaking down complex COVID-19 statistics into clear, understandable insights for everyone.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={0.3}>
                <div className="bg-[#1A2333] p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20">
                  <LineChart className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Visual Analytics</h3>
                  <p className="text-gray-400">
                    Creating intuitive visualizations that tell the story behind the numbers.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={0.5}>
                <div className="bg-[#1A2333] p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20">
                  <Clock className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Real-time Updates</h3>
                  <p className="text-gray-400">Delivering the latest COVID-19 trends and patterns as they emerge.</p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={0.7}>
                <div className="bg-[#1A2333] p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20">
                  <Shield className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">Data Integrity</h3>
                  <p className="text-gray-400">
                    Ensuring accuracy through careful verification of official health department data.
                  </p>
                </div>
              </AnimatedElement>
            </div>

            <AnimatedElement>
              <div className="bg-[#1A2333] p-8 rounded-xl mb-16">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">The Innovation Story</h2>
                <p className="text-gray-300 mb-6">
                  What started as a personal mission to understand COVID-19 trends has evolved into something bigger.
                  I've developed this platform to bridge the gap between complex health data and public understanding,
                  focusing on Maharashtra and Goa - two states that represent diverse healthcare challenges.
                </p>
                <p className="text-gray-300">
                  Every visualization and insight on this platform is crafted with precision, combining official data
                  from state health departments with innovative visualization techniques. My approach focuses on three
                  key principles: accuracy, clarity, and accessibility.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement>
              <div className={`grid ${isMobile ? "grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"} gap-6`}>
                <AnimatedElement delay={0.2}>
                  <div className="bg-[#1A2333] p-6 rounded-xl text-center transform transition-all duration-300 hover:scale-105 hover:bg-[#1E2A3D] hover:shadow-lg">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="text-3xl font-bold text-blue-400 mb-2"
                    >
                      1+
                    </motion.div>
                    <div className="text-sm text-gray-400">Data Sources</div>
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={0.4}>
                  <div className="bg-[#1A2333] p-6 rounded-xl text-center transform transition-all duration-300 hover:scale-105 hover:bg-[#1E2A3D] hover:shadow-lg">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="text-3xl font-bold text-blue-400 mb-2"
                    >
                      2
                    </motion.div>
                    <div className="text-sm text-gray-400">States Covered</div>
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={0.6}>
                  <div className="bg-[#1A2333] p-6 rounded-xl text-center transform transition-all duration-300 hover:scale-105 hover:bg-[#1E2A3D] hover:shadow-lg">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="text-3xl font-bold text-blue-400 mb-2"
                    >
                      Daily
                    </motion.div>
                    <div className="text-sm text-gray-400">Updates</div>
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={0.8}>
                  <div className="bg-[#1A2333] p-6 rounded-xl text-center transform transition-all duration-300 hover:scale-105 hover:bg-[#1E2A3D] hover:shadow-lg">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="text-3xl font-bold text-blue-400 mb-2"
                    >
                      100%
                    </motion.div>
                    <div className="text-sm text-gray-400">User Trust</div>
                  </div>
                </AnimatedElement>
              </div>
            </AnimatedElement>
          </motion.div>
          <footer className="mt-12 py-6 text-center text-sm text-gray-400">
            <p>© 2025 COVID-19 Data Analysis. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

