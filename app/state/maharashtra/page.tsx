"use client"

import { Suspense } from "react"
import StateReport from "@/components/StateReport"
import Header from "@/components/Header"

export default function MaharashtraPage() {
  return (
    <>
      <Header type="report" />
      <div className="container mx-auto px-4 py-8 mt-16">
        <Suspense fallback={<div>Loading...</div>}>
          <StateReport stateName="Maharashtra" />
        </Suspense>
      </div>
      <footer className="mt-12 py-6 text-center text-sm text-gray-500">
        <p>© 2025 COVID-19 Data Analysis. All rights reserved.</p>
      </footer>
    </>
  )
}

