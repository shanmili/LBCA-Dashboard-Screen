import React from 'react';
import useThemeState from '../../hooks/useThemeState';
import '../../styles/Theme.css';

const Theme = () => {
  const { isDarkMode, toggleTheme } = useThemeState();

  return (
    <div className="theme-toggle-container">
      <button 
        className={`theme-toggle-button ${isDarkMode ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <div className="toggle-track">
          <div className="toggle-thumb">
            {isDarkMode ? '🌙' : '☀️'}
          </div>
        </div>
      </button>
    </div>
  );
};

export default Theme;