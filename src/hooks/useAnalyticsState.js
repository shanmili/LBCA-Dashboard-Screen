import { useState } from 'react';
import {
  paceCompletionData,
  quarterlyPaceData,
  sectionStatsData,
  quarterlyStatsData,
  studentsData,
  atRiskStudents,
  activityFeed,
} from '../data/mockData';
import { computeDashboardStats, computeAttendanceBreakdown } from '../components/common/studentUtils';

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

export default function useAnalyticsState() {
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedQuarter, setSelectedQuarter] = useState('Q2');
  const [riskFilter, setRiskFilter] = useState('All');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');

  // Get stats based on quarter and section selection
  const getStats = () => {
    const quarterData = quarterlyStatsData[selectedQuarter];
    if (quarterData && quarterData[selectedSection] && selectedQuarter !== 'Q2') {
      return { ...quarterData[selectedSection], attendance: sectionStatsData[selectedSection]?.attendance || 92.3 };
    }
    return computeDashboardStats(studentsData, selectedSection);
  };

  const currentStats = getStats();

  // Live attendance donut from students
  const liveAttendanceData = computeAttendanceBreakdown(
    selectedSection === 'All'
      ? studentsData
      : studentsData.filter(s => s.section === selectedSection)
  );

  // Get PACE chart data based on quarter
  const getPaceChartData = () => {
    return quarterlyPaceData[selectedQuarter] || paceCompletionData;
  };

  const filteredStudents = atRiskStudents.filter(student => {
    const sectionMatch = selectedSection === 'All' || student.section === selectedSection;
    const riskMatch = riskFilter === 'All' || student.riskLevel === riskFilter;
    return sectionMatch && riskMatch;
  });

  return {
    SCHOOL_YEARS,
    selectedSection,
    setSelectedSection,
    selectedQuarter,
    setSelectedQuarter,
    riskFilter,
    setRiskFilter,
    selectedSchoolYear,
    setSelectedSchoolYear,
    currentStats,
    liveAttendanceData,
    getPaceChartData,
    filteredStudents,
    activityFeed,
  };
}
