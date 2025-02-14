import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface GenerateReportButtonProps {
  reportId: string
  stateName: string
  data: {
    totalCases: number
    recoveryRate: number
    mortalityRate: number
    monthlyData: Array<{
      month: string
      activeCases: number
      recovered: number
      deaths: number
      growthRate: number
    }>
  }
  onGenerate: (reportId: string) => void
}

export function GenerateReportButton({ reportId, stateName, data, onGenerate }: GenerateReportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    const toastId = toast.loading("Generating report...")

    try {
      const pdf = new jsPDF()

      // Title Page
      pdf.setFontSize(24)
      pdf.setTextColor(0, 51, 102)
      pdf.text("RANJIT AI", 20, 30)
      pdf.setFontSize(18)
      pdf.text("COVID-19 Advanced Analytics Report", 20, 45)

      pdf.setFontSize(12)
      pdf.text(`Location: ${stateName}`, 20, 60)
      pdf.text(`Analysis Period: 2023`, 20, 70)
      pdf.text(`Report ID: RAI-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 20, 80)
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 90)

      // Executive Summary
      pdf.addPage()
      pdf.setFontSize(16)
      pdf.text("Executive Summary", 20, 20)

      pdf.setFontSize(12)
      const summaryData = [
        ["Metric", "Value"],
        ["Total Cases", data.totalCases.toLocaleString()],
        ["Recovery Rate", `${data.recoveryRate.toFixed(1)}%`],
        ["Mortality Rate", `${data.mortalityRate.toFixed(1)}%`],
        ["Risk Level", data.mortalityRate > 2 ? "HIGH" : "MEDIUM"],
      ]

      let yPos = 40
      summaryData.forEach((row) => {
        pdf.text(row[0], 20, yPos)
        pdf.text(row[1], 100, yPos)
        yPos += 10
      })

      // Monthly Trend Analysis
      pdf.addPage()
      pdf.setFontSize(16)
      pdf.text("Monthly Trend Analysis", 20, 20)

      pdf.setFontSize(10)
      let tableYPos = 40
      pdf.text("Month", 20, tableYPos)
      pdf.text("Active Cases", 60, tableYPos)
      pdf.text("Recovered", 100, tableYPos)
      pdf.text("Deaths", 140, tableYPos)
      pdf.text("Growth Rate", 180, tableYPos)

      data.monthlyData.forEach((row, index) => {
        tableYPos += 10
        pdf.text(row.month, 20, tableYPos)
        pdf.text(row.activeCases.toLocaleString(), 60, tableYPos)
        pdf.text(row.recovered.toLocaleString(), 100, tableYPos)
        pdf.text(row.deaths.toLocaleString(), 140, tableYPos)
        pdf.text(`${row.growthRate.toFixed(1)}%`, 180, tableYPos)
      })

      // AI Recommendations
      pdf.addPage()
      pdf.setFontSize(16)
      pdf.text("AI-Powered Insights & Recommendations", 20, 20)

      pdf.setFontSize(12)
      const recommendations = [
        "Focus on maintaining vaccination coverage",
        "Strengthen healthcare infrastructure",
        "Continue effective treatment methods",
      ]

      yPos = 40
      recommendations.forEach((rec) => {
        pdf.text(`• ${rec}`, 20, yPos)
        yPos += 10
      })

      // Footer on each page
      const pageCount = pdf.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(10)
        pdf.setTextColor(128, 128, 128)
        pdf.text(
          `Generated by RANJIT AI Analytics Engine v2.0 - Page ${i} of ${pageCount}`,
          20,
          pdf.internal.pageSize.height - 10,
        )
      }

      const generatedReportId = `RAI-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      onGenerate(generatedReportId)
      pdf.save(`${stateName}_COVID19_Report_${generatedReportId}.pdf`)
      toast.success("Report generated successfully!", { id: toastId })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate report. Please try again.", { id: toastId })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
    >
      <Download className="w-5 h-5" />
      <span>{isGenerating ? "Generating..." : "Generate Report"}</span>
    </Button>
  )
}

