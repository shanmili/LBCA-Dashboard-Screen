import React from 'react';
import SidebarItem from './SidebarItem';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

import logo from '../../assets/logo.webp';

// Accept activeTab and onNavigate as props
const Sidebar = ({ isOpen, activeTab, onNavigate }) => {
  return (
    <nav className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <header className="sidebar-header">
        {isOpen ? (
          <>
            <img src={logo} alt="LBCA Logo" className="sidebar-img" />
            <span className="sidebar-logo">LBCA ADMIN</span>
          </>
        ) : (
          <img src={logo} alt="LBCA Logo" className="sidebar-img"/>
        )}
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
          label="Grades & Records" 
          active={activeTab === 'grades'} 
          onClick={() => onNavigate('grades')}
          collapsed={!isOpen} 
        />
        <SidebarItem 
          icon={CalendarCheck} 
          label="Attendance" 
          active={activeTab === 'attendance'} 
          onClick={() => onNavigate('attendance')}
          collapsed={!isOpen} 
        />
        <SidebarItem 
          icon={AlertTriangle} 
          label="AI Risk Prediction" 
          active={activeTab === 'risk'} 
          onClick={() => onNavigate('risk')}
          collapsed={!isOpen} 
        />
        <SidebarItem 
          icon={MessageSquare} 
          label="Messages" 
          active={activeTab === 'messages'} 
          onClick={() => onNavigate('messages')}
          collapsed={!isOpen} 
        />
        
      </section>
    </nav>
  );
};

export default Sidebar;