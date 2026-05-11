import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../api/dashboardApi';

const DASHBOARD_ENDPOINT = import.meta.env.VITE_DASHBOARD_ENDPOINT || '';

export default function useDashboardDataState() {
  const [filters, setFilters] = useState({
    schoolYear: '2025-2026',
    section: 'All',
    quarter: 'Q2',
    risk: 'All'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    kpiData: { totalStudents: 0, avgPaceCompletion: 0, behindPace: 0, atRisk: 0, quarter: 'Q2' },
    trendData: [],
    attendanceData: { overallPercentage: 0, chartData: [] },
    atRiskStudents: [],
    activityFeed: [],
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError('');

      try {
        const payload = await fetchDashboardData(filters);
        if (isMounted) {
          setDashboardData(payload || {
            kpiData: { totalStudents: 0, avgPaceCompletion: 0, behindPace: 0, atRisk: 0, quarter: filters.quarter },
            trendData: [],
            attendanceData: { overallPercentage: 0, chartData: [] },
            atRiskStudents: [],
            activityFeed: [],
          });
        }
      } catch (requestError) {
        if (!isMounted) {
          return;
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Unable to load dashboard data from API.'
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  return {
    filters,
    updateFilter,
    loading,
    error,
    kpiData: dashboardData.kpiData,
    trendData: dashboardData.trendData,
    attendanceData: dashboardData.attendanceData,
    atRiskStudents: dashboardData.atRiskStudents,
    activityFeed: dashboardData.activityFeed,
  };
}