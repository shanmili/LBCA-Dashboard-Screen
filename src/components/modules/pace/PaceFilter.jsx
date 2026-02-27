import React from 'react';
import { Save } from 'lucide-react';
import FilterBar from '../../../components/common/FilterBar';

const PaceFilter = ({ filters, onFilterChange, onSaveAll }) => {
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
        { value: 'Section A', label: 'Section A' },
        { value: 'Section B', label: 'Section B' },
        { value: 'Section C', label: 'Section C' },
      ]
    },
    {
      key: 'subject',
      value: filters.subject,
      options: filters.subjectOptions.map(subject => ({
        value: subject,
        label: subject
      }))
    }
  ];

  return (
    <div className="filter-with-button">
      <FilterBar 
        filters={filterOptions} 
        onFilterChange={onFilterChange} 
      />
      <button className="save-all-btn" onClick={onSaveAll}>
        <Save size={16} />
        <span>Save All</span>
      </button>
    </div>
  );
};

export default PaceFilter;