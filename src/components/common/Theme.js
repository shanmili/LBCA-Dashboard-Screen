import React, { useState, useEffect } from 'react';
import '../../styles/Theme.css';

const Theme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? 'dark' : 'light';
    
    // Update HTML attribute for CSS theming
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
  };

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