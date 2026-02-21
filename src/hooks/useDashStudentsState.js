import { useState } from 'react';
import { studentsData } from '../data/mockData';

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

export default function useDashStudentsState() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'All' || student.section === sectionFilter;
    return matchesSearch && matchesSection;
  });

  const getStatusBadgeClass = (status) => {
    if (status === 'Behind') return 'status-badge at-risk';
    return 'status-badge on-track';
  };

  return {
    SCHOOL_YEARS,
    searchTerm,
    setSearchTerm,
    sectionFilter,
    setSectionFilter,
    selectedSchoolYear,
    setSelectedSchoolYear,
    filteredStudents,
    getStatusBadgeClass,
  };
}
