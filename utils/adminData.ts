import { useState, useEffect } from 'react'
import { getPageVisits } from './userTracking'

export interface VisitData {
  id: string
  email: string
  page: string
  action?: string
  timestamp: string
}

export interface DashboardData {
  totalVisitors: number
  activeUsers: number
  recentVisits: VisitData[]
  pageVisits: { [key: string]: number }
}

const processVisitData = () => {
  const visits = getPageVisits();
  const uniqueVisitors = new Set(visits.map(v => v.email)).size;
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const activeUsers = new Set(
    visits
      .filter(v => v.timestamp > last24Hours)
      .map(v => v.email)
  ).size;

  const pageVisits = visits.reduce((acc: { [key: string]: number }, visit) => {
    acc[visit.page] = (acc[visit.page] || 0) + 1;
    return acc;
  }, {});

  return {
    totalVisitors: uniqueVisitors,
    activeUsers,
    recentVisits: visits.slice(-10).reverse(),
    pageVisits
  };
};

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = () => {
    setLoading(true);
    const processedData = processVisitData();
    setData(processedData);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, refreshData };
};

