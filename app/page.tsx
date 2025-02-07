"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import NewsArticleCard from "@/components/NewsArticleCard"
import Image from "next/image"
import { trackPageVisit } from "@/utils/userTracking"
import { motion } from "framer-motion"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useMediaQuery } from "react-responsive"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    document.title = "COVID-19 Data Analysis"
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
    } else {
      setIsLoggedIn(true)
      setUserEmail(currentUser)
      trackPageVisit(currentUser, "Home page")
    }
  }, [router])

  if (!isLoggedIn) {
    return null
  }

  const articles = [
    {
      title: "COVID-19's Spread Across India: A Comprehensive Overview",
      excerpt:
        "An in-depth analysis of how coronavirus spread throughout India, examining the patterns, hotspots, and containment measures implemented across the country.",
      imageUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&h=400&q=80",
      slug: "covid-spread-india",
    },
    {
      title: "Indian States Battle Against COVID-19",
      excerpt:
        "Exploring how different Indian states were affected by the pandemic, highlighting the challenges faced and strategies employed to combat the virus.",
      imageUrl: "https://images.unsplash.com/photo-1587814969489-e5df12e17391?w=800&h=400&q=80",
      slug: "indian-states-battle",
    },
    {
      title: "Maharashtra & Goa: COVID-19 Impact Study",
      excerpt:
        "A detailed look at how Maharashtra and Goa were affected by coronavirus, examining healthcare responses and economic implications.",
      imageUrl: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&h=400&q=80",
      slug: "maharashtra-goa-impact",
    },
    {
      title: "Data-Driven Insights: COVID-19 Analysis",
      excerpt:
        "Understanding the pandemic through numbers: analyzing trends, patterns, and predictions using comprehensive COVID-19 data.",
      imageUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&h=400&q=80",
      slug: "data-driven-insights",
    },
  ]

  return (
    <div className="min-h-screen bg-black relative">
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SIrzzu3i4DVC3QLwxBjqil9do0XE1o.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Header type="main" userEmail={userEmail} />
      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12">
          <AnimatedElement>
            <section className="mb-16">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                <div className={`${isMobile ? "flex-col" : "md:flex"} items-stretch`}>
                  <div className={`${isMobile ? "h-48" : "md:w-1/3"} relative`}>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nlJxiFcviteYMJnbvU3RQ2lWfbz231.png"
                      alt="COVID-19 Visualization"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className={`${isMobile ? "w-full" : "md:w-2/3"} p-8`}>
                    <motion.h1
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      Welcome to COVID-19 Data Analysis
                    </motion.h1>
                    <motion.p
                      className="text-gray-600 text-base md:text-lg mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      This project provides insights into COVID-19 data for Maharashtra and Goa. Explore state-specific
                      reports, interactive dashboards, and comparative analysis.
                    </motion.p>
                    <motion.div
                      className="flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <Link
                        href="/state/maharashtra"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-sm md:text-base"
                      >
                        Maharashtra Report
                      </Link>
                      <Link
                        href="/state/goa"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl text-sm md:text-base"
                      >
                        Goa Report
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedElement>

          <section>
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Latest News and Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <AnimatedElement key={index} delay={1 + index * 0.2}>
                  <NewsArticleCard {...article} />
                </AnimatedElement>
              ))}
            </div>
          </section>
        </div>
        <footer className="py-6 text-center text-sm text-white bg-gray-800 bg-opacity-80 backdrop-blur-sm">
          <p>© 2025 COVID-19 Data Analysis. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

