import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNav from '../components/layout/TopNav';
import AnalyticsContent from '../components/dashboard/AnalyticsContent';
import StudentsPage from '../components/dashboard/StudentsPage';
import UnderMaintenance from '../components/common/UnderMaintenance'; 
import '../styles/DashboardScreen.css';

export default function DashboardScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); //iyang memory

  // This function decides what to show in the middle
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AnalyticsContent onNavigate={setActiveTab} />;
      case 'students':
        return <StudentsPage />;
      case 'grades':
        return <UnderMaintenance title="Grades & Records" />;
      case 'attendance':
        return <UnderMaintenance title="Attendance Module" />;
      case 'risk':
        return <UnderMaintenance title="AI Risk Prediction" />;
      case 'messages':
        return <UnderMaintenance title="Messages" />;
      case 'settings':
        return <UnderMaintenance title="Settings" />;
      default:
        return <AnalyticsContent />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Pass activeTab and setActiveTab to Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab} 
        onNavigate={setActiveTab} 
      />

      <div className="main-content">
        <TopNav onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="content-area">
          {/* Call the function to render the correct page */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}