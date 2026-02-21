import React, { useState } from 'react';
import { Bell, Filter, AlertTriangle, Search } from 'lucide-react';
import { atRiskStudents } from '../../data/mockData';
import RiskBadge from '../common/RiskBadge';
import '../../styles/EarlyWarningPage.css';

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

const EarlyWarningPage = ({ onNavigate }) => {
  const [riskFilter, setRiskFilter] = useState('All');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');

  const filteredStudents = atRiskStudents.filter(student => {
    const matchesRisk = riskFilter === 'All' || student.riskLevel === riskFilter;
    const matchesSection = sectionFilter === 'All' || student.section === sectionFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSection && matchesSearch;
  });

  // Count by risk level
  const riskCounts = {
    high: atRiskStudents.filter(s => s.riskLevel === 'High').length,
    medium: atRiskStudents.filter(s => s.riskLevel === 'Medium').length,
    low: atRiskStudents.filter(s => s.riskLevel === 'Low').length,
  };

  return (
    <div className="early-warning-page">
      <header className="warning-header">
        <div className="header-title">
          <Bell size={24} />
          <h2>Early Warning Alerts</h2>
        </div>
        <p className="header-subtitle">Monitor and manage at-risk students based on PACE progress</p>
      </header>

      {/* Risk Summary Cards */}
      <div className="risk-summary">
        <div className="risk-card high">
          <AlertTriangle size={24} />
          <div className="risk-info">
            <span className="risk-count">{riskCounts.high}</span>
            <span className="risk-label">High Risk</span>
          </div>
        </div>
        <div className="risk-card medium">
          <AlertTriangle size={24} />
          <div className="risk-info">
            <span className="risk-count">{riskCounts.medium}</span>
            <span className="risk-label">Medium Risk</span>
          </div>
        </div>
        <div className="risk-card low">
          <AlertTriangle size={24} />
          <div className="risk-info">
            <span className="risk-count">{riskCounts.low}</span>
            <span className="risk-label">Low Risk</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="warning-filters">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={selectedSchoolYear}
            onChange={(e) => setSelectedSchoolYear(e.target.value)}
          >
            {SCHOOL_YEARS.map(sy => (
              <option key={sy} value={sy}>SY {sy}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <Filter size={16} />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="All">All Risk Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
          >
            <option value="All">All Sections</option>
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
            <option value="Section C">Section C</option>
          </select>
        </div>
      </div>

      {/* At-Risk Students Table */}
      <div className="warning-table-container">
        {filteredStudents.length > 0 ? (
          <table className="warning-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Section</th>
                <th>PACE %</th>
                <th>Attendance</th>
                <th>Risk Level</th>
                <th>Primary Factor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className={`risk-row ${student.riskLevel.toLowerCase()}`}>
                  <td>{student.id}</td>
                  <td className="student-name">{student.name}</td>
                  <td>{student.section}</td>
                  <td className="pace-cell">{student.pacePercent}%</td>
                  <td>{student.attendance}%</td>
                  <td><RiskBadge level={student.riskLevel} /></td>
                  <td className="factor-cell">{student.factor}</td>
                  <td>
                    <button 
                      className="view-btn"
                      onClick={() => onNavigate('student-profile', student.id)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-alerts">
            <Bell size={48} color="#9CA3AF" />
            <p>No at-risk students found matching your filters.</p>
          </div>
        )}
      </div>

      <div className="warning-footer">
        <p>Showing {filteredStudents.length} of {atRiskStudents.length} at-risk students</p>
      </div>
    </div>
  );
};

export default EarlyWarningPage;
