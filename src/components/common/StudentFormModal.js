import React from 'react';
import { X } from 'lucide-react';
import useStudentFormState from '../../hooks/useStudentFormState';
import '../../styles/StudentFormModal.css';

/**
 * Reusable modal for adding or editing a student.
 *
 * Props:
 *  - isOpen      : boolean
 *  - onClose     : () => void
 *  - onSave      : (studentData) => void
 *  - student     : existing student object (null/undefined = "add" mode)
 */
const StudentFormModal = ({ isOpen, onClose, onSave, student }) => {
  const {
    isEdit,
    formData,
    studentSections,
    studentGrades,
    handleChange,
    handleSubjectChange,
    handleAttendanceChange,
    handleSubmit,
  } = useStudentFormState({ isOpen, student, onSave });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? 'Edit Student' : 'Add New Student'}</h3>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Student Information */}
          <div className="form-section">
            <h4 className="form-section-title">Student Information</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input type="text" required placeholder="e.g. Dela Cruz, Juan" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Section <span className="required">*</span></label>
                <select value={formData.section} onChange={e => handleChange('section', e.target.value)}>
                  {studentSections.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Grade Level <span className="required">*</span></label>
                <select value={formData.grade} onChange={e => handleChange('grade', e.target.value)}>
                  {studentGrades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Attendance Summary (Days) — attendance % is auto-calculated */}
          <div className="form-section">
            <h4 className="form-section-title">Attendance Summary (Days)</h4>
            <div className="form-grid three-col">
              <div className="form-group">
                <label>Present</label>
                <input type="number" min="0" placeholder="0" value={formData.attendanceSummary.present} onChange={e => handleAttendanceChange('present', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Late</label>
                <input type="number" min="0" placeholder="0" value={formData.attendanceSummary.late} onChange={e => handleAttendanceChange('late', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Absent</label>
                <input type="number" min="0" placeholder="0" value={formData.attendanceSummary.absent} onChange={e => handleAttendanceChange('absent', e.target.value)} />
              </div>
            </div>
            <p className="form-helper-text">PACE %, Attendance %, Status, Risk Level, and Risk Factors are automatically calculated from the data you enter.</p>
          </div>

          {/* Subjects */}
          <div className="form-section">
            <h4 className="form-section-title">PACE Subjects</h4>
            <div className="subjects-form-table">
              <div className="subjects-form-header">
                <span>Subject</span>
                <span>Completed</span>
                <span>Total PACEs</span>
                <span>Test Score</span>
              </div>
              {formData.subjects.map((subj, i) => (
                <div className="subjects-form-row four-col" key={i}>
                  <input type="text" value={subj.name} onChange={e => handleSubjectChange(i, 'name', e.target.value)} />
                  <input type="number" min="0" value={subj.completed} onChange={e => handleSubjectChange(i, 'completed', e.target.value)} />
                  <input type="number" min="0" value={subj.total} onChange={e => handleSubjectChange(i, 'total', e.target.value)} />
                  <input type="number" min="0" max="100" value={subj.testScore} onChange={e => handleSubjectChange(i, 'testScore', e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">{isEdit ? 'Save Changes' : 'Add Student'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
