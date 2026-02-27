import { useState } from 'react';
import { studentsData } from '../data/mockData';

export default function useStudentsPageState() {
  const [filters, setFilters] = useState({
    schoolYear: '2025-2026',
    section: 'All'
  });
  const [students] = useState(studentsData);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredStudents = students.filter(student => {
    const matchesSection = filters.section === 'All' || student.section === filters.section;
    return matchesSection;
  });

  const getStatusBadgeClass = (status) => {
    if (status === 'Behind') return 'status-badge at-risk';
    return 'status-badge on-track';
  };

  return {
    filters,
    updateFilter,
    students,
    filteredStudents,
    getStatusBadgeClass,
  };
}
