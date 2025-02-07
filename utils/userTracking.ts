interface PageVisit {
  id: string
  email: string
  page: string
  action?: string
  timestamp: string
}

interface UserHistory {
  [email: string]: PageVisit[]
}

const STORAGE_KEY = "userHistory"

const initializeUserHistory = () => {
  if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}))
  }
}

export const trackPageVisit = (email: string, action: string) => {
  if (typeof window === "undefined") return

  initializeUserHistory()
  const userHistory: UserHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")

  const newVisit: PageVisit = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    page: action, // We'll use this field to store the specific action
    timestamp: new Date().toISOString(),
  }

  if (!userHistory[email]) {
    userHistory[email] = []
  }
  userHistory[email].push(newVisit)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userHistory))
}

export const getUserHistory = (email?: string): UserHistory | PageVisit[] => {
  if (typeof window === "undefined") return {}

  initializeUserHistory()
  const userHistory: UserHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")

  if (email) {
    return userHistory[email] || []
  }
  return userHistory
}

export const clearPageVisits = () => {
  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify({}))
  console.log("Page visits cleared")
}

export const getPageVisits = (): PageVisit[] => {
  if (typeof window === "undefined") return []

  const userHistory: UserHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  return Object.values(userHistory).flat()
}

export const getUniqueVisitors = (): number => {
  if (typeof window === "undefined") return 0

  const userHistory: UserHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  return Object.keys(userHistory).length
}

export const getActiveUsers24h = (): number => {
  if (typeof window === "undefined") return 0

  const userHistory: UserHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).getTime()

  return Object.values(userHistory).filter((visits) =>
    visits.some((visit) => new Date(visit.timestamp).getTime() > twentyFourHoursAgo),
  ).length
}

