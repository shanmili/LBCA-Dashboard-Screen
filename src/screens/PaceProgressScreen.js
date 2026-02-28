import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNav from '../components/layout/TopNav';
import PaceEncodingPage from '../components/dashboard/PaceEncodingPage';
import AccountSettings from '../components/common/AccountSettings';
import useDashboardState from '../hooks/useDashboardState';
import '../styles/DashboardScreen.css';

export default function PaceProgressScreen({ onLogout }) {
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
          handleNavigate(tab);
          if (window.innerWidth <= 768) toggleSidebar();
        }}
      />

      <div className="main-content">
        <TopNav onLogout={onLogout} activeTab={activeTab} onNavigate={handleNavigate} adminPhoto={adminPhoto} />

        <main className="content-area">
          <Routes>
            <Route path="/pace" element={<PaceEncodingPage />} />
            <Route path="/account-settings" element={<AccountSettings onNavigate={handleNavigate} onAdminPhotoUpdate={setAdminPhoto} />} />
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/pace" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
