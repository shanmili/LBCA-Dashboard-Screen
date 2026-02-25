import React from 'react';
import { Plus } from 'lucide-react';
import FilterBar from '../../../components/common/FilterBar';

const StudentFilter = ({ filters, onFilterChange, onAddClick }) => {
  const filterOptions = [
    {
      key: 'schoolYear',
      value: filters.schoolYear,
      options: [
        { value: '2025-2026', label: 'SY 2025-2026' },
        { value: '2024-2025', label: 'SY 2024-2025' },
        { value: '2023-2024', label: 'SY 2023-2024' },
      ]
    },
    {
      key: 'section',
      value: filters.section,
      options: [
        { value: 'All', label: 'All Sections' },
        { value: 'Section A', label: 'Section A' },
        { value: 'Section B', label: 'Section B' },
        { value: 'Section C', label: 'Section C' },
      ]
    }
  ];

  return (
    <div>
      <FilterBar 
        filters={filterOptions} 
        onFilterChange={onFilterChange} 
      />
    </div>
  );
};

export default StudentFilter;