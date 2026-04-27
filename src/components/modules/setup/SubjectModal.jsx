import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../../../styles/setup/SetupModal.css';

const SubjectModal = ({ isOpen, onClose, onSave, editingItem, gradeLevels }) => {
  const [formData, setFormData] = useState({
    grade_level: '',
    subject_code: '',
    subject_name: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        // When editing an existing subject
        setFormData({
          grade_level: editingItem.grade_level,
          subject_code: editingItem.subject_code,
          subject_name: editingItem.subject_name,
        });
      } else {
        // When adding a new subject (may have grade_level pre-filled)
        setFormData(prev => ({
          subject_code: '',
          subject_name: '',
          grade_level: prev.grade_level || '',
        }));
      }
      setErrors({});
    }
  }, [isOpen, editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.grade_level) {
      newErrors.grade_level = 'Grade level is required';
    }

    if (!formData.subject_code.trim()) {
      newErrors.subject_code = 'Subject code is required';
    } else if (formData.subject_code.length > 20) {
      newErrors.subject_code = 'Subject code must be 20 characters or less';
    }

    if (!formData.subject_name.trim()) {
      newErrors.subject_name = 'Subject name is required';
    } else if (formData.subject_name.length > 100) {
      newErrors.subject_name = 'Subject name must be 100 characters or less';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="setup-modal-overlay" onClick={onClose}>
      <div className="setup-modal-content" onClick={e => e.stopPropagation()}>
        <div className="setup-modal-header">
          <h3>{editingItem ? 'Edit Subject' : 'Add Subject'}</h3>
          <button className="setup-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="setup-modal-form">
          <div className="setup-form-section">
            <h4 className="setup-form-section-title">Subject Details</h4>

            <div className="setup-form-group">
              <label>Grade Level <span className="required">*</span></label>
              <select
                name="grade_level"
                value={formData.grade_level}
                onChange={handleChange}
                className={errors.grade_level ? 'error' : ''}
                disabled={!!editingItem}
              >
                <option value="">Select a grade level</option>
                {gradeLevels.map(gl => (
                  <option key={gl.grade_level_id} value={gl.grade_level_id}>
                    {gl.level} - {gl.name}
                  </option>
                ))}
              </select>
              {errors.grade_level && <span className="setup-error-text">{errors.grade_level}</span>}
            </div>

            <div className="setup-form-grid">
              <div className="setup-form-group">
                <label>Subject Code <span className="required">*</span></label>
                <input
                  type="text"
                  name="subject_code"
                  value={formData.subject_code}
                  onChange={handleChange}
                  placeholder="e.g. MATH101"
                  maxLength="20"
                  className={errors.subject_code ? 'error' : ''}
                />
                <span className="setup-helper-text">
                  {formData.subject_code.length}/20
                </span>
                {errors.subject_code && <span className="setup-error-text">{errors.subject_code}</span>}
              </div>

              <div className="setup-form-group">
                <label>Subject Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="subject_name"
                  value={formData.subject_name}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics"
                  maxLength="100"
                  className={errors.subject_name ? 'error' : ''}
                />
                <span className="setup-helper-text">
                  {formData.subject_name.length}/100
                </span>
                {errors.subject_name && <span className="setup-error-text">{errors.subject_name}</span>}
              </div>
            </div>
          </div>

          <div className="setup-modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {editingItem ? 'Save Changes' : 'Add Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
