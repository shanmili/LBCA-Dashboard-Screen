import { useState } from 'react';

export default function useDashboardState() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return {
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab,
    toggleSidebar,
  };
}
