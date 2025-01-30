"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { fetchCovidData, type CovidData } from "@/utils/fetchCovidData"
import { trackPageVisit } from "@/utils/userTracking"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getFromStorage } from "@/utils/clientStorage"
import { GenerateReportButton } from "@/components/GenerateReportButton"
import { BarChart3, PieChartIcon, LineChartIcon, AreaChartIcon, BarChartHorizontal } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { motion } from "framer-motion"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useMediaQuery } from "react-responsive"

interface StateReportProps {
  stateName: string
}

type ChartType = "timeline" | "area" | "pie" | "bar" | "horizontal-bar"

export default function StateReport({ stateName }: StateReportProps) {
  const [allData, setAllData] = useState<CovidData[]>([])
  const [filteredData, setFilteredData] = useState<CovidData[]>([])
  const [year, setYear] = useState<string>("2023")
  const [zoneStatus, setZoneStatus] = useState<"Red" | "Green">("Green")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedChart, setSelectedChart] = useState<ChartType>("timeline")
  const isMobile = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    const currentUser = getFromStorage("currentUser")
    if (currentUser) {
      trackPageVisit(currentUser, `${stateName} Report page`)
    }
  }, [stateName])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchCovidData(stateName)
        setAllData(data)
        setYear("2023")
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch data")
        setIsLoading(false)
      }
    }
    fetchData()
  }, [stateName])

  useEffect(() => {
    const yearData = allData.filter((item) => new Date(item.date).getFullYear().toString() === year)
    setFilteredData(yearData)

    const latestData = yearData[yearData.length - 1]
    setZoneStatus(
      (stateName === "Goa" && year === "2021") || (latestData && latestData.active_cases > 1000) ? "Red" : "Green",
    )
  }, [allData, year, stateName])

  const chartData = filteredData.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    confirmed: d.confirmed,
    active: d.active_cases,
    recovered: d.cured,
    deaths: d.deaths,
  }))

  const total =
    filteredData[filteredData.length - 1]?.confirmed +
      filteredData[filteredData.length - 1]?.active_cases +
      filteredData[filteredData.length - 1]?.cured +
      filteredData[filteredData.length - 1]?.deaths || 0

  const pieChartData = [
    {
      name: "Active",
      value: filteredData[filteredData.length - 1]?.active_cases || 0,
      percentage: (((filteredData[filteredData.length - 1]?.active_cases || 0) / total) * 100).toFixed(1),
    },
    {
      name: "Recovered",
      value: filteredData[filteredData.length - 1]?.cured || 0,
      percentage: (((filteredData[filteredData.length - 1]?.cured || 0) / total) * 100).toFixed(1),
    },
    {
      name: "Deaths",
      value: filteredData[filteredData.length - 1]?.deaths || 0,
      percentage: (((filteredData[filteredData.length - 1]?.deaths || 0) / total) * 100).toFixed(1),
    },
  ].sort((a, b) => b.value - a.value)

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"]

  const calculateMonthlyData = (data: CovidData[]) => {
    const monthlyData = new Map()

    data.forEach((item) => {
      const month = new Date(item.date).toLocaleString("default", { month: "short" })
      if (!monthlyData.has(month)) {
        monthlyData.set(month, {
          activeCases: item.active_cases,
          recovered: item.cured,
          deaths: item.deaths,
          total: item.confirmed,
        })
      }
    })

    const result = Array.from(monthlyData.entries()).map(([month, data], index, array) => {
      const growthRate = index > 0 ? ((data.total - array[index - 1][1].total) / array[index - 1][1].total) * 100 : 0

      return {
        month,
        activeCases: data.activeCases,
        recovered: data.recovered,
        deaths: data.deaths,
        growthRate,
      }
    })

    return result
  }

  const calculateSummaryData = (data: CovidData[]) => {
    const latest = data[data.length - 1]
    if (!latest) return null

    const totalCases = latest.confirmed
    const recoveryRate = (latest.cured / latest.confirmed) * 100
    const mortalityRate = (latest.deaths / latest.confirmed) * 100

    return {
      totalCases,
      recoveryRate,
      mortalityRate,
      monthlyData: calculateMonthlyData(data),
    }
  }

  const renderChart = () => {
    const chartHeight = isMobile ? 300 : 400

    switch (selectedChart) {
      case "timeline":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D374850" />
              <XAxis dataKey="date" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
              <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="confirmed"
                name="Confirmed"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorConfirmed)"
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="active"
                name="Active"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorActive)"
                stackId="2"
              />
              <Area
                type="monotone"
                dataKey="recovered"
                name="Recovered"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#colorRecovered)"
                stackId="3"
              />
              <Area
                type="monotone"
                dataKey="deaths"
                name="Deaths"
                stroke="#EF4444"
                fillOpacity={1}
                fill="url(#colorDeaths)"
                stackId="4"
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D374850" />
              <XAxis dataKey="date" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
              <YAxis stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                }}
              />
              <Legend />
              <Bar dataKey="confirmed" fill="#64748B" />
              <Bar dataKey="active" fill="#38BDF8" />
              <Bar dataKey="recovered" fill="#FB923C" />
              <Bar dataKey="deaths" fill="#E2E8F0" />
            </BarChart>
          </ResponsiveContainer>
        )

      case "horizontal-bar":
        const latestData = filteredData[filteredData.length - 1] || {
          confirmed: 0,
          active_cases: 0,
          cured: 0,
          deaths: 0,
        }
        const horizontalData = [
          {
            name: "Confirmed",
            value: latestData.confirmed,
            percentage: ((latestData.confirmed / total) * 100).toFixed(1),
            color: "#3B82F6",
          },
          {
            name: "Active",
            value: latestData.active_cases,
            percentage: ((latestData.active_cases / total) * 100).toFixed(1),
            color: "#10B981",
          },
          {
            name: "Recovered",
            value: latestData.cured,
            percentage: ((latestData.cured / total) * 100).toFixed(1),
            color: "#8B5CF6",
          },
          {
            name: "Deaths",
            value: latestData.deaths,
            percentage: ((latestData.deaths / total) * 100).toFixed(1),
            color: "#EF4444",
          },
        ]
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={horizontalData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D374850" horizontal={false} />
              <XAxis type="number" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
              <YAxis dataKey="name" type="category" stroke="#94A3B8" tick={{ fill: "#94A3B8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                }}
                formatter={(value, name, props) => [
                  `${value.toLocaleString()} (${props.payload.percentage}%)`,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {horizontalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percentage }) => `${name}: ${value.toLocaleString()} (${percentage}%)`}
                outerRadius={isMobile ? 100 : 150}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#3B82F6", "#10B981", "#F43F5E"][index % 3]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                }}
                formatter={(value) => [value.toLocaleString(), ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  const handleChartSelection = (chartType: ChartType) => {
    setSelectedChart(chartType)
    const currentUser = getFromStorage("currentUser")
    if (currentUser) {
      trackPageVisit(currentUser, `Selected ${chartType} chart`)
    }
  }

  if (isLoading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="space-y-6" id={`${stateName.toLowerCase()}-report`}>
      <Toaster position="top-center" />
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold">{stateName} COVID-19 Report</h2>
        <div className="flex flex-wrap gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {selectedChart === "timeline" && <LineChartIcon className="w-4 h-4" />}
                {selectedChart === "bar" && <BarChart3 className="w-4 h-4" />}
                {selectedChart === "horizontal-bar" && <BarChartHorizontal className="w-4 h-4" />}
                {selectedChart === "pie" && <PieChartIcon className="w-4 h-4" />}
                Select Chart
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleChartSelection("timeline")}>
                <LineChartIcon className="w-4 h-4 mr-2" />
                Timeline Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChartSelection("bar")}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Bar Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChartSelection("horizontal-bar")}>
                <BarChartHorizontal className="w-4 h-4 mr-2" />
                Horizontal Bar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChartSelection("pie")}>
                <PieChartIcon className="w-4 h-4 mr-2" />
                Distribution
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <GenerateReportButton
            reportId={`${stateName.toLowerCase()}-report`}
            stateName={stateName}
            data={
              calculateSummaryData(filteredData) || {
                totalCases: 0,
                recoveryRate: 0,
                mortalityRate: 0,
                monthlyData: [],
              }
            }
            onGenerate={(reportId) => {
              const currentUser = getFromStorage("currentUser")
              if (currentUser) {
                trackPageVisit(currentUser, `${year}-Generated Report=${reportId}`)
              }
            }}
          />
        </div>
      </motion.div>

      <AnimatedElement>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4 items-center">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              {["2020", "2021", "2022", "2023", "2024", "2025"].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <motion.div
              className={`px-4 py-2 rounded-lg text-white ${zoneStatus === "Red" ? "bg-red-500" : "bg-green-500"}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {zoneStatus} Zone
            </motion.div>
          </div>
        </div>
      </AnimatedElement>

      <AnimatedElement>
        <Card className="p-4 md:p-6">{renderChart()}</Card>
      </AnimatedElement>
    </div>
  )
}

