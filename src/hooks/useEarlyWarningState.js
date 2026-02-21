import { useState } from 'react';
import { studentsData } from '../data/mockData';

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

export default function useEarlyWarningState() {
  const [riskFilter, setRiskFilter] = useState('All');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');

  // Use all students so every risk level (including Low) is represented
  const allStudents = studentsData;

  const filteredStudents = allStudents.filter(student => {
    const matchesRisk = riskFilter === 'All' || student.riskLevel === riskFilter;
    const matchesSection = sectionFilter === 'All' || student.section === sectionFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSection && matchesSearch;
  });

  // Count by risk level from ALL students
  const riskCounts = {
    high: allStudents.filter(s => s.riskLevel === 'High').length,
    medium: allStudents.filter(s => s.riskLevel === 'Medium').length,
    low: allStudents.filter(s => s.riskLevel === 'Low').length,
  };

  return {
    SCHOOL_YEARS,
    riskFilter,
    setRiskFilter,
    sectionFilter,
    setSectionFilter,
    searchTerm,
    setSearchTerm,
    selectedSchoolYear,
    setSelectedSchoolYear,
    allStudents,
    filteredStudents,
    riskCounts,
  };
}
