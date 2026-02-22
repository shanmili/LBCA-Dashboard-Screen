import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNav from '../components/layout/TopNav';
import StudentsPage from '../components/student/StudentsPage';
import StudentProfile from '../components/student/StudentProfile';
import AccountSettings from '../components/common/AccountSettings';
import useDashboardState from '../hooks/useDashboardState';
import '../styles/DashboardScreen.css';

// Wrapper reads :studentId from URL and passes it as a prop
function StudentProfileWrapper({ onNavigate }) {
  const { studentId } = useParams();
  return <StudentProfile studentId={studentId} onNavigate={onNavigate} />;
}

export default function StudentScreen({ onLogout }) {
  const { sidebarOpen, activeTab, setActiveTab, toggleSidebar, handleNavigate } = useDashboardState();

  return (
    <div className="dashboard-container">
      {/* Mobile overlay backdrop */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={toggleSidebar}
      />

      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onNavigate={(tab) => {
          handleNavigate(tab);
          if (window.innerWidth <= 768) toggleSidebar();
        }}
      />

      <div className="main-content">
        <TopNav onToggle={toggleSidebar} onLogout={onLogout} activeTab={activeTab} onNavigate={handleNavigate} />

        <main className="content-area">
          <Routes>
            <Route path="/students" element={<StudentsPage onNavigate={handleNavigate} />} />
            <Route path="/student/:studentId" element={<StudentProfileWrapper onNavigate={handleNavigate} />} />
            <Route path="/account-settings" element={<AccountSettings onNavigate={handleNavigate} />} />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/students" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
