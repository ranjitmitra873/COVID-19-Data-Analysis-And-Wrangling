"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Linkedin, Instagram, Twitter, Phone, Mail } from "lucide-react"
import Header from "@/components/Header"
import { trackPageVisit } from "@/utils/userTracking"
import { motion } from "framer-motion"
import { AnimatedElement } from "@/components/AnimatedElement"
import { QRCodeSVG } from "qrcode.react"

export default function ContactPage() {
  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
    } else {
      trackPageVisit(currentUser, "Contact Us page")
    }
  }, [router])

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://in.linkedin.com/in/ranjit-mitra-520a26253",
      username: "Ranjit Mitra",
      gradient: "from-[#0077B5] to-[#00A0DC]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/thenameisranjit_mr?igsh=YnZsbjAwNzZhZTdr",
      username: "@thenameisranjit_mr",
      gradient: "from-[#833AB4] to-[#E1306C]",
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      url: "https://x.com/Ranjit_1100",
      username: "@Ranjit_1100",
      gradient: "from-[#1DA1F2] to-[#14171A]",
    },
    {
      name: "WhatsApp",
      icon: Phone,
      url: "https://wa.me/919324834443",
      username: "+91 9324834443",
      gradient: "from-[#25D366] to-[#128C7E]",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0B1221]">
      <Header type="contact" />
      <div className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <AnimatedElement>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
          </AnimatedElement>

          {/* Contact Cards */}
          <AnimatedElement>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <motion.div
                className="bg-[#0F172A] p-6 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Email</h2>
                </div>
                <a
                  href="mailto:ranjitmitra1100@gmail.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-lg"
                >
                  ranjitmitra1100@gmail.com
                </a>
              </motion.div>

              <motion.div
                className="bg-[#0F172A] p-6 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Phone</h2>
                </div>
                <a href="tel:+919324834443" className="text-blue-400 hover:text-blue-300 transition-colors text-lg">
                  +91 9324834443
                </a>
              </motion.div>
            </div>
          </AnimatedElement>

          {/* Social Media Section */}
          <AnimatedElement>
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Connect on Social Media</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialLinks.map((social, index) => (
                <AnimatedElement key={social.name} delay={index * 0.1}>
                  <motion.div
                    className={`bg-gradient-to-br ${social.gradient} p-6 rounded-2xl shadow-xl backdrop-blur-sm`}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <social.icon className="w-6 h-6" />
                      <h2 className="text-xl font-bold">{social.name}</h2>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 blur-xl rounded-xl transform group-hover:scale-110 transition-transform duration-300"></div>
                      <div className="bg-white p-4 rounded-xl mb-4 flex justify-center relative transform hover:scale-105 transition-all duration-300 shadow-xl">
                        <div className="relative">
                          <QRCodeSVG
                            value={social.url}
                            size={200}
                            bgColor={`#FFFFFF`}
                            fgColor={
                              social.name === "LinkedIn"
                                ? "#0077B5"
                                : social.name === "Instagram"
                                  ? "#E1306C"
                                  : social.name === "X (Twitter)"
                                    ? "#14171A"
                                    : "#25D366"
                            }
                            level="H"
                            includeMargin={false}
                            style={{
                              borderRadius: "1rem",
                              padding: "0.5rem",
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <social.icon
                              className={`w-12 h-12 opacity-20 ${
                                social.name === "LinkedIn"
                                  ? "text-[#0077B5]"
                                  : social.name === "Instagram"
                                    ? "text-[#E1306C]"
                                    : social.name === "X (Twitter)"
                                      ? "text-[#14171A]"
                                      : "text-[#25D366]"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300"
                    >
                      <span className="text-sm font-medium">{social.username}</span>
                    </a>
                  </motion.div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </div>
    </div>
  )
}

