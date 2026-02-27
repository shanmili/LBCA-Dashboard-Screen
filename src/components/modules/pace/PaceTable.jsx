import React from 'react';
import { BookOpen, Save } from 'lucide-react';
import '../../../styles/pace/PaceTable.css';

const PaceTable = ({ data, onCompletedChange, onScoreChange, onSave }) => {
  if (!data || data.length === 0) {
    return (
      <div className="no-data-container">
        <BookOpen size={48} />
        <p>No PACE encoding data available for this section and subject.</p>
        <p className="hint">Select a different section or subject to see students.</p>
      </div>
    );
  }

  return (
    <div className="pace-table-container">
      <table className="pace-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Current PACE #</th>
            <th>Completed</th>
            <th>Test Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.studentId}>
              <td className="student-name">{row.name}</td>
              <td className="pace-number">PACE #{row.paceNo}</td>
              <td>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={row.completed}
                    onChange={(e) => onCompletedChange(row.studentId, e.target.checked)}
                  />
                  <span className="checkmark"></span>
                </label>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Score"
                  value={row.testScore ?? ''}
                  onChange={(e) => onScoreChange(row.studentId, e.target.value)}
                  className="score-input"
                  disabled={!row.completed}
                />
              </td>
              <td>
                <button 
                  className="save-btn"
                  onClick={() => onSave(row.studentId)}
                >
                  <Save size={14} />
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaceTable;