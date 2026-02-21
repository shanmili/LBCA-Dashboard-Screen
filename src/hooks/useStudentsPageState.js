import { useState } from 'react';
import { studentsData } from '../data/mockData';

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

export default function useStudentsPageState() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');
  const [showAddModal, setShowAddModal] = useState(false);
  const [students, setStudents] = useState(studentsData);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'All' || student.section === sectionFilter;
    return matchesSearch && matchesSection;
  });

  const getStatusBadgeClass = (status) => {
    if (status === 'Behind') return 'status-badge at-risk';
    return 'status-badge on-track';
  };

  const handleAddStudent = (formData) => {
    const newId = 'S' + String(students.length + 1).padStart(3, '0');
    const newStudent = { ...formData, id: newId };
    setStudents(prev => [...prev, newStudent]);
    studentsData.push(newStudent);
    setShowAddModal(false);
  };

  return {
    SCHOOL_YEARS,
    searchTerm,
    setSearchTerm,
    sectionFilter,
    setSectionFilter,
    selectedSchoolYear,
    setSelectedSchoolYear,
    showAddModal,
    setShowAddModal,
    students,
    filteredStudents,
    getStatusBadgeClass,
    handleAddStudent,
  };
}
