import { useState } from 'react';

const pageTitles = {
  dashboard: 'Analytics Dashboard',
  students: 'Students',
  pace: 'PACE Progress & Scores',
  risk: 'Early Warning Alerts',
  'student-profile': 'Student Profile',
};

export default function useTopNavState(activeTab) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pageTitle = pageTitles[activeTab] || 'Analytics Dashboard';

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const closeDropdown = () => setIsDropdownOpen(false);

  return {
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    pageTitle,
  };
}
