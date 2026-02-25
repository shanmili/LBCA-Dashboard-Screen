import React from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import useSidebarState from '../../hooks/useSidebarState';
import '../../styles/layout/MainLayout.css';

const MainLayout = ({ 
  children, 
  onLogout, 
  activeTab, 
  onNavigate 
}) => {
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebarState();

  return (
    <div className="app-container">
      {/* Mobile overlay backdrop */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={toggleSidebar}
      />

      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onNavigate={onNavigate}
      />

      <div className="main-wrapper">
        <Header 
          onToggleSidebar={toggleSidebar}
          onLogout={onLogout}
          activeTab={activeTab}
          onNavigate={onNavigate}
        />

        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;