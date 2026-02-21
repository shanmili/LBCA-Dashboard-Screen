import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { studentSections, studentGrades, defaultSubjects, emptyStudentForm } from '../../data/mockData';
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
  const isEdit = Boolean(student);

  const buildFormData = () => {
    if (student) {
      return {
        name: student.name || '',
        section: student.section || 'Section A',
        grade: student.grade || 'Grade 10',
        pacePercent: student.pacePercent ?? '',
        attendance: student.attendance ?? '',
        status: student.status || 'On Track',
        riskLevel: student.riskLevel || 'Low',
        factor: student.factor || 'None',
        secondaryRisk: student.secondaryRisk || 'None',
        suggestedAction: student.suggestedAction || 'None',
        subjects: (student.subjects || defaultSubjects).map(s => ({ ...s })),
        attendanceSummary: {
          present: student.attendanceSummary?.present ?? '',
          late: student.attendanceSummary?.late ?? '',
          absent: student.attendanceSummary?.absent ?? '',
        },
      };
    }
    return {
      ...emptyStudentForm,
      subjects: emptyStudentForm.subjects.map(s => ({ ...s })),
      attendanceSummary: { ...emptyStudentForm.attendanceSummary },
    };
  };

  const [formData, setFormData] = useState(buildFormData);

  // Re-initialize form whenever the modal opens or the student changes
  useEffect(() => {
    if (isOpen) {
      setFormData(buildFormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, student]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (index, field, value) => {
    setFormData(prev => {
      const updated = prev.subjects.map((s, i) =>
        i === index
          ? { ...s, [field]: field === 'name' || field === 'status' ? value : Number(value) }
          : s
      );
      return { ...prev, subjects: updated };
    });
  };

  const handleAttendanceChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      attendanceSummary: { ...prev.attendanceSummary, [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = {
      ...formData,
      pacePercent: Number(formData.pacePercent) || 0,
      attendance: Number(formData.attendance) || 0,
      attendanceSummary: {
        present: Number(formData.attendanceSummary.present) || 0,
        late: Number(formData.attendanceSummary.late) || 0,
        absent: Number(formData.attendanceSummary.absent) || 0,
      },
    };
    onSave(cleaned);
  };

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
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={e => handleChange('status', e.target.value)}>
                  <option value="On Track">On Track</option>
                  <option value="Behind">Behind</option>
                </select>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="form-section">
            <h4 className="form-section-title">Performance</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>PACE Completion %</label>
                <input type="number" min="0" max="100" placeholder="0" value={formData.pacePercent} onChange={e => handleChange('pacePercent', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Attendance %</label>
                <input type="number" min="0" max="100" placeholder="0" value={formData.attendance} onChange={e => handleChange('attendance', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Risk Level</label>
                <select value={formData.riskLevel} onChange={e => handleChange('riskLevel', e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Risk Details */}
          <div className="form-section">
            <h4 className="form-section-title">Risk Details</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>Primary Factor</label>
                <input type="text" placeholder="e.g. Low PACE completion" value={formData.factor} onChange={e => handleChange('factor', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Secondary Factor</label>
                <input type="text" placeholder="e.g. Declining test trend" value={formData.secondaryRisk} onChange={e => handleChange('secondaryRisk', e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label>Suggested Action</label>
                <input type="text" placeholder="e.g. Schedule intervention session" value={formData.suggestedAction} onChange={e => handleChange('suggestedAction', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Attendance Summary */}
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
                <span>Status</span>
              </div>
              {formData.subjects.map((subj, i) => (
                <div className="subjects-form-row" key={i}>
                  <input type="text" value={subj.name} onChange={e => handleSubjectChange(i, 'name', e.target.value)} />
                  <input type="number" min="0" value={subj.completed} onChange={e => handleSubjectChange(i, 'completed', e.target.value)} />
                  <input type="number" min="0" value={subj.total} onChange={e => handleSubjectChange(i, 'total', e.target.value)} />
                  <input type="number" min="0" max="100" value={subj.testScore} onChange={e => handleSubjectChange(i, 'testScore', e.target.value)} />
                  <select value={subj.status} onChange={e => handleSubjectChange(i, 'status', e.target.value)}>
                    <option value="On Track">On Track</option>
                    <option value="Behind">Behind</option>
                  </select>
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
