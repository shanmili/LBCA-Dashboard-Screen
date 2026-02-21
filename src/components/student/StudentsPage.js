import React, { useState } from 'react';
import { Users, Search, Filter } from 'lucide-react';
import { studentsData } from '../../data/mockData';
import '../../styles/StudentsPage.css';

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

const StudentsPage = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'All' || student.section === sectionFilter;
    return matchesSearch && matchesSection;
  });

  const getStatusBadgeClass = (status) => {
    if (status === 'Behind') return 'status-badge at-risk';
    return 'status-badge on-track';
  };

  return (
    <div className="students-page">
      <header className="students-header">
        <div className="header-title">
          <Users size={24} />
          <h2>Students List</h2>
        </div>
        <p className="header-subtitle">Manage and view all enrolled students</p>
      </header>

      {/* Search and Filter Bar */}
      <div className="students-filters">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <Filter size={16} />
          <select
            value={selectedSchoolYear}
            onChange={(e) => setSelectedSchoolYear(e.target.value)}
            className="section-filter"
          >
            {SCHOOL_YEARS.map(sy => (
              <option key={sy} value={sy}>SY {sy}</option>
            ))}
          </select>
        </div>
        <div className="filter-box">
          <Filter size={16} />
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="section-filter"
          >
            <option value="All">All Sections</option>
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
            <option value="Section C">Section C</option>
          </select>
        </div>
      </div>

      <div className="students-table-container">
        <table className="students-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Section</th>
              <th>PACE %</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td className="student-name-cell">{student.name}</td>
                  <td>{student.section}</td>
                  <td>{student.pacePercent}%</td>
                  <td>{student.attendance}%</td>
                  <td>
                    <span className={getStatusBadgeClass(student.status)}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => onNavigate('student-profile', student.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">No students found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="students-footer">
        <p>Showing {filteredStudents.length} of {studentsData.length} students</p>
      </div>
    </div>
  );
};

export default StudentsPage;
