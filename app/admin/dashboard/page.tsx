"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import {
  getUserHistory,
  getUniqueVisitors,
  getPageVisits,
  getActiveUsers24h,
  type PageVisit,
} from "@/utils/userTracking"
import { RefreshCw, ChevronDown, ChevronUp } from "lucide-react"
import { UserHistoryTable } from "@/components/UserHistoryTable"
import { useMediaQuery } from "react-responsive"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface UserHistory {
  [email: string]: PageVisit[]
}

export default function AdminDashboard() {
  const [userHistory, setUserHistory] = useState<UserHistory>({})
  const [uniqueVisitors, setUniqueVisitors] = useState(0)
  const [activeUsers24h, setActiveUsers24h] = useState(0)
  const [totalPageViews, setTotalPageViews] = useState(0)
  const [recentVisits, setRecentVisits] = useState<PageVisit[]>([])
  const [expandedUser, setExpandedUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const loadData = () => {
    setLoading(true)
    const history = getUserHistory() as UserHistory
    setUserHistory(history)
    setUniqueVisitors(getUniqueVisitors())
    setActiveUsers24h(getActiveUsers24h())
    const allVisits = getPageVisits()
    setTotalPageViews(allVisits.length)
    setRecentVisits(
      allVisits.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 50),
    )
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
  }

  const chartData = {
    labels: recentVisits.map((visit) => formatTime(new Date(visit.timestamp))).reverse(),
    datasets: [
      {
        label: "Page Visits",
        data: recentVisits.map((_, index) => index + 1),
        borderColor: "rgba(59, 130, 246, 0.8)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !isMobile,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          title: (context: any) => formatTime(new Date(recentVisits[context[0].dataIndex].timestamp)),
          label: (context: any) => `Visits: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: isMobile ? 5 : 10,
          callback: (value: any, index: number, values: any) => {
            if (index === 0 || index === values.length - 1 || !isMobile) {
              return formatTime(new Date(recentVisits[index].timestamp))
            }
            return ""
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  }

  const toggleUserExpansion = (email: string) => {
    setExpandedUser(expandedUser === email ? null : email)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={loadData} disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading dashboard data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Total Visitors</h2>
              <p className="text-3xl font-bold text-blue-600">{uniqueVisitors}</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Active Users (24h)</h2>
              <p className="text-3xl font-bold text-green-600">{activeUsers24h}</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Total Page Views</h2>
              <p className="text-3xl font-bold text-purple-600">{totalPageViews}</p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Visit Activity</h2>
            <div className="h-[300px] md:h-[400px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">User History</h2>
            <div className="space-y-4">
              {Object.entries(userHistory).map(([email, history]) => (
                <div key={email} className="border rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
                    onClick={() => toggleUserExpansion(email)}
                  >
                    <h3 className="font-semibold">{email}</h3>
                    <div className="flex items-center">
                      <span className="mr-2">{history.length} visits</span>
                      {expandedUser === email ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>
                  {expandedUser === email && (
                    <div className="p-4 overflow-x-auto">
                      <UserHistoryTable history={history} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

