import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNav from '../components/layout/TopNav';
import AnalyticsContent from '../components/dashboard/AnalyticsContent';
import StudentsPage from '../components/student/StudentsPage';
import StudentProfile from '../components/student/StudentProfile';
import PaceEncodingPage from '../components/dashboard/PaceEncodingPage';
import EarlyWarningPage from '../components/dashboard/EarlyWarningPage';
import AccountSettings from '../components/common/AccountSettings';
import useDashboardState from '../hooks/useDashboardState';
import '../styles/DashboardScreen.css';

export default function DashboardScreen({ onLogout }) {
  const { sidebarOpen, activeTab, setActiveTab, toggleSidebar, selectedStudentId, handleNavigate } = useDashboardState();

  // This function decides what to show in the middle
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AnalyticsContent onNavigate={handleNavigate} />;
      case 'students':
        return <StudentsPage onNavigate={handleNavigate} />;
      case 'student-profile':
        return <StudentProfile studentId={selectedStudentId} onNavigate={handleNavigate} />;
      case 'pace':
        return <PaceEncodingPage />;
      case 'risk':
        return <EarlyWarningPage onNavigate={handleNavigate} />;
      case 'account-settings':
        return <AccountSettings onNavigate={handleNavigate} />;
      default:
        return <AnalyticsContent onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile overlay backdrop */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} 
        onClick={toggleSidebar} 
      />

      {/* Pass activeTab and setActiveTab to Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab} 
        onNavigate={(tab) => {
          setActiveTab(tab);
          // Auto-close sidebar on mobile after navigation
          if (window.innerWidth <= 768) {
            toggleSidebar();
          }
        }} 
      />

      <div className="main-content">
        <TopNav onToggle={toggleSidebar} onLogout={onLogout} activeTab={activeTab} onNavigate={handleNavigate} />
        
        <main className="content-area">
          {/* Call the function to render the correct page */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}