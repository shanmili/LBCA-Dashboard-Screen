import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import TeacherScreen from './screens/TeacherScreen';
import AdminScreen from './screens/AdminScreen';
import LoginScreen from './screens/LoginScreen';

import './styles/Variables.css';
import './styles/Global.css';
import './styles/Login.css';
import './styles/Theme.css';
import './styles/layout/MainLayout.css';
import './styles/layout/Header.css';
import './styles/layout/Sidebar.css';
import './styles/layout/UserMenu.css';
import './styles/layout/Notification.css';
import './styles/profileSetting/ProfileSetting.css';
import { SchoolProvider } from './context/SchoolContext';

const VALID_CREDENTIALS = {
  teacher: { email: 'teacher@lbca.edu', password: 'teacher123' },
  admin: { email: 'admin@lbca.edu', password: 'admin123' }
};

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (email, password) => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === VALID_CREDENTIALS.teacher.email &&
          password === VALID_CREDENTIALS.teacher.password) {
        setUser({ role: 'teacher', email });
      } else if (email === VALID_CREDENTIALS.admin.email &&
                 password === VALID_CREDENTIALS.admin.password) {
        setUser({ role: 'admin', email });
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => setUser(null);

  return (
    <SchoolProvider>
    <BrowserRouter>
      <Routes>
        {/* Not logged in — show login for all routes */}
        {!user && (
          <Route
            path="*"
            element={
              <LoginScreen
                onLogin={handleLogin}
                error={error}
                isLoading={isLoading}
              />
            }
          />
        )}

        {/* Logged in as teacher */}
        {user?.role === 'teacher' && (
          <>
            <Route path="/*" element={<TeacherScreen onLogout={handleLogout} user={user} />} />
          </>
        )}

        {/* Logged in as admin */}
        {user?.role === 'admin' && (
          <>
            <Route path="/*" element={<AdminScreen onLogout={handleLogout} user={user} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
    </SchoolProvider>
  );
}

export default App;