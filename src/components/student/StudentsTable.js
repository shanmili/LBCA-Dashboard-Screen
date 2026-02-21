import React from 'react';
import { AlertTriangle as AlertIcon } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

const StudentsTable = ({ students, filterValue, onFilterChange, onNavigate }) => {
  return (
    <article className="table-card">
      <header className="table-header">
        <h3 className="table-title">
          <AlertIcon size={20} className="table-icon" />
          At-Risk Students
        </h3>
        <select
          className="risk-filter"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
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
              <th>Student</th>
              <th>Section</th>
              <th>PACE %</th>
              <th>Risk</th>
              <th>Primary Factor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? students.map(s => (
              <tr key={s.id}>
                <td className="student-name">{s.name}</td>
                <td className="student-section">{s.section}</td>
                <td className="pace-percent">{s.pacePercent}%</td>
                <td><RiskBadge level={s.riskLevel} /></td>
                <td className="risk-factor">{s.factor}</td>
                <td>
                  <button onClick={() => onNavigate('student-profile', s.id)} className="details-button">
                    View
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="no-data">No at-risk students found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default StudentsTable;
