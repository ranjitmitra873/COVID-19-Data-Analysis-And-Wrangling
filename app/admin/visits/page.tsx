"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { getPageVisits, clearPageVisits } from "@/utils/userTracking"
import { useMediaQuery } from "react-responsive"

interface Visit {
  id: string
  email: string
  page: string
  action?: string
  timestamp: string
}

export default function UserVisits() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)

  const isMobile = useMediaQuery({ maxWidth: 768 })

  const loadVisits = () => {
    setLoading(true)
    const allVisits = getPageVisits()
    setVisits(allVisits.reverse())
    setLoading(false)
  }

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all visit history?")) {
      clearPageVisits()
      loadVisits()
    }
  }

  useEffect(() => {
    loadVisits()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">User Visit History</h1>
        <div className="flex gap-4">
          <Button onClick={loadVisits} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleReset} variant="destructive" disabled={loading}>
            Reset History
          </Button>
        </div>
      </div>

      <Card className="p-6">
        {loading ? (
          <div className="text-center py-10">Loading visit data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Email</th>
                  <th className="text-left py-3">Page</th>
                  {!isMobile && <th className="text-left py-3">Action</th>}
                  <th className="text-left py-3">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{visit.email}</td>
                    <td className="py-3">{visit.page}</td>
                    {!isMobile && <td className="py-3">{visit.action || "View"}</td>}
                    <td className="py-3">{new Date(visit.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

