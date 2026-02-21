import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, Filter, BookOpen } from 'lucide-react';
import '../../styles/AnalyticsContent.css'; 

import StatCard from '../common/StatCard';
import TrendChart from './TrendChart';
import AttendanceChart from './AttendanceChart';
import StudentsTable from '../student/StudentsTable';
import ActivityFeed from './ActivityFeed';

// Import PACE-based data 
import { 
  paceCompletionData,
  quarterlyPaceData,
  sectionStatsData,
  quarterlyStatsData,
  attendanceData, 
  atRiskStudents, 
  activityFeed 
} from '../../data/mockData'; 

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

export default function AnalyticsContent({ onNavigate = () => {} }) {
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedQuarter, setSelectedQuarter] = useState('Q2');
  const [riskFilter, setRiskFilter] = useState('All');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');

  // Get stats based on quarter and section selection
  const getStats = () => {
    const quarterData = quarterlyStatsData[selectedQuarter];
    if (quarterData && quarterData[selectedSection]) {
      return { ...quarterData[selectedSection], attendance: sectionStatsData[selectedSection]?.attendance || 92.3 };
    }
    return sectionStatsData[selectedSection] || sectionStatsData['All'];
  };

  const currentStats = getStats();
  
  // Get PACE chart data based on quarter
  const getPaceChartData = () => {
    return quarterlyPaceData[selectedQuarter] || paceCompletionData;
  };
  
  const filteredStudents = atRiskStudents.filter(student => {
    const sectionMatch = selectedSection === 'All' || student.section === selectedSection;
    const riskMatch = riskFilter === 'All' || student.riskLevel === riskFilter;
    return sectionMatch && riskMatch;
  });

  return (
    <section className="analytics-container">
      {/* Filters Row */}
      <header className="filters-row">
        <div>
          <h2 className="section-title">Overview</h2>
          <p className="section-subtitle">Welcome back, Admin User</p>
        </div>
        <div className="filter-container">
          <div className="filter-label">
            <Filter size={16} /><span>Filters:</span>
          </div>
          <select
            className="filter-select"
            value={selectedSchoolYear}
            onChange={(e) => setSelectedSchoolYear(e.target.value)}
          >
            {SCHOOL_YEARS.map(sy => (
              <option key={sy} value={sy}>SY {sy}</option>
            ))}
          </select>
          <select 
            className="filter-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="All">All Sections</option>
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
            <option value="Section C">Section C</option>
          </select>
          <select 
            className="filter-select"
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
          >
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
          <select 
            className="filter-select"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="All">All Risk</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </header>
      
      {/* KPI Cards - PACE based */}
      <section className="kpi-grid">
        <StatCard 
          title="Total Students" 
          value={currentStats.total} 
          subtext="Enrolled this year" 
          icon={Users} 
          color="#3B82F6" 
          trend="up" 
        />
        <StatCard 
          title="Avg PACE Completion" 
          value={`${currentStats.avgPaceCompletion}%`} 
          subtext={`${selectedQuarter} Progress`}
          icon={TrendingUp} 
          color="#10B981" 
          trend="up" 
        />
        <StatCard 
          title="Behind PACE" 
          value={currentStats.behindPace} 
          subtext="Students below target" 
          icon={BookOpen} 
          color="#F59E0B" 
          trend="down" 
        />
        <StatCard 
          title="At-Risk Students" 
          value={currentStats.atRisk} 
          subtext="Click to View" 
          icon={AlertTriangle} 
          color="#EF4444" 
          trend="down" 
          onClick={() => onNavigate('risk')} 
        />
      </section>

      {/* Charts */}
      <section className="charts-grid">
        <TrendChart 
          data={getPaceChartData()} 
          title="PACE Completion Trend" 
          yAxisLabel="Completion %" 
        />
        <AttendanceChart data={attendanceData} overallPercentage={currentStats.attendance} />
      </section>
      
      {/* Tables & Activity */}
      <section className="bottom-grid">
        <StudentsTable 
          students={filteredStudents} 
          filterValue={riskFilter} 
          onFilterChange={setRiskFilter}
          onNavigate={onNavigate}
        />
        <ActivityFeed activities={activityFeed} />
      </section>
    </section>
  );
}