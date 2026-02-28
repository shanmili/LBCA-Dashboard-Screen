import React, { useState } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
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

// Wrapper reads :studentId from URL and passes it as a prop
function StudentProfileWrapper({ onNavigate }) {
  const { studentId } = useParams();
  return <StudentProfile studentId={studentId} onNavigate={onNavigate} />;
}

export default function DashboardScreen({ onLogout }) {
  const { sidebarOpen, activeTab, setActiveTab, toggleSidebar, handleNavigate } = useDashboardState();
  const [adminPhoto, setAdminPhoto] = useState(null);

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
        onToggle={toggleSidebar}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (window.innerWidth <= 768) toggleSidebar();
        }}
      />

      <div className="main-content">
        <TopNav onLogout={onLogout} activeTab={activeTab} onNavigate={handleNavigate} adminPhoto={adminPhoto} />

        <main className="content-area">
          <Routes>
            <Route path="/dashboard" element={<AnalyticsContent onNavigate={handleNavigate} />} />
            <Route path="/students" element={<StudentsPage onNavigate={handleNavigate} />} />
            <Route path="/student/:studentId" element={<StudentProfileWrapper onNavigate={handleNavigate} />} />
            <Route path="/pace" element={<PaceEncodingPage />} />
            <Route path="/risk" element={<EarlyWarningPage onNavigate={handleNavigate} />} />
            <Route path="/account-settings" element={<AccountSettings onNavigate={handleNavigate} onAdminPhotoUpdate={setAdminPhoto} />} />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}