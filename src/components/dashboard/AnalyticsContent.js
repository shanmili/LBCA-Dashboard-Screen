import React, { useState } from 'react';
import { Users, CalendarCheck, AlertTriangle, Filter } from 'lucide-react';
import '../../styles/AnalyticsContent.css'; 

import StatCard from '../common/StatCard';
import TrendChart from './TrendChart';
import AttendanceChart from './AttendanceChart';
import StudentsTable from './StudentsTable';
import ActivityFeed from './ActivityFeed';

// 2. IMPORT THE DATA 
import { 
  performanceData, 
  sectionStatsData, 
  attendanceData, 
  atRiskStudents, 
  activityFeed 
} from '../../data/mockData'; 

export default function AnalyticsContent({ onNavigate = () => {} }) {
  const [selectedSection, setSelectedSection] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  // Logic to filter data based on selection
  const currentStats = sectionStatsData[selectedSection] || sectionStatsData['All'];
  
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
            <Filter size={16} /><span>Filter View:</span>
          </div>
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
        </div>
      </header>
      
      {/* KPI Cards */}
      <section className="kpi-grid">
        <StatCard title="Total Students" value={currentStats.total} subtext="Enrolled this year" icon={Users} color="#3B82F6" trend="up" />
        <StatCard title="Attendance Rate" value={`${currentStats.attendance}%`} subtext="Average this month" icon={CalendarCheck} color="#8B5CF6" trend="down" />
        <StatCard title="At-Risk Students" value={currentStats.atRisk} subtext="Click to View" icon={AlertTriangle} color="#EF4444" trend="down" onClick={() => onNavigate('risk')} />
      </section>

      {/* Charts */}
      <section className="charts-grid">
        <TrendChart data={performanceData} />
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