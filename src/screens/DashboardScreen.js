import React, { useState } from 'react';
import '../styles/DashboardScreen.css';
import AnalyticsContent from './AnalyticsContent';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  AlertTriangle,
  FileText,
  MessageSquare,
  Settings,
  Menu,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, collapsed }) => (
  <button className={`sidebar-item ${active ? 'active' : ''}`}>
    <Icon size={20} />
    <span className={collapsed ? 'hidden' : ''}>{label}</span>
  </button>
);

export default function DashboardScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation - Using semantic <nav> */}
      <nav className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <header className="sidebar-header">
          <span className="sidebar-logo">{sidebarOpen ? 'LBCA ADMIN' : 'LBCA'}</span>
        </header>
       
        <section className="sidebar-menu">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={true} collapsed={!sidebarOpen} />
          <SidebarItem icon={Users} label="Students" collapsed={!sidebarOpen} />
          <SidebarItem icon={GraduationCap} label="Grades & Records" collapsed={!sidebarOpen} />
          <SidebarItem icon={CalendarCheck} label="Attendance" collapsed={!sidebarOpen} />
          <SidebarItem icon={AlertTriangle} label="AI Risk Prediction" collapsed={!sidebarOpen} />
          <SidebarItem icon={MessageSquare} label="Messages" collapsed={!sidebarOpen} />
          <div className="sidebar-divider"></div>
          <SidebarItem icon={Settings} label="Settings" collapsed={!sidebarOpen} />
        </section>
      </nav>

      {/* Main Content Area - Using semantic <main> */}
      <div className="main-content">
        {/* Top Navigation Bar - Using semantic <header> */}
        <header className="top-nav">
          <div className="nav-left">
            <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <h1 className="page-title">Analytics Dashboard</h1>
          </div>
          <div className="nav-right">
            <div className="search-container">
              <input type="text" placeholder="Search..." className="search-input" />
              <Search className="search-icon" />
            </div>
            <button className="notification-button">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </button>
            <div className="user-profile">
              <div className="avatar">AD</div>
              <div className="user-info">
                <p className="user-name">Admin User</p>
                <p className="user-role">Administrator</p>
              </div>
              <ChevronDown size={16} className="dropdown-icon" />
            </div>
          </div>
        </header>

        {/* Dashboard Content Scroll Area - Using semantic <main> */}
        <main className="content-area">
          <AnalyticsContent />
        </main>
      </div>
    </div>
  );
}