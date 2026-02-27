import React from 'react';
import FilterBar from '../../../components/common/FilterBar';

const WarningFilter = ({ filters, onFilterChange }) => {
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
      key: 'risk',
      value: filters.risk,
      options: [
        { value: 'All', label: 'All Risk Levels' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
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
    <FilterBar 
      filters={filterOptions} 
      onFilterChange={onFilterChange} 
    />
  );
};

export default WarningFilter;