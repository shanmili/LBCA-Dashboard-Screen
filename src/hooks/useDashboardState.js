import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Map tab names to URL paths
const TAB_ROUTES = {
  'dashboard': '/dashboard',
  'students': '/students',
  'student-profile': '/student',
  'pace': '/pace',
  'risk': '/risk',
  'account-settings': '/account-settings',
};

// Reverse map: URL path prefix → tab name
const ROUTE_TABS = {
  '/dashboard': 'dashboard',
  '/students': 'students',
  '/student': 'student-profile',
  '/pace': 'pace',
  '/risk': 'risk',
  '/account-settings': 'account-settings',
};

function getTabFromPath(pathname) {
  for (const [prefix, tab] of Object.entries(ROUTE_TABS)) {
    if (pathname.startsWith(prefix)) return tab;
  }
  return 'dashboard';
}

export default function useDashboardState() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState(() => getTabFromPath(window.location.pathname));
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // Sync activeTab when URL changes (e.g. browser back/forward)
  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

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
    setActiveTab(tab);

    if (tab === 'student-profile' && studentId) {
      setSelectedStudentId(studentId);
      navigate(`/student/${studentId}`);
    } else {
      const route = TAB_ROUTES[tab] || `/${tab}`;
      navigate(route);
    }
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
