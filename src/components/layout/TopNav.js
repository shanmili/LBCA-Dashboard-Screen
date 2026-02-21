import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronDown, 
  LogOut, 
  User, 
  Settings 
} from 'lucide-react';

import '../../styles/TopNav.css'; 

const TopNav = ({ onToggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSettings = () => {
    setIsDropdownOpen(false);
    navigate('/settings');
  };

  return (
    <header className="top-nav">
      <div className="nav-left">
        <button className="menu-button" onClick={onToggle}>
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

        {/* User Profile Container with Click Event */}
        <div className="user-menu-container">
          <div 
            className="user-profile" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="avatar">AD</div>
            <div className="user-info">
              <p className="user-name">Admin User</p>
              <p className="user-role">Administrator</p>
            </div>
            <ChevronDown size={16} className={`dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`} />
          </div>

          {/* The Dropdown Menu */}
          {isDropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <p>Signed in as <strong>Admin</strong></p>
              </div>
              <hr />
              <button className="dropdown-item">
                <User size={16} /> <span>Profile</span>
              </button>
              <button className="dropdown-item" onClick={handleSettings}>
                <Settings size={16} /> <span>Settings</span>
              </button>
              <hr />
              <button className="dropdown-item logout" onClick={() => setIsDropdownOpen(false)}>
                <LogOut size={16} /> <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
