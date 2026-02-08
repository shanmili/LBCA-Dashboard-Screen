import React, { useState } from 'react';
import '../styles/AnalyticsContent.css';
import {
  Users,
  CalendarCheck,
  AlertTriangle,
  Filter,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle as AlertIcon
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock Data
const performanceData = [
  { name: 'Q1', SectionA: 82, SectionB: 78, SectionC: 80 },
  { name: 'Q2', SectionA: 84, SectionB: 79, SectionC: 82 },
  { name: 'Q3', SectionA: 86, SectionB: 81, SectionC: 81 },
  { name: 'Q4', SectionA: 88, SectionB: 83, SectionC: 84 },
];

const sectionStatsData = {
  'All': { total: 452, attendance: 92.3, atRisk: 18 },
  'Section A': { total: 45, attendance: 96.5, atRisk: 2 },
  'Section B': { total: 42, attendance: 88.2, atRisk: 8 },
  'Section C': { total: 48, attendance: 91.0, atRisk: 4 },
};

const attendanceData = [
  { name: 'Present', value: 85, color: '#10B981' },
  { name: 'Late', value: 10, color: '#F59E0B' },    
  { name: 'Absent', value: 5, color: '#EF4444' },  
];

const atRiskStudents = [
  { id: 'S001', name: "Alvarez, Mateo", section: "Section A", riskLevel: "High", factor: "Consecutive Absences", grade: 74, attendance: "68%" },
  { id: 'S002', name: "Cruz, Sophia", section: "Section B", riskLevel: "Medium", factor: "Declining Math Scores", grade: 78, attendance: "88%" },
  { id: 'S003', name: "Santos, Gabriel", section: "Section B", riskLevel: "Medium", factor: "Incomplete Assignments", grade: 79, attendance: "92%" },
  { id: 'S004', name: "Reyes, Isabella", section: "Section C", riskLevel: "High", factor: "Failing Science & English", grade: 72, attendance: "75%" },
  { id: 'S005', name: "Bautista, Liam", section: "Section A", riskLevel: "Low", factor: "Slight Grade Drop", grade: 81, attendance: "95%" },
  { id: 'S006', name: "Mendoza, Karl", section: "Section B", riskLevel: "High", factor: "Behavioral Issues", grade: 70, attendance: "80%" },
];

const activityFeed = [
  { id: 1, type: 'alert', text: "New At-Risk alert for Mateo Alvarez", time: "10 mins ago" },
  { id: 2, type: 'grade', text: "Q3 Math grades uploaded by Mr. Torres", time: "1 hour ago" },
  { id: 3, type: 'attendance', text: "Attendance finalized for Section A", time: "2 hours ago" },
  { id: 4, type: 'system', text: "System maintenance scheduled for 10 PM", time: "5 hours ago" },
];

const StatCard = ({ title, value, subtext, icon: Icon, color, trend, onClick, className }) => (
  <article
    onClick={onClick}
    className={`stat-card ${onClick ? 'clickable' : ''} ${className || ''}`}
    style={{ '--icon-color': color }}
  >
    <header className="stat-header">
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
      <div className="stat-icon">
        <Icon size={20} style={{ color }} />
      </div>
    </header>
    <footer className="stat-footer">
      {trend === 'up' && <TrendingUp size={14} className="trend-up" />}
      {trend === 'down' && <TrendingDown size={14} className="trend-down" />}
      <span className="stat-subtext">{subtext}</span>
    </footer>
  </article>
);

const RiskBadge = ({ level }) => {
  const getRiskClass = () => {
    switch(level) {
      case 'High': return 'risk-high';
      case 'Medium': return 'risk-medium';
      case 'Low': return 'risk-low';
      default: return 'risk-low';
    }
  };
  
  return (
    <span className={`risk-badge ${getRiskClass()}`}>
      {level}
    </span>
  );
};

export default function AnalyticsContent({ onNavigate = () => console.log("Navigation triggered") }) {
  const [selectedSection, setSelectedSection] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

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
            <Filter size={16} />
            <span>Filter View:</span>
          </div>
          <select
            className="filter-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="All">All Sections</option>
            <option value="Section A">Section A (Grade 10)</option>
            <option value="Section B">Section B (Grade 10)</option>
            <option value="Section C">Section C (Grade 10)</option>
          </select>
        </div>
      </header>
     
      {/* KPI Cards */}
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
          title="Attendance Rate"
          value={`${currentStats.attendance}%`}
          subtext="Average this month"
          icon={CalendarCheck}
          color="#8B5CF6"
          trend="down"
        />
        <StatCard
          title="At-Risk Students"
          value={currentStats.atRisk}
          subtext="AI Detected Alerts - Click to View"
          icon={AlertTriangle}
          color="#EF4444"
          trend="down"
          onClick={() => onNavigate('risk')}
        />
      </section>

      {/* Charts Section */}
      <section className="charts-grid">
        {/* Comparative Trends Chart  */}
        <article className="chart-card wide">
          <h3 className="chart-title">Academic Trends Comparison</h3>
          <figure className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{fontSize: 12}} />
                <YAxis domain={[60, 100]} stroke="#9CA3AF" tick={{fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Legend wrapperStyle={{paddingTop: '10px'}}/>
                <Line type="monotone" dataKey="SectionA" stroke="#1F4788" strokeWidth={3} dot={{r: 4}} name="Section A" />
                <Line type="monotone" dataKey="SectionB" stroke="#F59E0B" strokeWidth={3} dot={{r: 4}} name="Section B" />
                <Line type="monotone" dataKey="SectionC" stroke="#10B981" strokeWidth={3} dot={{r: 4}} name="Section C" />
              </LineChart>
            </ResponsiveContainer>
          </figure>
        </article>

        {/* Attendance Donut Chart*/}
        <article className="chart-card">
          <h3 className="chart-title">Attendance</h3>
          <figure className="pie-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <figcaption className="pie-center">
              <span className="pie-value">{currentStats.attendance}%</span>
              <span className="pie-label">Present</span>
            </figcaption>
          </figure>
          <div className="pie-legend">
            <div className="legend-item">
              <span className="legend-color present"></span>
              <span>Present</span>
            </div>
            <div className="legend-item">
              <span className="legend-color late"></span>
              <span>Late</span>
            </div>
            <div className="legend-item">
              <span className="legend-color absent"></span>
              <span>Absent</span>
            </div>
          </div>
        </article>
      </section>
     
      {/* Bottom Section: At-Risk Table & Activity Feed  */}
      <section className="bottom-grid">
        {/* At-Risk Table  */}
        <article className="table-card">
          <header className="table-header">
            <h3 className="table-title">
              <AlertIcon size={20} className="table-icon" />
              At-Risk Students
            </h3>
            <select
              className="risk-filter"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
            >
              <option value="All">All Risks</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </header>
          <div className="table-wrapper">
            <table className="risk-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Section</th>
                  <th>Risk</th>
                  <th>Factor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? filteredStudents.map(s => (
                  <tr key={s.id}>
                    <td className="student-name">{s.name}</td>
                    <td className="student-section">{s.section}</td>
                    <td><RiskBadge level={s.riskLevel} /></td>
                    <td className="risk-factor">{s.factor}</td>
                    <td>
                      <button
                        onClick={() => onNavigate('risk', s.id)}
                        className="details-button"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
       
        {/* Activity Feed - Using semantic <aside> */}
        <aside className="activity-card">
          <h3 className="activity-title">Recent Activity</h3>
          <ul className="activity-list">
            {activityFeed.map(a => (
              <li key={a.id} className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <p className="activity-text">{a.text}</p>
                  <time className="activity-time">
                    <Clock size={12} />
                    {a.time}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </section>
  );
}
