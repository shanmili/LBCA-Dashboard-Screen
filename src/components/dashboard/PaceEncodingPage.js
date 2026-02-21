import React from 'react';
import { BookOpen, Save, CheckCircle, Filter } from 'lucide-react';
import usePaceEncodingState from '../../hooks/usePaceEncodingState';
import '../../styles/PaceEncodingPage.css';

const PaceEncodingPage = () => {
  const {
    SCHOOL_YEARS,
    paceSubjects,
    selectedSection, setSelectedSection,
    selectedSubject, setSelectedSubject,
    selectedSchoolYear, setSelectedSchoolYear,
    encodingData,
    saveMessage,
    handleCompletedChange,
    handleScoreChange,
    handleSave,
    handleSaveAll,
  } = usePaceEncodingState();

  return (
    <div className="pace-encoding-page">
      <header className="pace-header">
        <div className="header-title">
          <BookOpen size={24} />
          <h2>PACE Progress Encoding</h2>
        </div>
        <p className="header-subtitle">Record student PACE completion and test scores</p>
      </header>

      {/* Filters */}
      <div className="pace-filters">
        <div className="filter-group">
          <label>School Year:</label>
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
          <label>
            <Filter size={16} />
            Section:
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
            <option value="Section C">Section C</option>
          </select>
        </div>

        <div className="filter-group">
          <label>
            <BookOpen size={16} />
            Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {paceSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <button className="save-all-btn" onClick={handleSaveAll}>
          <Save size={16} />
          Save All
        </button>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="save-message">
          <CheckCircle size={16} />
          {saveMessage}
        </div>
      )}

      {/* Encoding Table */}
      <div className="encoding-table-container">
        {encodingData.length > 0 ? (
          <table className="encoding-table">
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
              {encodingData.map(row => (
                <tr key={row.studentId}>
                  <td className="student-name">{row.name}</td>
                  <td className="pace-number">PACE #{row.paceNo}</td>
                  <td>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={row.completed}
                        onChange={(e) => handleCompletedChange(row.studentId, e.target.checked)}
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
                      onChange={(e) => handleScoreChange(row.studentId, e.target.value)}
                      className="score-input"
                      disabled={!row.completed}
                    />
                  </td>
                  <td>
                    <button 
                      className="save-btn"
                      onClick={() => handleSave(row.studentId)}
                    >
                      <Save size={14} />
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <BookOpen size={48} color="#9CA3AF" />
            <p>No PACE encoding data available for this section and subject.</p>
            <p className="hint">Select a different section or subject to see students.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaceEncodingPage;
