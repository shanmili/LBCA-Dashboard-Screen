import React from 'react';
import SidebarItem from './SidebarItem.jsx';
import '../../styles/layout/Sidebar.css';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  AlertTriangle,
} from 'lucide-react';

const Sidebar = ({ isOpen, activeTab, onNavigate }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <div className="sidebar-header">
        <span className="sidebar-logo">{isOpen ? 'LBCA ADMIN' : 'LBCA'}</span>
      </div>
      
      <nav className="sidebar-menu">
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
          label="PACE Progress" 
          active={activeTab === 'pace'} 
          onClick={() => onNavigate('pace')}
          collapsed={!isOpen} 
        />
        <SidebarItem 
          icon={AlertTriangle} 
          label="Early Warning" 
          active={activeTab === 'risk'} 
          onClick={() => onNavigate('risk')}
          collapsed={!isOpen} 
        />
      </nav>
    </aside>
  );
};

export default Sidebar;