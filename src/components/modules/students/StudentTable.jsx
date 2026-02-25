import React from 'react';
import '../../../styles/students/StudentTable.css';

const StudentTable = ({ students, getStatusBadgeClass, onNavigate }) => {
  return (
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
          {students.length > 0 ? (
            students.map(student => (
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
              <td colSpan="7" className="no-results">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;