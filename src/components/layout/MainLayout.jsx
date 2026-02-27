import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import useSidebarState from '../../hooks/useSidebarState';
import '../../styles/layout/MainLayout.css';

const MainLayout = ({ 
  children, 
  onLogout, 
  onNavigate, 
  activeTab, 
  userRole = 'teacher', 
  adminPhoto 
}) => {
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebarState();

  return (
    <div className="app-container">
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={toggleSidebar} />
      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab} 
        onNavigate={onNavigate}
        userRole={userRole}
        adminPhoto={adminPhoto}
      />
      <div className="main-wrapper">
        <Header 
          onToggleSidebar={toggleSidebar}
          onLogout={onLogout}
          activeTab={activeTab}
          onNavigate={onNavigate}
        />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;