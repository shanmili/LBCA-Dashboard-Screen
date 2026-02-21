import { useState, useEffect } from 'react';
import { studentSections, studentGrades, defaultSubjects, emptyStudentForm } from '../data/mockData';
import { computeStudent } from '../components/common/studentUtils';

export default function useStudentFormState({ isOpen, student, onSave }) {
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
    const computed = computeStudent(formData);
    onSave(computed);
  };

  return {
    isEdit,
    formData,
    studentSections,
    studentGrades,
    handleChange,
    handleSubjectChange,
    handleAttendanceChange,
    handleSubmit,
  };
}
