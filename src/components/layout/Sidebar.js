import React from 'react';
import SidebarItem from './SidebarItem';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  AlertTriangle,
  BookOpen,
  Bell
} from 'lucide-react';

// Accept activeTab and onNavigate as props
const Sidebar = ({ isOpen, activeTab, onNavigate }) => {
  return (
    <nav className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <header className="sidebar-header">
        <span className="sidebar-logo">{isOpen ? 'LBCA ADMIN' : 'LBCA'}</span>
      </header>
      
      <section className="sidebar-menu">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => onNavigate('dashboard')}
          collapsed={!isOpen} 
        />
        <SidebarItem 
          icon={Users} 
          label="Students" 
          active={activeTab === 'students'} 
          onClick={() => onNavigate('students')}
          collapsed={!isOpen} 
        />
        <SidebarItem 
          icon={GraduationCap} 
          label="PACE Progress & Scores" 
          active={activeTab === 'pace'} 
          onClick={() => onNavigate('pace')}
          collapsed={!isOpen} 
        />
        <SidebarItem 
          icon={Bell} 
          label="Early Warning Alerts" 
          active={activeTab === 'risk'} 
          onClick={() => onNavigate('risk')}
          collapsed={!isOpen} 
        />
      </section>
    </nav>
  );
};

export default Sidebar;