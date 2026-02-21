import { useState, useEffect } from 'react';

export default function useDashboardState() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // Close sidebar on window resize to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
