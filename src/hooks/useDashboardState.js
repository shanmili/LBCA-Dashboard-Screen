import { useState } from 'react';

export default function useDashboardState() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigate = (tab, studentId = null) => {
    if (tab === 'student-profile' && studentId) {
      setSelectedStudentId(studentId);
    }
    setActiveTab(tab);
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab,
    toggleSidebar,
    selectedStudentId,
    handleNavigate,
  };
}
