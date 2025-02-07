"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, LogOut, Menu } from "lucide-react"
import { useMediaQuery } from "react-responsive"
import { checkIsAdmin } from "@/utils/adminAuth"
import Header from "@/components/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const adminLoggedIn = checkIsAdmin()
    setIsAdminLoggedIn(adminLoggedIn)
    if (!adminLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    router.push("/admin/login")
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Users, label: "User Visits", href: "/admin/visits" },
  ]

  if (!isAdminLoggedIn) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header type="admin" />
      <div className="pt-16">
        <div className="flex">
          {isMobile ? (
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <aside
                className={`fixed top-0 bottom-0 left-0 w-64 bg-[#1A1B1F] transition-transform duration-300 ease-in-out transform ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } z-50`}
              >
                <nav className="h-full py-6 flex flex-col justify-between">
                  <ul className="space-y-1">
                    {menuItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center px-6 py-3 text-sm text-white hover:bg-blue-600 transition-colors ${
                            pathname === item.href ? "bg-blue-600" : ""
                          }`}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="px-6">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </nav>
              </aside>
            </div>
          ) : (
            <aside
              className={`fixed top-16 bottom-0 w-64 bg-[#1A1B1F] transition-transform duration-200 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0 z-30`}
            >
              <nav className="h-full py-6 flex flex-col justify-between">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center px-6 py-3 text-sm text-white hover:bg-blue-600 transition-colors ${
                          pathname === item.href ? "bg-blue-600" : ""
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="px-6">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </aside>
          )}

          <main className={`flex-1 transition-all duration-200 ${isMobile ? "" : isSidebarOpen ? "md:ml-64" : ""}`}>
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

