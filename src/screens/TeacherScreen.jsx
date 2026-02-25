import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import { NotificationProvider } from '../context/NotificationContext.jsx';
import Dashboard from '../components/modules/Dashboard.jsx';
import ProfileSetting from '../components/modules/ProfileSetting.jsx';
import LoginScreen from './LoginScreen.jsx';

import '../styles/Variables.css';
import '../styles/Global.css';
import '../styles/Login.css';
import '../styles/Theme.css';
import '../styles/layout/MainLayout.css';
import '../styles/layout/Header.css';
import '../styles/layout/Sidebar.css';
import '../styles/layout/UserMenu.css';
import '../styles/layout/Notification.css';
import '../styles/profileSetting/ProfileSetting.css';

const AppContent = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleNavigate = (tab, studentId) => {
    if (tab === 'account-settings') {
      navigate('/account-settings');
    } else if (tab === 'dashboard') {
      navigate('/dashboard');
    } else if (tab === 'student-profile' && studentId) {
      navigate(`/student/${studentId}`);
    } else {
      navigate(`/${tab}`);
    }
  };

  const getActiveTab = () => {
    const path = window.location.pathname;
    if (path.includes('/account-settings')) return 'account-settings';
    if (path.includes('/dashboard')) return 'dashboard';
    return 'dashboard';
  };

  return (
    <MainLayout
      onLogout={onLogout}
      activeTab={getActiveTab()}
      onNavigate={handleNavigate}
    >
      <Routes>
        <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
        <Route path="/account-settings" element={<ProfileSetting onNavigate={handleNavigate} />} />
      </Routes>
    </MainLayout>
  );
};

const Router = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(isLoggedIn ? '/dashboard' : '/login');
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginScreen onLogin={() => setIsLoggedIn(true)} />}
      />
      <Route
        path="/*"
        element={
          isLoggedIn ? (
            <NotificationProvider>
              <AppContent onLogout={() => setIsLoggedIn(false)} />
            </NotificationProvider>
          ) : (
            <LoginScreen onLogin={() => setIsLoggedIn(true)} />
          )
        }
      />
    </Routes>
  );
};

const TeacherScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Router isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </BrowserRouter>
  );
};

export default TeacherScreen;