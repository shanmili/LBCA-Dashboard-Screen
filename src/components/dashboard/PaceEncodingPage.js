import React, { useState, useEffect } from 'react';
import { BookOpen, Save, CheckCircle, Filter } from 'lucide-react';
import { paceSubjects, paceEncodingData } from '../../data/mockData';
import '../../styles/PaceEncodingPage.css';

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

const PaceEncodingPage = () => {
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [selectedSubject, setSelectedSubject] = useState(paceSubjects[0] || 'Math');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');
  const [encodingData, setEncodingData] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');

  // Load data when section/subject changes
  useEffect(() => {
    const sectionData = paceEncodingData[selectedSection];
    if (sectionData && sectionData[selectedSubject]) {
      // Deep copy to make it editable
      setEncodingData(sectionData[selectedSubject].map(s => ({ ...s })));
    } else {
      setEncodingData([]);
    }
    setSaveMessage('');
  }, [selectedSection, selectedSubject]);

  const handleCompletedChange = (studentId, completed) => {
    setEncodingData(prev => prev.map(row => 
      row.studentId === studentId ? { ...row, completed } : row
    ));
  };

  const handleScoreChange = (studentId, testScore) => {
    const score = testScore === '' ? null : parseInt(testScore, 10);
    setEncodingData(prev => prev.map(row => 
      row.studentId === studentId ? { ...row, testScore: isNaN(score) ? null : score } : row
    ));
  };

  const handleSave = (studentId) => {
    const student = encodingData.find(s => s.studentId === studentId);
    if (student) {
      setSaveMessage(`Saved PACE data for ${student.name}`);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleSaveAll = () => {
    setSaveMessage(`All PACE data saved for ${selectedSection} - ${selectedSubject}`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

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
