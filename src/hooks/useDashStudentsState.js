import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// Map URL paths to tab keys
const PATH_TO_TAB = {
  '/dashboard': 'dashboard',
  '/students': 'students',
  '/pace': 'pace',
  '/risk': 'risk',
  '/account-settings': 'account-settings',
};

export default function useDashboardState() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 768);
  const navigate = useNavigate();
  const location = useLocation();

  // Derive activeTab from the current URL
  const activeTab = (() => {
    const path = location.pathname;
    if (path.startsWith('/student/')) return 'student-profile';
    return PATH_TO_TAB[path] || 'dashboard';
  })();

  // Derive selectedStudentId from URL param /student/:id
  const studentIdMatch = location.pathname.match(/^\/student\/(.+)$/);
  const selectedStudentId = studentIdMatch ? studentIdMatch[1] : null;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleNavigate = (tab, studentId = null) => {
    if (tab === 'student-profile' && studentId) {
      navigate(`/student/${studentId}`);
    } else {
      const path = Object.keys(PATH_TO_TAB).find(k => PATH_TO_TAB[k] === tab) || '/dashboard';
      navigate(path);
    }
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab: (tab) => handleNavigate(tab),
    toggleSidebar,
    selectedStudentId,
    handleNavigate,
  };
}
