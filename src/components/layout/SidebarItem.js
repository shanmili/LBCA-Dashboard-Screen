import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick }) => {
  return (
    <button 
      className={`sidebar-item ${active ? 'active' : ''}`} 
      onClick={onClick} // Add onClick handler to handle item clicks
    >
      <Icon size={20} />
      <span className={collapsed ? 'hidden' : ''}>{label}</span>
    </button>
  );
};

export default SidebarItem;