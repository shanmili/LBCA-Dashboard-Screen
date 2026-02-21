import React from 'react';
import { Users, Search, Filter, Plus } from 'lucide-react';
import useStudentsPageState from '../../hooks/useStudentsPageState';
import StudentFormModal from '../common/StudentFormModal';
import '../../styles/StudentsPage.css';

const StudentsPage = ({ onNavigate }) => {
  const {
    SCHOOL_YEARS,
    searchTerm, setSearchTerm,
    sectionFilter, setSectionFilter,
    selectedSchoolYear, setSelectedSchoolYear,
    showAddModal, setShowAddModal,
    students,
    filteredStudents,
    getStatusBadgeClass,
    handleAddStudent,
  } = useStudentsPageState();

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
        <button className="add-student-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          <span>Add Student</span>
        </button>
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
        <p>Showing {filteredStudents.length} of {students.length} students</p>
      </div>

      {/* Add Student Modal */}
      <StudentFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddStudent}
        student={null}
      />
    </div>
  );
};

export default StudentsPage;
